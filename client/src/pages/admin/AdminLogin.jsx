import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api, setToken } from '../../lib/api';
import { Lock } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api('/api/auth/login', { method: 'POST', body: { email, password } });
      setToken(res.token);
      onLogin();
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 relative overflow-hidden">
      <div className="hero-glow opacity-30" aria-hidden />

      <div className="relative w-full max-w-sm">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-8 select-none">
          <span className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
            <span className="font-display font-bold text-gold text-sm">TT</span>
          </span>
          <span className="font-display font-bold text-cream text-[15px]">Trustlon Advisory</span>
        </Link>

        <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur">
          <div className="flex items-center gap-2 mb-1">
            <Lock size={18} className="text-gold" />
            <h1 className="font-display font-bold text-xl">Admin Sign In</h1>
          </div>
          <p className="text-cream/50 text-[13px] mb-6">Manage site content, reviews and enquiries.</p>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/50 font-bold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@trustlon.com"
                autoComplete="username"
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-[14px] text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-cream/50 font-bold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-[14px] text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {error && (
              <p role="alert" className="text-[13px] text-red-300 border border-red-400/30 bg-red-400/10 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-sm font-semibold text-navy bg-gold hover:bg-goldLight px-6 py-3.5 rounded-full transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>

        <Link to="/" className="block text-center mt-5 text-[12px] text-cream/40 hover:text-cream transition-colors">
          ← Back to website
        </Link>
      </div>
    </div>
  );
}
