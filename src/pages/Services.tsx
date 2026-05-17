import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Image } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/SEO";
import { SERVICES } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import { getBreadcrumbSchema } from "@/lib/seo";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (data && data.length > 0) {
        setServices(data);
      } else {
        // Map static data to DB schema
        setServices(SERVICES.map((s, i) => ({
          id: i,
          slug: s.slug,
          title: s.title,
          description: s.description,
          image_url: s.image,
          benefits: s.benefits,
          industries: s.industries
        })));
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!loading && services.length > 0) {
      const hash = location.hash;
      if (hash) {
        const targetId = hash.replace("#", "");
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }, 150);
        }
      }
    }
  }, [loading, services, location.hash]);

  return (
    <>
      <SEO
        title="Industrial Fabrication Services — 3kW Laser Cutting, CNC Bending, Welding"
        description="Full-scale metal fabrication services in Bengaluru. Expert 3kW fibre laser cutting, 250T CNC bending, specialized MIG/TIG/Laser welding, and professional powder coating."
        keywords="industrial services bangalore, fibre laser cutting bengaluru, cnc press brake bending, precision welding services, metal enclosures fabrication, industrial powder coating karnataka"
        path="/services"
        jsonLd={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" }
        ])}
      />

      {/* Page header */}
      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="container relative py-20 md:py-28">
          <span className="eyebrow">Our services</span>
          <h1 className="h-display text-4xl md:text-6xl mt-3 text-white max-w-3xl">
            {services.length || 12} industrial processes. <span className="text-accent">One accountable partner.</span>
          </h1>
          <p className="text-metallic mt-5 max-w-2xl">
            A complete metal fabrication line — engineered to handle prototyping, batch production and long-term OEM supply.
          </p>
        </div>
      </section>

      {/* Alternating service rows */}
      <section className="py-16 md:py-24 bg-background bg-blueprint-light min-h-[50vh]">
        <div className="container space-y-20 md:space-y-28">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-accent" />
            </div>
          ) : (
            services.map((s, i) => (
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
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elevate bg-secondary">
                    <img src={s.image_url} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md font-sora font-bold text-lg shadow-elevate">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                <div>
                  <span className="eyebrow">{s.industries?.[0] || "Industrial"} & more</span>
                  <h2 className="h-display text-3xl md:text-4xl mt-3 text-primary mb-4">{s.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.description}</p>

                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    {s.benefits?.map((b: string) => (
                      <div key={b} className="flex items-start gap-2 text-sm text-foreground">
                        <Check size={16} className="text-highlight mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.industries?.map((ind: string) => (
                      <span key={ind} className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-md font-semibold text-sm hover:bg-accent/90 transition-colors">
                      Enquire about {s.title} <ArrowRight size={15} />
                    </Link>
                    <Link 
                      to={`/gallery?filter=${encodeURIComponent(
                        s.title.includes("Fabrication") ? "Fabrication" :
                        s.title.includes("Laser Marking") ? "Laser Marking" :
                        (s.title.includes("Powder Coating") || s.title.includes("Finishing")) ? "Finishing" :
                        s.title.includes("Sheds") ? "Sheds" : s.title
                      )}`} 
                      className="inline-flex items-center gap-2 border border-accent/30 text-accent px-5 py-3 rounded-md font-semibold text-sm hover:bg-accent/10 hover:border-accent transition-colors"
                    >
                      <Image size={15} /> Show Works
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
