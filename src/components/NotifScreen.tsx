'use client';
import { TopNav } from './UI';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

export default function NotifScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
      }}
    >
      <TopNav active="notif" onNav={nav} />
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: '#EDE9FE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <svg
            width={40}
            height={40}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', marginBottom: 10 }}>
          All caught up!
        </h2>
        <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.6 }}>
          No new notifications.
          <br />
          We&apos;ll let you know if your pet is found.
        </p>
      </div>
    </div>
  );
}
