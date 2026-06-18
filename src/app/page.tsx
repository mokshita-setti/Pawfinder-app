'use client';
import { useState } from 'react';
import HomeScreen from '@/components/HomeScreen';
import RegisterScreen from '@/components/RegisterScreen';
import MyPetsScreen from '@/components/MyPetsScreen';
import PetProfileScreen from '@/components/PetProfileScreen';
import ScanFlowScreen from '@/components/ScanFlowScreen';
import NotifScreen from '@/components/NotifScreen';
import ProfileScreen from '@/components/ProfileScreen';
import DemoScreen from '@/components/DemoScreen';

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
    demo: <DemoScreen nav={nav} />,
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {screens[cur]}

      {/* Dev nav — hidden on mobile via .pf-dev-nav CSS class */}
      <nav
        className="pf-dev-nav"
        style={{
          position: 'fixed',
          top: '50%',
          right: 22,
          transform: 'translateY(-50%)',
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
              background: cur === id ? '#8B5CF6' : 'rgba(255,255,255,.92)',
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
    </div>
  );
}
