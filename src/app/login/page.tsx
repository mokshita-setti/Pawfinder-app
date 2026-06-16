'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { PawIcon } from '@/components/Icons';

export default function LoginPage() {
  const router = useRouter();
  const [f, setF] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email: f.email,
      password: f.password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logoRow}>
          <PawIcon size={28} color="#8B5CF6" />
          <span style={S.brand}>PawFinder</span>
        </div>
        <h1 style={S.heading}>Welcome back</h1>
        <p style={S.sub}>Sign in to manage your pets.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field
            label="Email"
            type="email"
            value={f.email}
            onChange={set('email')}
            placeholder="sarah@example.com"
          />
          <Field
            label="Password"
            type="password"
            value={f.password}
            onChange={set('password')}
            placeholder="Your password"
          />
          {error && <p style={S.error}>{error}</p>}
          <div style={{ textAlign: 'right', marginTop: -6 }}>
            <a href="/reset-password" style={S.link}>
              Forgot password?
            </a>
          </div>
          <button type="submit" style={S.btn} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={S.footer}>
          New to PawFinder?{' '}
          <a href="/signup" style={S.link}>
            Create a free account
          </a>
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 12.5,
          fontWeight: 600,
          color: '#1E293B',
          marginBottom: 5,
        }}
      >
        {label}
      </label>
      <input
        {...props}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: 13,
          border: `1.5px solid ${focused ? '#A78BFA' : '#E5E7EB'}`,
          fontSize: 14,
          color: '#1E293B',
          outline: 'none',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
          boxShadow: focused ? '0 0 0 3px rgba(167,139,250,.12)' : 'none',
          transition: 'all .2s',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px 16px',
    fontFamily: 'Inter, sans-serif',
  },
  card: {
    background: '#fff',
    borderRadius: 24,
    padding: '36px 32px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 8px 40px rgba(0,0,0,.08)',
    border: '1px solid #F1F5F9',
  },
  logoRow: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 },
  brand: { fontSize: 20, fontWeight: 800, color: '#8B5CF6', letterSpacing: '-.5px' },
  heading: {
    fontSize: 24,
    fontWeight: 800,
    color: '#1E293B',
    letterSpacing: '-.5px',
    marginBottom: 6,
  },
  sub: { fontSize: 14, color: '#64748B', marginBottom: 28 },
  btn: {
    padding: '13px 20px',
    borderRadius: 100,
    background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
    color: '#fff',
    border: 'none',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    letterSpacing: '-.1px',
    boxShadow: '0 4px 16px rgba(139,92,246,.35)',
    marginTop: 4,
  },
  error: {
    fontSize: 13,
    color: '#DC2626',
    background: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: 10,
    padding: '10px 14px',
  },
  footer: { textAlign: 'center', fontSize: 14, color: '#64748B', marginTop: 24 },
  link: { color: '#8B5CF6', fontWeight: 600, textDecoration: 'none' },
};
