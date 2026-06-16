'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { PawIcon } from '@/components/Icons';

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: { name?: string } } | null>(
    null
  );

  useEffect(() => {
    supabase.auth.getUser().then((res: { data: { user: typeof user } }) => setUser(res.data.user));
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const name = user?.user_metadata?.name || user?.email || 'there';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'Inter, sans-serif',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <PawIcon size={28} color="#8B5CF6" />
          <span style={{ fontSize: 20, fontWeight: 800, color: '#8B5CF6' }}>PawFinder</span>
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: '#1E293B',
            letterSpacing: '-.5px',
            marginBottom: 8,
          }}
        >
          Welcome back, {name}! 🐾
        </h1>
        <p style={{ fontSize: 15, color: '#64748B', marginBottom: 32 }}>
          You&apos;re signed in. The full dashboard is coming in Phase 3.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            borderRadius: 100,
            background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
            color: '#fff',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(139,92,246,.3)',
            marginRight: 12,
          }}
        >
          View App Preview
        </Link>
        <button
          onClick={handleLogout}
          style={{
            padding: '12px 28px',
            borderRadius: 100,
            background: '#F8FAFC',
            border: '1.5px solid #E5E7EB',
            color: '#64748B',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
