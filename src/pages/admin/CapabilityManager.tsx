import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trophy, 
  Edit3, 
  Trash2, 
  Plus, 
  X, 
  Loader2,
  Image as ImageIcon,
  Eye,
  EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface StatItem {
  label: string;
  value: string;
}

interface Capability {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  image_url: string;
  stats: StatItem[];
  badge: string;
  is_visible: boolean;
  display_order: number;
}

const CapabilityManager = () => {
  const [capabilities, setCapabilities] = useState<Capability[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCapability, setEditingCapability] = useState<Capability | null>(null);
  const [processing, setProcessing] = useState(false);
  
  // Form State
  const [eyebrow, setEyebrow] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [badge, setBadge] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Stat Items Form State (exactly 4 stat entries)
  const [stats, setStats] = useState<StatItem[]>([
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" }
  ]);

  useEffect(() => {
    fetchCapabilities();
  }, []);

  const fetchCapabilities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("capabilities")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (error) {
      toast.error("Failed to load capabilities. Please run the SQL migration.");
    } else {
      setCapabilities(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (cap: Capability) => {
    setEditingCapability(cap);
    setEyebrow(cap.eyebrow);
    setTitle(cap.title);
    setDescription(cap.description);
    setBadge(cap.badge);
    setImageFile(null);
    setPreviewUrl(cap.image_url);
    
    // Load existing stats, pad with empty entries if less than 4
    const loadedStats = [...(cap.stats || [])];
    while (loadedStats.length < 4) {
      loadedStats.push({ label: "", value: "" });
    }
    setStats(loadedStats.slice(0, 4));
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleStatChange = (index: number, field: "label" | "value", val: string) => {
    setStats(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this capability section?")) return;
    
    try {
      const { error } = await supabase
        .from("capabilities")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Capability section deleted successfully");
      fetchCapabilities();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete capability");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      let finalImageUrl = previewUrl;

      // 1. Handle Image Upload to service-images bucket with capabilities/ prefix
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `capabilities/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("service-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("service-images")
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

      if (!finalImageUrl) {
        throw new Error("An image is required for this capability section.");
      }

      // Filter out empty stats
      const cleanStats = stats.filter(s => s.label.trim() !== "" || s.value.trim() !== "");

      const capData = {
        eyebrow,
        title,
        description,
        image_url: finalImageUrl,
        stats: cleanStats,
        badge,
      };

      if (editingCapability) {
        const { error } = await supabase
          .from("capabilities")
          .update(capData)
          .eq("id", editingCapability.id);
        if (error) throw error;
        toast.success("Capability updated successfully");
      } else {
        // Find next display order
        const maxOrder = capabilities.length > 0 ? Math.max(...capabilities.map(c => c.display_order || 0)) : -1;
        const { error } = await supabase
          .from("capabilities")
          .insert([{ ...capData, display_order: maxOrder + 1, is_visible: true }]);
        if (error) throw error;
        toast.success("New capability section added successfully");
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchCapabilities();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setProcessing(false);
    }
  };

  const toggleStatus = async (cap: Capability) => {
    const { error } = await supabase
      .from("capabilities")
      .update({ is_visible: !cap.is_visible })
      .eq("id", cap.id);
    
    if (error) toast.error("Visibility toggle failed");
    else fetchCapabilities();
  };

  const resetForm = () => {
    setEditingCapability(null);
    setEyebrow("");
    setTitle("");
    setDescription("");
    setBadge("");
    setImageFile(null);
    setPreviewUrl(null);
    setStats([
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" },
      { label: "", value: "" }
    ]);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Capabilities & Machinery Manager</h1>
          <p className="text-sm text-metallic">Manage homepage machinery showcases, detailed specifications, and key performance statistics.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/15"
        >
          <Plus size={18} />
          Add Capability Section
        </button>
      </header>

      {loading ? (
        <div className="h-64 grid place-items-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : capabilities.length === 0 ? (
        <div className="bg-secondary/35 border border-white/5 p-12 rounded-xl text-center">
          <Trophy size={40} className="mx-auto text-accent/55 mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">No Capabilities Saved in Database</h3>
          <p className="text-xs text-metallic mb-6 max-w-md mx-auto">
            The homepage is currently running on static defaults. Please click the button below to add your first capability section or migrate existing rows.
          </p>
          <button
            onClick={() => { resetForm(); setIsModalOpen(true); }}
            className="bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-bold text-xs hover:bg-accent/90 transition-all inline-flex items-center gap-1.5"
          >
            <Plus size={14} /> Add First Section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {capabilities.map((cap) => (
            <motion.div
              key={cap.id}
              className="bg-secondary/50 border border-white/5 rounded-xl overflow-hidden group hover:border-accent/20 transition-all"
            >
              <div className="flex flex-col md:flex-row p-4 gap-6 items-center">
                <div className="w-24 h-24 rounded-lg bg-primary overflow-hidden shrink-0">
                  <img src={cap.image_url} alt={cap.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-semibold">{cap.eyebrow}</span>
                    {!cap.is_visible && (
                      <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-bold uppercase">Hidden</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{cap.title}</h3>
                  <p className="text-xs text-metallic line-clamp-1 max-w-2xl">{cap.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(cap)}
                    className="p-2.5 bg-white/5 hover:bg-accent/10 rounded-md text-metallic hover:text-accent transition-all"
                    title="Toggle Visibility"
                  >
                    {cap.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => handleEdit(cap)}
                    className="p-2.5 bg-white/5 hover:bg-accent/10 rounded-md text-metallic hover:text-accent transition-all"
                    title="Edit Capability"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(cap.id)}
                    className="p-2.5 bg-white/5 hover:bg-red-500/10 rounded-md text-metallic hover:text-red-500 transition-all"
                    title="Delete Capability"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                  {editingCapability ? "Edit Capability" : "New Capability Showcase"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-metallic hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Category/Eyebrow</label>
                      <input
                        type="text"
                        required
                        value={eyebrow}
                        onChange={(e) => setEyebrow(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                        placeholder="e.g. Laser Cutting"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Machine Name / Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                        placeholder="e.g. 3kW CNC Fibre Laser Machine"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Overlay Badge text</label>
                      <input
                        type="text"
                        required
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                        placeholder="e.g. 3kW Fibre"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Showcase Image</label>
                      <div 
                        className={`h-36 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden bg-primary/50 ${
                          previewUrl ? "border-accent/50" : "border-white/10 hover:border-accent/30"
                        }`}
                      >
                        {previewUrl ? (
                          <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <>
                            <ImageIcon size={24} className="text-metallic mb-2" />
                            <span className="text-[10px] text-metallic uppercase tracking-tighter text-center">
                              Upload Machine Photo
                            </span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stat Specification Inputs */}
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest text-accent font-bold block">Key Specifications (Stats)</label>
                    <div className="space-y-3">
                      {stats.map((stat, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleStatChange(i, "label", e.target.value)}
                            className="w-1/2 bg-primary border border-white/10 rounded-md p-2.5 text-xs text-white focus:border-accent outline-none"
                            placeholder={`Spec label ${i + 1} (e.g. Power)`}
                          />
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => handleStatChange(i, "value", e.target.value)}
                            className="w-1/2 bg-primary border border-white/10 rounded-md p-2.5 text-xs text-white focus:border-accent outline-none"
                            placeholder={`Spec value (e.g. 3 kW)`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Machine Details / Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-primary border border-white/10 rounded-md p-4 text-white focus:border-accent outline-none resize-none text-sm leading-relaxed"
                    rows={5}
                    placeholder="Provide detailed operating performance specs, capacities and materials compatibility..."
                  />
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-md text-white font-bold hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-[2] bg-accent text-accent-foreground font-bold py-3 rounded-md hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {processing ? <Loader2 size={20} className="animate-spin" /> : "Commit Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CapabilityManager;
