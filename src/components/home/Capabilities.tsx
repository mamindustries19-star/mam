import { motion } from "framer-motion";
import { CAPABILITIES } from "@/lib/site";

const Capabilities = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="absolute -top-3 -left-3 w-24 h-24 stripe-accent opacity-80 -z-10" />
        <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-elevate">
          <img
            src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1000&q=75"
            alt="MAM Industries fabrication floor"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-5 -right-5 bg-primary text-primary-foreground px-5 py-4 rounded-md shadow-elevate hidden md:block">
          <div className="font-sora font-bold text-3xl text-accent">120+</div>
          <div className="text-xs text-metallic uppercase tracking-wider">Tons / month</div>
        </div>
      </motion.div>

      <div>
        <span className="eyebrow">Capabilities</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary mb-5">
          Industrial machinery, <span className="text-accent">production capacity.</span>
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Our shop floor pairs CNC fibre laser cutting, programmable press brakes and multi-process welding cells with skilled operators — purpose-built for repeatable B2B fabrication runs.
        </p>

        <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card p-5"
            >
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5">{c.label}</div>
              <div className="font-sora font-bold text-lg text-primary">{c.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Capabilities;
