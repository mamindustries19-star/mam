import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const MobileCTA = () => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-border bg-background/95 backdrop-blur">
    <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-foreground border-r border-border">
      <Phone size={16} className="text-accent" /> Call Now
    </a>
    <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-highlight text-highlight-foreground">
      <MessageCircle size={16} /> WhatsApp
    </a>
  </div>
);
export default MobileCTA;
