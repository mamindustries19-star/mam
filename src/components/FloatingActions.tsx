import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

const FloatingActions = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="hidden md:flex fixed right-5 bottom-6 z-40 flex-col gap-3 items-end">
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative w-12 h-12 grid place-items-center rounded-full bg-highlight text-highlight-foreground shadow-elevate hover:scale-110 transition-transform"
      >
        <span className="absolute inset-0 rounded-full bg-highlight animate-ping opacity-40" />
        <MessageCircle size={20} className="relative" />
      </a>
      <a
        href={SITE.phoneHref}
        aria-label="Call MAM Industries"
        className="w-12 h-12 grid place-items-center rounded-full bg-accent text-accent-foreground shadow-accentglow hover:scale-110 transition-transform"
      >
        <Phone size={18} />
      </a>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`w-12 h-12 grid place-items-center rounded-full bg-primary text-primary-foreground shadow-elevate transition-all ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

export default FloatingActions;
