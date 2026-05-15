// Centralised site data for MAM Industries

export const SITE = {
  name: "MAM Industries",
  tagline: "Precision Metal Fabrication, Laser Cutting & CNC Bending",
  phone: "+91 63811 63159",
  phoneHref: "tel:+916381163159",
  email: "muthu@gmail.com",
  whatsapp: "https://wa.me/916381163159",
  address: {
    line1: "7th Mile, No. 113, Kanakapura Main Rd",
    line2: "Yelachenahalli, Naidu Layout",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560062",
  },
  hours: "Mon – Sat · 9:00 AM – 7:00 PM",
  rating: 5.0,
  yearsExperience: 15,
  projectsCompleted: 1200,
  mapEmbed: "https://www.google.com/maps?q=7th+Mile+Kanakapura+Main+Rd+Yelachenahalli+Bengaluru+560062&output=embed",
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
const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

export const SERVICES: Service[] = [
  {
    slug: "laser-cutting",
    title: "Laser Cutting",
    short: "High-precision CNC laser cutting for sheet metal, MS, SS and aluminium.",
    description:
      "Our fibre and CO₂ laser cutting cells deliver sub-millimetre tolerance on mild steel, stainless steel, aluminium and galvanised sheet up to industrial production volumes. Ideal for prototyping through batch manufacturing.",
    benefits: ["±0.1 mm tolerance", "Sheets up to 20 mm thickness", "Clean, burr-free edges", "Nesting-optimised yield"],
    industries: ["Automotive", "Architecture", "Electrical Panels", "OEM Components"],
    image: img("photo-1565793298595-6a879b1d9492"),
  },
  {
    slug: "cnc-bending",
    title: "CNC Bending",
    short: "Press-brake forming with repeatable accuracy for complex profiles.",
    description:
      "Programmable hydraulic press brakes form precise bends on sheet and plate stock. Capacity for long parts, multi-stage forming and tight inner radii using a wide tooling library.",
    benefits: ["Up to 3 m bed length", "Repeat accuracy ±0.05°", "Custom tooling library", "First-article inspection"],
    industries: ["Enclosures", "Furniture", "HVAC", "Industrial Equipment"],
    image: img("photo-1581092580497-e0d23cbdf1dc"),
  },
  {
    slug: "mig-welding",
    title: "MIG Welding",
    short: "Production-grade MIG welding for structural and sheet assemblies.",
    description:
      "Certified MIG welders execute clean, consistent joins on mild steel and stainless assemblies — from light enclosures to load-bearing frames.",
    benefits: ["Certified welders", "High deposition rate", "Spatter-controlled finishes", "Jig-based repeatability"],
    industries: ["Construction", "Automotive", "Furniture", "Heavy Equipment"],
    image: img("photo-1530124566582-a618bc2615dc"),
  },
  {
    slug: "tig-welding",
    title: "TIG Welding",
    short: "Architectural-grade TIG welding for stainless and aluminium.",
    description:
      "TIG joining for thin-gauge and visible-seam applications: stainless railings, food-grade equipment, aluminium frames and decorative metalwork.",
    benefits: ["Mirror-clean weld lines", "SS, Al, Cu capable", "Pulsed-current control", "Architectural finish"],
    industries: ["Architecture", "Food & Pharma", "Interiors", "Aerospace Tooling"],
    image: img("photo-1504917595217-d4dc5ebe6122"),
  },
  {
    slug: "co2-welding",
    title: "CO₂ Welding",
    short: "Fast, cost-effective semi-automatic welding for high volumes.",
    description:
      "CO₂ shielded welding suited to thick mild steel sections, structural fabrication and high-throughput batch work.",
    benefits: ["High productivity", "Deep penetration", "Cost-efficient consumables", "Suited to MS structures"],
    industries: ["Structural Steel", "Heavy Fabrication", "Trailers & Bodies", "Machinery"],
    image: img("photo-1565008447742-97f6f38c985c"),
  },
  {
    slug: "spark-welding",
    title: "Spark / Spot Welding",
    short: "Resistance spot welding for sheet-metal sub-assemblies.",
    description:
      "Spot welding for body panels, enclosures and grille assemblies with controlled current and electrode pressure for repeatable nugget quality.",
    benefits: ["No filler material", "Fast cycle time", "Clean appearance", "Repeatable nuggets"],
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
];

export const INDUSTRIES = [
  { name: "Automotive", icon: "Car" },
  { name: "Architecture", icon: "Building2" },
  { name: "Construction", icon: "HardHat" },
  { name: "Interior Design", icon: "LampDesk" },
  { name: "OEM Manufacturing", icon: "Factory" },
  { name: "Electrical Panels", icon: "Zap" },
  { name: "Aerospace Tooling", icon: "Plane" },
  { name: "Food & Pharma", icon: "FlaskConical" },
];

export const CAPABILITIES = [
  { label: "CNC Fibre Lasers", value: "4 kW – 6 kW" },
  { label: "Press Brake Capacity", value: "3 m / 160 T" },
  { label: "Sheet Thickness", value: "0.5 – 20 mm" },
  { label: "Materials", value: "MS · SS · Al · GI · Cu" },
  { label: "Tolerance", value: "±0.1 mm" },
  { label: "Monthly Output", value: "120+ tons" },
];

export const PROCESS = [
  { step: "01", title: "Consult & Quote", body: "Share drawings or samples — we review feasibility, materials and turnaround." },
  { step: "02", title: "Design & DFM", body: "Our team optimises files for nesting, tolerances and downstream forming." },
  { step: "03", title: "Cut, Form, Weld", body: "Production runs through laser, press brake and welding cells with QC checkpoints." },
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
  { cat: "Welding", title: "Structural frame weld", src: img("photo-1530124566582-a618bc2615dc", 900) },
  { cat: "CNC Bending", title: "Multi-bend bracket", src: img("photo-1581092580497-e0d23cbdf1dc", 900) },
  { cat: "Laser Marking", title: "Serialised components", src: img("photo-1607400201515-c2c41c07d307", 900) },
  { cat: "Welding", title: "Stainless TIG seams", src: img("photo-1504917595217-d4dc5ebe6122", 900) },
  { cat: "Fabrication", title: "Architectural railing", src: img("photo-1518770660439-4636190af475", 900) },
  { cat: "Laser Cutting", title: "Decorative SS screen", src: img("photo-1565008447742-97f6f38c985c", 900) },
  { cat: "Finishing", title: "Powder coated frames", src: img("photo-1504307651254-35680f356dfd", 900) },
  { cat: "Fabrication", title: "Heavy MS sub-assembly", src: img("photo-1567789884554-0b844b597180", 900) },
  { cat: "Welding", title: "Production weld cell", src: img("photo-1573164574572-cb89e39749b4", 900) },
  { cat: "Laser Cutting", title: "Aluminium prototype", src: img("photo-1485827404703-89b55fcc595e", 900) },
];
