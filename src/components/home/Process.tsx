import { motion } from "framer-motion";
import { PROCESS } from "@/lib/site";

const Process = () => (
  <section className="py-20 md:py-28 bg-secondary text-secondary-foreground relative overflow-hidden">
    <div className="absolute inset-0 bg-blueprint opacity-30" />
    <div className="container relative">
      <div className="max-w-2xl mb-14">
        <span className="eyebrow">How we work</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-white">
          A predictable process for <span className="text-accent">unpredictable jobs.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
        {PROCESS.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-secondary p-7 relative group"
          >
            <div className="font-sora font-bold text-5xl text-accent/30 group-hover:text-accent/50 transition-colors mb-3">{p.step}</div>
            <h3 className="font-sora font-semibold text-lg text-white mb-2">{p.title}</h3>
            <p className="text-sm text-metallic leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
