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
      <div className={`fixed top-0 left-0 right-0 z-[60] bg-background transition-all duration-300 ${scrolled ? "hidden" : ""}`}>
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
              { icon: "pinterest", href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Youtube, href: "https://www.youtube.com/channel/UCubxpA9rLZeYtjupEfpfMtA" },
              { icon: Instagram, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                {Icon === "pinterest" ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                ) : (
                  <Icon size={14} />
                )}
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
