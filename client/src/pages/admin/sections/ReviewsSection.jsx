import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import StarRating from '../../../components/StarRating';
import { Loader2, Check, X, Trash2 } from 'lucide-react';

const TABS = [
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
  { id: 'all', label: 'All' },
];

export default function ReviewsSection({ onAuthError }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending');
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    setLoading(true);
    api('/api/reviews/admin/all', { auth: true })
      .then(setReviews)
      .catch((err) => {
        if (err.status === 401) onAuthError();
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      await api(`/api/reviews/admin/${id}`, { method: 'PATCH', auth: true, body: { status } });
      setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) {
      if (err.status === 401) onAuthError();
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this review permanently?')) return;
    setBusyId(id);
    try {
      await api(`/api/reviews/admin/${id}`, { method: 'DELETE', auth: true });
      setReviews((rs) => rs.filter((r) => r.id !== id));
    } catch (err) {
      if (err.status === 401) onAuthError();
    } finally {
      setBusyId(null);
    }
  };

  const filtered = tab === 'all' ? reviews : reviews.filter((r) => r.status === tab);
  const counts = {
    pending: reviews.filter((r) => r.status === 'pending').length,
    approved: reviews.filter((r) => r.status === 'approved').length,
    rejected: reviews.filter((r) => r.status === 'rejected').length,
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-[12.5px] font-semibold transition-colors ${
              tab === t.id ? 'bg-gold text-navy' : 'bg-white/5 text-cream/70 hover:bg-white/10'
            }`}
          >
            {t.label} {t.id !== 'all' && counts[t.id] > 0 ? `(${counts[t.id]})` : ''}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-cream/50 text-sm py-10">
          <Loader2 className="animate-spin" size={18} /> Loading reviews…
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-cream/40 text-sm py-10">No reviews in this list.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white text-ink rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <p className="font-display font-bold text-navy">{r.name}</p>
                  {r.company && <span className="text-soft text-[12px]">· {r.company}</span>}
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      r.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-700'
                        : r.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
                <StarRating value={r.rating} readOnly size={14} />
                <p className="text-ink/70 text-[13.5px] leading-relaxed mt-2">{r.message}</p>
                <p className="text-soft text-[11px] mt-2">{new Date(r.created_at).toLocaleString()}</p>
              </div>
              <div className="flex sm:flex-col gap-2 shrink-0">
                {r.status !== 'approved' && (
                  <button
                    disabled={busyId === r.id}
                    onClick={() => setStatus(r.id, 'approved')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[12px] font-semibold hover:bg-emerald-200 disabled:opacity-50"
                  >
                    <Check size={14} /> Approve
                  </button>
                )}
                {r.status !== 'rejected' && (
                  <button
                    disabled={busyId === r.id}
                    onClick={() => setStatus(r.id, 'rejected')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[12px] font-semibold hover:bg-amber-200 disabled:opacity-50"
                  >
                    <X size={14} /> Reject
                  </button>
                )}
                <button
                  disabled={busyId === r.id}
                  onClick={() => remove(r.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-[12px] font-semibold hover:bg-red-100 disabled:opacity-50"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
