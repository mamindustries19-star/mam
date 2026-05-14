const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`relative w-10 h-10 ${className}`}>
    <svg viewBox="0 0 40 40" className="w-full h-full">
      <defs>
        <linearGradient id="mamg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="hsl(199 89% 48%)" />
          <stop offset="100%" stopColor="hsl(222 47% 11%)" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="36" height="36" rx="6" fill="url(#mamg)" />
      <path d="M9 28 L9 13 L15 13 L20 22 L25 13 L31 13 L31 28 L26 28 L26 20 L21.5 28 L18.5 28 L14 20 L14 28 Z" fill="white" />
      <rect x="2" y="33" width="36" height="3" fill="hsl(142 71% 45%)" />
    </svg>
  </div>
);
export default Logo;
