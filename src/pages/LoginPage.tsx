import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, AlertCircle } from "lucide-react";
import Logo from "@/components/layout/Logo";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-secondary/80 backdrop-blur-xl border border-white/10 p-8 rounded-lg shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <Logo className="w-16 h-16 mb-4" invert />
          <h1 className="text-xl font-sora font-bold text-white uppercase tracking-widest">
            Admin Access
          </h1>
          <p className="text-sm text-metallic mt-1">Industrial Control System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-metallic mb-2 font-semibold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-primary/50 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@mamindustries.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-metallic mb-2 font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-accent/50 w-4 h-4" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary/50 border border-white/10 rounded-md py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-md text-sm"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-accent-foreground font-bold py-3 rounded-md hover:bg-accent/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] text-metallic uppercase tracking-tighter">
          <span>Secure AES-256</span>
          <span>© 2026 MAM Industries</span>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
