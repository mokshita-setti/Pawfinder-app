'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PawIcon } from '@/components/Icons';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logoRow}>
          <PawIcon size={28} color="#8B5CF6" />
          <span style={S.brand}>PawFinder</span>
        </div>
        <h1 style={S.heading}>Reset password</h1>
        <p style={S.sub}>Enter your email and we&apos;ll send you a reset link.</p>

        {sent ? (
          <div style={S.successBox}>
            <p style={{ fontWeight: 600, color: '#059669', marginBottom: 4 }}>Email sent!</p>
            <p style={{ fontSize: 14, color: '#475569' }}>
              Check <strong>{email}</strong> for a password reset link.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
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
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@example.com"
                required
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 13,
                  border: '1.5px solid #E5E7EB',
                  fontSize: 14,
                  color: '#1E293B',
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {error && <p style={S.error}>{error}</p>}
            <button type="submit" style={S.btn} disabled={loading}>
              {loading ? 'Sending…' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p style={S.footer}>
          Remember it?{' '}
          <a href="/login" style={S.link}>
            Back to sign in
          </a>
        </p>
      </div>
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
