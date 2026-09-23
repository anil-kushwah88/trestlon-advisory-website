import Reveal from '../components/Reveal';
import { MapPin, Building2, PhoneCall } from 'lucide-react';

function Location({ data }) {
  if (!data) return null;

  return (
    <section className="py-20 md:py-28 bg-gold text-navy">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="text-navy/60 eyebrow mb-3" style={{ color: '#0f1c33' }}>{data.eyebrow}</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-6 text-navy">{data.title}</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Reveal variant="left">
            <div className="bg-white/40 rounded-2xl p-7 h-full">
              <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                <MapPin size={20} /> {data.placeTitle}
              </h3>
              <ul className="space-y-3">
                {data.points?.map((p) => (
                  <li key={p} className="text-navy/80 text-[14.5px] leading-relaxed border-l-2 border-navy/30 pl-3">{p}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal variant="right">
            <div className="relative rounded-2xl p-7 h-full overflow-hidden text-cream">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/office-building-night.jpg')" }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-navyDeep/75" aria-hidden />
              <div className="relative">
                <h3 className="font-display font-bold text-xl mb-4 flex items-center gap-2">
                  <Building2 size={20} className="text-gold" /> {data.office?.label}
                </h3>
                <p className="text-cream/80 text-[14.5px] leading-relaxed mb-4">{data.office?.address}</p>
                <p className="flex items-center gap-2 text-gold text-[13.5px] font-semibold">
                  <PhoneCall size={15} /> {data.office?.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="font-display font-bold text-2xl mb-2">{data.journeyTitle}</h3>
          <p className="text-navy/70 text-[14px] mb-8 max-w-xl">{data.journeyIntro}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
          {data.journey?.map((j, i) => (
            <Reveal key={j.year} delay={i * 90} variant="scale">
              <div className="bg-white/50 rounded-xl p-5 h-full">
                <div className="font-display font-extrabold text-2xl mb-2">{j.year}</div>
                <div className="w-8 h-0.5 bg-navy/40 mb-3" />
                <p className="text-navy/75 text-[13px] leading-relaxed">{j.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {data.roadmap?.length > 0 && (
          <>
            <Reveal>
              <h3 className="font-display font-bold text-2xl mb-2">{data.roadmapTitle}</h3>
              <p className="text-navy/70 text-[14px] mb-8 max-w-xl">{data.roadmapIntro}</p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.roadmap.map((j, i) => (
                <Reveal key={j.year} delay={i * 90} variant="scale">
                  <div className="bg-white/25 rounded-xl p-5 h-full border border-dashed border-navy/25">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-navy/10 text-navy/60 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Planned
                    </span>
                    <div className="font-display font-extrabold text-2xl mb-2 text-navy/70">{j.year}</div>
                    <p className="text-navy/60 text-[13px] leading-relaxed">{j.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}

        <Reveal delay={200}>
          <p className="font-display italic text-center text-navy/70 mt-12 text-lg">"{data.closingQuote}"</p>
        </Reveal>
      </div>
    </section>
  );
}

export default Location;
