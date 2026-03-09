import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  { icon: Cog, title: "TECH-SAVVY", desc: "With the latest and advanced fibre optic laser technologies, we believe in offering the best output for all of our clients' requirements." },
  { icon: Star, title: "QUALITY", desc: "With a team of qualified and experienced personnel, we offer optimum solutions with rigid quality controls at every step." },
  { icon: Users, title: "COMPETITIVE", desc: "With the strong desire to have a long-term and recurring business relationship, we offer the best and competitive quotes." },
  { icon: Hourglass, title: "JUST-IN-TIME", desc: "With our skilled work force, planned manufacturing process and the motivation to get the work done, we serve on-time, every time." },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    setCurrent((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section id="section-top" className="relative h-[450px] md:h-[600px] lg:h-[750px] overflow-hidden group">
      {/* Left arrow */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-quiko-dark/50 border border-secondary/30 flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-70 hover:opacity-100"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-quiko-dark/50 border border-secondary/30 flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors opacity-70 hover:opacity-100"
      >
        <ChevronRight size={18} />
      </button>
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

          {/* Hero text */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 md:px-12">
              {slides[current].lines.map((line, i) => (
                <motion.h1
                  key={line}
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.5, duration: 0.8, ease: "easeOut" }}
                  className="font-oswald text-2xl md:text-5xl lg:text-6xl font-bold text-primary tracking-wide"
                >
                  {line}
                </motion.h1>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>

    {/* Feature boxes below hero */}
    <div className="bg-quiko-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-overlay-box bg-quiko-dark/60 backdrop-blur-sm border-r border-secondary/20 last:border-r-0 py-6 md:py-8 px-3 md:px-4 text-center flex flex-col items-center justify-center"
            >
              <feature.icon className="w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 text-secondary-foreground mb-2 md:mb-3" strokeWidth={1.2} />
              <div className="section-separator mx-auto mb-2 md:mb-3" />
              <h5 className="font-oswald text-xs md:text-sm lg:text-base font-semibold text-secondary-foreground tracking-wider">
                {feature.title}
              </h5>

              <div className="overlay-content text-center">
                <feature.icon className="w-6 h-6 md:w-10 md:h-10 text-primary-foreground mb-2 md:mb-3 mx-auto" strokeWidth={1.2} />
                <h5 className="font-oswald text-xs md:text-sm lg:text-base font-semibold text-primary-foreground mb-1 md:mb-2">
                  {feature.title}
                </h5>
                <p className="text-[10px] md:text-xs text-primary-foreground/80 font-opensans leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroSlider;
