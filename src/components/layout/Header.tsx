import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import Logo from "./Logo";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top utility bar */}
      <div className={`hidden md:block bg-primary text-primary-foreground transition-all duration-300 ${scrolled ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100"}`}>
        <div className="container h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-metallic"><MapPin size={13} className="text-accent" /> Bengaluru, Karnataka</span>
            <a href={SITE.phoneHref} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Phone size={13} className="text-accent" /> {SITE.phone}</a>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors"><Mail size={13} className="text-accent" /> {SITE.email}</a>
          </div>
          <div className="flex items-center gap-3 text-metallic">
            <span className="text-accent">★ 5.0</span>
            <span>Google Rated</span>
            <span className="text-metallic/50">|</span>
            <span>{SITE.hours}</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`backdrop-blur-md border-b transition-all duration-300 ${scrolled ? "bg-background/95 border-border shadow-sm" : "bg-background/80 border-transparent"}`}>
        <div className="container flex items-center justify-between h-[72px]">
          <Link to="/" className="group flex items-center gap-3">
            <Logo className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_2px_8px_hsl(var(--accent)/0.25)]" />
            <div className="leading-tight hidden sm:block border-l border-border pl-3">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Precision</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-accent font-semibold">Fabrication</div>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium tracking-wide rounded-md transition-colors ${
                      isActive ? "text-accent" : "text-foreground hover:text-accent"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a href={SITE.phoneHref} className="text-sm font-medium text-foreground hover:text-accent transition-colors">{SITE.phone}</a>
            <Link to="/contact" className="bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold rounded-md hover:bg-accent/90 transition-colors shadow-accentglow">
              Get a Quote
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border bg-background animate-fade-in">
            <ul className="container py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/"}
                    className={({ isActive }) =>
                      `block py-3 px-2 text-sm font-medium border-b border-border/50 ${
                        isActive ? "text-accent" : "text-foreground"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-3 flex gap-2">
                <a href={SITE.phoneHref} className="flex-1 text-center py-3 border border-border rounded-md text-sm font-medium">Call</a>
                <Link to="/contact" className="flex-1 text-center py-3 bg-accent text-accent-foreground rounded-md text-sm font-semibold">Get Quote</Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
