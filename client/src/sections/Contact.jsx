import { useState } from 'react';
import Reveal from '../components/Reveal';
import { api } from '../lib/api';
import { MapPin, Phone, Mail, Globe, Loader2, CheckCircle2 } from 'lucide-react';

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

function Contact({ data }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!data) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await api('/api/contact', { method: 'POST', body: form });
      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err.message || 'Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-navyDeep text-cream relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/images/city-skyline.jpg')" }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navyDeep via-navyDeep/85 to-navyDeep/60" aria-hidden />
      <div className="hero-glow opacity-40" aria-hidden />
      <div className="relative max-w-page mx-auto px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-3">{data.eyebrow}</p>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-cream mb-6 max-w-2xl">{data.title}</h2>
          <p className="font-display italic text-cream/70 text-[15px] md:text-lg leading-relaxed max-w-2xl mb-12">"{data.quote}"</p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <Reveal variant="left">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-5">
                <MapPin className="text-gold shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-cream/40 font-bold mb-1">Location</div>
                  <p className="text-cream/85 text-[14px] leading-relaxed">{data.shortLocation || data.address}</p>
                </div>
              </div>
            </Reveal>
            <Reveal variant="left" delay={80}>
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-5">
                <Phone className="text-gold shrink-0 mt-0.5" size={20} />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-cream/40 font-bold mb-1">Contact</div>
                  {(data.phones || []).map((p) => (
                    <p key={p} className="text-cream/85 text-[14px]">{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal variant="left" delay={160}>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-5">
                <Mail className="text-gold shrink-0" size={20} />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-cream/40 font-bold mb-1">Email</div>
                  <p className="text-cream/85 text-[14px]">{data.email}</p>
                </div>
              </div>
            </Reveal>
            <Reveal variant="left" delay={240}>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-5">
                <Globe className="text-gold shrink-0" size={20} />
                <div>
                  <div className="text-[11px] uppercase tracking-widest text-cream/40 font-bold mb-1">Web</div>
                  <p className="text-cream/85 text-[14px]">{data.website}</p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal variant="right">
              <div className="bg-white rounded-2xl p-7 md:p-8">
                <h3 className="font-display font-bold text-navy text-xl mb-5">Send an Enquiry</h3>
                {submitted ? (
                  <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                    <p className="text-emerald-800 text-[13.5px]">Thanks for reaching out — we will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Name</label>
                      <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Email</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold" placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Phone (optional)</label>
                      <input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        className="w-full border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold" placeholder="+91" />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Subject (optional)</label>
                      <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                        className="w-full border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold" placeholder="Enquiry subject" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider text-soft font-bold mb-1.5">Message</label>
                      <textarea required rows={4} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="w-full border border-line rounded-xl px-3.5 py-2.5 text-[14px] focus:outline-none focus:border-gold resize-none" placeholder="How can we help?" />
                    </div>
                    {error && <p className="sm:col-span-2 text-red-600 text-[13px]">{error}</p>}
                    <button type="submit" disabled={submitting}
                      className="sm:col-span-2 py-3 rounded-full bg-navy text-cream font-semibold text-sm hover:bg-gold hover:text-navy transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                      {submitting && <Loader2 className="animate-spin" size={16} />}
                      {submitting ? 'Sending…' : 'Send Message'}
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

export default Contact;
