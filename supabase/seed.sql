-- Seed Admin User for MAM Industries CMS
-- This script creates the initial administrative user in the Supabase Auth system.

-- 1. Create the user in auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'syxdmatheen.9@gmail.com',
  extensions.crypt('#7619365978.Mh', extensions.gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  now(),
  now(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'syxdmatheen.9@gmail.com'
);

-- 2. Link the user to the 'email' identity provider
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid(),
  id,
  format('{"sub":"%s","email":"%s"}', id, email)::jsonb,
  'email',
  id::text, -- provider_id is the user ID for email provider
  now(),
  now(),
  now()
FROM auth.users
WHERE email = 'syxdmatheen.9@gmail.com'
ON CONFLICT DO NOTHING;
