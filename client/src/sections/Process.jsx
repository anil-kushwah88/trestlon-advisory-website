import Reveal from '../components/Reveal';

function Process({ data }) {
  if (!data) return null;

  return (
    <section id="process" className="py-20 md:py-28 bg-cream">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-navy">{data.title}</h2>
          <div className="divider-gold mb-6" />
          <p className="text-mid leading-relaxed max-w-2xl text-[15px] mb-12">{data.intro}</p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.steps?.map((s, i) => (
            <Reveal key={s.number} delay={i * 90} variant="up">
              <div className="bg-white rounded-2xl p-6 h-full border border-line relative">
                <div className="font-display font-extrabold text-gold/30 text-4xl mb-3">{s.number}</div>
                <h3 className="font-display font-bold text-navy text-[16px] mb-2">{s.title}</h3>
                <p className="text-mid text-[13.5px] leading-relaxed">{s.text}</p>
                {i < data.steps.length - 1 && (
                  <span className="hidden lg:block absolute top-9 -right-3 w-6 h-px bg-gold/50" />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
