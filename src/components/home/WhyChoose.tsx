import { motion } from "framer-motion";
import { Target, Award, Truck, Cog, Users, ShieldCheck } from "lucide-react";

const items = [
  { icon: Target, t: "Accuracy", d: "Sub-millimetre accuracy on every part. Inspection at every checkpoint." },
  { icon: Cog, t: "Modern Machinery", d: "CNC fibre lasers, hydraulic press brakes and automated welding cells." },
  { icon: Users, t: "Certified Workforce", d: "Skilled welders and operators with 10+ years on the shop floor." },
  { icon: Truck, t: "On-time Delivery", d: "Production schedules built around your assembly line, not ours." },
  { icon: Award, t: "Quality Assured", d: "First-article inspection, dimensional reports and traceable batches." },
  { icon: ShieldCheck, t: "Trusted B2B Partner", d: "Long-term supply contracts with OEMs, contractors and architects." },
];

const WhyChoose = () => (
  <section className="py-20 md:py-28 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 bg-blueprint opacity-40" />
    <div className="container relative">
      <div className="max-w-2xl mb-14">
        <span className="eyebrow">Why Us</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-white">
          Built for the realities of <span className="text-accent">Indian manufacturing.</span>
        </h2>
        <p className="text-metallic mt-4 max-w-xl">
          Industrial buyers don't choose vendors twice. We've earned long-term partnerships by being measurably better at the things that matter on a shop floor.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
        {items.map(({ icon: Icon, t, d }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
            className="bg-secondary p-7 group hover:bg-secondary/70 transition-colors"
          >
            <div className="w-11 h-11 grid place-items-center rounded-md bg-accent/15 text-accent mb-5 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Icon size={20} />
            </div>
            <h3 className="font-sora font-semibold text-lg text-white mb-1.5">{t}</h3>
            <p className="text-sm text-metallic leading-relaxed">{d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
