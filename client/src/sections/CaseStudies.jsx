import Reveal from '../components/Reveal';

function CaseStudies({ data }) {
  if (!data) return null;

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-white">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-navy">{data.title}</h2>
          <div className="divider-gold mb-6" />
          <p className="text-mid leading-relaxed max-w-2xl text-[15px] mb-12">{data.intro}</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {data.items?.map((c, i) => (
            <Reveal key={i} delay={i * 90} variant="up">
              <div className="bg-cream rounded-2xl p-6 h-full border border-line border-dashed">
                <span className="inline-block px-3 py-1 rounded-full bg-navy/5 text-navy text-[11px] font-bold uppercase tracking-wider mb-4">
                  {c.tag}
                </span>
                <h3 className="font-display font-bold text-navy text-[16px] mb-4">{c.title}</h3>
                <dl className="space-y-2.5 text-[13px]">
                  <div>
                    <dt className="text-soft font-bold uppercase tracking-wide text-[10.5px] mb-0.5">Challenge</dt>
                    <dd className="text-mid leading-relaxed">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-soft font-bold uppercase tracking-wide text-[10.5px] mb-0.5">Action</dt>
                    <dd className="text-mid leading-relaxed">{c.action}</dd>
                  </div>
                  <div>
                    <dt className="text-soft font-bold uppercase tracking-wide text-[10.5px] mb-0.5">Outcome</dt>
                    <dd className="text-mid leading-relaxed">{c.outcome}</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
