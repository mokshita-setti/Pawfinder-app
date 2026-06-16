'use client';
import { PawIcon, IcoPhone, IcoShield, IcoSettings, IcoArrowRight } from './Icons';
import { PfTopBar, PfCard, PfBadge, BottomNav } from './UI';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me';

export default function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const items = [
    { icon: <PawIcon size={18} color="#8B5CF6" />, label: 'My Pets', sub: '3 registered' },
    { icon: <IcoPhone size={18} color="#60A5FA" />, label: 'Contact Info', sub: 'Update details' },
    {
      icon: <IcoShield size={18} color="#C084FC" />,
      label: 'Privacy & Security',
      sub: 'Manage settings',
    },
    { icon: <IcoSettings size={18} color="#94A3B8" />, label: 'Settings', sub: 'App preferences' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PfTopBar />
      <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '28px 0 24px',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              boxShadow: '0 6px 24px rgba(139,92,246,.3)',
            }}
          >
            <span style={{ fontSize: '28px', fontWeight: '800', color: '#fff' }}>SJ</span>
          </div>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#1E293B',
              letterSpacing: '-.5px',
            }}
          >
            Sarah Johnson
          </h2>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '3px', marginBottom: '10px' }}>
            sarah@example.com
          </p>
          <PfBadge>3 Pets Registered</PfBadge>
        </div>
        {items.map(({ icon, label, sub }) => (
          <PfCard
            key={label}
            style={{ marginBottom: '10px', padding: '15px 18px', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: '#F8FAFC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>{label}</div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '1px' }}>{sub}</div>
              </div>
              <IcoArrowRight size={16} color="#CBD5E1" />
            </div>
          </PfCard>
        ))}
        <div style={{ height: 16 }} />
      </div>
      <BottomNav active="me" onNav={nav} />
    </div>
  );
}
