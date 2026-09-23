import Reveal from '../components/Reveal';
import { ShieldCheck, MapPin, Users, Handshake, Compass, Diamond } from 'lucide-react';

const ICONS = [ShieldCheck, MapPin, Users, Handshake, Compass];

function Services({ data }) {
  if (!data) return null;

  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="section-title text-3xl md:text-5xl mb-4">{data.title}</h2>
          <div className="divider-gold mb-5" />
          <p className="text-ink/65 leading-relaxed max-w-2xl text-[15px]">{data.intro}</p>
        </Reveal>

        <div className="mt-10 space-y-6">
          {data.pillars?.map((pillar, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={pillar.number} delay={i * 70}>
                <div className="card overflow-hidden">
                  <div className="bg-navy px-6 py-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                      <Icon className="text-gold" size={20} />
                    </div>
                    <div>
                      <div className="text-gold/70 text-[11px] font-bold tracking-widest uppercase">Service Pillar {pillar.number}</div>
                      <h3 className="font-display font-bold text-cream text-lg md:text-xl">{pillar.title}</h3>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 p-6 md:p-7">
                    <div>
                      <h4 className="eyebrow mb-3">Core Areas</h4>
                      <ul className="space-y-2">
                        {pillar.coreAreas?.map((c) => (
                          <li key={c} className="flex items-center gap-2 text-ink/75 text-[14px]">
                            <Diamond size={10} className="text-gold shrink-0" /> {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="eyebrow mb-3">What You Get</h4>
                      <ul className="space-y-2">
                        {pillar.whatYouGet?.map((w) => (
                          <li key={w} className="flex items-start gap-2 text-ink/75 text-[14px] leading-snug">
                            <Diamond size={10} className="text-gold shrink-0 mt-1.5" /> {w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {data.sectors?.length > 0 && (
          <Reveal delay={150}>
            <div className="bg-cream2 rounded-2xl p-7 md:p-9 mt-10">
              <h3 className="font-display font-bold text-navy text-xl mb-5 flex items-center gap-2">
                <Compass className="text-gold" size={20} /> Sectors We Serve
              </h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {data.sectors.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 text-ink/75 text-[14px]">
                    <Diamond size={9} className="text-gold shrink-0" /> {s}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Services;
