import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://erdhizpgzmlbeebnkufq.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_publishable_k2t_HDwggYyZt3UIaeBDsA_nx67LP6E';

const supabase = createClient(supabaseUrl, supabaseKey);

const GALLERY_ITEMS = [
  { title: "Main Industrial Shed", category: "Sheds", image_url: "/images/industrial-shed.png" },
  { title: "Custom Sliding Gate", category: "Gates & Grills", image_url: "/images/industrial-gate.png" },
  { title: "Automatic Rolling Shutter", category: "Rolling Shutters", image_url: "/images/rolling-shutter.png" },
  { title: "Precision Laser Cutting", category: "Laser Cutting", image_url: "/images/slider-1.jpeg" },
  { title: "Heavy Duty Fabrication", category: "Fabrication", image_url: "/images/slider-2.jpg" },
];

const SERVICES_ITEMS = [
  { slug: "laser-cutting", title: "Laser Cutting", image_url: "/images/icon-sheet-metal.png", industries: ["Automotive", "Aerospace"], benefits: ["High Precision", "Fast Turnaround"] },
  { slug: "cnc-bending", title: "CNC Bending", image_url: "/images/icon-bending.png", industries: ["Construction", "Electronics"], benefits: ["Accurate Angles", "Complex Shapes"] },
  { slug: "welding", title: "Industrial Welding", image_url: "/images/icon-welding.png", industries: ["Heavy Machinery", "Infrastructure"], benefits: ["Structural Integrity", "Certified Quality"] },
];

async function seed() {
  console.log('Starting Database Repair...');

  // 1. Seed Gallery
  console.log('Seeding Gallery...');
  const { error: gErr } = await supabase.from('gallery').upsert(
    GALLERY_ITEMS.map((item, i) => ({ ...item, display_order: i })),
    { onConflict: 'image_url' }
  );
  if (gErr) console.error('Gallery Seed Error:', gErr);

  // 2. Seed Services
  console.log('Seeding Services...');
  const { error: sErr } = await supabase.from('services').upsert(
    SERVICES_ITEMS.map((item, i) => ({ ...item, display_order: i })),
    { onConflict: 'slug' }
  );
  if (sErr) console.error('Services Seed Error:', sErr);

  console.log('Repair Complete. Please run the Asset Migration tool in the dashboard once more to move these to the cloud.');
}

seed();
