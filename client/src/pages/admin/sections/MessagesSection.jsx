import { useEffect, useState } from 'react';
import { api } from '../../../lib/api';
import { Loader2, Mail, MailOpen, Trash2, Phone } from 'lucide-react';

export default function MessagesSection({ onAuthError, onUnreadChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const load = () => {
    setLoading(true);
    api('/api/contact/admin/all', { auth: true })
      .then((data) => {
        setMessages(data);
        onUnreadChange?.(data.filter((m) => !m.is_read).length);
      })
      .catch((err) => {
        if (err.status === 401) onAuthError();
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, []); // eslint-disable-line react-hooks/exhaustive-deps

  const markRead = async (id) => {
    setBusyId(id);
    try {
      await api(`/api/contact/admin/${id}/read`, { method: 'PATCH', auth: true });
      setMessages((ms) => {
        const next = ms.map((m) => (m.id === id ? { ...m, is_read: 1 } : m));
        onUnreadChange?.(next.filter((m) => !m.is_read).length);
        return next;
      });
    } catch (err) {
      if (err.status === 401) onAuthError();
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this message permanently?')) return;
    setBusyId(id);
    try {
      await api(`/api/contact/admin/${id}`, { method: 'DELETE', auth: true });
      setMessages((ms) => {
        const next = ms.filter((m) => m.id !== id);
        onUnreadChange?.(next.filter((m) => !m.is_read).length);
        return next;
      });
    } catch (err) {
      if (err.status === 401) onAuthError();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-cream/50 text-sm py-10">
        <Loader2 className="animate-spin" size={18} /> Loading messages…
      </div>
    );
  }

  if (messages.length === 0) {
    return <p className="text-cream/40 text-sm py-10">No enquiries yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`bg-white text-ink rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 ${!m.is_read ? 'ring-2 ring-gold/50' : ''}`}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p className="font-display font-bold text-navy">{m.name}</p>
              {!m.is_read && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold/20 text-navy">New</span>}
            </div>
            <p className="text-soft text-[12.5px] mb-1">{m.email}{m.phone ? ` · ${m.phone}` : ''}</p>
            {m.subject && <p className="text-navy/80 text-[13px] font-semibold mb-1">{m.subject}</p>}
            <p className="text-ink/70 text-[13.5px] leading-relaxed">{m.message}</p>
            <p className="text-soft text-[11px] mt-2">{new Date(m.created_at).toLocaleString()}</p>
          </div>
          <div className="flex sm:flex-col gap-2 shrink-0">
            <a
              href={`mailto:${m.email}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/5 text-navy text-[12px] font-semibold hover:bg-navy/10"
            >
              <Mail size={14} /> Reply
            </a>
            {m.phone && (
              <a
                href={`tel:${m.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/5 text-navy text-[12px] font-semibold hover:bg-navy/10"
              >
                <Phone size={14} /> Call
              </a>
            )}
            {!m.is_read && (
              <button
                disabled={busyId === m.id}
                onClick={() => markRead(m.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[12px] font-semibold hover:bg-emerald-200 disabled:opacity-50"
              >
                <MailOpen size={14} /> Mark read
              </button>
            )}
            <button
              disabled={busyId === m.id}
              onClick={() => remove(m.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-[12px] font-semibold hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
