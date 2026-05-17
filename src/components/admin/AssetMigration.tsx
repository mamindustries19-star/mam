import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database, Loader2, CheckCircle2, AlertTriangle, Play } from "lucide-react";
import { toast } from "sonner";

const ASSETS_TO_MIGRATE = [
  { path: "images/slider-1.jpeg", bucket: "gallery-images", target: "gallery/slider-1.jpeg" },
  { path: "images/slider-2.jpg", bucket: "gallery-images", target: "gallery/slider-2.jpg" },
  { path: "images/industrial-gate.png", bucket: "gallery-images", target: "gallery/industrial-gate.png" },
  { path: "images/industrial-shed.png", bucket: "gallery-images", target: "gallery/industrial-shed.png" },
  { path: "images/rolling-shutter.png", bucket: "gallery-images", target: "gallery/rolling-shutter.png" },
  { path: "images/quiko-logo.png", bucket: "client-logos", target: "clients/quiko-logo.png" },
  { path: "images/icon-sheet-metal.png", bucket: "service-images", target: "services/icon-sheet-metal.png" },
  { path: "images/icon-bending.png", bucket: "service-images", target: "services/icon-bending.png" },
  { path: "images/icon-welding.png", bucket: "service-images", target: "services/icon-welding.png" },
  { path: "images/icon-fabrication.png", bucket: "service-images", target: "services/icon-fabrication.png" },
  { path: "images/icon-marking.png", bucket: "service-images", target: "services/icon-marking.png" },
  { path: "images/icon-powder-coating.png", bucket: "service-images", target: "services/icon-powder-coating.png" },
  { path: "images/icon-pipe-cutting.png", bucket: "service-images", target: "services/icon-pipe-cutting.png" },
  { path: "images/icon-construction.png", bucket: "service-images", target: "services/icon-construction.png" },
  { path: "images/icon-agriculture.png", bucket: "service-images", target: "services/icon-agriculture.png" },
  { path: "images/icon-automobile.png", bucket: "service-images", target: "services/icon-automobile.png" },
  { path: "images/icon-aerospace.png", bucket: "service-images", target: "services/icon-aerospace.png" },
  { path: "images/icon-pharmaceutical.png", bucket: "service-images", target: "services/icon-pharmaceutical.png" },
  { path: "images/icon-power-plant.png", bucket: "service-images", target: "services/icon-power-plant.png" },
  { path: "images/icon-railway.png", bucket: "service-images", target: "services/icon-railway.png" },
  { path: "images/icon-telecom.png", bucket: "service-images", target: "services/icon-telecom.png" },
  { path: "images/icon-heavy-earth.png", bucket: "service-images", target: "services/icon-heavy-earth.png" },
  { path: "images/icon-spm.png", bucket: "service-images", target: "services/icon-spm.png" },
];

const AssetMigration = () => {
  const [migrating, setMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");

const runMigration = async () => {
    // Removed confirmation dialog for immediate execution

    setMigrating(true);
    setStatus("running");
    let completed = 0;
    let failed = 0;

    try {
      for (const asset of ASSETS_TO_MIGRATE) {
        try {
          // 1. Fetch the local image
          const response = await fetch(`/${asset.path}`);
          if (!response.ok) {
            console.error(`Local asset not found: ${asset.path}`);
            failed++;
            continue;
          }
          const blob = await response.blob();

          // 2. Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from(asset.bucket)
            .upload(asset.target, blob, { upsert: true });

          if (uploadError) {
            console.error(`Supabase upload error for ${asset.path}:`, uploadError);
            failed++;
            continue;
          }

          // 3. Get Public URL
          const { data: { publicUrl } } = supabase.storage
            .from(asset.bucket)
            .getPublicUrl(asset.target);

          // 4. Update corresponding table
          const localPath = `/${asset.path}`;
          
          if (asset.bucket === "gallery-images") {
            const { error: dbError } = await supabase.from("gallery").update({ image_url: publicUrl }).eq("image_url", localPath);
            if (dbError) console.error("Gallery DB Update Error:", dbError);
          } else if (asset.bucket === "client-logos") {
            const { error: dbError } = await supabase.from("clients").update({ logo_url: publicUrl }).eq("logo_url", localPath);
            if (dbError) console.error("Clients DB Update Error:", dbError);
          } else if (asset.bucket === "service-images") {
            const { error: dbError } = await supabase.from("services").update({ image_url: publicUrl }).eq("image_url", localPath);
            if (dbError) console.error("Services DB Update Error:", dbError);
          }

          completed++;
        } catch (err) {
          console.error(`Unexpected error processing ${asset.path}:`, err);
          failed++;
        }
        setProgress(Math.round(((completed + failed) / ASSETS_TO_MIGRATE.length) * 100));
      }

      if (failed === 0) {
        setStatus("success");
        toast.success(`Migration completed! ${completed} assets moved to cloud.`);
      } else {
        setStatus("error");
        toast.error(`Migration finished with ${failed} errors. Check console.`);
      }
    } catch (error) {
      console.error("Migration failed:", error);
      setStatus("error");
      toast.error("Migration failed. Check console for details.");
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="bg-secondary/50 border border-white/5 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database size={20} className="text-accent" />
            Asset Migration
          </h2>
          <p className="text-xs text-metallic mt-1">Move local project images to Supabase Storage.</p>
        </div>
        {status === "success" ? (
          <CheckCircle2 className="text-green-400" size={24} />
        ) : (
          <button
            onClick={runMigration}
            disabled={migrating}
            className="flex items-center gap-2 bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground px-4 py-2 rounded-md font-bold text-xs transition-all disabled:opacity-50"
          >
            {migrating ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            {migrating ? "Migrating..." : "Run Migration"}
          </button>
        )}
      </div>

      {migrating && (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-metallic font-bold">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-primary/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {status === "idle" && (
        <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
          <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-yellow-500/80 leading-relaxed uppercase tracking-tighter">
            Perform this action once after setting up your Supabase buckets. This will ensure all existing portfolio and service images are hosted in the cloud.
          </p>
        </div>
      )}
    </div>
  );
};

export default AssetMigration;
