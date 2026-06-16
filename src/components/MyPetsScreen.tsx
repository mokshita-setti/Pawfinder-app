'use client';
import { IcoMenu, IcoPlus, IcoArrowRight } from './Icons';
import { PawIcon } from './Icons';
import { PfCard, PfBadge, BottomNav } from './UI';
import { AvatarBella, AvatarBruno, AvatarLuna } from './Avatars';
import { PETS } from '@/data/pets';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me';

const AVATAR_COMPONENTS: Record<string, React.ComponentType<{ size?: number }>> = {
  bella: AvatarBella,
  bruno: AvatarBruno,
  luna: AvatarLuna,
};

export default function MyPetsScreen({ nav }: { nav: (s: Screen) => void }) {
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {PETS.map(({ id, name, breed, age, avatar }) => {
            const Avatar = AVATAR_COMPONENTS[avatar];
            return (
              <PfCard key={id} style={{ padding: '15px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Avatar size={62} />
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
                      {name}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#64748B' }}>{breed}</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '6px' }}>
                      {age}
                    </div>
                    <PfBadge>ID: {id}</PfBadge>
                  </div>
                  <button
                    onClick={() => nav('petprofile')}
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
        <div style={{ height: 8 }} />
      </div>
      <BottomNav active="pets" onNav={nav} />
    </div>
  );
}
