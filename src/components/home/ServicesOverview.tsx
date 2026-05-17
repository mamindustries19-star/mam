import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import { supabase } from "@/lib/supabase";

const ServicesOverview = () => {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (data && data.length > 0) {
        setServices(data);
      } else {
        // Fallback to static data if DB is empty
        setServices(SERVICES.map(s => ({
          title: s.title,
          short_desc: s.short,
          image_url: s.image,
          slug: s.slug
        })));
      }
    };
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-20 md:py-28 bg-background bg-blueprint-light">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="eyebrow">What we do</span>
            <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary">
              A complete fabrication line, <span className="text-accent">under one roof.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm md:text-base">
            From design support and laser cutting to welding, finishing and assembly — every process is run in-house or through trusted partners we manage end-to-end.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.05 }}
              className="group relative bg-card border border-border rounded-lg overflow-hidden card-lift"
            >
              <div className="aspect-[16/10] overflow-hidden bg-secondary">
                <img
                  src={s.image_url}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-sora font-semibold text-lg text-primary mb-1.5 group-hover:text-accent transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{s.short_desc}</p>
                <Link to={`/services#${s.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold text-accent uppercase tracking-wider link-underline">
                  Explore service <ArrowUpRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
