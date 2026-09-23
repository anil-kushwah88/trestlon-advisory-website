import { Phone, Mail } from 'lucide-react';
import Logo from './Logo';

function Footer({ contact, siteMeta }) {
  const year = new Date().getFullYear();
  if (!contact) return null;

  return (
    <footer className="bg-navyDeep text-cream/80 pt-14 pb-8">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="mb-3 items-start flex">
              <Logo variant="light" size="footer" />
            </div>
            <p className="text-[13.5px] leading-relaxed text-cream/60 max-w-xs">
              {siteMeta?.footerNote || 'Corporate Affairs & Statutory Compliance Solutions'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-bold text-cream text-[15px] mb-1">Contact</h4>
            <p className="flex items-center gap-2.5 text-[13.5px] text-cream/70">
              <Phone size={16} className="text-gold shrink-0" /> {(contact.phones || []).join(' · ')}
            </p>
            <p className="flex items-center gap-2.5 text-[13.5px] text-cream/70">
              <Mail size={16} className="text-gold shrink-0" /> {contact.email}
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-cream text-[15px] mb-3">Quick Note</h4>
            <p className="text-[13.5px] leading-relaxed text-cream/60 italic">"{contact.quote?.slice(0, 140)}{contact.quote?.length > 140 ? '…' : ''}"</p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12.5px] text-cream/40">© {year} {siteMeta?.companyName || 'Trustlon Advisory'}. All rights reserved.</p>
          <p className="text-[12px] text-cream/30">Established 2003 · Uttar Pradesh</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
