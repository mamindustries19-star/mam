import { useEffect, useState } from "react";
import { Quote, Star, ArrowRight, X, Loader2, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Testimonials = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });
    
    if (data) {
      setReviews(data);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newReview, setNewReview] = useState({ name: "", company: "", content: "", rating: 5 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("reviews").insert([
        {
          customer_name: newReview.name,
          company_name: newReview.company,
          content: newReview.content,
          rating: newReview.rating,
          is_approved: true // Set to true for instant reflection
        }
      ]);

      if (error) throw error;

      toast.success("Review submitted! Thank you for your feedback.");
      setIsFormOpen(false);
      setNewReview({ name: "", company: "", content: "", rating: 5 });
      fetchReviews();
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-primary bg-blueprint relative overflow-hidden">
      {/* Decorative radial glow for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Client trust</span>
            </div>
            <h2 className="h-display text-4xl md:text-6xl text-white">
              What B2B clients say about <br />
              <span className="text-accent">working with us.</span>
            </h2>
          </div>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-white/5 border border-white/10 hover:border-accent/40 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:bg-accent/10 flex items-center gap-2.5 group"
          >
            <MessageSquare size={18} className="text-accent" />
            Leave Feedback
          </button>
        </div>
      </div>

      <div className="relative z-10">
        {/* Stronger edge fades for better focus */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-primary via-primary/80 to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-primary via-primary/80 to-transparent z-20" />

        <div className="flex gap-8 animate-marquee-slow w-max py-4 hover:[animation-play-state:paused]">
          {[...reviews, ...reviews].map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              className="w-[380px] md:w-[450px] bg-secondary/30 backdrop-blur-md border border-white/10 rounded-3xl p-10 relative group transition-all duration-500 hover:border-accent/40 hover:bg-secondary/40 flex-shrink-0"
            >
              <Quote size={40} className="text-accent/10 absolute top-8 right-10 group-hover:text-accent/20 transition-colors" />
              
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star 
                    key={k} 
                    size={18} 
                    className={k < (t.rating || 5) ? "fill-accent text-accent" : "text-white/5"} 
                  />
                ))}
              </div>

              <blockquote className="text-white/90 leading-relaxed mb-10 text-lg md:text-xl font-medium italic">
                "{t.content}"
              </blockquote>

              <figcaption className="flex items-center gap-5 border-t border-white/5 pt-8">
                <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center font-bold text-accent text-lg shadow-inner uppercase">
                  {t.customer_name?.[0]}
                </div>
                <div>
                  <div className="font-sora font-bold text-white text-lg tracking-tight">{t.customer_name}</div>
                  <div className="text-[10px] font-black text-accent uppercase tracking-[0.25em]">{t.company_name}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Review Submission Modal - Industrial Premium Redesign */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-primary/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-xl bg-secondary border border-white/10 rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden z-10"
            >
              {/* Technical Header with Blueprint Pattern */}
              <div className="relative p-8 border-b border-white/5 bg-primary overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-blueprint-light pointer-events-none" />
                <div className="relative flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-1">Feedback Console</h2>
                    <p className="text-[10px] text-metallic uppercase tracking-widest font-medium">Precision Manufacturing Review System</p>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(false)} 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-metallic hover:text-white hover:bg-white/10 transition-all border border-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Identity Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-metallic">Contact Name</label>
                      <div className="h-px w-8 bg-white/10" />
                    </div>
                    <input
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full bg-primary/40 border border-white/5 rounded-lg p-4 text-white text-sm focus:border-accent/50 focus:bg-primary/60 outline-none transition-all placeholder:text-white/20 font-medium"
                      placeholder="e.g. Rajesh Kumar"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-metallic">Organization</label>
                      <div className="h-px w-8 bg-white/10" />
                    </div>
                    <input
                      required
                      value={newReview.company}
                      onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                      className="w-full bg-primary/40 border border-white/5 rounded-lg p-4 text-white text-sm focus:border-accent/50 focus:bg-primary/60 outline-none transition-all placeholder:text-white/20 font-medium"
                      placeholder="e.g. Precision Tooling Ltd"
                    />
                  </div>
                </div>

                {/* Rating & Performance */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-metallic">Performance Rating</label>
                    <div className="h-px flex-grow bg-white/10" />
                  </div>
                  <div className="flex gap-3 bg-primary/30 p-3 rounded-xl border border-white/5 w-fit">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="group relative transition-all active:scale-90"
                      >
                        <Star 
                          size={24} 
                          className={`transition-all duration-300 ${
                            star <= newReview.rating 
                              ? "fill-accent text-accent drop-shadow-[0_0_8px_rgba(14,165,233,0.4)]" 
                              : "text-white/10 group-hover:text-white/30"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-metallic">Review Narrative</label>
                    <div className="h-px w-8 bg-white/10" />
                  </div>
                  <textarea
                    required
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    className="w-full bg-primary/40 border border-white/5 rounded-lg p-4 text-white text-sm focus:border-accent/50 focus:bg-primary/60 outline-none transition-all resize-none placeholder:text-white/20 leading-relaxed font-medium"
                    placeholder="Describe the quality, tolerance, and turnaround time..."
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full relative group overflow-hidden bg-accent text-white font-bold py-5 rounded-lg transition-all disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="relative flex items-center justify-center gap-3 tracking-[0.25em] uppercase text-[11px]">
                    {submitting ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      "Publish"
                    )}
                  </div>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
