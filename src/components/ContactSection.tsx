import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ContactSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section id="section-contact" className="bg-quiko-dark py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-oswald text-xl font-bold text-secondary-foreground mb-8 tracking-wider uppercase">
                Connect
              </h4>

              <div className="space-y-4 text-sm font-opensans">
                <p className="text-secondary-foreground/70">
                  <span className="font-semibold text-secondary-foreground">Office:</span> #23 C/A, J.C Industrial Layout, 3rd Main, 1st Stage, Yelachenahalli, Kanakapura Road, Bangalore – 560062
                </p>
                <p className="text-secondary-foreground/70">
                  <span className="font-semibold text-secondary-foreground">Mail:</span>{" "}
                  <a href="mailto:info@quikolasers.com" className="hover:text-primary transition-colors">info@quikolasers.com</a>
                </p>
                <p className="text-secondary-foreground/70">
                  <span className="font-semibold text-secondary-foreground">Phone:</span> +91-8095544429 / 9620199838
                </p>
                <div className="pt-2">
                  <p className="font-semibold text-secondary-foreground italic">Business hours:</p>
                  <p className="text-secondary-foreground/70">Monday-Saturday : 9am to 7pm</p>
                  <p className="text-secondary-foreground/70">Sunday : Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Google Map */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full h-[300px] md:h-full min-h-[300px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8068!2d77.5716!3d12.8916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15000c66e0a3%3A0x9e5d2c5c5f5c5c5c!2sQuiko%20Lasers%20%26%20Co!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded"
                title="Quiko Lasers Location"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-quiko-dark border-t border-secondary/30 py-8">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <p className="font-opensans text-xs text-secondary-foreground/50 uppercase tracking-wider">
            © Copyright {new Date().getFullYear()}. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </footer>
    </>
  );
};

export default ContactSection;
