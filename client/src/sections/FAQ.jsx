import { useState } from 'react';
import Reveal from '../components/Reveal';
import { ChevronDown } from 'lucide-react';

function FAQ({ data }) {
  const [openIndex, setOpenIndex] = useState(0);
  if (!data) return null;

  return (
    <section id="faq" className="py-20 md:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-navy">{data.title}</h2>
          <div className="divider-gold mb-6" />
          <p className="text-mid leading-relaxed text-[15px] mb-10">{data.intro}</p>
        </Reveal>

        <div className="space-y-3">
          {data.items?.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className="bg-white rounded-2xl border border-line overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-navy text-[14.5px]">{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gold shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-5 pb-4 text-mid text-[13.5px] leading-relaxed">{item.a}</p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
