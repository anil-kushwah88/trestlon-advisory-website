import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';
import Logo from './Logo';

const LINKS = [
  { href: '#who-we-are', label: 'Who We Are' },
  { href: '#why-trustlon', label: 'Why Trustlon' },
  { href: '#departments', label: 'Departments' },
  { href: '#services', label: 'Services' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const drawerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const els = LINKS
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const showLight = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled || open ? 'bg-cream/95 backdrop-blur shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="max-w-page mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="select-none">
          <Logo variant={showLight ? 'light' : 'dark'} size="nav" />
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => {
            const isActive = l.href.slice(1) === activeId;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'page' : undefined}
                className={`text-[13.5px] font-semibold transition-colors ${
                  isActive ? 'text-gold' : showLight ? 'text-cream/85 hover:text-gold' : 'text-ink/80 hover:text-gold'
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <Magnetic strength={0.18} className="hidden lg:inline-block">
          <a
            href="#contact"
            className={`inline-block px-5 py-2.5 rounded-full text-[13px] font-semibold transition-colors ${
              showLight ? 'bg-gold text-navy hover:bg-cream' : 'bg-navy text-cream hover:bg-gold hover:text-navy'
            }`}
          >
            Get in Touch
          </a>
        </Magnetic>

        <button
          className={showLight ? 'lg:hidden text-cream' : 'lg:hidden text-navy'}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div ref={drawerRef} className="lg:hidden bg-cream border-t border-line px-5 py-4 space-y-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block w-full text-left py-2.5 text-[14px] font-semibold text-ink/80 hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
