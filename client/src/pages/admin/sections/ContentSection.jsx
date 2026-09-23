import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import JsonEditor from '../JsonEditor';
import { Save, RotateCcw, Loader2, CheckCircle2 } from 'lucide-react';

const SECTIONS = [
  { key: 'siteMeta', label: 'Site Meta (name, logo)' },
  { key: 'hero', label: 'Hero' },
  { key: 'whoWeAre', label: 'Who We Are' },
  { key: 'visionMission', label: 'Vision & Mission' },
  { key: 'values', label: 'Our Values' },
  { key: 'whyUs', label: 'Why Trustlon' },
  { key: 'process', label: 'How We Work' },
  { key: 'departments', label: 'Departments' },
  { key: 'services', label: 'Services' },
  { key: 'caseStudies', label: 'Case Studies' },
  { key: 'whoWeServe', label: 'Who We Serve' },
  { key: 'location', label: 'Location & Journey' },
  { key: 'credentials', label: 'Credentials' },
  { key: 'faq', label: 'FAQ' },
  { key: 'contact', label: 'Contact / Footer' },
];

export default function ContentSection({ onAuthError }) {
  const [content, setContent] = useState(null);
  const [active, setActive] = useState('hero');
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api('/api/content')
      .then((data) => {
        setContent(data);
        setDraft(data[active]);
      })
      .catch((err) => {
        if (err.status === 401) onAuthError();
        else setError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const selectSection = (key) => {
    setActive(key);
    setDraft(content?.[key]);
    setSaved(false);
    setError('');
  };

  const save = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      await api(`/api/content/${active}`, { method: 'PUT', auth: true, body: draft });
      setContent((c) => ({ ...c, [active]: draft }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      if (err.status === 401) onAuthError();
      else setError(err.message || 'Could not save changes');
    } finally {
      setSaving(false);
    }
  };

  const resetDefault = async () => {
    if (!confirm('Reset this section to the original default content? Unsaved and saved edits to this section will be lost.')) return;
    setSaving(true);
    setError('');
    try {
      const res = await api(`/api/content/${active}/reset`, { method: 'POST', auth: true });
      setDraft(res.data);
      setContent((c) => ({ ...c, [active]: res.data }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      if (err.status === 401) onAuthError();
      else setError(err.message || 'Could not reset section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-cream/50 text-sm py-10">
        <Loader2 className="animate-spin" size={18} /> Loading content…
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <nav className="space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => selectSection(s.key)}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors ${
                active === s.key ? 'bg-gold text-navy' : 'text-cream/70 hover:bg-white/5 hover:text-cream'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white text-ink rounded-2xl p-6 md:p-7">
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <h2 className="font-display font-bold text-navy text-lg">{SECTIONS.find((s) => s.key === active)?.label}</h2>
            <div className="flex items-center gap-2">
              {saved && (
                <span className="flex items-center gap-1 text-emerald-600 text-[12.5px] font-semibold">
                  <CheckCircle2 size={15} /> Saved
                </span>
              )}
              <button
                onClick={resetDefault}
                disabled={saving}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-line text-[12.5px] font-semibold text-ink/70 hover:bg-cream disabled:opacity-50"
              >
                <RotateCcw size={14} /> Reset
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-cream text-[12.5px] font-semibold hover:bg-gold hover:text-navy disabled:opacity-60"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-[13px] mb-4">{error}</p>}

          {draft != null && <JsonEditor value={draft} onChange={setDraft} />}
        </div>
      </div>
    </div>
  );
}
