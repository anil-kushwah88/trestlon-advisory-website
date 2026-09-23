import Reveal from '../components/Reveal';
import useInView from '../components/useInView';

function Bar({ percent, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="h-2 rounded-full bg-navy/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-gold transition-all duration-[1200ms] ease-out"
        style={{ width: inView ? `${percent}%` : '0%', transitionDelay: `${delay}ms` }}
      />
    </div>
  );
}

function WhoWeServe({ data }) {
  if (!data) return null;

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="section-title text-3xl md:text-5xl mb-1">{data.title}</h2>
          <p className="font-display italic text-gold text-lg mt-2 mb-6">{data.subtitle}</p>
          <div className="divider-gold mb-6" />
        </Reveal>

        <div className="space-y-8 max-w-3xl">
          {data.segments?.map((seg, i) => (
            <Reveal key={seg.title} delay={i * 100}>
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-display font-bold text-navy text-lg">{seg.title}</h3>
                  <span className="font-display font-extrabold text-gold text-2xl">{seg.percent}%</span>
                </div>
                <Bar percent={seg.percent} delay={i * 100} />
                <p className="text-ink/65 text-[14px] leading-relaxed mt-3">{seg.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={250}>
          <p className="text-ink/50 text-[13.5px] italic mt-10 max-w-2xl">{data.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}

export default WhoWeServe;
