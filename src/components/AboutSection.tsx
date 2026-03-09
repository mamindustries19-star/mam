import { motion } from "framer-motion";
import { Star, Heart, Circle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="section-about" className="bg-quiko-grey py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="font-oswald text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Who We Are
          </h4>
          <p className="text-muted-foreground font-opensans text-base md:text-lg max-w-3xl">
            A committed combination of manpower and machine—intellect and potential—dedicated to provide innovative solutions to all things metal.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-foreground/80 font-opensans text-sm md:text-base leading-relaxed">
              Quiko Lasers & Co. (Bangalore) is a pilot project of Sigma Mechotronics Private Limited (Ahmedabad). Sigma has solid grounds since 1999 in the field of manufacturing and servicing of Fiber laser cutting machines, Fiber laser marking machines, Solar cell scribing machines, Micro machines, Diamond laser cutting 4P machines & CNC industrial automation.
            </p>

            {/* YouTube embed */}
            <motion.div
              className="mt-8 aspect-video"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <iframe
                className="w-full h-full rounded"
                src="https://www.youtube.com/embed/kmgNB3xKjKg"
                title="Quiko Lasers Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            {[
              { icon: Star, title: "WHAT WE DO?", desc: "Your vision is our mission. At Quiko, all ideas are welcome." },
              { icon: Heart, title: "WHY PEOPLE LIKE US?", desc: "Reliability. We take pride in our customer service. The trust and belief in our service often leads to recurrent collaborative work." },
              { icon: Circle, title: "WHAT WE OFFER?", desc: "Laser cutting, Laser Marking/Engraving, CNC bending, Welding and Powder Coating—a complete end-to-end solution for metal fabrication." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary flex items-center justify-center rounded">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h5 className="font-oswald text-lg font-semibold text-foreground mb-2">{item.title}</h5>
                  <p className="text-muted-foreground font-opensans text-sm">{item.desc}</p>
                </div>
              </div>
            ))}

            <a
              href="https://quikolasers.com/wp-content/uploads/2019/05/Quiko-Lasers.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-oswald text-sm font-semibold uppercase tracking-widest text-primary-foreground bg-primary px-5 py-3 rounded hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-primary/40 hover:shadow-lg hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-bounce">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Our Brochure
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
