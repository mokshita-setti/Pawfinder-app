'use client';
import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import RegisterScreen from '@/components/RegisterScreen';
import MyPetsScreen from '@/components/MyPetsScreen';
import PetProfileScreen from '@/components/PetProfileScreen';
import ScanFlowScreen from '@/components/ScanFlowScreen';
import NotifScreen from '@/components/NotifScreen';
import ProfileScreen from '@/components/ProfileScreen';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

const SCREEN_LABELS: { id: Screen; label: string }[] = [
  { id: 'home', label: '① Home' },
  { id: 'register', label: '② Register Pet' },
  { id: 'pets', label: '③ My Pets' },
  { id: 'petprofile', label: '④ Pet Profile' },
  { id: 'scan', label: '⑤ Scan QR Flow' },
];

export default function Home() {
  const [cur, setCur] = useState<Screen>('home');
  const [activePetId, setActivePetId] = useState<string | undefined>();

  const nav = (to: Screen, petId?: string) => {
    if (petId !== undefined) setActivePetId(petId);
    setCur(to);
  };

  const screens: Record<Screen, React.ReactNode> = {
    home: <HomeScreen nav={nav} />,
    register: <RegisterScreen nav={nav} />,
    pets: <MyPetsScreen nav={nav} />,
    petprofile: <PetProfileScreen nav={nav} petId={activePetId} />,
    scan: <ScanFlowScreen nav={nav} />,
    notif: <NotifScreen nav={nav} />,
    me: <ProfileScreen nav={nav} />,
    demo: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          color: '#8B5CF6',
          fontWeight: 700,
        }}
      >
        Demo Profiles
      </div>
    ),
  };

  return (
    <>
      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          background: '#F8FAFC',
          boxShadow:
            '0 0 0 1px rgba(0,0,0,.08), 0 0 0 10px #1a1a1a, 0 0 0 12px #2d2d2d, 0 30px 80px rgba(0,0,0,.35), 0 8px 24px rgba(0,0,0,.15)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Status bar */}
        <div
          style={{
            height: 44,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            flexShrink: 0,
            position: 'relative',
            zIndex: 20,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', letterSpacing: '-.2px' }}>
            9:41
          </span>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              top: 10,
              width: 116,
              height: 30,
              background: '#0f172a',
              borderRadius: 18,
            }}
          />
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <svg width="17" height="11" viewBox="0 0 17 11">
              <rect x="0" y="7" width="3" height="4" rx=".5" fill="#0f172a" />
              <rect x="4.5" y="4.5" width="3" height="6.5" rx=".5" fill="#0f172a" />
              <rect x="9" y="2" width="3" height="9" rx=".5" fill="#0f172a" />
              <rect x="13.5" y="0" width="3" height="11" rx=".5" fill="#0f172a" opacity=".25" />
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11">
              <path d="M7.5 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="#0f172a" />
              <path
                d="M3.3 6A5.8 5.8 0 0 1 7.5 4.3 5.8 5.8 0 0 1 11.7 6"
                stroke="#0f172a"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M.8 3.3A9.5 9.5 0 0 1 7.5.8 9.5 9.5 0 0 1 14.2 3.3"
                stroke="#0f172a"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                opacity=".4"
              />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <div
                style={{
                  width: 22,
                  height: 11,
                  borderRadius: 3,
                  border: '1.5px solid #0f172a',
                  padding: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{ width: '82%', height: '100%', background: '#0f172a', borderRadius: 1 }}
                />
              </div>
              <div
                style={{
                  width: 2,
                  height: 5,
                  background: '#0f172a',
                  opacity: 0.5,
                  borderRadius: '0 1px 1px 0',
                }}
              />
            </div>
          </div>
        </div>

        {/* Screen host */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {screens[cur]}
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: 30,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <div
            style={{
              width: 134,
              height: 5,
              background: '#0f172a',
              borderRadius: 100,
              opacity: 0.18,
            }}
          />
        </div>
      </div>

      {/* Outside navigation */}
      <nav
        style={{
          position: 'fixed',
          top: '50%',
          right: 22,
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: 'rgba(100,116,139,.7)',
            letterSpacing: '.8px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'right',
            marginBottom: -2,
          }}
        >
          Screens
        </div>
        {SCREEN_LABELS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => nav(id)}
            style={{
              padding: '7px 16px',
              borderRadius: 100,
              background:
                cur === id ? 'linear-gradient(135deg,#A78BFA,#8B5CF6)' : 'rgba(255,255,255,.92)',
              border: cur === id ? 'none' : '1px solid rgba(139,92,246,.18)',
              fontSize: 12,
              fontWeight: 600,
              color: cur === id ? '#fff' : '#8B5CF6',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              fontFamily: 'Inter, sans-serif',
              transition: 'all .18s',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
