import logoUrl from "@/assets/mam-header-logo.png";

const Logo = ({ className = "", invert = false }: { className?: string; invert?: boolean }) => (
  <div className={`relative flex items-center justify-center bg-white rounded-md overflow-hidden p-1 shadow-sm border border-border/50 ${className}`}>
    <img
      src={logoUrl}
      alt="MAM Industries"
      loading="eager"
      decoding="async"
      className={`w-full h-full object-contain ${
        invert ? "brightness-95" : ""
      }`}
    />
  </div>
);

export default Logo;
