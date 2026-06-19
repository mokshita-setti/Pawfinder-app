'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PawIcon } from '@/components/Icons';

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
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
        <h1 style={S.heading}>Set new password</h1>
        <p style={S.sub}>Choose a strong password for your account.</p>

        {done ? (
          <div style={S.successBox}>
            <p style={{ fontWeight: 700, color: '#059669', marginBottom: 6 }}>Password updated!</p>
            <p style={{ fontSize: 14, color: '#475569', marginBottom: 16 }}>
              You can now sign in with your new password.
            </p>
            <a href="/login" style={S.btn}>
              Go to Sign In
            </a>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
          >
            <div>
              <label style={S.label}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                style={S.input}
              />
            </div>
            <div>
              <label style={S.label}>Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
                style={S.input}
              />
            </div>
            {error && <p style={S.error}>{error}</p>}
            <button type="submit" style={S.btn} disabled={loading}>
              {loading ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        )}
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
  label: { display: 'block', fontSize: 12.5, fontWeight: 600, color: '#1E293B', marginBottom: 5 },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: 13,
    border: '1.5px solid #E5E7EB',
    fontSize: 14,
    color: '#1E293B',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  btn: {
    display: 'block',
    textAlign: 'center',
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
    textDecoration: 'none',
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
};
