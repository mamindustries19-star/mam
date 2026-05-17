// Centralised site data for MAM Industries

export const SITE = {
  name: "MAM Industries",
  tagline: "Precision Metal Fabrication, Laser Cutting & CNC Bending",
  phone: "+91 63811 63159",
  phoneHref: "tel:+916381163159",
  email: "mamindustries19@gmail.com",
  whatsapp: "https://wa.me/916381163159",
  formAccessKey: "634c75d7-4815-40d1-bced-6fa62f7bcc92",
  address: {
    line1: "7th Mile, No. 113, Kanakapura Main Rd",
    line2: "Yelachenahalli, Naidu Layout",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560062",
  },
  hours: "Mon – Sat · 9:00 AM – 8:00 PM",
  rating: 5.0,
  yearsExperience: 7,
  industriesServed: 20,
  projectsCompleted: 1200,
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.155700773836!2d77.5693295!3d12.8944419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15dd1e866443%3A0xd448fcf29c0c3a96!2sMAM+Industries!5e0!3m2!1sen!2sin!4v1715800000000!5m2!1sen!2sin",
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  industries: string[];
  image: string;
};

// Stock industrial imagery (Unsplash CDN, free use)
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const SERVICES: Service[] = [
  {
    slug: "laser-cutting",
    title: "Laser Cutting",
    short: "High-precision 3kW CNC fibre laser cutting for MS, SS, Al and GI.",
    description:
      "Our 3kW CNC fibre laser cutting cells deliver sub-millimetre accuracy on mild steel (up to 16mm), stainless steel (up to 8mm), aluminium (up to 5mm) and GI sheet (up to 4mm). Suited for large bed sizes up to 2m by 4m.",
    benefits: ["Accuracy: ±0.1 mm", "Bed size: 2m x 4m", "MS: 0.8mm – 16mm", "SS: 0.8mm – 8mm", "Al: 0.1mm – 5mm", "GI: 0.8mm – 4mm"],
    industries: ["Automotive", "Architecture", "Electrical Panels", "Industrial Fabrication"],
    image: img("photo-1565793298595-6a879b1d9492"),
  },
  {
    slug: "cnc-bending",
    title: "CNC Bending",
    short: "250-ton press-brake forming with repeatable accuracy.",
    description:
      "250-ton programmable hydraulic press brakes form precise bends on mild steel (up to 8mm) and stainless steel (up to 6mm). Fixed bed length of 2500mm for high-capacity industrial forming.",
    benefits: ["2500 mm fixed length", "Accuracy: ±0.05°", "MS: 0.8mm – 8mm", "SS: 0.8mm – 6mm"],
    industries: ["Enclosures", "Furniture", "HVAC", "Industrial Equipment"],
    image: img("photo-1581092580497-e0d23cbdf1dc"),
  },
  {
    slug: "mig-co2-welding",
    title: "MIG / CO₂ Welding",
    short: "Production-grade MIG & CO₂ welding for structural assemblies.",
    description:
      "Certified MIG and CO₂ shielded welding deliver deep penetration and clean, consistent joins on mild steel and stainless assemblies — from enclosures to load-bearing frames.",
    benefits: ["High productivity", "Deep penetration", "Spatter-controlled", "MS structural capable"],
    industries: ["Construction", "Automotive", "Furniture", "Heavy Equipment"],
    image: img("photo-1530124566582-a618bc2615dc"),
  },
  {
    slug: "tig-welding",
    title: "TIG Welding",
    short: "Architectural-grade TIG welding for stainless steel.",
    description:
      "Precision TIG joining for thin-gauge and visible-seam applications: stainless railings, food-grade equipment and decorative metalwork.",
    benefits: ["Mirror-clean weld lines", "Stainless Steel capable", "Pulsed-current control", "Architectural finish"],
    industries: ["Architecture", "Food & Pharma", "Interiors", "Aerospace Tooling"],
    image: img("photo-1504917595217-d4dc5ebe6122"),
  },

  {
    slug: "arc-spot-welding",
    title: "Arc / Spot Welding",
    short: "Resistance spot and arc welding for sub-assemblies.",
    description:
      "Spot and arc welding for body panels, enclosures and grille assemblies with controlled current for repeatable nugget and join quality.",
    benefits: ["No filler for spot", "Fast cycle time", "Clean appearance", "Repeatable results"],
    industries: ["Automotive", "Appliances", "Enclosures", "Sheet Sub-assemblies"],
    image: img("photo-1567789884554-0b844b597180"),
  },
  {
    slug: "laser-welding",
    title: "Laser Welding",
    short: "Pinpoint laser welding for precision and minimal heat distortion.",
    description:
      "Fibre laser welding produces narrow, deep welds on stainless steel, aluminium and dissimilar metals — ideal for medical, electronics and precision components.",
    benefits: ["Minimal HAZ", "Hairline weld seams", "Dissimilar metal joining", "Automation-ready"],
    industries: ["Medical Devices", "Electronics", "Precision Tooling", "Battery Packs"],
    image: img("photo-1518770660439-4636190af475"),
  },
  {
    slug: "fabrication",
    title: "Fabrication Works",
    short: "Turnkey fabrication — from drawing to finished assembly.",
    description:
      "End-to-end metal fabrication: design support, cutting, forming, welding, finishing and assembly. Built around your drawings, BOM and tolerance specs.",
    benefits: ["Drawing to delivery", "In-house finishing", "QC at every stage", "Volume scalability"],
    industries: ["OEMs", "Contractors", "Architects", "Interior Companies"],
    image: img("photo-1581094794329-c8112a89af12"),
  },
  {
    slug: "laser-marking",
    title: "Laser Marking & Engraving",
    short: "Permanent laser marking for traceability and branding.",
    description:
      "High-resolution laser marking and deep engraving on metal, plastic and anodised surfaces. Perfect for serial numbers, QR codes, logos and compliance markings.",
    benefits: ["Permanent, abrasion-proof", "Sub-pixel resolution", "Batch serialisation", "QR & datamatrix capable"],
    industries: ["Industrial Equipment", "Tooling", "Promotional", "Traceability"],
    image: img("photo-1607400201515-c2c41c07d307"),
  },
  {
    slug: "powder-coating",
    title: "Powder Coating & Finishing",
    short: "Allied powder coating, painting and surface-finishing partnerships.",
    description:
      "Coordinated powder coating, hot-dip galvanising, electroplating and brushed finishes through trusted finishing partners — delivered as part of your fabrication package.",
    benefits: ["RAL colour matching", "Salt-spray tested", "Multi-finish options", "Single-vendor delivery"],
    industries: ["Architecture", "Outdoor Equipment", "Furniture", "Industrial Goods"],
    image: img("photo-1504307651254-35680f356dfd"),
  },
  {
    slug: "rolling-shutters",
    title: "Rolling Shutters",
    short: "Heavy-duty manual and motorized rolling shutters.",
    description:
      "Precision-engineered rolling shutters for industrial warehouses, commercial storefronts, and secure facilities. We offer manual gear-operated systems and fully automated motorized units with high-tensile galvanised or powder-coated slats for maximum security and durability.",
    benefits: ["Auto-motorization", "Heavy-duty security", "Weather-proof seals", "Low maintenance"],
    industries: ["Warehousing", "Retail Stores", "Factory Units", "Logistics Centers"],
    image: "/images/rolling-shutter.png",
  },
  {
    slug: "gates-grills",
    title: "Gates & Grills",
    short: "Custom architectural and industrial security gates.",
    description:
      "Expert fabrication of industrial main gates, security grills, and structural railings. Combining architectural aesthetics with industrial-grade strength, our gates are built using heavy-duty MS/SS sections with precision welding and anti-corrosive finishing for long-term outdoor exposure.",
    benefits: ["Custom aesthetics", "Structural rigidity", "Smooth automation ready", "Anti-rust coating"],
    industries: ["Residential Estates", "Industrial Hubs", "Public Infrastructure", "Commercial Tech Parks"],
    image: "/images/industrial-gate.png",
  },
  {
    slug: "industrial-sheds",
    title: "Industrial Sheds & PEB",
    short: "Turnkey industrial sheds and PEB structures.",
    description:
      "Comprehensive design-to-installation services for industrial sheds, warehouses, and Pre-Engineered Building (PEB) structures. We fabricate high-span roof trusses, purlins, and specialized cladding systems engineered for extreme weather resistance and rapid site assembly.",
    benefits: ["High-span capacity", "Rapid site deployment", "Seismic resistance", "Optimal ventilation"],
    industries: ["Manufacturing Plants", "Agriculture Storage", "Workshops", "E-commerce Hubs"],
    image: "/images/industrial-shed.png",
  },
];

