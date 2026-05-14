import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import { INDUSTRIES } from "@/lib/site";

const Industries = () => (
  <section className="py-20 md:py-28 bg-muted/30">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="eyebrow justify-center">Industries we serve</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary">
          Built for the people who <span className="text-accent">build.</span>
        </h2>
        <p className="text-muted-foreground mt-4">
          Trusted by factories, architects, OEMs and contractors across South India for fabrication that fits into real production schedules.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {INDUSTRIES.map((ind, i) => {
          const Icon = (Lucide as any)[ind.icon] ?? Lucide.Factory;
          return (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group bg-card border border-border rounded-lg p-6 text-center card-lift"
            >
              <div className="w-12 h-12 mx-auto grid place-items-center rounded-md bg-primary text-primary-foreground mb-3 group-hover:bg-accent transition-colors">
                <Icon size={20} />
              </div>
              <div className="font-sora font-semibold text-sm text-primary">{ind.name}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Industries;
