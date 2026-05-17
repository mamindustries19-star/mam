import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Image, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  MessageSquare,
  Globe,
  Wrench
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/layout/Logo";

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Leads", icon: MessageSquare, href: "/admin/enquiries" },
    { label: "Gallery", icon: Image, href: "/admin/gallery" },
    { label: "Services", icon: Briefcase, href: "/admin/services" },
    { label: "Capabilities", icon: Wrench, href: "/admin/capabilities" },
    { label: "Clients", icon: Users, href: "/admin/clients" },
    { label: "Reviews", icon: MessageSquare, href: "/admin/reviews" },
    { label: "Site Config", icon: Settings, href: "/admin/config" },
  ];

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-secondary border-r border-white/5 sticky top-0 h-screen">
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <Logo className="w-10 h-10" invert />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-widest text-metallic">Control</div>
            <div className="text-xs font-bold text-accent uppercase tracking-widest">Center</div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all group ${
                  isActive 
                    ? "bg-accent text-accent-foreground" 
                    : "text-metallic hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-2 text-metallic hover:text-white transition-colors text-sm"
          >
            <Globe size={16} />
            <span>View Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 bg-secondary border-b border-white/5 z-50 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8" invert />
          <span className="font-bold text-white text-sm uppercase tracking-widest">Admin</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="lg:hidden fixed inset-0 bg-primary z-40 pt-20 p-6 flex flex-col"
          >
            <nav className="space-y-2 flex-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    location.pathname === item.href ? "bg-accent text-accent-foreground" : "text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-bold uppercase tracking-wider">{item.label}</span>
                </Link>
              ))}
            </nav>
            <button onClick={handleLogout} className="flex items-center gap-4 p-4 text-red-400">
              <LogOut size={20} />
              <span className="font-bold uppercase tracking-wider">Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pt-16 lg:pt-0">
        <div className="h-full overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
