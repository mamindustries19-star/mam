import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Database, Loader2, CheckCircle2, AlertTriangle, Play, 
  Plus, X, Upload, Image as ImageIcon, Trash2, Edit3 
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
      setItems(data || []);
    } catch (error) {
      toast.error("Failed to load gallery items");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
      toast.error(error.message || "Upload failed");
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
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="bg-secondary/50 border border-white/5 rounded-lg overflow-hidden group"
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
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-white/10 hover:bg-red-500 rounded-full transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] text-white uppercase tracking-widest font-bold">
                  {item.category}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-white truncate">{item.title || "Untitled Project"}</h3>
              </div>
            </motion.div>
          ))}
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
