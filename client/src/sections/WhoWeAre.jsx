import Reveal from '../components/Reveal';
import { ShieldCheck } from 'lucide-react';

function WhoWeAre({ data }) {
  if (!data) return null;

  return (
    <section id="who-we-are" className="py-20 md:py-28 bg-cream">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="section-title text-3xl md:text-5xl mb-1">{data.title}</h2>
          <div className="divider-gold my-5" />
        </Reveal>

        <div className="grid md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-3">
            <Reveal delay={80}>
              <p className="font-display italic text-gold/90 text-[15px] mb-4">{data.strapline}</p>
            </Reveal>
            {data.paragraphs?.map((p, i) => (
              <Reveal key={i} delay={120 + i * 60}>
                <p className="text-ink/75 leading-relaxed mb-4 text-[15px]">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="md:col-span-2">
            <Reveal variant="right" delay={160}>
              <div className="bg-navy text-cream rounded-2xl p-7 shadow-card">
                <ShieldCheck className="text-gold mb-3" size={26} />
                <p className="font-display italic text-[15px] leading-relaxed text-cream/90">"{data.quote}"</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
