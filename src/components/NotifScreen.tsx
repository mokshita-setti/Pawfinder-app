'use client';
import { useEffect, useState } from 'react';
import { TopNav } from './UI';
import { supabase } from '@/lib/supabase';

type Screen =
  | 'home'
  | 'register'
  | 'pets'
  | 'petprofile'
  | 'scan'
  | 'notif'
  | 'me'
  | 'demo'
  | 'directory';

type Report = {
  id: string;
  pet_id: string;
  finder_name: string;
  finder_phone: string | null;
  location: string | null;
  message: string | null;
  created_at: string;
  pet_name: string;
};

export default function NotifScreen({ nav }: { nav: (s: Screen) => void }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data: pets } = await supabase
        .from('pets')
        .select('pet_id, pet_name')
        .eq('user_id', user.id);

      if (!pets || pets.length === 0) {
        setLoading(false);
        return;
      }

      const petIds = pets.map((p: { pet_id: string; pet_name: string }) => p.pet_id);
      const { data: reps } = await supabase
        .from('reports')
        .select('id, pet_id, finder_name, finder_phone, location, message, created_at')
        .in('pet_id', petIds)
        .order('created_at', { ascending: false });

      const petMap = Object.fromEntries(
        pets.map((p: { pet_id: string; pet_name: string }) => [p.pet_id, p.pet_name])
      );
      setReports(
        (reps ?? []).map((r: Omit<Report, 'pet_name'>) => ({
          ...r,
          pet_name: petMap[r.pet_id] ?? r.pet_id,
        }))
      );
      setLoading(false);
    }
    load();
  }, []);

  const timeAgo = (iso: string) => {
    const now = new Date();
    const diff = now.getTime() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
      }}
    >
      <TopNav active="notif" onNav={nav} />

      <div style={{ flex: 1, padding: 'clamp(16px, 4vw, 60px) clamp(16px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.6px',
                marginBottom: 4,
              }}
            >
              Alerts
            </h1>
            <p style={{ fontSize: 14, color: '#64748B' }}>
              {loading
                ? 'Loading…'
                : reports.length === 0
                  ? 'No reports yet.'
                  : `${reports.length} found-pet report${reports.length > 1 ? 's' : ''} received`}
            </p>
          </div>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: 20,
                    border: '1px solid #F1F5F9',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                >
                  <div
                    style={{
                      height: 14,
                      background: '#F1F5F9',
                      borderRadius: 6,
                      width: '50%',
                      marginBottom: 10,
                    }}
                  />
                  <div
                    style={{ height: 12, background: '#F1F5F9', borderRadius: 6, width: '80%' }}
                  />
                </div>
              ))}
            </div>
          )}

          {!loading && reports.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 32px',
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #F1F5F9',
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: '#EDE9FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <svg
                  width={36}
                  height={36}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
                All caught up!
              </h2>
              <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>
                No reports yet. We&apos;ll notify you when someone finds your pet.
              </p>
            </div>
          )}

          {!loading && reports.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {reports.map((r) => (
                <div
                  key={r.id}
                  style={{
                    background: '#fff',
                    borderRadius: 18,
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 2px 10px rgba(0,0,0,.04)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg,#EDE9FE,#F5F3FF)',
                      padding: '14px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>🐾</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#7C3AED' }}>
                        Someone found <strong>{r.pet_name}</strong>!
                      </span>
                    </div>
                    <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500 }}>
                      {timeAgo(r.created_at)}
                    </span>
                  </div>

                  {/* Body */}
                  <div
                    style={{
                      padding: '14px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ fontSize: 12, color: '#94A3B8', width: 60, flexShrink: 0 }}>
                        Finder
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                        {r.finder_name}
                      </span>
                    </div>
                    {r.finder_phone && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ fontSize: 12, color: '#94A3B8', width: 60, flexShrink: 0 }}>
                          Phone
                        </span>
                        <a
                          href={`tel:${r.finder_phone}`}
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#8B5CF6',
                            textDecoration: 'none',
                          }}
                        >
                          {r.finder_phone}
                        </a>
                      </div>
                    )}
                    {r.location && (
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span style={{ fontSize: 12, color: '#94A3B8', width: 60, flexShrink: 0 }}>
                          Location
                        </span>
                        <span style={{ fontSize: 13, color: '#475569' }}>{r.location}</span>
                      </div>
                    )}
                    {r.message && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: '10px 14px',
                          background: '#F8FAFC',
                          borderRadius: 10,
                          fontSize: 13,
                          color: '#475569',
                          lineHeight: 1.5,
                          fontStyle: 'italic',
                        }}
                      >
                        &quot;{r.message}&quot;
                      </div>
                    )}

                    {r.finder_phone && (
                      <a
                        href={`tel:${r.finder_phone}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          marginTop: 10,
                          padding: '11px',
                          borderRadius: 12,
                          background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: 13,
                          fontWeight: 700,
                          boxShadow: '0 4px 12px rgba(139,92,246,.25)',
                        }}
                      >
                        📞 Call Finder Now
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </div>
  );
}
