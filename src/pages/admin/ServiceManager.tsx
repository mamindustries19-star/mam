import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Briefcase, 
  Edit3, 
  Trash2, 
  Plus, 
  X, 
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  ChevronRight,
  Eye,
  EyeOff,
  Upload
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Service {
  id: number;
  slug: string;
  title: string;
  short_desc: string;
  description: string;
  image_url: string;
  benefits: string[];
  industries: string[];
  is_active: boolean;
}

const ServiceManager = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [processing, setProcessing] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [benefits, setBenefits] = useState("");
  const [industries, setIndustries] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (error) {
      toast.error("Failed to load services");
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setTitle(service.title);
    setShortDesc(service.short_desc);
    setDescription(service.description);
    setImageFile(null);
    setPreviewUrl(service.image_url);
    setBenefits(service.benefits.join(", "));
    setIndustries(service.industries.join(", "));
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      let finalImageUrl = previewUrl;

      // 1. Handle Image Upload if a new file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `services/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("service-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("service-images")
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

      const serviceData = {
        title,
        slug: title.toLowerCase().replace(/ /g, "-"),
        short_desc: shortDesc,
        description,
        image_url: finalImageUrl,
        benefits: benefits.split(",").map(b => b.trim()).filter(b => b),
        industries: industries.split(",").map(i => i.trim()).filter(i => i),
      };

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", editingService.id);
        if (error) throw error;
        toast.success("Service updated");
      } else {
        const { error } = await supabase
          .from("services")
          .insert([serviceData]);
        if (error) throw error;
        toast.success("New service added");
      }
      
      setIsModalOpen(false);
      resetForm();
      fetchServices();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setProcessing(false);
    }
  };

  const toggleStatus = async (service: Service) => {
    const { error } = await supabase
      .from("services")
      .update({ is_active: !service.is_active })
      .eq("id", service.id);
    
    if (error) toast.error("Update failed");
    else fetchServices();
  };

  const resetForm = () => {
    setEditingService(null);
    setTitle("");
    setShortDesc("");
    setDescription("");
    setImageFile(null);
    setPreviewUrl(null);
    setBenefits("");
    setIndustries("");
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Services Portfolio</h1>
          <p className="text-sm text-metallic">Manage service descriptions, technical specs and visual assets.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:bg-accent/90 transition-all"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </header>

      {loading ? (
        <div className="h-64 grid place-items-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-secondary/50 border border-white/5 rounded-xl overflow-hidden group hover:border-accent/20 transition-all"
            >
              <div className="flex flex-col md:flex-row p-4 gap-6 items-center">
                <div className="w-24 h-24 rounded-lg bg-primary overflow-hidden shrink-0">
                  <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    {!service.is_active && (
                      <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-bold uppercase">Hidden</span>
                    )}
                  </div>
                  <p className="text-xs text-metallic line-clamp-2 max-w-2xl">{service.short_desc}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStatus(service)}
                    className="p-2.5 bg-white/5 hover:bg-accent/10 rounded-md text-metallic hover:text-accent transition-all"
                  >
                    {service.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2.5 bg-white/5 hover:bg-accent/10 rounded-md text-metallic hover:text-accent transition-all"
                  >
                    <Edit3 size={18} />
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
                  {editingService ? "Edit Service" : "New Service"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-metallic hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Service Title</label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                        placeholder="e.g. Laser Cutting"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Short Description</label>
                      <input
                        type="text"
                        required
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                        placeholder="One line summary..."
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Service Image</label>
                      <div 
                        className={`h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden bg-primary/50 ${
                          previewUrl ? "border-accent/50" : "border-white/10 hover:border-accent/30"
                        }`}
                      >
                        {previewUrl ? (
                          <img src={previewUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                        ) : (
                          <>
                            <ImageIcon size={24} className="text-metallic mb-2" />
                            <span className="text-[10px] text-metallic uppercase tracking-tighter text-center">
                              Upload Service Photo
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

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Benefits (Comma separated)</label>
                      <textarea
                        value={benefits}
                        onChange={(e) => setBenefits(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none resize-none text-sm"
                        rows={3}
                        placeholder="Accuracy, Speed, Cost-effective..."
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Target Industries (Comma separated)</label>
                      <textarea
                        value={industries}
                        onChange={(e) => setIndustries(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none resize-none text-sm"
                        rows={3}
                        placeholder="Automotive, Construction, Interior..."
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">Full Service Description</label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-primary border border-white/10 rounded-md p-4 text-white focus:border-accent outline-none resize-none text-sm leading-relaxed"
                    rows={6}
                    placeholder="Provide a detailed technical breakdown..."
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

export default ServiceManager;
