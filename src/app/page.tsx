'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';
import HomeScreen from '@/components/HomeScreen';

const RegisterScreen = dynamic(() => import('@/components/RegisterScreen'));
const MyPetsScreen = dynamic(() => import('@/components/MyPetsScreen'));
const PetProfileScreen = dynamic(() => import('@/components/PetProfileScreen'));
const ScanFlowScreen = dynamic(() => import('@/components/ScanFlowScreen'));
const NotifScreen = dynamic(() => import('@/components/NotifScreen'));
const ProfileScreen = dynamic(() => import('@/components/ProfileScreen'));
const DemoProfilesScreen = dynamic(() => import('@/components/DemoProfilesScreen'));
const PetsDirectoryScreen = dynamic(() => import('@/components/PetsDirectoryScreen'));

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

const SCREEN_LABELS: { id: Screen; label: string }[] = [
  { id: 'home', label: '① Home' },
  { id: 'register', label: '② Register Pet' },
  { id: 'pets', label: '③ My Pets' },
  { id: 'petprofile', label: '④ Pet Profile' },
  { id: 'demo', label: '⑤ Demo Profiles' },
  { id: 'directory', label: '⑥ Pet Directory' },
  { id: 'scan', label: '⑦ Scan QR Flow' },
];

export default function Home() {
  const [cur, setCur] = useState<Screen>('home');
  const [activePetId, setActivePetId] = useState<string | undefined>();
  const isMobile = useIsMobile();
  const nav = (to: Screen) => setCur(to);

  function renderScreen() {
    switch (cur) {
      case 'home':
        return <HomeScreen nav={nav} />;
      case 'register':
        return <RegisterScreen nav={nav} />;
      case 'pets':
        return <MyPetsScreen nav={nav} onSelectPet={(id) => setActivePetId(id)} />;
      case 'petprofile':
        return <PetProfileScreen nav={nav} petId={activePetId} />;
      case 'scan':
        return <ScanFlowScreen nav={nav} />;
      case 'notif':
        return <NotifScreen nav={nav} />;
      case 'me':
        return <ProfileScreen nav={nav} />;
      case 'demo':
        return <DemoProfilesScreen nav={nav} />;
      case 'directory':
        return <PetsDirectoryScreen nav={nav} />;
    }
  }

  return (
    <>
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {renderScreen()}
      </div>

      {/* Screen switcher — dev only, hidden on mobile */}
      <nav
        style={{
          position: 'fixed',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          display: isMobile ? 'none' : 'flex',
          flexDirection: 'column',
          gap: 6,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: 'rgba(100,116,139,.6)',
            letterSpacing: '.8px',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
            textAlign: 'right',
            marginBottom: 2,
          }}
        >
          Screens
        </div>
        {SCREEN_LABELS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => nav(id)}
            style={{
              padding: '6px 14px',
              borderRadius: 100,
              background:
                cur === id ? 'linear-gradient(135deg,#A78BFA,#8B5CF6)' : 'rgba(255,255,255,.92)',
              border: cur === id ? 'none' : '1px solid rgba(139,92,246,.2)',
              fontSize: 11,
              fontWeight: 600,
              color: cur === id ? '#fff' : '#8B5CF6',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              fontFamily: 'Inter, sans-serif',
              transition: 'all .15s',
              whiteSpace: 'nowrap',
              textAlign: 'right',
              boxShadow: '0 2px 8px rgba(0,0,0,.08)',
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