export const INDUSTRIES = [
  { name: "Automotive", icon: "Car" },
  { name: "Architecture", icon: "Building2" },
  { name: "Construction", icon: "HardHat" },
  { name: "Interior Design", icon: "LampDesk" },
  { name: "Industrial Fabrication", icon: "Factory" },
  { name: "Logistics", icon: "Truck" },
  { name: "Infrastructure", icon: "Construction" },
  { name: "Electrical Panels", icon: "Zap" },
  { name: "Aerospace Tooling", icon: "Plane" },
  { name: "Food & Pharma", icon: "FlaskConical" },
  { name: "Renewable Energy", icon: "Sun" },
  { name: "Heavy Machinery", icon: "Settings2" },
];

export const CAPABILITIES = [
  { label: "CNC Fibre Lasers", value: "3 kW" },
  { label: "Press Brake Capacity", value: "2500 mm / 250 T" },
  { label: "Sheet Thickness", value: "0.1 – 16 mm" },
  { label: "Materials", value: "MS · SS · Al · GI" },
  { label: "Accuracy", value: "±0.1 mm" },
  { label: "Monthly Output", value: "120+ tons" },
];

export const PROCESS = [
  { step: "01", title: "Consult & Quote", body: "Share drawings or samples — we review feasibility, materials and turnaround." },
  { step: "02", title: "Design & DFM", body: "Our team optimises files for nesting, tolerances and downstream forming." },
  { step: "03", title: "Cut, Form, Assemble, Weld", body: "Production runs through laser, press brake and welding cells with QC checkpoints." },
  { step: "04", title: "Finish & Deliver", body: "Powder coat, marking and packaging — delivered to your site or assembly line." },
];

