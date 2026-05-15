import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "What is the typical turnaround for a fabrication job?",
    a: "Prototypes are usually delivered in 3–7 working days. Batch and production runs depend on volume and finishing requirements — most jobs ship within 2–3 weeks of drawing approval.",
  },
  {
    q: "Do you handle small batch and prototype work?",
    a: "Yes. We routinely run prototypes, single-off pieces and short batches alongside high-volume production. Our nesting software keeps small jobs cost-efficient.",
  },
  {
    q: "Which materials and thicknesses can you cut?",
    a: "Mild steel, stainless steel, aluminium, galvanised and copper sheets — from 0.5 mm up to 20 mm on our fibre laser cells.",
  },
  {
    q: "Can you deliver across Karnataka and India?",
    a: "Yes. We deliver across Bengaluru and Karnataka by road, and ship pan-India via trusted logistics partners. Site delivery and installation can be arranged.",
  },
  {
    q: "Do you provide design and DFM support?",
    a: "Absolutely. Send your sketches, samples or CAD files — our team reviews feasibility, optimises for nesting and forming, and returns DFM feedback before quoting.",
  },
  {
    q: "Is finishing (powder coating, plating) included?",
    a: "Yes, through trusted finishing partners we manage end-to-end. You get a single point of contact and one consolidated invoice for the full fabrication package.",
  },
];

const FAQ = () => (
  <section className="py-20 md:py-28 bg-background bg-blueprint-light">
    <div className="container grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <span className="eyebrow">Got questions?</span>
        <h2 className="h-display text-3xl md:text-5xl mt-3 text-primary">
          Answers <span className="text-accent">before you ask.</span>
        </h2>
        <p className="text-muted-foreground mt-4">
          Common questions from OEMs, architects and contractors evaluating MAM Industries as a fabrication partner.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle size={16} className="text-accent" />
          Don't see yours? Just call us.
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-8"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-lg px-5 data-[state=open]:border-accent/50 data-[state=open]:shadow-sm transition-all"
            >
              <AccordionTrigger className="text-left font-sora font-semibold text-primary hover:text-accent hover:no-underline py-5">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQ;
