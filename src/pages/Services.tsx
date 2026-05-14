import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { SERVICES } from "@/lib/site";

const Services = () => (
  <>
    <SEO
      title="Industrial Services — Laser Cutting, Bending, Welding · MAM Industries"
      description="Explore MAM Industries' full B2B service line: laser cutting, CNC bending, MIG/TIG/CO2/laser welding, fabrication, marking and powder coating in Bengaluru."
      path="/services"
    />

    {/* Page header */}
    <section className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint opacity-40" />
      <div className="container relative py-20 md:py-28">
        <span className="eyebrow">Our services</span>
        <h1 className="h-display text-4xl md:text-6xl mt-3 text-white max-w-3xl">
          Ten industrial processes. <span className="text-accent">One accountable partner.</span>
        </h1>
        <p className="text-metallic mt-5 max-w-2xl">
          A complete metal fabrication line — engineered to handle prototyping, batch production and long-term OEM supply.
        </p>
      </div>
    </section>

    {/* Alternating service rows */}
    <section className="py-16 md:py-24 bg-background bg-blueprint-light">
      <div className="container space-y-20 md:space-y-28">
        {SERVICES.map((s, i) => (
          <motion.article
            key={s.slug}
            id={s.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
          >
            <div className="relative">
              <div className="absolute -top-3 -left-3 w-20 h-20 stripe-accent opacity-70 -z-10" />
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elevate">
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-sora font-bold text-lg shadow-elevate">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>

            <div>
              <span className="eyebrow">{s.industries[0]} & more</span>
              <h2 className="h-display text-3xl md:text-4xl mt-3 text-primary mb-4">{s.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.description}</p>

              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {s.benefits.map(b => (
                  <div key={b} className="flex items-start gap-2 text-sm text-foreground">
                    <Check size={16} className="text-highlight mt-0.5 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {s.industries.map(ind => (
                  <span key={ind} className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-medium">
                    {ind}
                  </span>
                ))}
              </div>

              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-md font-semibold text-sm hover:bg-accent/90 transition-colors">
                Enquire about {s.title} <ArrowRight size={15} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  </>
);

export default Services;
