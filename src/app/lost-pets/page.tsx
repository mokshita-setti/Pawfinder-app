'use client';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Pet = {
  pet_id: string;
  pet_name: string;
  breed: string | null;
  age: string | null;
  photo_url: string | null;
  created_at: string;
};

export default function LostPetsPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('pets')
        .select('pet_id, pet_name, breed, age, photo_url, created_at')
        .eq('status', 'missing')
        .order('created_at', { ascending: false });
      setPets(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: '#F8FAFC',
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #F1F5F9',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="#8B5CF6">
            <circle cx="5" cy="7" r="2.5" />
            <circle cx="19" cy="7" r="2.5" />
            <circle cx="9" cy="3.5" r="2.5" />
            <circle cx="15" cy="3.5" r="2.5" />
            <path d="M12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
          </svg>
          <span style={{ fontSize: 17, fontWeight: 800, color: '#8B5CF6' }}>PawFinder</span>
        </div>
        <span style={{ fontSize: 13, color: '#94A3B8' }}>Lost Pets</span>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 20px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: 100,
              padding: '6px 16px',
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 12 }}>🔴</span>
            <span
              style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', letterSpacing: '.3px' }}
            >
              MISSING PETS
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(24px,4vw,40px)',
              fontWeight: 900,
              color: '#1E293B',
              letterSpacing: '-1px',
              marginBottom: 12,
            }}
          >
            Help Reunite Lost Pets
          </h1>
          <p style={{ fontSize: 16, color: '#64748B', maxWidth: 500, margin: '0 auto' }}>
            These pets are missing. If you spot any of them, scan their QR tag or contact the owner
            directly.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
              gap: 20,
            }}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid #F1F5F9',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}
              >
                <div style={{ height: 200, background: '#F1F5F9' }} />
                <div style={{ padding: 20 }}>
                  <div
                    style={{
                      height: 16,
                      background: '#F1F5F9',
                      borderRadius: 6,
                      marginBottom: 10,
                      width: '60%',
                    }}
                  />
                  <div
                    style={{ height: 12, background: '#F1F5F9', borderRadius: 6, width: '80%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && pets.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
              No missing pets!
            </h2>
            <p style={{ fontSize: 15, color: '#64748B' }}>
              All registered pets are currently safe. Great news!
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && pets.length > 0 && (
          <>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20, textAlign: 'center' }}>
              {pets.length} pet{pets.length > 1 ? 's' : ''} currently missing
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
                gap: 20,
              }}
            >
              {pets.map((pet) => (
                <a
                  key={pet.pet_id}
                  href={`/pet/${pet.pet_id}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 20,
                      overflow: 'hidden',
                      border: '2px solid #FECACA',
                      boxShadow: '0 4px 20px rgba(239,68,68,.1)',
                      transition: 'transform .2s, box-shadow .2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 12px 32px rgba(239,68,68,.2)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow =
                        '0 4px 20px rgba(239,68,68,.1)';
                    }}
                  >
                    {/* Missing stripe */}
                    <div
                      style={{
                        background: 'linear-gradient(90deg,#EF4444,#DC2626)',
                        padding: '7px 16px',
                        textAlign: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#fff',
                          letterSpacing: '1px',
                        }}
                      >
                        🔴 MISSING — PLEASE HELP
                      </span>
                    </div>

                    {/* Photo */}
                    <div
                      style={{
                        height: 180,
                        background: 'linear-gradient(135deg,#FEE2E2,#FEF2F2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {pet.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={pet.photo_url}
                          alt={pet.pet_name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <svg width={72} height={72} viewBox="0 0 24 24" fill="#FECACA">
                          <circle cx="5" cy="7" r="2.5" />
                          <circle cx="19" cy="7" r="2.5" />
                          <circle cx="9" cy="3.5" r="2.5" />
                          <circle cx="15" cy="3.5" r="2.5" />
                          <path d="M12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
                        </svg>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: '18px 20px' }}>
                      <h3
                        style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 4 }}
                      >
                        {pet.pet_name}
                      </h3>
                      {pet.breed && (
                        <p style={{ fontSize: 13, color: '#64748B', marginBottom: 2 }}>
                          {pet.breed}
                        </p>
                      )}
                      {pet.age && (
                        <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12 }}>
                          {pet.age}
                        </p>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: 11, color: '#94A3B8', fontFamily: 'monospace' }}>
                          {pet.pet_id}
                        </span>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#DC2626',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                          }}
                        >
                          View Profile →
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        <p style={{ textAlign: 'center', fontSize: 12, color: '#CBD5E1', marginTop: 48 }}>
          Powered by PawFinder · Keeping pets safe
        </p>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </div>
  );
}
