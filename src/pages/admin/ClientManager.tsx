import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, 
  Plus, 
  X, 
  Loader2,
  Eye,
  EyeOff,
  Building2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Client {
  id: number;
  name: string;
  is_visible: boolean;
  display_order: number;
}

const ClientManager = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Form State
  const [name, setName] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setProcessing(true);
    try {
      const { error } = await supabase.from("clients").insert([
        {
          name,
          display_order: clients.length,
          is_visible: true
        },
      ]);

      if (error) throw error;

      toast.success("Client added successfully");
      setIsModalOpen(false);
      setName("");
      fetchClients();
    } catch (error: any) {
      toast.error(error.message || "Operation failed");
    } finally {
      setProcessing(false);
    }
  };

  const toggleVisibility = async (client: Client) => {
    const { error } = await supabase
      .from("clients")
      .update({ is_visible: !client.is_visible })
      .eq("id", client.id);
    
    if (error) {
      toast.error("Failed to update status");
    } else {
      fetchClients();
    }
  };

  const handleDelete = async (client: Client) => {
    if (!window.confirm(`Delete ${client.name}?`)) return;

    try {
      const { error } = await supabase.from("clients").delete().eq("id", client.id);
      if (error) throw error;
      toast.success("Client removed");
      fetchClients();
    } catch (error) {
      toast.error("Failed to delete client");
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Client Management</h1>
          <p className="text-sm text-metallic">Manage names for the 'Trusted By' section.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:bg-accent/90 transition-all"
        >
          <Plus size={18} />
          Add Client Name
        </button>
      </header>

      {loading ? (
        <div className="h-64 grid place-items-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              layout
              className={`bg-secondary/50 border border-white/5 p-4 rounded-lg flex items-center justify-between group ${
                !client.is_visible ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-accent" />
                <span className="text-sm font-semibold text-white">{client.name}</span>
              </div>
              
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleVisibility(client)}
                  className={`p-2 rounded transition-colors ${
                    client.is_visible ? "text-metallic hover:text-white" : "text-accent hover:bg-accent/10"
                  }`}
                  title={client.is_visible ? "Hide" : "Show"}
                >
                  {client.is_visible ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                <button 
                  onClick={() => handleDelete(client)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-all"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
          {clients.length === 0 && (
            <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-xl text-center">
              <Building2 size={40} className="mx-auto text-metallic mb-4 opacity-20" />
              <p className="text-metallic">No clients added yet.</p>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
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
              className="relative w-full max-w-md bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-lg font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Plus size={18} className="text-accent" />
                  Add Client
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-metallic hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddClient} className="p-6 space-y-6">
                <div>
                  <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                    placeholder="e.g. Tata Motors"
                  />
                </div>

                <div className="pt-4 flex gap-3">
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
                    {processing ? <Loader2 size={20} className="animate-spin" /> : "Add Client"}
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

export default ClientManager;
