import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const STATIC_CLIENTS = [
  { name: "Mahindra Tier-2" },
  { name: "Studio Vyana" },
  { name: "Bengaluru Modular" },
  { name: "Karnataka Steel Co." },
  { name: "Precision OEM" },
  { name: "Vyana Architects" },
  { name: "Indus Fabricators" },
  { name: "Karnataka Power" },
];

const TrustedBy = () => {
  const [clients, setClients] = useState(STATIC_CLIENTS);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase
        .from("clients")
        .select("*")
        .eq("is_visible", true)
        .order("display_order", { ascending: true });
      
      if (data && data.length > 0) {
        setClients(data);
      }
    };
    fetchClients();
  }, []);

  return (
    <section className="py-10 md:py-12 bg-background border-y border-border overflow-hidden">
      <div className="container mb-5">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">
          Trusted by manufacturers, architects & contractors
        </p>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-16 animate-marquee w-max py-4">
          {[...clients, ...clients].map((c: any, i) => (
            <div
              key={i}
              className="flex items-center gap-2 font-sora font-bold text-xl md:text-2xl text-metallic/40 hover:text-accent transition-all whitespace-nowrap tracking-[0.15em] uppercase"
            >
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
