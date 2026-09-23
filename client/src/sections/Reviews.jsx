import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import StarRating from '../components/StarRating';
import { api } from '../lib/api';
import { Quote, Loader2, CheckCircle2 } from 'lucide-react';

const EMPTY_FORM = { name: '', company: '', rating: 0, message: '' };

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const loadReviews = () => {
    setLoading(true);
    api('/api/reviews')
      .then(setReviews)
      .catch(() => setReviews([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.message.trim() || !form.rating) {
      setError('Please add your name, a rating and a short message.');
      return;
    }
    setSubmitting(true);
    try {
      await api('/api/reviews', { method: 'POST', body: form });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message || 'Could not submit your review. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const avg =
    reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <section id="reviews" className="py-20 md:py-28 bg-white">
      <div className="max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">Client Feedback</p>
          <h2 className="section-title text-3xl md:text-5xl mb-1">What Clients Say</h2>
          <div className="divider-gold my-5" />
          {avg && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating value={Math.round(avg)} readOnly />
              <span className="text-ink/60 text-[13.5px]">{avg} average from {reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Reviews list */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center gap-2 text-ink/50 text-sm py-10">
                <Loader2 className="animate-spin" size={18} /> Loading reviews…
              </div>
            ) : reviews.length === 0 ? (
              <p className="text-ink/50 text-sm py-10">No reviews yet — be the first to share your experience with Trustlon Advisory.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {reviews.map((r, i) => (
                  <Reveal key={r.id} delay={i * 60}>
                    <div className="card p-6 h-full flex flex-col">
                      <Quote className="text-gold/40 mb-3" size={26} />
                      <StarRating value={r.rating} readOnly size={14} />
                      <p className="text-ink/75 text-[14px] leading-relaxed my-3 flex-1">"{r.message}"</p>
                      <div className="pt-3 border-t border-line">
                        <p className="font-display font-bold text-navy text-[14px]">{r.name}</p>
                        {r.company && <p className="text-soft text-[12px]">{r.company}</p>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Submit form */}
          <div>
            <Reveal variant="right">
              <div className="card p-7 bg-cream2/60">
                <h3 className="font-display font-bold text-navy text-lg mb-1">Share Your Experience</h3>
                <p className="text-ink/55 text-[13px] mb-5">Your review will appear after a quick admin check.</p>

                {submitted ? (
                  <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <p className="text-emerald-800 text-[13.5px]">Thank you! Your review has been submitted and will appear once approved.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Your Rating</label>
                      <StarRating value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} size={22} />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Company (optional)</label>
                      <input
                        value={form.company}
                        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                        className="w-full bg-white border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold"
                        placeholder="Company name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Your Review</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        rows={4}
                        className="w-full bg-white border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold resize-none"
                        placeholder="Tell us about your experience…"
                      />
                    </div>
                    {error && <p className="text-red-600 text-[13px]">{error}</p>}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 rounded-full bg-navy text-cream font-semibold text-sm hover:bg-gold hover:text-navy transition-colors disabled:opacity-60"
                    >
                      {submitting ? 'Submitting…' : 'Submit Review'}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
