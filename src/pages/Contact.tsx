import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import SEO from "@/components/SEO";
import { SITE, SERVICES } from "@/lib/site";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  service: z.string().trim().min(1, "Select a service"),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({ title: "Enquiry received", description: "Our team will respond within 24 hours." });
    }, 700);
  };

  return (
    <>
      <SEO
        title="Contact MAM Industries — Bengaluru Fabrication, Laser Cutting & CNC Bending"
        description="Reach MAM Industries in Bengaluru for laser cutting, CNC bending, welding and fabrication enquiries. Get a quote within 24 hours."
        path="/contact"
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
                <div key={f.name} className={f.name === "phone" ? "" : ""}>
                  <label className="text-xs font-medium text-foreground uppercase tracking-wider">{f.label}</label>
                  <input
                    name={f.name} type={f.type} placeholder={f.placeholder} maxLength={120}
                    className="mt-1.5 w-full bg-background border border-input rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                  />
                  {errors[f.name] && <p className="text-xs text-destructive mt-1">{errors[f.name]}</p>}
                </div>
              ))}

              <div>
                <label className="text-xs font-medium text-foreground uppercase tracking-wider">Service *</label>
                <select
                  name="service"
                  defaultValue=""
                  className="mt-1.5 w-full bg-background border border-input rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICES.map(s => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  <option value="Other">Other / multiple</option>
                </select>
                {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-foreground uppercase tracking-wider">Project details *</label>
                <textarea
                  name="message" rows={5} maxLength={1000}
                  placeholder="Tell us about your job — material, quantity, drawings, timeline."
                  className="mt-1.5 w-full bg-background border border-input rounded-md px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition resize-none"
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              <div className="sm:col-span-2 flex flex-wrap gap-3 pt-1">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-md font-semibold text-sm shadow-accentglow hover:bg-accent/90 transition-all disabled:opacity-60"
                >
                  {submitting ? "Sending..." : <>Send enquiry <Send size={15} /></>}
                </button>
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-highlight text-highlight-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-highlight/90 transition-all">
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
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
                <div className="w-11 h-11 grid place-items-center rounded-md bg-primary text-primary-foreground shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
                  {href ? (
                    <a href={href} className="font-sora font-semibold text-primary hover:text-accent transition-colors">{value}</a>
                  ) : (
                    <div className="font-sora font-semibold text-primary">{value}</div>
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
