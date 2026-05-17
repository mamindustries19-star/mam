import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Mail, 
  Phone, 
  Clock, 
  Search, 
  Trash2, 
  CheckCircle2, 
  MessageSquare,
  MessageCircle,
  Loader2,
  Filter,
  ExternalLink,
  MoreVertical,
  X,
  Users,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { format } from "date-fns";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: string;
  created_at: string;
}

const EnquiryManager = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setEnquiries(data || []);
    } catch (error) {
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("enquiries")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;
      toast.success(`Status updated to ${newStatus}`);
      fetchEnquiries();
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const { error } = await supabase.from("enquiries").delete().eq("id", id);
      if (error) throw error;
      toast.success("Enquiry deleted");
      fetchEnquiries();
      setSelectedEnquiry(null);
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesFilter = filter === "All" || e.status === filter;
    const matchesSearch = 
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.service.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "In Progress": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Quoted": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Closed": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-white/10 text-metallic border-white/20";
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Lead Management</h1>
          <p className="text-sm text-metallic">Review and track incoming customer enquiries.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-metallic" size={16} />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary/50 border border-white/10 rounded-md pl-10 pr-4 py-2 text-sm text-white focus:border-accent outline-none w-full sm:w-64"
            />
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-secondary/50 border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:border-accent outline-none"
          >
            <option value="All">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Quoted">Quoted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </header>

      {loading ? (
        <div className="h-64 grid place-items-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="bg-secondary/30 border border-white/5 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-widest text-metallic font-bold">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service Required</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Received</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredEnquiries.map((enquiry) => (
                  <tr 
                    key={enquiry.id} 
                    className="hover:bg-white/5 transition-colors cursor-pointer group"
                    onClick={() => setSelectedEnquiry(enquiry)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{enquiry.name}</div>
                      <div className="text-xs text-metallic mt-0.5">{enquiry.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white">{enquiry.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-bold uppercase tracking-tighter ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-metallic flex items-center gap-1.5">
                        <Clock size={12} />
                        {format(new Date(enquiry.created_at), "MMM d, h:mm a")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={`https://wa.me/${enquiry.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-metallic hover:text-green-500 hover:bg-green-500/10 rounded-md transition-all tooltip"
                          title="Reply via WhatsApp"
                        >
                          <Phone size={16} />
                        </a>
                        <a 
                          href={`mailto:${enquiry.email}?subject=Regarding your enquiry for ${enquiry.service}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 text-metallic hover:text-accent hover:bg-accent/10 rounded-md transition-all"
                          title="Reply via Email"
                        >
                          <Mail size={16} />
                        </a>
                        <button className="p-2 text-metallic hover:text-white group-hover:bg-white/5 rounded-md transition-all">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEnquiries.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-metallic">
                      <MessageSquare size={40} className="mx-auto mb-4 opacity-20" />
                      No enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="relative w-full max-w-2xl bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-widest">Enquiry Details</h2>
                  <p className="text-xs text-metallic">Received on {format(new Date(selectedEnquiry.created_at), "MMMM d, yyyy 'at' h:mm a")}</p>
                </div>
                <button onClick={() => setSelectedEnquiry(null)} className="text-metallic hover:text-white p-2">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-metallic font-bold mb-2 block">Customer Information</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-8 h-8 rounded bg-primary grid place-items-center text-accent"><Users size={16} /></div>
                        <span className="font-bold">{selectedEnquiry.name}</span>
                      </div>
                      <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-3 text-metallic hover:text-accent transition-colors">
                        <div className="w-8 h-8 rounded bg-primary grid place-items-center"><Mail size={16} /></div>
                        <span className="text-sm">{selectedEnquiry.email}</span>
                      </a>
                      <a href={`tel:${selectedEnquiry.phone}`} className="flex items-center gap-3 text-metallic hover:text-accent transition-colors">
                        <div className="w-8 h-8 rounded bg-primary grid place-items-center"><Phone size={16} /></div>
                        <span className="text-sm">{selectedEnquiry.phone}</span>
                      </a>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-metallic font-bold mb-2 block">Enquiry Status</label>
                    <div className="flex flex-wrap gap-2">
                      {["New", "In Progress", "Quoted", "Closed"].map(s => (
                        <button
                          key={s}
                          onClick={() => updateStatus(selectedEnquiry.id, s)}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all ${
                            selectedEnquiry.status === s 
                              ? getStatusColor(s)
                              : "bg-primary/30 border-white/5 text-metallic hover:border-white/20"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-metallic font-bold mb-2 block">Requested Service</label>
                  <div className="p-3 bg-primary/50 border border-white/5 rounded-md text-accent font-bold text-sm">
                    {selectedEnquiry.service}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-metallic font-bold mb-2 block">Project Message</label>
                  <div className="p-4 bg-primary/30 border border-white/5 rounded-lg text-white text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedEnquiry.message}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border-t border-white/5 flex justify-between items-center">
                <button
                  onClick={() => deleteEnquiry(selectedEnquiry.id)}
                  className="flex items-center gap-2 text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <Trash2 size={16} />
                  Delete Enquiry
                </button>
                <div className="flex gap-3">
                  <a 
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-widest hover:bg-green-700"
                  >
                    Reply via WhatsApp
                  </a>
                  <a 
                    href={`mailto:${selectedEnquiry.email}?subject=Regarding your enquiry for ${selectedEnquiry.service}`}
                    className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-widest hover:bg-accent/90"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnquiryManager;
