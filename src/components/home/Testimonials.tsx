import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/site";

const Testimonials = () => (
  <section className="py-20 md:py-28 bg-muted/40">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="eyebrow justify-center">Client trust</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary">
          What B2B clients say about <span className="text-accent">working with us.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-card border border-border rounded-lg p-7 relative card-lift"
          >
            <Quote size={28} className="text-accent/30 absolute top-5 right-5" />
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, k) => <Star key={k} size={14} className="fill-accent text-accent" />)}
            </div>
            <blockquote className="text-foreground leading-relaxed mb-5 text-[15px]">
              "{t.quote}"
            </blockquote>
            <figcaption>
              <div className="font-sora font-semibold text-primary">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
