import { useEffect, useState } from 'react';
import useInView from './useInView';

/** Animates from 0 to `to` once the element scrolls into view. Non-numeric prefixes/suffixes pass through untouched. */
export default function CountUp({ to, duration = 1200, suffix = '', prefix = '', className = '' }) {
  const [ref, inView] = useInView();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * to));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{value}{suffix}
    </span>
  );
}
