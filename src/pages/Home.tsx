import SEO from "@/components/SEO";
import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChoose from "@/components/home/WhyChoose";
import Industries from "@/components/home/Industries";
import Capabilities from "@/components/home/Capabilities";
import Process from "@/components/home/Process";
import GalleryPreview from "@/components/home/GalleryPreview";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactCTA from "@/components/home/ContactCTA";
import { getLocalBusinessSchema } from "@/lib/seo";

const Home = () => (
  <>
    <SEO
      title="Precision Laser Cutting, CNC Bending & Metal Fabrication in Bengaluru"
      description="MAM Industries: Leading B2B partner for precision 3kW fibre laser cutting, CNC bending, and expert welding in Bengaluru. 7+ years of industrial excellence. Get a quote in 24h."
      keywords="laser cutting bengaluru, cnc bending bangalore, metal fabrication karnataka, industrial laser cutting, sheet metal fabrication, mig tig welding bangalore, mam industries"
      path="/"
      jsonLd={getLocalBusinessSchema()}
    />
    <Hero />
    <TrustedBy />
    <ServicesOverview />
    <WhyChoose />
    <Capabilities />
    <Industries />
    <Process />
    <GalleryPreview />
    <Testimonials />
    <FAQ />
    <ContactCTA />
  </>
);
export default Home;
