import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Quiko", href: "/#section-top" },
  { label: "Who", href: "/#section-about" },
  { label: "What", href: "/#section-services" },
  { label: "Where", href: "/#section-clients" },
  { label: "Connect", href: "/associate" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    if (href === "/associate") {
      navigate(href);
      return;
    }
    if (href.includes("#")) {
      const hash = href.split("#")[1];
      if (location.pathname !== "/") {
        navigate("/" + "#" + hash);
      } else {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const activeLabel = location.pathname === "/associate" ? "Connect" : "Quiko";

  return (
    <>
      {/* Top info bar */}
      <div className={`fixed top-0 left-0 right-0 z-[60] bg-background border-b border-border transition-all duration-300 ${scrolled ? "hidden" : ""}`}>
        <div className="container mx-auto px-6 flex items-center justify-between py-2">
          <div className="flex items-center gap-6">
            <a href="tel:+918095544429" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-opensans">
              <Phone size={12} className="text-primary" />
              +91 80955 44429
            </a>
            <a href="mailto:info@quikolasers.com" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-opensans">
              <Mail size={12} className="text-primary" />
              info@quikolasers.com
            </a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Youtube, href: "https://www.youtube.com/channel/UCubxpA9rLZeYtjupEfpfMtA" },
              { icon: Instagram, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "top-0 bg-background shadow-lg py-1"
            : "top-[36px] bg-background py-3"
        }`}
      >
        {/* Yellow hazard stripe when scrolled */}
        {scrolled && (
          <div className="h-[6px] w-full" style={{
            background: "repeating-linear-gradient(-45deg, hsl(48, 100%, 50%), hsl(48, 100%, 50%) 10px, hsl(0, 0%, 13%) 10px, hsl(0, 0%, 13%) 20px)"
          }} />
        )}

        <div className="container mx-auto px-6 flex items-center justify-between py-1">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-2"
          >
            <img
              src="/images/quiko-logo.png"
              alt="Quiko Lasers - Shaping Your Ideas"
              className="h-12 md:h-14 object-contain"
            />
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                  className={`nav-link-animate font-oswald text-sm font-medium uppercase tracking-widest transition-colors ${
                    activeLabel === item.label
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-quiko-dark/95 backdrop-blur-sm">
            <ul className="flex flex-col items-center py-4 gap-4">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                    className={`font-oswald text-sm font-medium uppercase tracking-widest transition-colors ${
                      activeLabel === item.label ? "text-primary" : "text-secondary-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
