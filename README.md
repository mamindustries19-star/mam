# MAM Industries Platform

**MAM Industries** — Precision Metal Fabrication, Laser Cutting & CNC Bending Command Center.

This repository contains the full source code for the MAM Industries operational platform and public website, built with modern web technologies to ensure a high-performance, real-time industrial experience.

## Platform Features

* **High-Speed Public Frontend:** SEO-optimized marketing site highlighting technical capabilities, equipment capacity, and industrial services.
* **Real-Time Admin Command Center:** A secure, database-driven administrative dashboard for operational oversight.
* **Live CRM (Enquiry Manager):** Captures high-intent project leads directly from the contact forms into a real-time database, enabling instant communication via WhatsApp and Email.
* **Dynamic Content Sync:** Gallery, Services, and Client listings are synchronized directly with the database, allowing instant public-facing updates without code deployments.

## Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS, shadcn-ui, Framer Motion
* **Backend / Database:** Supabase (PostgreSQL, Realtime, Storage)
* **Lead Delivery:** Web3Forms + Supabase DB Storage

## Local Development

To run this project locally, you will need Node.js installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Syxd09/mam.git
   cd mam
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Deployment

This application is configured for seamless deployment on platforms like Vercel or Netlify. 

* **Build Command:** `npm run build`
* **Output Directory:** `dist`

Ensure that your deployment platform is configured with the necessary environment variables (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).

---
*Built for MAM Industries, Bengaluru, Karnataka.*
