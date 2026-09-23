import { Plus, Trash2 } from 'lucide-react';

function humanize(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase());
}

function emptyLike(sample) {
  if (typeof sample === 'string') return '';
  if (typeof sample === 'number') return 0;
  if (Array.isArray(sample)) return [];
  if (sample && typeof sample === 'object') {
    const out = {};
    for (const k of Object.keys(sample)) out[k] = emptyLike(sample[k]);
    return out;
  }
  return '';
}

/**
 * Renders editable form fields for any JSON value (string, number, array, object)
 * without needing a hardcoded schema per content section.
 */
export default function JsonEditor({ value, onChange, depth = 0 }) {
  if (typeof value === 'string') {
    const long = value.length > 70;
    return long ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(6, Math.max(2, Math.ceil(value.length / 60)))}
        className="w-full bg-white border border-line rounded-lg px-3 py-2 text-[13.5px] focus:outline-none focus:border-gold resize-y"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-line rounded-lg px-3 py-2 text-[13.5px] focus:outline-none focus:border-gold"
      />
    );
  }

  if (typeof value === 'number') {
    return (
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-white border border-line rounded-lg px-3 py-2 text-[13.5px] focus:outline-none focus:border-gold"
      />
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-3">
        {value.map((item, i) => (
          <div key={i} className="relative border border-line rounded-xl p-3.5 bg-cream/40">
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="absolute top-2.5 right-2.5 text-red-400 hover:text-red-600"
              aria-label="Remove item"
            >
              <Trash2 size={15} />
            </button>
            <div className="pr-6">
              <JsonEditor
                value={item}
                depth={depth + 1}
                onChange={(next) => {
                  const copy = value.slice();
                  copy[i] = next;
                  onChange(copy);
                }}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, emptyLike(value[0])])}
          className="flex items-center gap-1.5 text-[12.5px] font-semibold text-navy hover:text-gold"
        >
          <Plus size={15} /> Add item
        </button>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    return (
      <div className={depth > 0 ? 'space-y-3' : 'space-y-4'}>
        {Object.entries(value).map(([k, v]) => (
          <div key={k}>
            <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">{humanize(k)}</label>
            <JsonEditor
              value={v}
              depth={depth + 1}
              onChange={(next) => onChange({ ...value, [k]: next })}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}
