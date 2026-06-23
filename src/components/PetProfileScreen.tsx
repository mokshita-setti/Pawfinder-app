'use client';
import { useEffect, useState } from 'react';
import { IcoDownload, IcoPhone, IcoEdit, IcoShare } from './Icons';
import { TopNav, PfCard, PfBadge, PfBtn } from './UI';
import { QRCodeSVG } from 'qrcode.react';
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
  medical_info: string | null;
  notes: string | null;
};

type OwnerInfo = {
  ownerName: string;
  phone: string;
  emergency: string;
  address: string;
};

export default function PetProfileScreen({
  nav,
  petId,
}: {
  nav: (s: Screen) => void;
  petId?: string;
}) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [owner, setOwner] = useState<OwnerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrUrl, setQrUrl] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    async function load() {
      if (!petId) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('pets')
        .select('pet_id, pet_name, breed, age, medical_info, notes')
        .eq('pet_id', petId)
        .single();
      if (data) {
        setPet(data);
        try {
          setOwner(JSON.parse(data.notes ?? '{}'));
        } catch {
          setOwner(null);
        }
        setQrUrl(`${window.location.origin}/pet/${data.pet_id}`);
      }
      setLoading(false);
    }
    load();
  }, [petId]);

  const downloadQR = () => {
    const svg = document.getElementById('pet-qr-svg');
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pet?.pet_id ?? 'qr'}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="pets" onNav={nav} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--pf-ink-subtle)',
            fontSize: 15,
          }}
        >
          Loading…
        </div>
      </div>
    );

  if (!pet)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="pets" onNav={nav} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
            color: 'var(--pf-ink-subtle)',
            fontSize: 15,
          }}
        >
          <p>Pet not found.</p>
          <button
            onClick={() => nav('pets')}
            style={{
              color: 'var(--pf-purple)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            ← Back to My Pets
          </button>
        </div>
      </div>
    );

  const infoRows = [
    { label: 'Owner', value: owner?.ownerName || '—' },
    {
      label: 'Phone',
      value: owner?.phone || '—',
      icon: owner?.phone ? <IcoPhone size={14} /> : null,
    },
    { label: 'Emergency Contact', value: owner?.emergency || '—' },
    { label: 'Address', value: owner?.address || '—' },
    ...(pet.medical_info ? [{ label: 'Medical Notes', value: pet.medical_info, icon: null }] : []),
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: 'var(--pf-bg)',
      }}
    >
      <TopNav active="pets" onNav={nav} />

      <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 28,
              fontSize: 14,
              color: 'var(--pf-ink-subtle)',
            }}
          >
            <button
              onClick={() => nav('pets')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--pf-purple)',
                fontWeight: 600,
                fontSize: 14,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              My Pets
            </button>
            <span>›</span>
            <span style={{ color: 'var(--pf-ink)', fontWeight: 600 }}>{pet.pet_name}</span>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24 }}
          >
            {/* Left — pet info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <PfCard style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        width: 96,
                        height: 96,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg,var(--pf-purple-tint),var(--pf-purple-muted))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg width={48} height={48} viewBox="0 0 24 24" fill="var(--pf-purple)">
                        <path d="M4.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
                      </svg>
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
                        color: 'var(--pf-purple)',
                        letterSpacing: '-.5px',
                        marginBottom: 4,
                      }}
                    >
                      {pet.pet_name}
                    </h1>
                    {pet.breed && (
                      <p style={{ fontSize: 15, color: 'var(--pf-ink-muted)', marginBottom: 2 }}>
                        {pet.breed}
                      </p>
                    )}
                    {pet.age && (
                      <p style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', marginBottom: 10 }}>
                        {pet.age}
                      </p>
                    )}
                    <PfBadge>ID: {pet.pet_id}</PfBadge>
                  </div>
                </div>
              </PfCard>

              <PfCard style={{ padding: '20px 24px' }}>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--pf-ink)',
                    marginBottom: 16,
                  }}
                >
                  Pet Information
                </h3>
                {infoRows.map(({ label, value, icon }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      padding: '10px 0',
                      borderBottom: '1px solid var(--pf-bg)',
                      gap: isMobile ? 2 : 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: 'var(--pf-ink-subtle)',
                        fontWeight: 500,
                        flexShrink: 0,
                      }}
                    >
                      {label}
                    </span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        justifyContent: isMobile ? 'flex-start' : 'flex-end',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 13.5,
                          color: 'var(--pf-ink)',
                          fontWeight: 500,
                          textAlign: isMobile ? 'left' : 'right',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {value}
                      </span>
                      {icon}
                    </div>
                  </div>
                ))}
              </PfCard>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <PfBtn variant="secondary" small>
                  <IcoEdit size={14} color="var(--pf-purple)" /> Edit Profile
                </PfBtn>
                <PfBtn variant="primary" small>
                  <IcoShare size={14} color="var(--pf-surface)" /> Share Profile
                </PfBtn>
              </div>
            </div>

            {/* Right — QR code */}
            <div>
              <PfCard style={{ padding: 32, textAlign: 'center' }}>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: 'var(--pf-ink)',
                    marginBottom: 20,
                  }}
                >
                  QR Code Tag
                </h3>
                <div
                  style={{
                    display: 'inline-block',
                    border: '1.5px solid var(--pf-purple-tint)',
                    borderRadius: 20,
                    padding: 16,
                    background: '#FAFAFF',
                    marginBottom: 16,
                  }}
                >
                  {qrUrl ? (
                    <QRCodeSVG
                      id="pet-qr-svg"
                      value={qrUrl}
                      size={200}
                      bgColor="#FAFAFF"
                      fgColor="var(--pf-ink)"
                      level="M"
                    />
                  ) : (
                    <div
                      style={{
                        width: 200,
                        height: 200,
                        background: 'var(--pf-purple-tint)',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--pf-ink-subtle)',
                        fontSize: 13,
                      }}
                    >
                      Generating…
                    </div>
                  )}
                </div>
                <p style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', marginBottom: 16 }}>
                  Anyone can scan this to view {pet.pet_name}&apos;s profile and reach you instantly
                </p>
                <button
                  onClick={downloadQR}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '10px 24px',
                    borderRadius: 100,
                    background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                    color: 'var(--pf-surface)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Inter, sans-serif',
                    boxShadow: '0 4px 14px rgba(139,92,246,.3)',
                  }}
                >
                  <IcoDownload size={14} color="var(--pf-surface)" /> Download QR
                </button>
              </PfCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
