import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SEO from "@/components/SEO";
import { GALLERY } from "@/lib/site";

const CATS = ["All", "Laser Cutting", "CNC Bending", "Welding", "Fabrication", "Laser Marking", "Finishing"];

const Gallery = () => {
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter(g => g.cat === cat)),
    [cat]
  );

  return (
    <>
      <SEO
        title="Project Gallery — Fabrication, Laser Cutting & CNC Bending Work · MAM Industries"
        description="Browse fabrication, laser cutting, welding and finishing projects delivered by MAM Industries across Bengaluru and South India."
        path="/gallery"
      />

      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="container relative py-20 md:py-24">
          <span className="eyebrow">Our work</span>
          <h1 className="h-display text-4xl md:text-6xl mt-3 text-white max-w-3xl">
            Fabrication, up close. <span className="text-accent">A look inside the floor.</span>
          </h1>
          <p className="text-metallic mt-5 max-w-2xl">
            Selected projects across laser cutting, welding, bending and finishing for OEMs, architects and contractors.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  cat === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-accent hover:text-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((g, i) => (
              <motion.button
                key={`${g.src}-${i}`}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
                className="group relative block w-full mb-4 break-inside-avoid overflow-hidden rounded-md bg-secondary"
              >
                <img src={g.src} alt={g.title} loading="lazy" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-left">
                  <div className="text-[10px] uppercase tracking-wider text-accent font-semibold">{g.cat}</div>
                  <div className="text-white font-sora font-semibold">{g.title}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button onClick={() => setActive(null)} className="absolute top-5 right-5 w-10 h-10 grid place-items-center rounded-full bg-white/10 text-white hover:bg-accent hover:text-accent-foreground transition-colors">
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={filtered[active].src} alt={filtered[active].title} className="w-full h-auto rounded-md max-h-[80vh] object-contain" />
              <div className="text-center mt-4">
                <div className="text-xs uppercase tracking-wider text-accent font-semibold">{filtered[active].cat}</div>
                <div className="text-white font-sora font-semibold text-lg mt-1">{filtered[active].title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
