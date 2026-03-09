import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cog, Star, Users, Hourglass } from "lucide-react";

const slides = [
  {
    image: "/images/slider-1.jpeg",
    lines: ["A RELIABLE", "METAL FABRICATION FACILITATOR"],
  },
  {
    image: "/images/slider-2.jpg",
    lines: ["SHAPING YOUR IDEAS"],
  },
];

const features = [
  { icon: Cog, title: "TECH-SAVVY" },
  { icon: Star, title: "QUALITY" },
  { icon: Users, title: "COMPETITIVE" },
  { icon: Hourglass, title: "JUST-IN-TIME" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="section-top" className="relative h-[700px] md:h-[750px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[current].image})`,
              filter: "sepia(0.3) saturate(0.7)",
            }}
          />
          <div className="absolute inset-0 bg-quiko-dark/40" />

          {/* Hero text - positioned in upper-middle area */}
          <div className="relative h-full flex items-start pt-[180px] md:pt-[200px]">
            <div className="container mx-auto px-6 md:px-12">
              {slides[current].lines.map((line, i) => (
                <motion.h1
                  key={line}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.5, duration: 0.8, ease: "easeOut" }}
                  className="font-oswald text-3xl md:text-5xl lg:text-6xl font-bold text-primary tracking-wide"
                >
                  {line}
                </motion.h1>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feature boxes overlapping bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="feature-overlay-box bg-quiko-dark/60 backdrop-blur-sm border-r border-secondary/20 last:border-r-0 py-8 px-4 text-center flex flex-col items-center justify-center"
              >
                <feature.icon className="w-12 h-12 md:w-16 md:h-16 text-secondary-foreground mb-3" strokeWidth={1.2} />
                <div className="section-separator mx-auto mb-3" />
                <h5 className="font-oswald text-sm md:text-base font-semibold text-secondary-foreground tracking-wider">
                  {feature.title}
                </h5>

                <div className="overlay-content text-center">
                  <feature.icon className="w-10 h-10 text-primary-foreground mb-3 mx-auto" strokeWidth={1.2} />
                  <h5 className="font-oswald text-sm md:text-base font-semibold text-primary-foreground mb-2">
                    {feature.title}
                  </h5>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
