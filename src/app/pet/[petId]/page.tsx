'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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
  medical_info: string | null;
  notes: string | null;
  photo_url: string | null;
  status: string;
};

type OwnerInfo = { ownerName: string; phone: string; emergency: string; address: string };

const DEMO_PETS: Record<string, { pet: Pet; owner: OwnerInfo }> = {
  'PF-DEMO01': {
    pet: {
      pet_id: 'PF-DEMO01',
      pet_name: 'Leo',
      breed: 'Golden Retriever',
      age: '4 Years Old',
      medical_info: 'Needs daily medication. Allergic to certain foods.',
      notes: null,
      photo_url: null,
      status: 'safe',
    },
    owner: {
      ownerName: 'Sarah Johnson',
      phone: '+91 98765 43210',
      emergency: '+91 91234 56789',
      address: '12 MG Road, Mumbai, Maharashtra',
    },
  },
  'PF-DEMO02': {
    pet: {
      pet_id: 'PF-DEMO02',
      pet_name: 'Bruno',
      breed: 'Shih Tzu',
      age: '2 Years Old',
      medical_info: null,
      notes: null,
      photo_url: null,
      status: 'safe',
    },
    owner: {
      ownerName: 'Rahul Sharma',
      phone: '+91 90123 45678',
      emergency: '+91 88765 43210',
      address: '5 Park Street, Delhi',
    },
  },
  'PF-DEMO03': {
    pet: {
      pet_id: 'PF-DEMO03',
      pet_name: 'Luna',
      breed: 'Persian Cat',
      age: '1 Year Old',
      medical_info: 'Indoor cat only. Sensitive stomach.',
      notes: null,
      photo_url: null,
      status: 'safe',
    },
    owner: {
      ownerName: 'Priya Patel',
      phone: '+91 99876 54321',
      emergency: '+91 87654 32109',
      address: '8 Linking Road, Bandra, Mumbai',
    },
  },
};

export default function PublicPetPage() {
  const params = useParams();
  const petId = params?.petId as string;

  const [pet, setPet] = useState<Pet | null>(null);
  const [owner, setOwner] = useState<OwnerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      if (!petId) {
        setLoading(false);
        return;
      }

      if (DEMO_PETS[petId]) {
        const demo = DEMO_PETS[petId];
        setPet(demo.pet);
        setOwner(demo.owner);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from('pets')
        .select('pet_id, pet_name, breed, age, medical_info, notes, photo_url, status')
        .eq('pet_id', petId)
        .single();

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPet(data);
      try {
        setOwner(JSON.parse(data.notes ?? '{}'));
      } catch {
        setOwner(null);
      }
      setLoading(false);
    }
    load();
  }, [petId]);

  if (loading)
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: '3px solid #EDE9FE',
            borderTopColor: '#8B5CF6',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (notFound || !pet)
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: '#F8FAFC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 12,
          padding: 24,
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: 48 }}>🐾</p>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B' }}>Pet not found</h1>
        <p style={{ fontSize: 15, color: '#64748B' }}>This QR code may be invalid or expired.</p>
      </div>
    );

  const missing = pet.status === 'missing';

  return (
    <div style={{ minHeight: '100dvh', background: '#F8FAFC' }}>
      {/* Header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #F1F5F9',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="#8B5CF6" aria-hidden="true">
          <circle cx="5" cy="7" r="2.5" />
          <circle cx="19" cy="7" r="2.5" />
          <circle cx="9" cy="3.5" r="2.5" />
          <circle cx="15" cy="3.5" r="2.5" />
          <path d="M12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
        </svg>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#8B5CF6' }}>PawFinder</span>
      </div>

      {/* Missing banner */}
      {missing && (
        <div
          style={{
            background: '#FEF2F2',
            borderBottom: '1px solid #FECACA',
            padding: '10px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#DC2626' }}>
            THIS PET IS MISSING — please call the owner immediately
          </span>
        </div>
      )}

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 16px' }}>
        {/* Pet card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1px solid #F1F5F9',
            padding: 24,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: '50%',
                background: '#EDE9FE',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                <svg width={44} height={44} viewBox="0 0 24 24" fill="#8B5CF6">
                  <path d="M4.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
                </svg>
              )}
            </div>
            <div>
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#8B5CF6',
                  letterSpacing: '-.5px',
                  marginBottom: 4,
                }}
              >
                {pet.pet_name}
              </h1>
              {pet.breed && (
                <p style={{ fontSize: 14, color: '#64748B', marginBottom: 2 }}>{pet.breed}</p>
              )}
              {pet.age && (
                <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>{pet.age}</p>
              )}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '3px 10px',
                  borderRadius: 100,
                  background: missing ? '#FEF2F2' : '#F0FDF4',
                  fontSize: 11,
                  fontWeight: 700,
                  color: missing ? '#DC2626' : '#16A34A',
                  letterSpacing: '.3px',
                }}
                role="status"
                aria-label={missing ? 'Status: Missing' : 'Status: Safe'}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: missing ? '#DC2626' : '#16A34A',
                  }}
                />
                {missing ? 'MISSING' : 'SAFE'}
              </div>
            </div>
          </div>
        </div>

        {/* Owner contact */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            border: '1px solid #F1F5F9',
            padding: 24,
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#64748B',
              letterSpacing: '.5px',
              marginBottom: 16,
              textTransform: 'uppercase',
            }}
          >
            Owner Contact
          </h2>
          {[
            { label: 'Owner', value: owner?.ownerName },
            { label: 'Phone', value: owner?.phone },
            { label: 'Emergency', value: owner?.emergency },
            { label: 'Address', value: owner?.address },
          ]
            .filter((r) => r.value)
            .map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '9px 0',
                  borderBottom: '1px solid #F8FAFC',
                }}
              >
                <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{label}</span>
                <span
                  style={{
                    fontSize: 13.5,
                    color: '#1E293B',
                    fontWeight: 500,
                    textAlign: 'right',
                    maxWidth: '60%',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}

          {owner?.phone && (
            <a
              href={`tel:${owner.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 20,
                padding: '13px',
                borderRadius: 100,
                background: '#8B5CF6',
                color: '#fff',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
                boxShadow: '0 4px 16px rgba(139,92,246,.35)',
              }}
            >
              <svg
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.85-1.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Owner Now
            </a>
          )}
        </div>

        {pet.medical_info && (
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 16,
              padding: '16px 20px',
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#92400E',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: '.3px',
              }}
            >
              Medical Notes
            </p>
            <p style={{ fontSize: 14, color: '#78350F', lineHeight: 1.6 }}>{pet.medical_info}</p>
          </div>
        )}

        {/* Found this pet? */}
        <div
          style={{
            background: '#8B5CF6',
            borderRadius: 20,
            padding: 24,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Found {pet.pet_name}?</p>
          <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 16, lineHeight: 1.5 }}>
            Please contact the owner using the details above. Your kindness can bring a pet home.
          </p>
          <p style={{ fontSize: 12, opacity: 0.7 }}>ID: {pet.pet_id} · Powered by PawFinder</p>
        </div>
      </div>
    </div>
  );
}
