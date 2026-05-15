const CLIENTS = [
  "Mahindra Tier-2", "Studio Vyana", "Bengaluru Modular", "Karnataka Steel Co.",
  "Precision OEM", "Vyana Architects", "Indus Fabricators", "Karnataka Power",
  "Velocity Auto", "Skyline Interiors",
];

const TrustedBy = () => (
  <section className="py-10 md:py-12 bg-background border-y border-border overflow-hidden">
    <div className="container mb-5">
      <p className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground font-semibold">
        Trusted by manufacturers, architects & contractors
      </p>
    </div>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-12 animate-marquee w-max">
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <div
            key={i}
            className="font-sora font-semibold text-lg md:text-xl text-muted-foreground/70 hover:text-primary transition-colors whitespace-nowrap tracking-wide"
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustedBy;