export const TESTIMONIALS = [
  {
    name: "Rohit Menon",
    role: "Production Manager · Mahindra Tier-2 Supplier",
    quote: "MAM has been our go-to fabricator for three years. Tolerances are tight, deliveries are on schedule, and their team handles design queries themselves.",
  },
  {
    name: "Anita Reddy",
    role: "Principal Architect · Studio Vyana",
    quote: "Architectural-grade TIG welding done right. The stainless railings they delivered for our hospitality project were flawless.",
  },
  {
    name: "Karthik N.",
    role: "Founder · Bengaluru Modular Interiors",
    quote: "From CAD to finished powder-coated assemblies under one roof. MAM has saved us weeks of vendor coordination.",
  },
];

export const GALLERY: { src: string; cat: string; title: string }[] = [
  { cat: "Laser Cutting", title: "Custom MS panel run", src: img("photo-1565793298595-6a879b1d9492", 900) },
  { cat: "Fabrication", title: "Industrial enclosure", src: img("photo-1581094794329-c8112a89af12", 900) },
  { cat: "MIG / CO2 Welding", title: "Structural frame weld", src: img("photo-1530124566582-a618bc2615dc", 900) },
  { cat: "Gates & Grills", title: "Industrial security gate", src: "/images/industrial-gate.png" },
  { cat: "TIG Welding", title: "Stainless TIG seams", src: img("photo-1504917595217-d4dc5ebe6122", 900) },
  { cat: "Laser Marking", title: "Serialised components", src: img("photo-1607400201515-c2c41c07d307", 900) },
  { cat: "Laser Welding", title: "Precision weld line", src: img("photo-1504307651254-35680f356dfd", 900) },
  { cat: "CNC Bending", title: "Multi-bend bracket", src: img("photo-1581092580497-e0d23cbdf1dc", 900) },
  { cat: "Finishing", title: "Powder coated frames", src: img("photo-1567789884554-0b844b597180", 900) },
  { cat: "Rolling Shutters", title: "Industrial warehouse shutter", src: "/images/rolling-shutter.png" },
  { cat: "Arc / Spot Welding", title: "Production weld cell", src: img("photo-1565793298595-6a879b1d9492", 900) },
  { cat: "Sheds", title: "Industrial shed fabrication", src: "/images/industrial-shed.png" },
];
