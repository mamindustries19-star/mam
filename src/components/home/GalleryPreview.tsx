import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/site";

const GalleryPreview = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <span className="eyebrow">Recent work</span>
          <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary">
            Selected projects from our <span className="text-accent">shop floor.</span>
          </h2>
        </div>
        <Link to="/gallery" className="inline-flex items-center gap-2 text-sm font-semibold text-accent">
          View full gallery <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {GALLERY.slice(0, 12).map((g, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
            className={`relative overflow-hidden rounded-md group bg-secondary ${
              i === 0 || i === 7 ? "col-span-2 row-span-2 aspect-square" : i === 10 || i === 11 ? "col-span-2 aspect-[2/1]" : "aspect-square"
            }`}
          >
            <img src={g.src} alt={g.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <div className="text-[10px] uppercase tracking-wider text-accent font-semibold">{g.cat}</div>
              <div className="text-white font-sora font-semibold text-sm">{g.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GalleryPreview;
