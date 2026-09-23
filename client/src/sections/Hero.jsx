import Reveal from '../components/Reveal';
import WordReveal from '../components/WordReveal';
import MaskReveal from '../components/MaskReveal';
import Magnetic from '../components/Magnetic';
import CountUp from '../components/CountUp';

function Hero({ hero, whoWeAre }) {
  if (!hero) return null;

  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center hero-kenburns"
        style={{ backgroundImage: "url('/images/hero-industrial.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navyDeep/90 via-navyDeep/80 to-navyDeep" aria-hidden />
      <div className="relative max-w-page mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <p className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase mb-5">{hero.established}</p>
        </Reveal>
        <h1 className="font-display font-extrabold text-cream text-[2.4rem] leading-[1.08] sm:text-6xl md:text-7xl tracking-tight">
          <WordReveal text={hero.title} delay={80} />
        </h1>
        <Reveal delay={160}>
          <div className="flex items-center justify-center gap-3 my-5">
            <span className="w-10 h-px bg-gold" />
            <MaskReveal delay={200}>
              <span className="text-gold text-[11px] font-bold tracking-[0.25em] uppercase">Advisory</span>
            </MaskReveal>
            <span className="w-10 h-px bg-gold" />
          </div>
        </Reveal>
        <Reveal delay={220}>
          <p className="font-display italic text-lg md:text-2xl text-cream/75 max-w-2xl mx-auto mb-3">
            "{hero.tagline}"
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p className="text-cream/60 text-[15px] md:text-base mb-10">{hero.subtitle}</p>
        </Reveal>

        <Reveal delay={340}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Magnetic strength={0.18}>
              <a
                href="#contact"
                className="inline-block px-7 py-3.5 rounded-full bg-gold text-navy font-semibold text-sm hover:bg-cream transition-colors shadow-card"
              >
                {hero.ctaPrimary}
              </a>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href="#services"
                className="inline-block px-7 py-3.5 rounded-full border-2 border-cream/40 text-cream font-semibold text-sm hover:bg-cream hover:text-navy hover:border-cream transition-colors"
              >
                {hero.ctaSecondary}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        {whoWeAre?.stat && (
          <Reveal delay={400} variant="scale">
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur border border-white/15 rounded-2xl px-8 py-5">
              <div className="font-display font-extrabold text-gold text-4xl">
                <CountUp to={parseInt(whoWeAre.stat.value, 10) || 0} suffix="+" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-widest text-cream/70 font-bold">{whoWeAre.stat.label}</div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Hero;
