'use client';
import { useEffect, useState } from 'react';
import { IcoPlus, IcoArrowRight, PawIcon } from './Icons';
import { PfCard, PfBadge, TopNav } from './UI';
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

type Pet = {
  id: string;
  pet_id: string;
  pet_name: string;
  breed: string | null;
  age: string | null;
};

export default function MyPetsScreen({
  nav,
  onSelectPet,
}: {
  nav: (s: Screen) => void;
  onSelectPet?: (petId: string) => void;
}) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('pets')
        .select('id, pet_id, pet_name, breed, age')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setPets(data ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
      }}
    >
      <TopNav active="pets" onNav={nav} />

      <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 32,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: '#1E293B',
                  letterSpacing: '-.8px',
                  marginBottom: 6,
                }}
              >
                My Pets
              </h1>
              <p style={{ fontSize: 15, color: '#64748B' }}>Manage and view your pet profiles.</p>
            </div>
            <button
              onClick={() => nav('register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 20px',
                borderRadius: 100,
                background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                boxShadow: '0 4px 14px rgba(139,92,246,.3)',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <IcoPlus size={14} color="#fff" /> Add New Pet
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8', fontSize: 15 }}>
              Loading your pets…
            </div>
          ) : pets.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 32px',
                background: '#fff',
                borderRadius: 20,
                border: '1px solid #F1F5F9',
              }}
            >
              <PawIcon size={48} color="#DDD6FE" />
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1E293B',
                  marginTop: 16,
                  marginBottom: 8,
                }}
              >
                No pets yet
              </h3>
              <p style={{ fontSize: 15, color: '#94A3B8', marginBottom: 24 }}>
                Register your first pet to get their QR tag.
              </p>
              <button
                onClick={() => nav('register')}
                style={{
                  padding: '12px 28px',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                + Register a Pet
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: 16,
              }}
            >
              {pets.map((pet) => (
                <PfCard key={pet.id} style={{ padding: '20px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    <div
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <PawIcon size={32} color="#8B5CF6" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: '#8B5CF6',
                          letterSpacing: '-.3px',
                          marginBottom: 3,
                        }}
                      >
                        {pet.pet_name}
                      </div>
                      {pet.breed && (
                        <div style={{ fontSize: 14, color: '#64748B', marginBottom: 2 }}>
                          {pet.breed}
                        </div>
                      )}
                      {pet.age && (
                        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>
                          {pet.age}
                        </div>
                      )}
                      <PfBadge>ID: {pet.pet_id}</PfBadge>
                    </div>
                    <button
                      onClick={() => {
                        onSelectPet?.(pet.pet_id);
                        nav('petprofile');
                      }}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: '#EDE9FE',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <IcoArrowRight size={18} color="#8B5CF6" />
                    </button>
                  </div>
                </PfCard>
              ))}
            </div>
          )}

          {!loading && pets.length > 0 && (
            <div
              style={{
                marginTop: 32,
                padding: '24px',
                background: '#EDE9FE',
                borderRadius: 16,
                textAlign: 'center',
              }}
            >
              <PawIcon size={28} color="#A78BFA" />
              <p style={{ fontSize: 14, color: '#7C3AED', fontWeight: 600, marginTop: 10 }}>
                Add more pets to keep them all safe
              </p>
              <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
                Each pet gets their own unique QR code tag
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
