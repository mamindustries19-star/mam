import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Settings, 
  Save, 
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Info,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ConfigItem {
  key: string;
  value: string;
}

const ConfigManager = () => {
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_config")
      .select("key, value");
    
    if (error) {
      toast.error("Failed to load settings");
    } else {
      const configMap = (data || []).reduce((acc, curr) => ({
        ...acc,
        [curr.key]: curr.value
      }), {});
      setConfig(configMap);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updates = Object.entries(config).map(([key, value]) => ({
        key,
        value
      }));

      const { error } = await supabase
        .from("site_config")
        .upsert(updates, { onConflict: 'key' });

      if (error) throw error;
      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="h-screen grid place-items-center bg-primary">
        <Loader2 className="w-10 h-10 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-sora font-bold text-white">Site Configuration</h1>
          <p className="text-sm text-metallic">Global settings for the public website.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-accent text-accent-foreground px-6 py-2.5 rounded-md font-bold text-sm hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save All Changes
        </button>
      </header>

      <form onSubmit={handleSave} className="space-y-8 pb-20">
        {/* Hero Section */}
        <section className="bg-secondary/50 border border-white/5 rounded-xl p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-6 flex items-center gap-2">
            <Globe size={14} />
            Hero Section
          </h2>
          <div className="space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold mb-2 block">
                Headline (Hero Title)
              </label>
              <textarea
                value={config.hero_title || ""}
                onChange={(e) => handleChange("hero_title", e.target.value)}
                rows={2}
                className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none resize-none font-sora text-lg font-bold"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold mb-2 block">
                Sub-headline
              </label>
              <textarea
                value={config.hero_subtitle || ""}
                onChange={(e) => handleChange("hero_subtitle", e.target.value)}
                rows={3}
                className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none resize-none text-sm leading-relaxed"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-secondary/50 border border-white/5 rounded-xl p-6">
          <h2 className="text-xs uppercase tracking-[0.2em] text-accent font-bold mb-6 flex items-center gap-2">
            <Info size={14} />
            Business Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold mb-2 flex items-center gap-2">
                <Mail size={12} /> Contact Email
              </label>
              <input
                type="email"
                value={config.contact_email || ""}
                onChange={(e) => handleChange("contact_email", e.target.value)}
                className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold mb-2 flex items-center gap-2">
                <Phone size={12} /> Contact Phone
              </label>
              <input
                type="text"
                value={config.contact_phone || ""}
                onChange={(e) => handleChange("contact_phone", e.target.value)}
                className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold mb-2 flex items-center gap-2">
                <MapPin size={12} /> Office Address
              </label>
              <input
                type="text"
                value={config.contact_address || ""}
                onChange={(e) => handleChange("contact_address", e.target.value)}
                className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none text-sm"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-metallic font-semibold mb-2 flex items-center gap-2">
                <Clock size={12} /> Business Hours
              </label>
              <input
                type="text"
                value={config.business_hours || ""}
                onChange={(e) => handleChange("business_hours", e.target.value)}
                className="w-full bg-primary border border-white/10 rounded-md p-3 text-white focus:border-accent outline-none text-sm"
              />
            </div>
          </div>
        </section>

        <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg flex gap-3 items-start">
          <Info className="text-accent shrink-0 mt-0.5" size={18} />
          <p className="text-xs text-accent leading-relaxed">
            <strong>Note:</strong> Changes made here will instantly update the public website's hero section, footer, and contact pages. Ensure all details are verified before saving.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ConfigManager;
