import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContentSection from './sections/ContentSection';
import ReviewsSection from './sections/ReviewsSection';
import MessagesSection from './sections/MessagesSection';

const NAV = [
  { id: 'content', label: 'Site Content', icon: '✎', desc: 'Edit page text & sections' },
  { id: 'reviews', label: 'Reviews', icon: '★', desc: 'Approve & manage reviews' },
  { id: 'messages', label: 'Messages', icon: '✉', desc: 'Contact enquiries' },
];

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('content');
  const [unread, setUnread] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const go = (id) => {
    setTab(id);
    setNavOpen(false);
  };

  const renderNavLinks = () => (
    <nav className="space-y-1">
      {NAV.map((n) => {
        const active = tab === n.id;
        return (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            aria-current={active ? 'page' : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-colors ${
              active ? 'bg-gold text-navy' : 'text-cream/70 hover:text-cream hover:bg-white/5'
            }`}
          >
            <span aria-hidden className="text-base w-5 text-center">{n.icon}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13.5px] font-semibold leading-tight">{n.label}</span>
              <span className={`block text-[11px] leading-tight ${active ? 'text-navy/60' : 'text-cream/40'}`}>{n.desc}</span>
            </span>
            {n.id === 'messages' && unread > 0 && (
              <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold ${active ? 'bg-navy text-cream' : 'bg-gold text-navy'}`}>
                {unread}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-navyDeep text-cream">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-navyDeep/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-5 h-14 flex items-center justify-between">
          <button onClick={() => setNavOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={navOpen}
            className="flex items-center gap-2 text-[13px] font-semibold">
            <span className="flex flex-col gap-1">
              <span className="w-5 h-px bg-cream" /><span className="w-5 h-px bg-cream" /><span className="w-5 h-px bg-cream" />
            </span>
            Menu
          </button>
          <span className="font-display font-bold text-[14px]">{NAV.find((n) => n.id === tab)?.label}</span>
          <button onClick={onLogout} className="text-[12px] font-semibold text-navy bg-gold px-3 py-1.5 rounded-full">Log out</button>
        </div>
        {navOpen && <div className="px-4 pb-4 border-t border-white/10 pt-3">{renderNavLinks()}</div>}
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen border-r border-white/10 p-5 sticky top-0">
          <div className="flex items-center gap-2.5 mb-8 px-1.5">
            <span className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
              <span className="font-display font-bold text-gold text-sm">TT</span>
            </span>
            <div>
              <div className="font-display font-bold text-[14px] tracking-tight leading-none">Admin Console</div>
              <div className="text-[9px] uppercase tracking-widest text-cream/40 mt-1">Trustlon Advisory</div>
            </div>
          </div>

          {renderNavLinks()}

          <div className="mt-auto pt-5 space-y-1 border-t border-white/10">
            <Link to="/" className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-cream/70 hover:text-cream hover:bg-white/5 transition-colors text-[13.5px] font-medium">
              <span aria-hidden className="w-5 text-center">↗</span> View site
            </Link>
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-cream/70 hover:text-cream hover:bg-white/5 transition-colors text-[13.5px] font-medium">
              <span aria-hidden className="w-5 text-center">⏻</span> Log out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-5 sm:px-6 md:px-10 py-6 md:py-10">
          <div className="max-w-5xl mx-auto">
            <header className="hidden lg:block mb-8">
              <h1 className="font-display font-extrabold text-2xl tracking-tight">{NAV.find((n) => n.id === tab)?.label}</h1>
              <p className="text-[13px] text-cream/50 mt-1">{NAV.find((n) => n.id === tab)?.desc}</p>
            </header>

            {tab === 'content' && <ContentSection onAuthError={onLogout} />}
            {tab === 'reviews' && <ReviewsSection onAuthError={onLogout} />}
            {tab === 'messages' && <MessagesSection onAuthError={onLogout} onUnreadChange={setUnread} />}
          </div>
        </main>
      </div>
    </div>
  );
}
