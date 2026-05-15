import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star, ShieldCheck, Zap } from "lucide-react";
import { SITE } from "@/lib/site";

const Hero = () => (
  <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
    {/* Background image + overlay */}
    <div
      className="absolute inset-0 -z-10 bg-cover bg-center"
      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=2000&q=70)` }}
    />
    <div className="absolute inset-0 -z-10 bg-gradient-hero" />
    {/* Blueprint grid overlay */}
    <div className="absolute inset-0 -z-10 opacity-40 bg-blueprint" />

    {/* Spark accents */}
    <div className="absolute top-1/4 right-[12%] w-2 h-2 bg-accent rounded-full blur-[2px] animate-spark" />
    <div className="absolute top-1/3 right-[20%] w-1 h-1 bg-highlight rounded-full animate-spark" style={{ animationDelay: "0.6s" }} />
    <div className="absolute bottom-1/3 right-[8%] w-1.5 h-1.5 bg-accent rounded-full animate-spark" style={{ animationDelay: "1.2s" }} />

    <div className="container relative pt-20 md:pt-28 pb-20 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-metallic mb-6">
          <Star size={12} className="fill-accent text-accent" />
          5.0 Rated · {SITE.yearsExperience}+ Years in Bengaluru
        </div>

        <h1 className="h-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6">
          Precision Metal Fabrication,{" "}
          <span className="text-accent">Laser Cutting & CNC Bending</span>{" "}
          — Engineered for Industry.
        </h1>

        <p className="text-base md:text-lg text-metallic max-w-2xl leading-relaxed mb-8">
          MAM Industries delivers laser cutting, CNC bending, multi-process welding,
          fabrication and finishing under one roof — built for OEMs, architects,
          contractors and factories that demand tolerance and turnaround.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-md font-semibold text-sm shadow-accentglow hover:bg-accent/90 transition-all"
          >
            Request a Quote
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur text-white px-6 py-3.5 rounded-md font-semibold text-sm hover:bg-white/10 transition-all"
          >
            <Phone size={16} className="text-accent" />
            {SITE.phone}
          </a>
        </div>
      </motion.div>

      {/* Trust metrics */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden backdrop-blur"
      >
        {[
          { v: `${SITE.yearsExperience}+`, l: "Years of expertise" },
          { v: `${SITE.projectsCompleted}+`, l: "Projects delivered" },
          { v: "10+", l: "Industries served" },
          { v: "±0.1mm", l: "Cut tolerance" },
        ].map((m, i) => (
          <div key={i} className="bg-primary/80 backdrop-blur px-5 py-6">
            <div className="font-sora font-bold text-2xl md:text-3xl text-white">{m.v}</div>
            <div className="text-xs text-metallic uppercase tracking-wider mt-1">{m.l}</div>
          </div>
        ))}
      </motion.div>
    </div>

    {/* Bottom feature strip */}
    <div className="relative bg-secondary border-t border-white/5">
      <div className="container py-5 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {[
          { icon: ShieldCheck, t: "ISO-grade processes", d: "Repeatable QC at every stage." },
          { icon: Zap, t: "Fast turnaround", d: "Prototype to production in days." },
          { icon: Star, t: "5.0 customer rating", d: "Trusted by OEMs & architects." },
        ].map(({ icon: Icon, t, d }, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-10 h-10 grid place-items-center bg-accent/15 text-accent rounded-md shrink-0">
              <Icon size={18} />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{t}</div>
              <div className="text-xs text-metallic">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;
