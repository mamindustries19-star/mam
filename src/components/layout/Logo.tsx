import logoUrl from "@/assets/mam-header-logo.png";
import logoDarkUrl from "@/assets/mam-header-logo-dark.png";

const Logo = ({ className = "", invert = false }: { className?: string; invert?: boolean }) => (
  <div className={`relative flex items-center justify-center bg-white dark:bg-slate-900 rounded-md overflow-hidden p-1 shadow-sm border border-border/50 ${className}`}>
    <img
      src={invert ? logoDarkUrl : logoUrl}
      alt="MAM Industries"
      loading="eager"
      decoding="async"
      className="w-full h-full object-contain"
    />
  </div>
);

export default Logo;

