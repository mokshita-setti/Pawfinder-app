'use client';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { PawIcon } from './Icons';
import { TopNav, PfCard, PfBadge } from './UI';
import { QRCodeSVG } from 'qrcode.react';

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
    pet_id: 'PF-DEMO01',
    pet_name: 'Leo',
    breed: 'Golden Retriever',
    age: '4 Years Old',
    status: 'safe',
    color: '#F59E0B',
    emoji: '🐕',
    ownerName: 'Sarah Johnson',
    phone: '+91 98765 43210',
    emergency: '+91 91234 56789',
    address: '12 MG Road, Mumbai, Maharashtra',
    medical: 'Needs daily medication. Allergic to certain foods.',
  },
  {
    pet_id: 'PF-DEMO02',
    pet_name: 'Bruno',
    breed: 'Shih Tzu',
    age: '2 Years Old',
    status: 'safe',
    color: '#8B5CF6',
    emoji: '🐶',
    ownerName: 'Rahul Sharma',
    phone: '+91 90123 45678',
    emergency: '+91 88765 43210',
    address: '5 Park Street, Delhi',
    medical: '',
  },
  {
    pet_id: 'PF-DEMO03',
    pet_name: 'Luna',
    breed: 'Persian Cat',
    age: '1 Year Old',
    status: 'safe',
    color: '#EC4899',
    emoji: '🐱',
    ownerName: 'Priya Patel',
    phone: '+91 99876 54321',
    emergency: '+91 87654 32109',
    address: '8 Linking Road, Bandra, Mumbai',
    medical: 'Indoor cat only. Sensitive stomach.',
  },
];

export default function DemoProfilesScreen({ nav }: { nav: (s: Screen) => void }) {
  const [selected, setSelected] = useState<(typeof DEMO_PETS)[0] | null>(null);
  const isMobile = useIsMobile();

  if (selected) {
    const qrUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/pet/${selected.pet_id}`
        : `https://pawfinder.org/pet/${selected.pet_id}`;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: '#F8FAFC',
        }}
      >
        <TopNav active="home" onNav={nav} />
        <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 28,
                fontSize: 14,
                color: '#94A3B8',
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#8B5CF6',
                  fontWeight: 600,
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Demo Profiles
              </button>
              <span>›</span>
              <span style={{ color: '#1E293B', fontWeight: 600 }}>{selected.pet_name}</span>
              <span
                style={{
                  marginLeft: 8,
                  padding: '2px 10px',
                  background: '#FEF9C3',
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#CA8A04',
                }}
              >
                DEMO
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: 24,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <PfCard style={{ padding: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg,${selected.color}33,${selected.color}22)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 44,
                        }}
                      >
                        {selected.emoji}
                      </div>
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          right: 4,
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: '#10B981',
                          border: '2.5px solid white',
                        }}
                      />
                    </div>
                    <div>
                      <h1
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: '#8B5CF6',
                          letterSpacing: '-.5px',
                          marginBottom: 4,
                        }}
                      >
                        {selected.pet_name}
                      </h1>
                      <p style={{ fontSize: 15, color: '#64748B', marginBottom: 2 }}>
                        {selected.breed}
                      </p>
                      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 10 }}>
                        {selected.age}
                      </p>
                      <PfBadge>ID: {selected.pet_id}</PfBadge>
                    </div>
                  </div>
                </PfCard>

                <PfCard style={{ padding: '20px 24px' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>
                    Pet Information
                  </h3>
                  {[
                    { label: 'Owner', value: selected.ownerName },
                    { label: 'Phone', value: selected.phone },
                    { label: 'Emergency', value: selected.emergency },
                    { label: 'Address', value: selected.address },
                    ...(selected.medical
                      ? [{ label: 'Medical Notes', value: selected.medical }]
                      : []),
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        padding: '10px 0',
                        borderBottom: '1px solid #F8FAFC',
                        gap: isMobile ? 2 : 0,
                      }}
                    >
                      <span
                        style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500, flexShrink: 0 }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: 13.5,
                          color: '#1E293B',
                          fontWeight: 500,
                          textAlign: isMobile ? 'left' : 'right',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </PfCard>
              </div>

              <div>
                <PfCard style={{ padding: 32, textAlign: 'center' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 20 }}>
                    QR Code Tag
                  </h3>
                  <div
                    style={{
                      display: 'inline-block',
                      border: '1.5px solid #EDE9FE',
                      borderRadius: 20,
                      padding: 16,
                      background: '#FAFAFF',
                      marginBottom: 16,
                    }}
                  >
                    <QRCodeSVG
                      value={qrUrl}
                      size={200}
                      bgColor="#FAFAFF"
                      fgColor="#1E293B"
                      level="M"
                    />
                  </div>
                  <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>
                    This is a demo QR. Real pets get their own unique code.
                  </p>
                  <div
                    style={{
                      marginTop: 16,
                      padding: '10px 16px',
                      background: '#F0FDF4',
                      borderRadius: 12,
                      fontSize: 13,
                      color: '#16A34A',
                      fontWeight: 500,
                    }}
                  >
                    ✓ Scannable — try it with your phone!
                  </div>
                </PfCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
      }}
    >
      <TopNav active="home" onNav={nav} />
      <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 28,
              fontSize: 14,
              color: '#94A3B8',
            }}
          >
            <button
              onClick={() => nav('home')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#8B5CF6',
                fontWeight: 600,
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Home
            </button>
            <span>›</span>
            <span style={{ color: '#1E293B', fontWeight: 600 }}>Demo Profiles</span>
          </div>

          <div style={{ marginBottom: 36 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#FEF9C3',
                borderRadius: 100,
                padding: '4px 14px',
                marginBottom: 16,
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: '#CA8A04' }}>DEMO</span>
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.8px',
                marginBottom: 6,
              }}
            >
              Demo Pet Profiles
            </h1>
            <p style={{ fontSize: 15, color: '#64748B' }}>
              Click any pet to see what their QR profile looks like when scanned.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}
          >
            {DEMO_PETS.map((pet) => (
              <PfCard key={pet.pet_id} style={{ padding: '24px', cursor: 'pointer' }}>
                <div
                  onClick={() => setSelected(pet)}
                  style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg,${pet.color}33,${pet.color}22)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 36,
                      flexShrink: 0,
                    }}
                  >
                    {pet.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{ fontSize: 20, fontWeight: 700, color: '#8B5CF6', marginBottom: 3 }}
                    >
                      {pet.pet_name}
                    </div>
                    <div style={{ fontSize: 14, color: '#64748B', marginBottom: 2 }}>
                      {pet.breed}
                    </div>
                    <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>{pet.age}</div>
                    <PfBadge>ID: {pet.pet_id}</PfBadge>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(pet)}
                  style={{
                    marginTop: 16,
                    width: '100%',
                    padding: '10px',
                    borderRadius: 12,
                    background: '#F5F3FF',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#7C3AED',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  View Profile & QR →
                </button>
              </PfCard>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              padding: '20px 24px',
              background: 'linear-gradient(135deg,#EDE9FE,#F5F3FF)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: 16,
            }}
          >
            <PawIcon size={28} color="#8B5CF6" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#7C3AED', marginBottom: 4 }}>
                Ready to register your pet?
              </p>
              <p style={{ fontSize: 13, color: '#64748B' }}>
                Get a real QR tag for your pet in under 2 minutes.
              </p>
            </div>
            <button
              onClick={() => nav('register')}
              style={{
                marginLeft: isMobile ? 0 : 'auto',
                width: isMobile ? '100%' : 'auto',
                padding: '10px 22px',
                borderRadius: 100,
                background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              Register My Pet →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
