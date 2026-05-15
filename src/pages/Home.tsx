import SEO from "@/components/SEO";
import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChoose from "@/components/home/WhyChoose";
import Industries from "@/components/home/Industries";
import Capabilities from "@/components/home/Capabilities";
import Process from "@/components/home/Process";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import ContactCTA from "@/components/home/ContactCTA";

const Home = () => (
  <>
    <SEO
      title="MAM Industries — Laser Cutting, CNC Bending & Metal Fabrication in Bengaluru"
      description="Precision laser cutting, CNC bending, MIG/TIG/CO2/laser welding, fabrication and powder coating in Bengaluru. Trusted by OEMs, architects and contractors."
      path="/"
    />
    <Hero />
    <ServicesOverview />
    <WhyChoose />
    <Capabilities />
    <Industries />
    <Process />
    <GalleryPreview />
    <Testimonials />
    <ContactCTA />
  </>
);
export default Home;
