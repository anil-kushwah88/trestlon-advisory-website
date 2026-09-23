/**
 * Full brand lockup — monogram with "TRUSTLON" / "ADVISORY" stacked beneath it,
 * matching the official company profile document.
 * variant: 'light' (for dark backgrounds — cream text) | 'dark' (for light backgrounds — navy text)
 */
function Logo({ variant = 'dark', size = 'nav', className = '' }) {
  const isLight = variant === 'light';
  const dims = size === 'footer'
    ? { icon: 40, title: 'text-base', sub: 'text-[9px]' }
    : { icon: 30, title: 'text-[13px]', sub: 'text-[7px]' };

  return (
    <div className={`flex flex-col items-center leading-none select-none shrink-0 ${className}`}>
      <img
        src="/logo-mark.png"
        alt="Trustlon Advisory"
        className="object-contain mb-1"
        style={{ height: dims.icon }}
      />
      <span className={`font-display font-extrabold tracking-wide ${dims.title} ${isLight ? 'text-cream' : 'text-navy'}`}>
        TRUSTLON
      </span>
      <span className={`font-semibold uppercase tracking-[0.35em] ${dims.sub} ${isLight ? 'text-gold/90' : 'text-gold'}`}>
        Advisory
      </span>
    </div>
  );
}

export default Logo;
