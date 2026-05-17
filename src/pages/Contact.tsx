import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { SITE, SERVICES } from "@/lib/site";
import { toast } from "@/hooks/use-toast";

import { getBreadcrumbSchema } from "@/lib/seo";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  service: z.string().trim().min(1, "Select a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const Contact = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get("service");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Custom Dropdown State
  const [selectedService, setSelectedService] = useState(preSelectedService || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    // Ensure the custom service is included
    data.service = selectedService;
    
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    
    setErrors({});
    setSubmitting(true);

    try {
      // 1. Save to Supabase (Real-time Lead Tracking)
      const { error: dbError } = await supabase.from("enquiries").insert([
        {
          name: parsed.data.name,
          email: parsed.data.email,
          phone: parsed.data.phone,
          service: parsed.data.service,
          message: parsed.data.message,
          status: 'New'
        }
      ]);

      if (dbError) {
        console.error("Database error:", dbError);
        // We continue anyway so the email still sends
      }

      // 2. Send via Web3Forms (Email Notification)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: SITE.formAccessKey,
          ...data,
          subject: `New Enquiry: ${data.service} from ${data.name}`,
          from_name: "MAM Industries Website",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({ 
          title: "Enquiry Sent Successfully!", 
          description: "We've received your details and will get back to you shortly." 
        });
        (e.target as HTMLFormElement).reset();
        setSelectedService("");
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({ 
        variant: "destructive",
        title: "Submission Error", 
        description: "We couldn't send the email. Please use the WhatsApp button below for a direct enquiry." 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    const form = (e.currentTarget.closest("form") as HTMLFormElement);
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    data.service = selectedService;
    
    if (!data.name || !data.phone || !data.message) {
      toast({ title: "Please fill the form", description: "Fill in your details to generate a WhatsApp message." });
      return;
    }

    const message = `Hello MAM Industries, I'm ${data.name}.%0A%0A*Project Enquiry:*%0A- *Service:* ${data.service || 'General Enquiry'}%0A- *Phone:* ${data.phone}%0A- *Email:* ${data.email}%0A- *Details:* ${data.message}`;
    window.open(`${SITE.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <>
      <SEO
        title="Get a Quote — Contact MAM Industries Bengaluru"
        description="Contact MAM Industries for precise laser cutting, CNC bending, and fabrication enquiries in Bengaluru. Send your drawings for a technical review and quote within 24h."
        keywords="contact laser cutting bangalore, get fabrication quote bengaluru, industrial enquiry karnataka, sheet metal job work price, mam industries contact, fabrication factory address"
        path="/contact"
        jsonLd={getBreadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" }
        ])}
      />

      <section className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="container relative py-20 md:py-24">
          <span className="eyebrow">Get in touch</span>
          <h1 className="h-display text-4xl md:text-6xl mt-3 text-white max-w-3xl">
            Tell us about your <span className="text-accent">next project.</span>
          </h1>
          <p className="text-metallic mt-5 max-w-2xl">
            Share your requirement and our team will follow up with feasibility, material options and lead times — within one business day.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container grid lg:grid-cols-12 gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-card border border-border rounded-lg p-6 md:p-9 shadow-sm"
          >
            <h2 className="font-sora font-bold text-2xl text-primary mb-1">Send an enquiry</h2>
            <p className="text-sm text-muted-foreground mb-6">Fields marked with * are required.</p>

            <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "name", label: "Full name *", type: "text", placeholder: "Your name" },
                { name: "email", label: "Email *", type: "email", placeholder: "you@company.com" },
                { name: "phone", label: "Phone *", type: "tel", placeholder: "+91" },
              ].map(f => (
                <div key={f.name}>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{f.label}</label>
                  <input
                    name={f.name} type={f.type} placeholder={f.placeholder} maxLength={120}
                    className="mt-1.5 w-full bg-background border border-border rounded-md px-4 py-3 text-base focus:outline-none focus:border-accent transition-all placeholder:text-muted-foreground/50 font-medium md:text-sm"
                  />
                  {errors[f.name] && <p className="text-[10px] text-destructive mt-1 font-bold uppercase tracking-wider">{errors[f.name]}</p>}
                </div>
              ))}

              <div className="relative" ref={dropdownRef}>
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Service *</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`mt-1.5 w-full flex items-center justify-between bg-background border rounded-md px-4 py-3 text-sm transition-all text-left ${isDropdownOpen ? "border-accent ring-1 ring-accent" : "border-border"}`}
                >
                  <span className={selectedService ? "text-primary font-medium" : "text-muted-foreground/50 font-medium"}>
                    {selectedService || "Select a service"}
                  </span>
                  <ChevronDown size={16} className={`text-muted-foreground transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-20 top-full left-0 right-0 mt-2 bg-background border border-border rounded-lg shadow-xl overflow-hidden max-h-64 overflow-y-auto"
                    >
                      <div className="p-1">
                        {SERVICES.map((s) => (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() => {
                              setSelectedService(s.title);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors ${selectedService === s.title ? "bg-accent text-white" : "hover:bg-accent/10 text-primary"}`}
                          >
                            {s.title}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedService("Other / Multiple");
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors ${selectedService === "Other / Multiple" ? "bg-accent text-white" : "hover:bg-accent/10 text-primary"}`}
                        >
                          Other / Multiple
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {errors.service && <p className="text-[10px] text-destructive mt-1 font-bold uppercase tracking-wider">{errors.service}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Project details *</label>
                <textarea
                  name="message" rows={5} maxLength={1000}
                  placeholder="Tell us about your job — material, quantity, drawings, timeline."
                  className="mt-1.5 w-full bg-background border border-border rounded-md px-4 py-3 text-base focus:outline-none focus:border-accent transition-all placeholder:text-muted-foreground/50 font-medium resize-none md:text-sm"
                />
                {errors.message && <p className="text-[10px] text-destructive mt-1 font-bold uppercase tracking-wider">{errors.message}</p>}
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-md font-bold text-xs uppercase tracking-widest shadow-accentglow hover:bg-accent/90 transition-all disabled:opacity-60"
                >
                  {submitting ? "Sending..." : <>Send enquiry <Send size={14} /></>}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2 bg-highlight text-highlight-foreground px-8 py-3.5 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-highlight/90 transition-all"
                >
                  <MessageCircle size={15} /> Chat on WhatsApp
                </button>
              </div>
            </form>
          </motion.div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-4">
            {[
              { Icon: MapPin, label: "Visit us", value: `${SITE.address.line1}, ${SITE.address.line2}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.pincode}` },
              { Icon: Phone, label: "Call us", value: SITE.phone, href: SITE.phoneHref },
              { Icon: Mail, label: "Email us", value: SITE.email, href: `mailto:${SITE.email}` },
              { Icon: Clock, label: "Working hours", value: SITE.hours },
            ].map(({ Icon, label, value, href }, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 flex gap-4 card-lift">
                <div className="w-12 h-12 grid place-items-center rounded-md bg-primary text-accent shrink-0 border border-white/5 shadow-inner">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1">{label}</div>
                  {href ? (
                    <a href={href} className="font-sora font-bold text-primary hover:text-accent transition-colors block text-sm">{value}</a>
                  ) : (
                    <div className="font-sora font-bold text-primary text-sm leading-relaxed">{value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-lg overflow-hidden border border-border h-72">
              <iframe
                title="MAM Industries location"
                src={SITE.mapEmbed}
                width="100%" height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
