'use client';
import { PawIcon, IcoArrowLeft, IcoArrowRight } from './Icons';

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

const DEMO_PETS = [
  {
    id: 'PF-DEMO01',
    name: 'Leo',
    breed: 'Golden Retriever',
    age: '4 Years Old',
    status: 'safe',
    photo:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop&crop=face',
    owner: 'Sarah Johnson',
    phone: '+91 98765 43210',
    notes: 'Friendly and loves to play fetch. Allergic to chicken.',
  },
  {
    id: 'PF-DEMO02',
    name: 'Bruno',
    breed: 'Shih Tzu',
    age: '2 Years Old',
    status: 'missing',
    photo:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop&crop=face',
    owner: 'Rahul Mehta',
    phone: '+91 91234 56789',
    notes: 'Very shy, needs gentle approach. On daily medication for thyroid.',
  },
  {
    id: 'PF-DEMO03',
    name: 'Luna',
    breed: 'Persian Cat',
    age: '1 Year Old',
    status: 'safe',
    photo:
      'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=200&h=200&fit=crop&crop=face',
    owner: 'Priya Sharma',
    phone: '+91 99887 76543',
    notes: 'Indoor cat. Very calm and friendly. No known allergies.',
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  safe: { bg: '#D1FAE5', text: '#065F46', label: 'Safe' },
  missing: { bg: '#FEE2E2', text: '#991B1B', label: 'Missing' },
};

export default function DemoScreen({ nav }: { nav: (s: Screen, petId?: string) => void }) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, -apple-system, sans-serif',
        background: 'var(--pf-bg)',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'var(--pf-surface)',
          borderBottom: '1px solid var(--pf-border)',
          padding: '0 24px',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => nav('home')}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--pf-bg)',
            border: '1px solid var(--pf-border-strong)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <IcoArrowLeft size={18} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <PawIcon size={18} color="var(--pf-purple)" />
          <span
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: 'var(--pf-ink)',
              letterSpacing: '-.4px',
            }}
          >
            Demo Profiles
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          maxWidth: 640,
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            fontSize: 13.5,
            color: 'var(--pf-ink-muted)',
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          These are sample pet profiles to show how PawFinder works. Register your own pet to get a
          real QR tag.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {DEMO_PETS.map((pet) => {
            const s = STATUS_COLORS[pet.status] ?? STATUS_COLORS.safe;
            return (
              <div
                key={pet.id}
                style={{
                  background: 'var(--pf-surface)',
                  borderRadius: 20,
                  border: '1px solid var(--pf-border)',
                  boxShadow: '0 2px 16px rgba(0,0,0,.055)',
                  overflow: 'hidden',
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '18px 18px 14px',
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '3px solid var(--pf-purple-tint)',
                      flexShrink: 0,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      width={64}
                      height={64}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--pf-ink)' }}>
                        {pet.name}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: '2px 9px',
                          borderRadius: 100,
                          background: s.bg,
                          color: s.text,
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--pf-ink-muted)' }}>
                      {pet.breed} · {pet.age}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div
                  style={{
                    borderTop: '1px solid var(--pf-bg)',
                    padding: '12px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                  }}
                >
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--pf-ink-subtle)',
                        width: 60,
                        flexShrink: 0,
                      }}
                    >
                      Owner
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--pf-ink)' }}>
                      {pet.owner}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--pf-ink-subtle)',
                        width: 60,
                        flexShrink: 0,
                      }}
                    >
                      Phone
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--pf-ink)' }}>
                      {pet.phone}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--pf-ink-subtle)',
                        width: 60,
                        flexShrink: 0,
                      }}
                    >
                      Notes
                    </span>
                    <span style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>
                      {pet.notes}
                    </span>
                  </div>
                </div>

                {/* Pet ID */}
                <div
                  style={{
                    borderTop: '1px solid var(--pf-bg)',
                    padding: '10px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: 'var(--pf-ink-subtle)', fontFamily: 'monospace' }}
                  >
                    {pet.id}
                  </span>
                  <button
                    onClick={() => nav('petprofile', pet.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      background: 'var(--pf-purple-tint)',
                      border: 'none',
                      borderRadius: 100,
                      padding: '6px 14px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--pf-purple-dark)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    View Profile <IcoArrowRight size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Register CTA */}
        <div
          style={{
            marginTop: 32,
            background: 'linear-gradient(135deg,var(--pf-purple-tint),var(--pf-purple-muted))',
            borderRadius: 20,
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <PawIcon size={24} color="var(--pf-purple)" />
          <p
            style={{ fontSize: 15, fontWeight: 700, color: 'var(--pf-ink)', margin: '12px 0 6px' }}
          >
            Ready to protect your pet?
          </p>
          <p style={{ fontSize: 13, color: 'var(--pf-ink-muted)', marginBottom: 16 }}>
            Register your pet and get a unique QR tag in minutes.
          </p>
          <button
            onClick={() => nav('register')}
            style={{
              background: 'var(--pf-purple)',
              color: 'var(--pf-surface)',
              border: 'none',
              borderRadius: 100,
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: '0 4px 14px rgba(139,92,246,.3)',
            }}
          >
            Register My Pet →
          </button>
        </div>
      </div>
    </div>
  );
}
