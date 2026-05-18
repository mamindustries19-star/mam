import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Database, Loader2, CheckCircle2, AlertTriangle, Play, 
  Plus, X, Upload, Image as ImageIcon, Trash2, Edit3,
  ArrowUp, ArrowDown
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "Sheds",
  "Gates & Grills",
  "Rolling Shutters",
  "Laser Cutting",
  "Fabrication",
  "Other"
];

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  display_order: number;
}

const getHomeBadge = (index: number) => {
  if (index >= 12) return null;
  if (index === 0 || index === 7) return { label: "Large Square", color: "bg-accent/20 border-accent/30 text-accent" };
  if (index === 10 || index === 11) return { label: "Wide Card", color: "bg-blue-500/20 border-blue-500/30 text-blue-400" };
  return { label: "Standard Square", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" };
};

const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      
      const loadedItems = data || [];
      
      // Let's verify if orders are normalized (i.e. unique sequential from 0 to N-1)
      let needsNormalization = false;
      for (let i = 0; i < loadedItems.length; i++) {
        if (loadedItems[i].display_order !== i) {
          needsNormalization = true;
          break;
        }
      }

      if (needsNormalization && loadedItems.length > 0) {
        // Fix orders in Supabase sequentially
        const updates = loadedItems.map((item, index) => 
          supabase
            .from("gallery")
            .update({ display_order: index })
            .eq("id", item.id)
        );
        await Promise.all(updates);
        
        // Re-fetch
        const { data: refetchedData } = await supabase
          .from("gallery")
          .select("*")
          .order("display_order", { ascending: true });
        setItems(refetchedData || []);
      } else {
        setItems(loadedItems);
      }
    } catch (error) {
      toast.error("Failed to load gallery items");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Sane maximum limit check
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File is too large! Please choose an image under 20MB.");
        e.target.value = "";
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        toast.info("Note: Large image selected. If the upload fails with a Bad Request, you may need to compress the image or increase the limit in your Supabase Storage settings.");
      }

      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setPreviewUrl(item.image_url);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      setUploading(true);
      try {
        const { error } = await supabase
          .from("gallery")
          .update({ title, category })
          .eq("id", editingItem.id);
        
        if (error) throw error;
        toast.success("Item updated successfully");
        setIsModalOpen(false);
        resetForm();
        fetchGallery();
      } catch (error: any) {
        toast.error("Update failed");
      } finally {
        setUploading(false);
      }
    } else {
      handleUpload();
    }
  };

  const handleUpload = async () => {
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("gallery-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("gallery-images")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("gallery").insert([
        {
          title,
          category,
          image_url: publicUrl,
          display_order: items.length,
        },
      ]);

      if (dbError) throw dbError;

      toast.success("Image uploaded successfully");
      setIsModalOpen(false);
      resetForm();
      fetchGallery();
    } catch (error: any) {
      console.error("Storage upload error details:", error);
      const isSizeLimit = error.message?.toLowerCase().includes("too large") || 
                          error.message?.toLowerCase().includes("size") ||
                          error.statusCode === "400" ||
                          error.status === 400;
      
      if (isSizeLimit) {
        toast.error("Upload failed: File size exceeds the maximum limit of your Supabase Storage bucket. Please compress the image or increase the size limit in your Supabase dashboard settings.");
      } else {
        toast.error(error.message || "Upload failed. Please check your storage bucket configuration.");
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const urlParts = item.image_url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `gallery/${fileName}`;

      await supabase.storage.from("gallery-images").remove([filePath]);
      const { error } = await supabase.from("gallery").delete().eq("id", item.id);
      
      if (error) throw error;

      toast.success("Item deleted");
      fetchGallery();
    } catch (error: any) {
      toast.error("Failed to delete item");
    }
  };

  const handleMove = async (item: GalleryItem, direction: "up" | "down") => {
    const currentIndex = items.findIndex((i) => i.id === item.id);
    if (currentIndex === -1) return;

    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const otherItem = items[targetIndex];

    try {
      const tempOrder = item.display_order;
      
      const { error: err1 } = await supabase
        .from("gallery")
        .update({ display_order: otherItem.display_order })
        .eq("id", item.id);

      const { error: err2 } = await supabase
        .from("gallery")
        .update({ display_order: tempOrder })
        .eq("id", otherItem.id);

      if (err1 || err2) throw err1 || err2;

      toast.success("Position swapped successfully");
      fetchGallery();
    } catch (error: any) {
      toast.error("Failed to reorder: " + error.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory(CATEGORIES[0]);
    setImageFile(null);
    setPreviewUrl(null);
    setEditingItem(null);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Gallery Management</h1>
          <p className="text-sm text-metallic">Manage project showcase and portfolio images.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:bg-accent/90 transition-all"
        >
          <Plus size={18} />
          Add New Image
        </button>
      </header>

      {loading ? (
        <div className="h-64 grid place-items-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => {
            const badge = getHomeBadge(index);
            return (
              <motion.div
                key={item.id}
                layout
                className={`bg-secondary/50 border border-white/5 rounded-lg overflow-hidden group relative flex flex-col justify-between ${
                  index < 12 ? "ring-1 ring-accent/30" : ""
                }`}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 bg-white/10 hover:bg-accent hover:text-accent-foreground rounded-full transition-all"
                      title="Edit details"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item)}
                      className="p-2 bg-white/10 hover:bg-red-500 rounded-full transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] text-white uppercase tracking-widest font-bold">
                    {item.category}
                  </div>
                  {badge && (
                    <div className={`absolute bottom-2 left-2 px-2 py-0.5 border backdrop-blur-md rounded text-[9px] uppercase tracking-wider font-semibold ${badge.color}`}>
                      {badge.label}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 border border-white/10 rounded text-[9px] text-white font-mono">
                    #{index + 1}
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between gap-2 border-t border-white/5 bg-secondary/30">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-medium text-white truncate" title={item.title}>
                      {item.title || "Untitled Project"}
                    </h3>
                    <p className="text-[9px] text-metallic">
                      {index < 12 ? "Featured on Home" : "Main Portfolio"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMove(item, "up")}
                      disabled={index === 0}
                      className="p-1 bg-white/5 hover:bg-accent hover:text-accent-foreground disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white/60 rounded text-white transition-all border border-white/5"
                      title="Move Left/Up"
                    >
                      <ArrowUp size={12} />
                    </button>
                    <button
                      onClick={() => handleMove(item, "down")}
                      disabled={index === items.length - 1}
                      className="p-1 bg-white/5 hover:bg-accent hover:text-accent-foreground disabled:opacity-20 disabled:hover:bg-white/5 disabled:hover:text-white/60 rounded text-white transition-all border border-white/5"
                      title="Move Right/Down"
                    >
                      <ArrowDown size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Action Modal (Upload or Edit) */}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  {editingItem ? <Edit3 size={18} className="text-accent" /> : <Upload size={18} className="text-accent" />}
                  {editingItem ? "Edit Portfolio Item" : "Upload Portfolio Item"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-metallic hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent transition-colors outline-none"
                        placeholder="e.g. Laser Cut Panels"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none appearance-none"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                      {editingItem ? "Current Image" : "Image File"}
                    </label>
                    <div 
                      className={`aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition-all relative overflow-hidden ${
                        previewUrl || editingItem ? "border-accent/50" : "border-white/10 hover:border-accent/30"
                      }`}
                    >
                      {(previewUrl || editingItem?.image_url) ? (
                        <img src={previewUrl || editingItem?.image_url} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <>
                          <ImageIcon size={32} className="text-metallic mb-2" />
                          <span className="text-[10px] text-center text-metallic uppercase tracking-tighter">
                            Drag & drop or click to browse
                          </span>
                        </>
                      )}
                      {!editingItem && (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          required
                        />
                      )}
                    </div>
                    {editingItem && (
                      <p className="text-[10px] text-metallic text-center mt-1 italic">Images cannot be swapped during edit. Re-upload for new images.</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-white/10 rounded-md text-white font-bold hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-[2] bg-accent text-accent-foreground font-bold py-3 rounded-md hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {uploading ? <Loader2 size={20} className="animate-spin" /> : editingItem ? "Save Changes" : "Start Production Upload"}
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

export default GalleryManager;
