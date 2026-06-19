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
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [owner, setOwner] = useState<OwnerInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (petId && DEMO_PETS[petId]) {
        setPet(DEMO_PETS[petId].pet);
        setOwner(DEMO_PETS[petId].owner);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('pets')
        .select('pet_id, pet_name, breed, age, medical_info, notes, status')
        .eq('pet_id', petId)
        .single();
      if (data) {
        setPet(data);
        try {
          setOwner(JSON.parse(data.notes ?? '{}'));
        } catch {
          setOwner(null);
        }
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
          fontFamily: 'Inter, sans-serif',
          color: '#94A3B8',
        }}
      >
        Loading…
      </div>
    );

  if (!pet)
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          padding: 32,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>🐾</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
          Pet not found
        </h1>
        <p style={{ color: '#94A3B8' }}>This QR code may be invalid or the pet has been removed.</p>
      </div>
    );

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
          gap: 8,
        }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="#8B5CF6">
          <circle cx="5" cy="7" r="2.5" />
          <circle cx="19" cy="7" r="2.5" />
          <circle cx="9" cy="3.5" r="2.5" />
          <circle cx="15" cy="3.5" r="2.5" />
          <path d="M12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
        </svg>
        <span style={{ fontSize: 17, fontWeight: 800, color: '#8B5CF6' }}>PawFinder</span>
        <span style={{ fontSize: 13, color: '#94A3B8', marginLeft: 'auto' }}>Pet Profile</span>
      </header>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 20px' }}>
        {/* Pet card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 24,
            padding: '32px 24px',
            boxShadow: '0 4px 24px rgba(0,0,0,.07)',
            marginBottom: 16,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={52} height={52} viewBox="0 0 24 24" fill="#8B5CF6">
              <circle cx="5" cy="7" r="2.5" />
              <circle cx="19" cy="7" r="2.5" />
              <circle cx="9" cy="3.5" r="2.5" />
              <circle cx="15" cy="3.5" r="2.5" />
              <path d="M12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
            </svg>
          </div>

          <div
            style={{
              display: 'inline-block',
              padding: '4px 14px',
              borderRadius: 100,
              background: pet.status === 'missing' ? '#FEF2F2' : '#ECFDF5',
              color: pet.status === 'missing' ? '#DC2626' : '#059669',
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 12,
              letterSpacing: '.3px',
            }}
          >
            {pet.status === 'missing' ? '🔴 MISSING' : '🟢 SAFE'}
          </div>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#1E293B',
              letterSpacing: '-.8px',
              marginBottom: 4,
            }}
          >
            {pet.pet_name}
          </h1>
          {pet.breed && (
            <p style={{ fontSize: 15, color: '#64748B', marginBottom: 2 }}>{pet.breed}</p>
          )}
          {pet.age && <p style={{ fontSize: 14, color: '#94A3B8' }}>{pet.age}</p>}

          <div
            style={{
              marginTop: 12,
              padding: '6px 14px',
              background: '#F5F3FF',
              borderRadius: 100,
              display: 'inline-block',
              fontSize: 12,
              color: '#7C3AED',
              fontWeight: 600,
            }}
          >
            ID: {pet.pet_id}
          </div>
        </div>

        {/* Found this pet? Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
            borderRadius: 20,
            padding: '20px 24px',
            marginBottom: 16,
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>Found {pet.pet_name}? 🐾</p>
          <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5 }}>
            Please contact the owner below so they can be reunited!
          </p>
        </div>

        {/* Owner contact */}
        {owner && (owner.phone || owner.ownerName) && (
          <div
            style={{
              background: '#fff',
              borderRadius: 20,
              padding: '20px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,.05)',
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#94A3B8',
                letterSpacing: '.5px',
                marginBottom: 16,
                textTransform: 'uppercase',
              }}
            >
              Owner Contact
            </h2>
            {owner.ownerName && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #F8FAFC',
                }}
              >
                <span style={{ fontSize: 14, color: '#64748B' }}>Owner</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1E293B' }}>
                  {owner.ownerName}
                </span>
              </div>
            )}
            {owner.phone && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #F8FAFC',
                }}
              >
                <span style={{ fontSize: 14, color: '#64748B' }}>Phone</span>
                <a
                  href={`tel:${owner.phone}`}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#8B5CF6',
                    textDecoration: 'none',
                  }}
                >
                  {owner.phone}
                </a>
              </div>
            )}
            {owner.emergency && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #F8FAFC',
                }}
              >
                <span style={{ fontSize: 14, color: '#64748B' }}>Emergency</span>
                <a
                  href={`tel:${owner.emergency}`}
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#8B5CF6',
                    textDecoration: 'none',
                  }}
                >
                  {owner.emergency}
                </a>
              </div>
            )}
            {owner.address && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                <span style={{ fontSize: 14, color: '#64748B' }}>Address</span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#1E293B',
                    textAlign: 'right',
                    maxWidth: 200,
                  }}
                >
                  {owner.address}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Medical info */}
        {pet.medical_info && (
          <div
            style={{
              background: '#FFF7ED',
              borderRadius: 20,
              padding: '20px 24px',
              marginBottom: 16,
              border: '1px solid #FED7AA',
            }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 700, color: '#EA580C', marginBottom: 8 }}>
              ⚠️ Medical Notes
            </h2>
            <p style={{ fontSize: 14, color: '#7C2D12', lineHeight: 1.6 }}>{pet.medical_info}</p>
          </div>
        )}

        {/* Call button */}
        {owner?.phone && (
          <a
            href={`tel:${owner.phone}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '16px',
              borderRadius: 16,
              background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 700,
              boxShadow: '0 6px 20px rgba(139,92,246,.35)',
            }}
          >
            📞 Call Owner Now
          </a>
        )}

        <p style={{ textAlign: 'center', fontSize: 12, color: '#CBD5E1', marginTop: 24 }}>
          Powered by PawFinder · Keeping pets safe
        </p>
      </div>
    </div>
  );
}
