import Reveal from '../components/Reveal';
import { CheckSquare } from 'lucide-react';

function WhyUs({ data }) {
  if (!data) return null;

  return (
    <section id="why-trustlon" className="py-20 md:py-28 bg-white">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="section-title text-3xl md:text-5xl mb-1">{data.title}</h2>
          <div className="divider-gold my-5" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
          <Reveal variant="left">
            <h3 className="font-display font-bold text-navy text-xl mb-3">{data.expertiseTitle}</h3>
            <p className="text-ink/70 leading-relaxed text-[15px]">{data.expertiseText}</p>
          </Reveal>
          <Reveal variant="right" delay={100}>
            <img
              src="/images/office-desk.jpg"
              alt="Trustlon Advisory office"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
            />
          </Reveal>
        </div>

        <Reveal variant="scale">
          <div className="bg-navy rounded-2xl p-8 md:p-10">
            <h3 className="font-display font-bold text-cream text-xl mb-6">{data.supportTitle}</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {data.points?.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckSquare className="text-gold shrink-0 mt-0.5" size={18} />
                  <p className="text-cream/85 text-[14px] leading-relaxed">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {data.badges?.map((b) => (
            <span key={b} className="px-4 py-2 rounded-full bg-gold/10 border border-gold/30 text-navy text-[12px] font-bold tracking-wide uppercase">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
