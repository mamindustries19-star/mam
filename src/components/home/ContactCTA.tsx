import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const ContactCTA = () => (
  <section className="py-20 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0 bg-blueprint opacity-50" />
    <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-accent/15 to-transparent" />
    <div className="container relative grid md:grid-cols-12 gap-8 items-center">
      <div className="md:col-span-8">
        <span className="eyebrow">Start your project</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-white">
          Have a drawing? <span className="text-accent">We'll quote within 24 hours.</span>
        </h2>
        <p className="text-metallic mt-4 max-w-xl">
          Send us your CAD files, sketches or sample requirements. Our team responds with a feasibility review, material breakdown and lead time.
        </p>
      </div>
      <div className="md:col-span-4 flex md:justify-end gap-3 flex-wrap">
        <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3.5 rounded-md font-semibold text-sm shadow-accentglow hover:bg-accent/90 transition-all">
          Get a Quote <ArrowRight size={16} />
        </Link>
        <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3.5 rounded-md font-semibold text-sm hover:bg-white/20 transition-all">
          <Phone size={16} className="text-accent" /> Call
        </a>
      </div>
    </div>
  </section>
);

export default ContactCTA;
