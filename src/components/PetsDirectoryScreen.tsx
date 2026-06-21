'use client';
import { useEffect, useState, useMemo } from 'react';
import { TopNav } from './UI';
import { supabase } from '@/lib/supabase';
import { useIsMobile } from '@/hooks/useIsMobile';

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

type Pet = {
  pet_id: string;
  pet_name: string;
  breed: string | null;
  age: string | null;
  status: string;
  photo_url: string | null;
  created_at: string;
};

const STATUS_CONFIG = {
  safe: { bg: '#ECFDF5', text: '#059669', dot: '#10B981', label: 'Safe' },
  missing: { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444', label: 'Missing' },
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name_az', label: 'Name A–Z' },
  { value: 'name_za', label: 'Name Z–A' },
];

export default function PetsDirectoryScreen({ nav }: { nav: (s: Screen) => void }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'safe' | 'missing'>('all');
  const [sort, setSort] = useState('newest');
  const isMobile = useIsMobile();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('pets')
        .select('pet_id, pet_name, breed, age, status, photo_url, created_at')
        .order('created_at', { ascending: false });
      setPets(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    let list = [...pets];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.pet_name.toLowerCase().includes(q) ||
          (p.breed ?? '').toLowerCase().includes(q) ||
          p.pet_id.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter((p) => p.status === statusFilter);
    }

    switch (sort) {
      case 'oldest':
        list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'name_az':
        list.sort((a, b) => a.pet_name.localeCompare(b.pet_name));
        break;
      case 'name_za':
        list.sort((a, b) => b.pet_name.localeCompare(a.pet_name));
        break;
      default:
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return list;
  }, [pets, search, statusFilter, sort]);

  const missingCount = pets.filter((p) => p.status === 'missing').length;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
      }}
    >
      <TopNav active="directory" onNav={nav} />

      <div style={{ flex: 1, padding: 'clamp(16px, 4vw, 60px) clamp(16px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 'clamp(22px,3vw,32px)',
                    fontWeight: 800,
                    color: '#1E293B',
                    letterSpacing: '-.8px',
                    marginBottom: 4,
                  }}
                >
                  Pet Directory
                </h1>
                <p style={{ fontSize: 14, color: '#64748B' }}>
                  {loading
                    ? 'Loading…'
                    : `${pets.length} registered pet${pets.length !== 1 ? 's' : ''}`}
                  {missingCount > 0 && (
                    <span
                      style={{
                        marginLeft: 8,
                        padding: '2px 10px',
                        borderRadius: 100,
                        background: '#FEF2F2',
                        color: '#DC2626',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {missingCount} missing
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Search + Filters */}
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 12,
              marginBottom: 24,
            }}
          >
            {/* Search */}
            <div style={{ flex: 1, position: 'relative' }}>
              <svg
                style={{
                  position: 'absolute',
                  left: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                }}
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth={2.5}
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or breed…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 40px',
                  borderRadius: 12,
                  border: '1.5px solid #E2E8F0',
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  background: '#fff',
                  boxSizing: 'border-box',
                  color: '#1E293B',
                }}
              />
            </div>

            {/* Status filter */}
            <div style={{ display: 'flex', gap: 8 }}>
              {(['all', 'safe', 'missing'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    border: '1.5px solid',
                    borderColor:
                      statusFilter === s
                        ? s === 'missing'
                          ? '#FECACA'
                          : s === 'safe'
                            ? '#6EE7B7'
                            : '#DDD6FE'
                        : '#E2E8F0',
                    background:
                      statusFilter === s
                        ? s === 'missing'
                          ? '#FEF2F2'
                          : s === 'safe'
                            ? '#ECFDF5'
                            : '#EDE9FE'
                        : '#fff',
                    color:
                      statusFilter === s
                        ? s === 'missing'
                          ? '#DC2626'
                          : s === 'safe'
                            ? '#059669'
                            : '#7C3AED'
                        : '#64748B',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    whiteSpace: 'nowrap',
                    transition: 'all .15s',
                  }}
                >
                  {s === 'all' ? 'All Pets' : s === 'safe' ? '🟢 Safe' : '🔴 Missing'}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: '1.5px solid #E2E8F0',
                fontSize: 13,
                fontFamily: 'Inter, sans-serif',
                background: '#fff',
                color: '#1E293B',
                cursor: 'pointer',
                outline: 'none',
                fontWeight: 500,
              }}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loading */}
          {loading && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: 20,
                    border: '1px solid #F1F5F9',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        background: '#F1F5F9',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          height: 14,
                          background: '#F1F5F9',
                          borderRadius: 6,
                          marginBottom: 8,
                          width: '60%',
                        }}
                      />
                      <div
                        style={{ height: 12, background: '#F1F5F9', borderRadius: 6, width: '80%' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
                {search || statusFilter !== 'all'
                  ? 'No pets match your search'
                  : 'No pets registered yet'}
              </h2>
              <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 24 }}>
                {search || statusFilter !== 'all'
                  ? 'Try a different search or filter.'
                  : 'Be the first to register your pet!'}
              </p>
              {(search || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearch('');
                    setStatusFilter('all');
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: 100,
                    background: '#EDE9FE',
                    color: '#7C3AED',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {!loading && filtered.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {filtered.map((pet) => {
                const s =
                  STATUS_CONFIG[pet.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.safe;
                return (
                  <div
                    key={pet.pet_id}
                    style={{
                      background: '#fff',
                      borderRadius: 20,
                      border: '1px solid #F1F5F9',
                      boxShadow: '0 2px 12px rgba(0,0,0,.05)',
                      overflow: 'hidden',
                      transition: 'box-shadow .2s, transform .2s',
                      cursor: 'pointer',
                    }}
                    onClick={() => window.open(`/pet/${pet.pet_id}`, '_blank')}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 8px 28px rgba(139,92,246,.15)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 2px 12px rgba(0,0,0,.05)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Missing banner */}
                    {pet.status === 'missing' && (
                      <div
                        style={{
                          background: 'linear-gradient(90deg,#EF4444,#DC2626)',
                          padding: '6px 16px',
                          textAlign: 'center',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '.8px',
                            textTransform: 'uppercase',
                          }}
                        >
                          🔴 Missing — Please Help!
                        </span>
                      </div>
                    )}

                    <div style={{ padding: 20 }}>
                      <div
                        style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}
                      >
                        {/* Photo */}
                        <div
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2.5px solid #EDE9FE',
                            background: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {pet.photo_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={pet.photo_url}
                              alt={pet.pet_name}
                              loading="lazy"
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          ) : (
                            <svg width={28} height={28} viewBox="0 0 24 24" fill="#A78BFA">
                              <circle cx="5" cy="7" r="2.5" />
                              <circle cx="19" cy="7" r="2.5" />
                              <circle cx="9" cy="3.5" r="2.5" />
                              <circle cx="15" cy="3.5" r="2.5" />
                              <path d="M12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
                            </svg>
                          )}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              marginBottom: 3,
                              flexWrap: 'wrap',
                            }}
                          >
                            <span
                              style={{
                                fontSize: 16,
                                fontWeight: 700,
                                color: '#1E293B',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {pet.pet_name}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: 100,
                                background: s.bg,
                                color: s.text,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {s.label}
                            </span>
                          </div>
                          {pet.breed && (
                            <p
                              style={{
                                fontSize: 13,
                                color: '#64748B',
                                marginBottom: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {pet.breed}
                            </p>
                          )}
                          {pet.age && <p style={{ fontSize: 12, color: '#94A3B8' }}>{pet.age}</p>}
                        </div>
                      </div>

                      {/* ID + view link */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingTop: 12,
                          borderTop: '1px solid #F8FAFC',
                        }}
                      >
                        <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>
                          {pet.pet_id}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#8B5CF6',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          View Profile
                          <svg
                            width={12}
                            height={12}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8B5CF6"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Results count */}
          {!loading && filtered.length > 0 && (search || statusFilter !== 'all') && (
            <p style={{ textAlign: 'center', fontSize: 13, color: '#94A3B8', marginTop: 24 }}>
              Showing {filtered.length} of {pets.length} pets
            </p>
          )}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </div>
  );
}
