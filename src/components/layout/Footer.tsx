import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Instagram, Youtube, Star } from "lucide-react";
import { NAV, SERVICES, SITE } from "@/lib/site";
import { supabase } from "@/lib/supabase";
import Logo from "./Logo";

const Footer = () => {
  const [config, setConfig] = useState<any>({
    contact_email: SITE.email,
    contact_phone: SITE.phone,
    contact_address: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city} – ${SITE.address.pincode}`,
    business_hours: SITE.hours
  });
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchConfigAndServices = async () => {
      // Fetch Config
      const { data: configData } = await supabase.from("site_config").select("key, value");
      if (configData) {
        const configMap = configData.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {});
        setConfig((prev: any) => ({ ...prev, ...configMap }));
      }

      // Fetch Services
      const { data: serviceData } = await supabase
        .from("services")
        .select("title, slug")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (serviceData && serviceData.length > 0) {
        setServices(serviceData);
      } else {
        setServices(SERVICES.map(s => ({ title: s.title, slug: s.slug })));
      }
    };
    fetchConfigAndServices();
  }, []);

  return (
    <footer className="bg-blueprint text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 stripe-accent" />
      <div className="container py-16 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <Logo className="w-16 h-16" invert />
            <div className="leading-tight border-l border-white/15 pl-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-metallic">Precision</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold">Fabrication</div>
            </div>
          </div>
          <p className="text-sm text-metallic leading-relaxed mb-5">
            Bengaluru-based metal fabrication and laser cutting partner trusted by OEMs, architects and contractors across Karnataka.
          </p>
          <div className="inline-flex items-center gap-2 bg-secondary/80 border border-white/10 rounded-md px-3 py-2 text-sm">
            <Star size={15} className="fill-accent text-accent" />
            <span className="font-semibold">5.0</span>
            <span className="text-metallic">on Google Reviews</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Company</h4>
          <ul className="space-y-2.5 text-sm text-metallic">
            {NAV.map(n => (
              <li key={n.href}><Link to={n.href} className="hover:text-accent transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Services</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-y-2.5 gap-x-4 text-sm text-metallic">
            {services.map(s => (
              <li key={s.slug}><Link to="/services" className="hover:text-accent transition-colors">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white">Reach Us</h4>
          <ul className="space-y-3 text-sm text-metallic">
            <li className="flex gap-2.5">
              <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
              <span>{config.contact_address}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="text-accent shrink-0 mt-0.5" />
              <a href={`tel:${config.contact_phone}`} className="hover:text-accent">{config.contact_phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="text-accent shrink-0 mt-0.5" />
              <a href={`mailto:${config.contact_email}`} className="hover:text-accent">{config.contact_email}</a>
            </li>
            <li className="flex gap-2.5">
              <Clock size={16} className="text-accent shrink-0 mt-0.5" />
              <span>{config.business_hours}</span>
            </li>
          </ul>
          <div className="flex gap-2 mt-5">
            {[Facebook, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="w-9 h-9 grid place-items-center border border-white/10 rounded-md text-metallic hover:text-accent hover:border-accent transition-colors">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-metallic">
          <div>© {new Date().getFullYear()} MAM Industries. All rights reserved.</div>
          <div>Crafted for manufacturing excellence in Bengaluru, Karnataka.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
