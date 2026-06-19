'use client';
import { useEffect, useState } from 'react';
import { PawIcon, IcoPhone, IcoShield, IcoSettings, IcoArrowRight } from './Icons';
import { TopNav, PfCard, PfBadge } from './UI';
import { supabase } from '@/lib/supabase';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

export default function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [petCount, setPetCount] = useState(0);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? '');
      // Get name from user metadata or users table
      const metaName = user.user_metadata?.name as string | undefined;
      if (metaName) setName(metaName);
      else {
        const { data } = await supabase.from('users').select('name').eq('id', user.id).single();
        if (data?.name) setName(data.name);
      }
      // Count pets
      const { count } = await supabase
        .from('pets')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setPetCount(count ?? 0);
    })();
  }, []);

  const initials = name
    ? name
        .split(' ')
        .map((w: string) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : email.slice(0, 2).toUpperCase();

  const items = [
    {
      icon: <PawIcon size={18} color="#8B5CF6" />,
      label: 'My Pets',
      sub: `${petCount} registered`,
      onClick: () => nav('pets'),
    },
    {
      icon: <IcoPhone size={18} color="#60A5FA" />,
      label: 'Contact Info',
      sub: 'Update details',
      onClick: undefined,
    },
    {
      icon: <IcoShield size={18} color="#C084FC" />,
      label: 'Privacy & Security',
      sub: 'Manage settings',
      onClick: undefined,
    },
    {
      icon: <IcoSettings size={18} color="#94A3B8" />,
      label: 'Settings',
      sub: 'App preferences',
      onClick: undefined,
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
      }}
    >
      <TopNav active="me" onNav={nav} />

      <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <PfCard style={{ padding: 36, marginBottom: 24, textAlign: 'center' }}>
            <div
              style={{
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 6px 24px rgba(139,92,246,.3)',
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>
                {initials || '?'}
              </span>
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.5px',
                marginBottom: 4,
              }}
            >
              {name || 'My Profile'}
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 12 }}>{email}</p>
            <PfBadge>
              {petCount} Pet{petCount !== 1 ? 's' : ''} Registered
            </PfBadge>
          </PfCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map(({ icon, label, sub, onClick }) => (
              <PfCard
                key={label}
                style={{ padding: '18px 22px', cursor: onClick ? 'pointer' : 'default' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} onClick={onClick}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
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
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1E293B' }}>{label}</div>
                    <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{sub}</div>
                  </div>
                  <IcoArrowRight size={16} color="#CBD5E1" />
                </div>
              </PfCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
