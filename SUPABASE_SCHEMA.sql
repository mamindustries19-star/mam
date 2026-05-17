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
```
