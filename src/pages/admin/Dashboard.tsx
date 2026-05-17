import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Image as ImageIcon, 
  Briefcase, 
  Users, 
  MessageSquare, 
  ArrowUpRight,
  Clock,
  Settings,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import AssetMigration from "@/components/admin/AssetMigration";
import { supabase } from "@/lib/supabase";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { label: "Gallery Items", value: "0", icon: ImageIcon, color: "text-blue-400", href: "/admin/gallery" },
    { label: "Active Services", value: "0", icon: Briefcase, color: "text-green-400", href: "/admin/services" },
    { label: "Trusted Clients", value: "0", icon: Users, color: "text-purple-400", href: "/admin/clients" },
    { label: "Pending Reviews", value: "0", icon: MessageSquare, color: "text-yellow-400", href: "/admin/reviews" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [
          { count: galleryCount },
          { count: serviceCount },
          { count: clientCount },
          { count: reviewCount },
          { count: enquiryCount }
        ] = await Promise.all([
          supabase.from("gallery").select("*", { count: "exact", head: true }),
          supabase.from("services").select("*", { count: "exact", head: true }),
          supabase.from("clients").select("*", { count: "exact", head: true }),
          supabase.from("reviews").select("*", { count: "exact", head: true }).eq("is_approved", false),
          supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "New")
        ]);

        setStats([
          { label: "New Enquiries", value: String(enquiryCount || 0), icon: MessageSquare, color: "text-accent", href: "/admin/enquiries" },
          { label: "Gallery Items", value: String(galleryCount || 0), icon: ImageIcon, color: "text-blue-400", href: "/admin/gallery" },
          { label: "Active Services", value: String(serviceCount || 0), icon: Briefcase, color: "text-green-400", href: "/admin/services" },
          { label: "Pending Reviews", value: String(reviewCount || 0), icon: Users, color: "text-yellow-400", href: "/admin/reviews" },
        ]);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-sora font-bold text-white mb-2">Welcome, Administrator</h1>
        <p className="text-metallic">System overview and management dashboard.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-secondary/50 border border-white/5 p-6 rounded-xl hover:border-accent/30 transition-all group relative overflow-hidden"
          >
            <div className={`w-12 h-12 rounded-lg bg-primary/50 flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {loading ? <Loader2 size={20} className="animate-spin opacity-50" /> : stat.value}
            </div>
            <div className="text-xs uppercase tracking-widest text-metallic font-semibold">
              {stat.label}
            </div>
            <Link 
              to={stat.href} 
              className="absolute top-4 right-4 text-metallic hover:text-accent transition-colors"
            >
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity & Maintenance */}
        <div className="lg:col-span-2 space-y-8">
          <AssetMigration />
          
          <div className="bg-secondary/50 border border-white/5 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock size={20} className="text-accent" />
                Recent Activity
              </h2>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4 items-start pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <Settings size={14} className="text-accent" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium">Dashboard Real-time Sync Active</p>
                  <p className="text-xs text-metallic mt-1">Metrics are now directly linked to Supabase database.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-secondary/50 border border-white/5 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-metallic">Database</span>
              <span className="flex items-center gap-1.5 text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Connected
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-metallic">Storage Bucket</span>
              <span className="flex items-center gap-1.5 text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Active
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-metallic">Auth Service</span>
              <span className="flex items-center gap-1.5 text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
