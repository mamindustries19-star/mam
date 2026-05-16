import { motion } from "framer-motion";

const SECTIONS = [
  {
    eyebrow: "Laser Cutting",
    title: "3kW CNC Fibre Laser Machine",
    desc: "Our 3kW CNC fibre laser cutting cells deliver sub-millimetre accuracy on mild steel (up to 16mm), stainless steel (up to 8mm), aluminium (up to 5mm) and GI sheet (up to 4mm). Suited for large bed sizes up to 2m by 4m.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1000&q=75",
    stats: [
      { label: "Power", value: "3 kW" },
      { label: "Bed Size", value: "2m x 4m" },
      { label: "Accuracy", value: "±0.1 mm" },
      { label: "Materials", value: "MS · SS · Al · GI" },
    ],
    badge: "3kW Fibre"
  },
  {
    eyebrow: "Metal Bending",
    title: "250-Ton CNC Bending Machine",
    desc: "250-ton programmable hydraulic press brakes form precise bends on mild steel (up to 8mm) and stainless steel (up to 6mm). Fixed bed length of 2500mm for high-capacity industrial forming.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=75",
    stats: [
      { label: "Capacity", value: "250 Tons" },
      { label: "Length", value: "2500 mm" },
      { label: "Accuracy", value: "±0.05°" },
      { label: "Max MS", value: "8 mm" },
    ],
    badge: "250T Press"
  },
  {
    eyebrow: "Laser Welding",
    title: "High-Precision Laser Welding",
    desc: "Fibre laser welding produces narrow, deep welds on stainless steel, aluminium and dissimilar metals with minimal heat distortion — ideal for medical, electronics and precision components.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=75",
    stats: [
      { label: "Precision", value: "Pinpoint" },
      { label: "Distortion", value: "Minimal" },
      { label: "Materials", value: "SS · Al · MS" },
      { label: "Strength", value: "Structural" },
    ],
    badge: "Fiber Laser"
  }
];

const Capabilities = () => (
  <section className="bg-background">
    {SECTIONS.map((section, idx) => (
      <div key={idx} className="py-16 md:py-24">
        <div className="container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`relative ${idx % 2 === 1 ? "lg:order-2" : ""}`}
          >
            <div className={`absolute -top-3 ${idx % 2 === 0 ? "-left-3" : "-right-3"} w-24 h-24 stripe-accent opacity-80 -z-10`} />
            <div className="aspect-[4/3] md:aspect-[16/10] rounded-lg overflow-hidden shadow-elevate">
              <img
                src={section.image}
                alt={section.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className={`absolute -bottom-5 ${idx % 2 === 0 ? "-right-5" : "-left-5"} bg-primary text-primary-foreground px-5 py-4 rounded-md shadow-elevate hidden md:block text-center min-w-[120px]`}>
              <div className="font-sora font-bold text-lg text-accent uppercase tracking-tighter">{section.badge}</div>
            </div>
          </motion.div>

          <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
            <span className="eyebrow">{section.eyebrow}</span>
            <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary mb-5">
              {section.title.split(section.eyebrow).join("")} <span className="text-accent">{section.eyebrow}</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {section.desc}
            </p>

            <div className="grid grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
              {section.stats.map((c, i) => (
                <div key={i} className="bg-card p-5">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{c.label}</div>
                  <div className="font-sora font-bold text-base md:text-lg text-primary">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default Capabilities;
