'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PawIcon } from '@/components/Icons';

export default function SignUpPage() {
  const [f, setF] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({
      email: f.email,
      password: f.password,
      options: { data: { name: f.name, phone: f.phone } },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setDone(true);
    setLoading(false);
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logoRow}>
          <PawIcon size={28} color="#8B5CF6" />
          <span style={S.brand}>PawFinder</span>
        </div>
        <h1 style={S.heading}>Create your account</h1>
        <p style={S.sub}>Register your pet and keep them safe.</p>

        {done ? (
          <div style={S.successBox}>
            <p style={{ fontWeight: 600, color: '#059669', marginBottom: 4 }}>Check your email!</p>
            <p style={{ fontSize: 14, color: '#475569' }}>
              We sent a confirmation link to <strong>{f.email}</strong>. Click it to activate your
              account.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <Field
              label="Full Name"
              type="text"
              value={f.name}
              onChange={set('name')}
              placeholder="Sarah Johnson"
            />
            <Field
              label="Email"
              type="email"
              value={f.email}
              onChange={set('email')}
              placeholder="sarah@example.com"
            />
            <Field
              label="Phone Number"
              type="tel"
              value={f.phone}
              onChange={set('phone')}
              placeholder="+91 98765 43210"
            />
            <Field
              label="Password"
              type="password"
              value={f.password}
              onChange={set('password')}
              placeholder="Min. 8 characters"
            />
            {error && <p style={S.error}>{error}</p>}
            <button type="submit" style={S.btn} disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}

        <p style={S.footer}>
          Already have an account?{' '}
          <a href="/login" style={S.link}>
            Sign in
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
  successBox: {
    background: '#F0FDF4',
    border: '1px solid #BBF7D0',
    borderRadius: 14,
    padding: '18px 16px',
  },
  footer: { textAlign: 'center', fontSize: 14, color: '#64748B', marginTop: 24 },
  link: { color: '#8B5CF6', fontWeight: 600, textDecoration: 'none' },
};
