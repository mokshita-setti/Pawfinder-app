'use client';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { IcoMenu, IcoPlus, IcoArrowRight, PawIcon } from './Icons';
import { PfCard, PfBadge, BottomNav } from './UI';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

type Pet = {
  pet_id: string;
  pet_name: string;
  breed: string | null;
  age: string | null;
  photo_url: string | null;
  status: string;
};

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const DEMO_PETS: Pet[] = [
  {
    pet_id: 'PF-DEMO01',
    pet_name: 'Leo',
    breed: 'Golden Retriever',
    age: '4 Years Old',
    photo_url: null,
    status: 'safe',
  },
  {
    pet_id: 'PF-DEMO02',
    pet_name: 'Bruno',
    breed: 'Shih Tzu',
    age: '2 Years Old',
    photo_url: null,
    status: 'safe',
  },
  {
    pet_id: 'PF-DEMO03',
    pet_name: 'Luna',
    breed: 'Persian Cat',
    age: '1 Year Old',
    photo_url: null,
    status: 'safe',
  },
];

export default function MyPetsScreen({ nav }: { nav: (s: Screen, petId?: string) => void }) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setPets(DEMO_PETS);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('pets')
        .select('pet_id,pet_name,breed,age,photo_url,status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setPets(data?.length ? data : DEMO_PETS);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '13px 20px',
          background: '#fff',
          borderBottom: '1px solid #F1F5F9',
          flexShrink: 0,
        }}
      >
        <button
          style={{
            width: 36,
            height: 36,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IcoMenu size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span
            style={{
              fontSize: '17px',
              fontWeight: '800',
              color: '#8B5CF6',
              letterSpacing: '-.5px',
            }}
          >
            PawFinder
          </span>
          <PawIcon size={17} color="#8B5CF6" />
        </div>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>SJ</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '20px',
            gap: '10px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#1E293B',
                letterSpacing: '-.5px',
              }}
            >
              My Pets
            </h1>
            <p style={{ fontSize: '12.5px', color: '#64748B', marginTop: '2px' }}>
              Manage and view your pet profiles.
            </p>
          </div>
          <button
            onClick={() => nav('register')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '8px 13px',
              borderRadius: '100px',
              background: '#EDE9FE',
              border: 'none',
              cursor: 'pointer',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#8B5CF6',
              flexShrink: 0,
            }}
          >
            <IcoPlus size={13} color="#8B5CF6" /> Add New Pet
          </button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: '3px solid #EDE9FE',
                borderTopColor: '#8B5CF6',
                borderRadius: '50%',
                animation: 'spin .8s linear infinite',
              }}
            />
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pets.map((pet) => {
              const missing = pet.status === 'missing';
              return (
                <PfCard key={pet.pet_id} style={{ padding: '15px', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div
                      style={{
                        width: 62,
                        height: 62,
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
                        <svg width={30} height={30} viewBox="0 0 24 24" fill="#A78BFA">
                          <path d="M4.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '17px',
                          fontWeight: '700',
                          color: '#8B5CF6',
                          letterSpacing: '-.3px',
                          marginBottom: '2px',
                        }}
                      >
                        {pet.pet_name}
                      </div>
                      {pet.breed && (
                        <div style={{ fontSize: '12.5px', color: '#64748B' }}>{pet.breed}</div>
                      )}
                      {pet.age && (
                        <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                          {pet.age}
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <PfBadge>ID: {pet.pet_id}</PfBadge>
                        {missing && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: '#DC2626',
                              background: '#FEF2F2',
                              padding: '2px 8px',
                              borderRadius: 100,
                            }}
                          >
                            MISSING
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => nav('petprofile', pet.pet_id)}
                      style={{
                        width: 36,
                        height: 36,
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
                      <IcoArrowRight size={17} color="#8B5CF6" />
                    </button>
                  </div>
                </PfCard>
              );
            })}
          </div>
        )}
        <div style={{ height: 8 }} />
      </div>
      <BottomNav active="pets" onNav={nav} />
    </div>
  );
}
