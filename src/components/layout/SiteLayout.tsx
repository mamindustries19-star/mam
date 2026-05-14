import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTA from "./MobileCTA";

const SiteLayout = () => (
  <div className="min-h-screen flex flex-col bg-background text-foreground">
    <Header />
    <main className="flex-1 pt-[72px] md:pt-[112px]">
      <Outlet />
    </main>
    <Footer />
    <MobileCTA />
  </div>
);
export default SiteLayout;
