import Reveal from '../components/Reveal';
import { ShieldCheck } from 'lucide-react';

function Credentials({ data }) {
  if (!data) return null;

  return (
    <section id="credentials" className="py-16 md:py-20 bg-cream">
      <div className="max-w-page mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="font-display font-bold text-2xl md:text-4xl mb-4 text-navy">{data.title}</h2>
          <div className="divider-gold mx-auto mb-6" />
        </Reveal>

        {data.items?.length ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {data.items.map((item, i) => (
              <Reveal key={i} delay={i * 60} variant="scale">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-line text-navy text-[13px] font-semibold">
                  <ShieldCheck size={16} className="text-gold" /> {item}
                </span>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={80}>
            <p className="text-mid text-[14px] max-w-lg mx-auto">{data.intro}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Credentials;
