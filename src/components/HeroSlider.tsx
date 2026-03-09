import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="section-top" className="relative h-[550px] overflow-hidden">
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

          <div className="relative h-full flex items-center justify-center">
            <div className="text-center md:text-left md:ml-20">
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
    </section>
  );
};

export default HeroSlider;
