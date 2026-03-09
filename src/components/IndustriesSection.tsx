import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const industries = [
  { icon: "/images/icon-spm.png", title: "Special Purpose Machine", desc: "Invention meets execution" },
  { icon: "/images/icon-fabrication.png", title: "Fabrication", desc: "For all things metal" },
  { icon: "/images/icon-telecom.png", title: "Telecommunication", desc: "Stay ahead in the age of tech boom" },
  { icon: "/images/icon-construction.png", title: "Construction", desc: "Ideate, assemble and build sustainable structures of the future" },
  { icon: "/images/icon-railway.png", title: "Railway", desc: "Faster, safer, better journeys designed in metal" },
  { icon: "/images/icon-aerospace.png", title: "Aerospace", desc: "Give flight to your ideas" },
  { icon: "/images/icon-agriculture.png", title: "Agriculture", desc: "Supporting the hands that feed" },
  { icon: "/images/icon-heavy-earth.png", title: "Heavy Earth Movers", desc: "Reliable fabrication, low wastage for heavy-duty work" },
  { icon: "/images/icon-power-plant.png", title: "Power Plant", desc: "Taking the load off manufacturing for greater power" },
  { icon: "/images/icon-automobile.png", title: "Automobile", desc: "Race to finish" },
  { icon: "/images/icon-pharmaceutical.png", title: "Pharmaceutical", desc: "Technology for saving and betterment of lives" },
];

const IndustriesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener("scroll", checkScroll);
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 400;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section id="section-clients" className="bg-quiko-grey py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h4 className="font-oswald text-2xl md:text-3xl font-semibold text-foreground mb-3">
            Industries We Cater
          </h4>
          <p className="text-muted-foreground font-opensans max-w-2xl mx-auto">
            When the industries' need and our expertise collide, application of metal fabrication is limitless. We understand the demands of each industry and strive to offer the best service.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-quiko-dark/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-quiko-dark/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {industries.map((ind, index) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="industry-card flex-shrink-0 w-[200px] md:w-[280px] bg-card border border-border p-4 md:p-8 text-center"
              >
                <img
                  src={ind.icon}
                  alt={ind.title}
                  className="w-16 h-16 mx-auto mb-4"
                />
                <h5 className="font-oswald text-base font-semibold text-foreground mb-2 capitalize">
                  {ind.title}
                </h5>
                <p className="text-muted-foreground font-opensans text-xs">
                  {ind.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
