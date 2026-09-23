import Reveal from '../components/Reveal';
import { Factory, HardHat, Building2, Building, Cog, Truck, Briefcase, Landmark } from 'lucide-react';

// Maps a sector label to a representative icon. Falls back to Building2 if nothing matches.
function iconFor(sector) {
  const s = sector.toLowerCase();
  if (s.includes('manufactur') || s.includes('industries')) return Factory;
  if (s.includes('construction') || s.includes('infrastructure')) return HardHat;
  if (s.includes('industrial estate') || s.includes('developer')) return Building2;
  if (s.includes('real estate') || s.includes('township')) return Building;
  if (s.includes('epc') || s.includes('engineering')) return Cog;
  if (s.includes('logistics') || s.includes('warehous')) return Truck;
  if (s.includes('corporate') || s.includes('enterprise')) return Briefcase;
  if (s.includes('government') || s.includes('psu')) return Landmark;
  return Building2;
}

function TrustStrip({ sectors }) {
  if (!sectors?.length) return null;
  const loop = [...sectors, ...sectors]; // duplicated for a seamless right-to-left loop

  return (
    <section className="py-12 md:py-14 bg-navy border-y border-white/10 overflow-hidden">
      <Reveal>
        <p className="text-center text-cream/45 text-[11px] font-bold uppercase tracking-[0.25em] mb-7">
          Trusted Across
        </p>
      </Reveal>
      <div className="relative w-full overflow-hidden">
        <div className="marquee-track flex items-center gap-12 w-max">
          {loop.map((s, i) => {
            const Icon = iconFor(s);
            return (
              <span key={`${s}-${i}`} className="flex items-center gap-2.5 whitespace-nowrap">
                <Icon size={18} className="text-gold shrink-0" />
                <span className="text-cream/70 text-[13px] md:text-[14px] font-semibold tracking-wide">
                  {s}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;
