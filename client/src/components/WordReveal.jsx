import useInView from './useInView';

export default function WordReveal({
  text,
  as: Tag = 'span',
  stagger = 60,        // ms per word
  delay = 0,           // base delay before first word
  className = '',
  wordClassName = '',
  threshold = 0.2,
}) {
  const [ref, visible] = useInView({ threshold, once: true });
  const words = text.split(' ');

  return (
    <Tag
      ref={ref}
      className={`word-reveal inline-flex flex-wrap items-baseline justify-center gap-x-[0.28em] gap-y-1 ${visible ? 'is-visible' : ''} ${className}`}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className={`w inline-block ${wordClassName}`}
          style={{ transitionDelay: `${delay + i * stagger}ms` }}
        >
          {w}
        </span>
      ))}
    </Tag>
  );
}
