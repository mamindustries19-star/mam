import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredWorks = [
  {
    icon: "/images/icon-sheet-metal.png",
    title: "Sheet Metal Cutting",
    desc: "Powerful RAYCUS laser source can cut a wide range of metal thicknesses from 0.5 mm to 10.0 mm. With an accuracy of ∓0.03 mm/m and nesting provided by our software, low wastage and maximum efficiency is ensured for your project.",
  },
  {
    icon: "/images/icon-pipe-cutting.png",
    title: "Metal Pipe Cutting",
    desc: "With the advantage of metal pipe cutting service at Quiko, think of endless possibilities in your design. The swift laser head, moving at a speed of 60 m/minute, can cut pipes of diameter up to 150 mm.",
  },
  {
    icon: "/images/icon-marking.png",
    title: "Marking & Engraving",
    desc: "The resolution of 0.001 mm of our machine helps create precise markings and patterns from AutoCAD drawings. Add logos, text, photographs on metal and non-metal surfaces with laser marking and engraving.",
  },
];

const alliedWorks = [
  {
    icon: "/images/icon-bending.png",
    title: "CNC Bending",
    desc: "Bend metal sheets up to 12 mm in thickness with our uncompromising machines.",
  },
  {
    icon: "/images/icon-welding.png",
    title: "Welding",
    desc: "Put together your product with finest welding rods with grinding & polishing with quality and branded abrasives.",
  },
  {
    icon: "/images/icon-powder-coating.png",
    title: "Powder Coating",
    desc: "Extensive 7 tank process of powder coating for aesthetic appeal and protection of the metal product.",
  },
];

const ServiceCard = ({
  item,
  index,
}: {
  item: { icon: string; title: string; desc: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="bg-card border border-border p-6 text-center hover:shadow-lg transition-all duration-300 group flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
  >
    <img
      src={item.icon}
      alt={item.title}
      className="w-20 h-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
    />
    <h5 className="font-oswald text-lg font-semibold text-foreground mb-3">
      {item.title}
    </h5>
    <div className="section-separator mx-auto mb-3" />
    <p className="text-muted-foreground font-opensans text-sm leading-relaxed">
      {item.desc}
    </p>
  </motion.div>
);

const ServiceCarousel = ({ 
  items, 
  title, 
  subtitle 
}: { 
  items: typeof featuredWorks; 
  title: string; 
  subtitle: string; 
}) => {
  const autoplayRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      skipSnaps: false,
    },
    [autoplayRef.current]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h4 className="font-oswald text-2xl md:text-3xl font-semibold text-foreground mb-3">
          {title}
        </h4>
        <p className="text-muted-foreground font-opensans max-w-xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {items.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-80 hover:opacity-100 z-10"
          onClick={scrollPrev}
        >
          <ChevronLeft size={20} />
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 opacity-80 hover:opacity-100 z-10"
          onClick={scrollNext}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="section-services" className="py-20">
      <div className="container mx-auto px-6">
        <ServiceCarousel
          items={featuredWorks}
          title="Featured Works"
          subtitle="Best-in-class, high performance fibre optic laser cutting and marking services."
        />
        
        <ServiceCarousel
          items={alliedWorks}
          title="Allied Works"
          subtitle="From raw material to semi-finished and finished products under one roof."
        />
      </div>
    </section>
  );
};

export default ServicesSection;
