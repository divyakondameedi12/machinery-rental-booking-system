import { useState } from 'react';
import { Loader2, Lock, Mail, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed.';
      setError(msg.includes('Invalid login') || msg.toLowerCase().includes('credentials')
        ? 'Invalid email or password. Please try again.'
        : 'Could not sign in right now. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-earth-800 px-4">
      <div className="w-full max-w-md rounded-2xl bg-cream-50 p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-earth-600 text-white">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-4 font-heading text-2xl font-bold text-earth-800">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-earth-600">Sign in to manage booking requests</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="label-field" htmlFor="email">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-earth-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="label-field" htmlFor="password">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-earth-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
