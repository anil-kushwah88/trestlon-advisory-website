import { Star } from 'lucide-react';

export default function StarRating({ value = 0, onChange, size = 18, readOnly = false }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1" role={readOnly ? undefined : 'radiogroup'} aria-label="Rating">
      {stars.map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          className={readOnly ? 'cursor-default' : 'cursor-pointer'}
        >
          <Star
            size={size}
            className={n <= value ? 'fill-gold text-gold' : 'fill-transparent text-soft'}
            strokeWidth={1.5}
          />
        </button>
      ))}
    </div>
  );
}
