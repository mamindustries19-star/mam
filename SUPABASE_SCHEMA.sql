# Database Schema for MAM Industries CMS

Run the following SQL in your Supabase SQL Editor to set up the necessary tables and security policies.

```sql
-- 1. SITE CONFIGURATION (Hero, Contact, Hours)
CREATE TABLE site_config (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO site_config (key, value) VALUES
('hero_title', 'Precision Metal Fabrication, Laser Cutting & CNC Bending'),
('hero_subtitle', 'Heavy-duty industrial fabrication solutions for Bengaluru''s leading manufacturers.'),
('business_hours', 'Mon – Sat · 9:00 AM – 8:00 PM'),
('contact_email', 'syxdmatheen.9@gmail.com'),
('contact_phone', '+91 76193 65978'),
('contact_address', '7th Mile, No. 113, Kanakapura Main Rd, Bengaluru, Karnataka 560062');

-- 2. SERVICES
CREATE TABLE services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT,
  description TEXT,
  image_url TEXT,
  benefits TEXT[], -- Array of strings
  industries TEXT[], -- Array of strings
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. GALLERY
CREATE TABLE gallery (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TRUSTED CLIENTS / LOGOS
CREATE TABLE clients (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  logo_url TEXT,
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. REVIEWS
CREATE TABLE reviews (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_name TEXT NOT NULL,
  company_name TEXT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  profile_image_url TEXT,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Allow public read-only access to site_config" ON site_config FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to services" ON services FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read-only access to gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Allow public read-only access to clients" ON clients FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read-only access to reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert access to reviews" ON reviews FOR INSERT WITH CHECK (true);

-- ADMIN AUTH POLICIES (Requires authentication)
-- Site Config
CREATE POLICY "Allow authenticated users to manage site_config" ON site_config 
FOR ALL USING (auth.role() = 'authenticated');

-- Services
CREATE POLICY "Allow authenticated users to manage services" ON services 
FOR ALL USING (auth.role() = 'authenticated');

-- Gallery
CREATE POLICY "Allow authenticated users to manage gallery" ON gallery 
FOR ALL USING (auth.role() = 'authenticated');

-- Clients
CREATE POLICY "Allow authenticated users to manage clients" ON clients 
FOR ALL USING (auth.role() = 'authenticated');

-- Reviews
CREATE POLICY "Allow authenticated users to manage reviews" ON reviews 
FOR ALL USING (auth.role() = 'authenticated');

-- 6. STORAGE BUCKETS
-- Note: You must manually create these buckets in the Supabase UI:
-- - 'gallery-images'
-- - 'client-logos'
-- - 'service-images'
-- Set them to PUBLIC if you want direct URL access.

-- Enable RLS on storage.objects (usually enabled by default in newer Supabase projects)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Gallery Images Policies
CREATE POLICY "Public Read Access for Gallery" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Admin Insert for Gallery" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update for Gallery" ON storage.objects FOR UPDATE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete for Gallery" ON storage.objects FOR DELETE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

-- Client Logos Policies
CREATE POLICY "Public Read Access for Clients" ON storage.objects FOR SELECT USING (bucket_id = 'client-logos');
CREATE POLICY "Admin Insert for Clients" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'client-logos' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update for Clients" ON storage.objects FOR UPDATE USING (bucket_id = 'client-logos' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete for Clients" ON storage.objects FOR DELETE USING (bucket_id = 'client-logos' AND auth.role() = 'authenticated');

-- Service Images Policies
CREATE POLICY "Public Read Access for Services" ON storage.objects FOR SELECT USING (bucket_id = 'service-images');
CREATE POLICY "Admin Insert for Services" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'service-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Update for Services" ON storage.objects FOR UPDATE USING (bucket_id = 'service-images' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete for Services" ON storage.objects FOR DELETE USING (bucket_id = 'service-images' AND auth.role() = 'authenticated');

-- 7. SEED ADMIN USER
-- Run this SQL to create the initial admin user.
-- Email: syxdmatheen.9@gmail.com
-- Password: #7619365978.Mh

INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
SELECT '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'syxdmatheen.9@gmail.com', extensions.crypt('#7619365978.Mh', extensions.gen_salt('bf')), now(), now(), now(), '{"provider": "email", "providers": ["email"]}', '{}', now(), now(), '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'syxdmatheen.9@gmail.com');

INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
SELECT gen_random_uuid(), id, format('{"sub":"%s","email":"%s"}', id, email)::jsonb, 'email', id::text, now(), now(), now()
FROM auth.users WHERE email = 'syxdmatheen.9@gmail.com'
ON CONFLICT DO NOTHING;
-- 8. ENQUIRIES (Lead Tracking)
CREATE TABLE enquiries (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New', -- New, In Progress, Quoted, Closed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- PUBLIC INSERT (For the contact form)
CREATE POLICY "Allow public to submit enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- ADMIN ALL (To view and manage)
CREATE POLICY "Allow authenticated users to manage enquiries" ON enquiries 
FOR ALL USING (auth.role() = 'authenticated');

-- 9. CAPABILITIES (Home Page Machine Showcase)
CREATE TABLE capabilities (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  eyebrow TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  stats JSONB NOT NULL, -- Array of stats objects like [{"label": "Power", "value": "3 kW"}]
  badge TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE capabilities ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICY
CREATE POLICY "Allow public read-only access to capabilities" ON capabilities FOR SELECT USING (is_visible = true);

-- ADMIN MANAGING POLICY
CREATE POLICY "Allow authenticated users to manage capabilities" ON capabilities FOR ALL USING (auth.role() = 'authenticated');

-- Seeding initial capabilities
INSERT INTO capabilities (eyebrow, title, description, image_url, stats, badge, display_order, is_visible) VALUES
('Laser Cutting', '3kW CNC Fibre Laser Machine', 'Our 3kW CNC fibre laser cutting cells deliver sub-millimetre accuracy on mild steel (up to 16mm), stainless steel (up to 8mm), aluminium (up to 5mm) and GI sheet (up to 4mm). Suited for large bed sizes up to 2m by 4m.', 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1000&q=75', '[{"label": "Power", "value": "3 kW"}, {"label": "Bed Size", "value": "2m x 4m"}, {"label": "Accuracy", "value": "±0.1 mm"}, {"label": "Materials", "value": "MS · SS · Al · GI"}]'::jsonb, '3kW Fibre', 0, true),
('Metal Bending', '250-Ton CNC Bending Machine', '250-ton programmable hydraulic press brakes form precise bends on mild steel (up to 8mm) and stainless steel (up to 6mm). Fixed bed length of 2500mm for high-capacity industrial forming.', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=75', '[{"label": "Capacity", "value": "250 Tons"}, {"label": "Length", "value": "2500 mm"}, {"label": "Accuracy", "value": "±0.05°"}, {"label": "Max MS", "value": "8 mm"}]'::jsonb, '250T Press', 1, true),
('Laser Welding', 'High-Precision Laser Welding', 'Fibre laser welding produces narrow, deep welds on stainless steel, aluminium and dissimilar metals with minimal heat distortion — ideal for medical, electronics and precision components.', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=75', '[{"label": "Precision", "value": "Pinpoint"}, {"label": "Distortion", "value": "Minimal"}, {"label": "Materials", "value": "SS · Al · MS"}, {"label": "Strength", "value": "Structural"}]'::jsonb, 'Fiber Laser', 2, true);
```
