import Reveal from '../components/Reveal';
import { ShieldCheck, Award, Lock, Handshake } from 'lucide-react';

const ICONS = [ShieldCheck, Award, Lock, Handshake];

function Values({ data }) {
  if (!data) return null;

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="section-title text-3xl md:text-5xl mb-1">{data.title}</h2>
          <div className="divider-gold my-5" />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {data.items?.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 90} variant="scale">
                <div className="card p-6 h-full">
                  <div className="w-11 h-11 rounded-xl bg-navy/5 flex items-center justify-center mb-4">
                    <Icon className="text-navy" size={20} />
                  </div>
                  <div className="text-gold font-display font-bold text-sm mb-1">0{i + 1}</div>
                  <h3 className="font-display font-bold text-navy text-lg mb-2">{item.title}</h3>
                  <p className="text-ink/65 text-[13.5px] leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <p className="text-center text-ink/50 text-[13.5px] italic mt-10 max-w-2xl mx-auto">{data.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default Values;
