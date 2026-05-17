import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Trash2, 
  Plus, 
  X, 
  Loader2,
  Star,
  CheckCircle,
  XCircle,
  User,
  Quote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Review {
  id: number;
  customer_name: string;
  company_name: string;
  rating: number;
  content: string;
  is_approved: boolean;
  created_at: string;
}

const ReviewManager = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast.error("Failed to load reviews");
    } else {
      setReviews(data || []);
    }
    setLoading(false);
  };

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const { error } = await supabase.from("reviews").insert([
        {
          customer_name: customerName,
          company_name: companyName,
          rating,
          content,
          is_approved: true
        },
      ]);

      if (error) throw error;

      toast.success("Review added successfully");
      setIsModalOpen(false);
      resetForm();
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || "Failed to add review");
    } finally {
      setProcessing(false);
    }
  };

  const toggleApproval = async (review: Review) => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: !review.is_approved })
      .eq("id", review.id);
    
    if (error) {
      toast.error("Failed to update status");
    } else {
      fetchReviews();
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) toast.error("Delete failed");
    else fetchReviews();
  };

  const resetForm = () => {
    setCustomerName("");
    setCompanyName("");
    setRating(5);
    setContent("");
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Review Management</h1>
          <p className="text-sm text-metallic">Moderate and manage customer testimonials.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-md font-bold text-sm hover:bg-accent/90 transition-all"
        >
          <Plus size={18} />
          Create Review
        </button>
      </header>

      {loading ? (
        <div className="h-64 grid place-items-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              layout
              className={`bg-secondary/50 border border-white/5 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start ${
                !review.is_approved ? "border-yellow-500/20 bg-yellow-500/5" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < review.rating ? "fill-accent text-accent" : "text-white/10"} 
                      />
                    ))}
                  </div>
                  {!review.is_approved && (
                    <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Pending Approval
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-accent">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{review.customer_name}</h3>
                    <p className="text-xs text-metallic">{review.company_name}</p>
                  </div>
                </div>
                <div className="relative">
                  <Quote size={24} className="absolute -left-2 -top-2 opacity-10 text-accent" />
                  <p className="text-sm text-metallic leading-relaxed italic pl-4">
                    {review.content}
                  </p>
                </div>
              </div>

              <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0">
                <button
                  onClick={() => toggleApproval(review)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded text-xs font-bold transition-all ${
                    review.is_approved 
                      ? "bg-white/5 text-metallic hover:bg-white/10" 
                      : "bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/20"
                  }`}
                >
                  {review.is_approved ? <XCircle size={14} /> : <CheckCircle size={14} />}
                  {review.is_approved ? "Unapprove" : "Approve"}
                </button>
                <button 
                  onClick={() => handleDelete(review.id)}
                  className="flex items-center justify-center p-2 text-red-400 hover:bg-red-500/10 rounded transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Modal */}
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
              className="relative w-full max-w-xl bg-secondary border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <h2 className="text-lg font-bold text-white uppercase tracking-widest">
                  Create Testimonial
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-metallic hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="p-6 space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                      Company
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none"
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                    Rating
                  </label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={`flex-1 py-2 rounded border transition-all flex flex-col items-center gap-1 ${
                          rating === num ? "border-accent bg-accent/10 text-accent" : "border-white/10 text-metallic hover:border-white/20"
                        }`}
                      >
                        <span className="text-sm font-bold">{num}</span>
                        <Star size={12} className={rating === num ? "fill-accent" : ""} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-metallic font-bold mb-2 block">
                    Testimonial Text
                  </label>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none resize-none"
                    placeholder="Describe their experience..."
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
                    {processing ? <Loader2 size={20} className="animate-spin" /> : "Publish Review"}
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

export default ReviewManager;
