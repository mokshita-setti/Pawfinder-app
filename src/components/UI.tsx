'use client';
import { useState, useEffect } from 'react';
import {
  PawIcon,
  IcoBell,
  IcoMenu,
  IcoArrowLeft,
  NavHome,
  NavPets,
  NavNotif,
  NavProfile,
} from './Icons';

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

export const PfBtn = ({
  children,
  variant = 'primary',
  onClick,
  small,
  disabled,
  full = true,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  small?: boolean;
  disabled?: boolean;
  full?: boolean;
}) => {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    padding: small ? '10px 18px' : '14px 20px',
    borderRadius: '100px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: small ? '13px' : '15px',
    fontWeight: '600',
    transition: 'all .2s ease',
    width: full ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    letterSpacing: '-.1px',
    whiteSpace: 'nowrap',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: 'linear-gradient(135deg,#A78BFA 0%,#8B5CF6 100%)',
      color: '#fff',
      boxShadow: '0 4px 16px rgba(139,92,246,.35)',
    },
    secondary: {
      background: '#fff',
      color: '#8B5CF6',
      border: '1.5px solid #E5E7EB',
      boxShadow: '0 2px 8px rgba(0,0,0,.06)',
    },
    outline: { background: 'transparent', color: '#8B5CF6', border: '1.5px solid #DDD6FE' },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export const PfInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  optional,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  optional?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: '13px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '12.5px',
          fontWeight: '600',
          color: '#1E293B',
          marginBottom: '5px',
        }}
      >
        {label}
        {optional && (
          <span style={{ color: '#94A3B8', fontWeight: '400', marginLeft: '4px' }}>(Optional)</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: '13px',
          border: `1.5px solid ${focused ? '#A78BFA' : '#E5E7EB'}`,
          fontSize: '13.5px',
          color: '#1E293B',
          background: '#fff',
          outline: 'none',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
          transition: 'border-color .2s',
          boxShadow: focused ? '0 0 0 3px rgba(167,139,250,.12)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export const PfTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  optional,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  optional?: boolean;
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: '13px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '12.5px',
          fontWeight: '600',
          color: '#1E293B',
          marginBottom: '5px',
        }}
      >
        {label}
        {optional && (
          <span style={{ color: '#94A3B8', fontWeight: '400', marginLeft: '4px' }}>(Optional)</span>
        )}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: '13px',
          border: `1.5px solid ${focused ? '#A78BFA' : '#E5E7EB'}`,
          fontSize: '13.5px',
          color: '#1E293B',
          background: '#fff',
          outline: 'none',
          fontFamily: 'inherit',
          resize: 'none',
          boxSizing: 'border-box',
          lineHeight: '1.5',
          transition: 'border-color .2s',
          boxShadow: focused ? '0 0 0 3px rgba(167,139,250,.12)' : 'none',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export const PfCard = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: '#fff',
      borderRadius: '20px',
      border: '1px solid #F1F5F9',
      boxShadow: '0 2px 16px rgba(0,0,0,.055)',
      padding: '18px',
      ...style,
    }}
  >
    {children}
  </div>
);

export const PfTopBar = ({
  onBack,
  rightEl,
}: {
  onBack?: () => void;
  rightEl?: React.ReactNode;
}) => (
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
    {onBack ? (
      <button
        onClick={onBack}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#F8FAFC',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <IcoArrowLeft size={18} />
      </button>
    ) : (
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
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span
        style={{ fontSize: '17px', fontWeight: '800', color: '#8B5CF6', letterSpacing: '-.5px' }}
      >
        PawFinder
      </span>
      <PawIcon size={17} color="#8B5CF6" />
    </div>
    {rightEl !== undefined ? (
      rightEl
    ) : (
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: '#F8FAFC',
          border: '1px solid #E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <IcoBell size={18} />
      </button>
    )}
  </div>
);

export const PfBadge = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '100px',
      background: '#EDE9FE',
      color: '#7C3AED',
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '.3px',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

export const TopNav = ({ active, onNav }: { active: Screen; onNav: (s: Screen) => void }) => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const tabs: { id: Screen; label: string; Icon: React.ComponentType<{ active: boolean }> }[] = [
    { id: 'home', label: 'Home', Icon: NavHome },
    { id: 'pets', label: 'My Pets', Icon: NavPets },
    { id: 'directory', label: 'Directory', Icon: NavPets },
    { id: 'notif', label: 'Alerts', Icon: NavNotif },
    { id: 'me', label: 'Profile', Icon: NavProfile },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(139,92,246,.08)',
        padding: mobile ? '0 16px' : '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
        flexShrink: 0,
      }}
    >
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        onClick={() => onNav('home')}
      >
        <PawIcon size={22} color="#8B5CF6" />
        <span
          style={{
            fontSize: mobile ? 17 : 20,
            fontWeight: 800,
            color: '#8B5CF6',
            letterSpacing: '-.5px',
          }}
        >
          PawFinder
        </span>
      </div>
      {!mobile && (
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {tabs.map(({ id, label, Icon }) => {
            const on = active === id;
            return (
              <button
                key={id}
                onClick={() => onNav(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 16px',
                  borderRadius: 100,
                  background: on ? '#F5F3FF' : 'transparent',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: on ? 600 : 500,
                  color: on ? '#7C3AED' : '#64748B',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <Icon active={on} />
                {label}
              </button>
            );
          })}
        </nav>
      )}
      {mobile ? (
        <div style={{ display: 'flex', gap: 4 }}>
          {tabs.map(({ id, Icon }) => {
            const on = active === id;
            return (
              <button
                key={id}
                onClick={() => onNav(id)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: on ? '#F5F3FF' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon active={on} />
              </button>
            );
          })}
        </div>
      ) : (
        <button
          onClick={() => onNav('register')}
          style={{
            padding: '10px 22px',
            borderRadius: 100,
            background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
            color: '#fff',
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(139,92,246,.3)',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          + Register Pet
        </button>
      )}
    </header>
  );
};

export const BottomNav = ({ active, onNav }: { active: Screen; onNav: (s: Screen) => void }) => {
  const tabs: { id: Screen; label: string; Icon: React.ComponentType<{ active: boolean }> }[] = [
    { id: 'home', label: 'Home', Icon: NavHome },
    { id: 'pets', label: 'My Pets', Icon: NavPets },
    { id: 'notif', label: 'Alerts', Icon: NavNotif },
    { id: 'me', label: 'Profile', Icon: NavProfile },
  ];
  return (
    <div
      style={{
        display: 'flex',
        background: '#fff',
        borderTop: '1px solid #F1F5F9',
        paddingBottom: '6px',
        flexShrink: 0,
        boxShadow: '0 -4px 20px rgba(0,0,0,.05)',
      }}
    >
      {tabs.map(({ id, label, Icon }) => {
        const on = active === id;
        return (
          <button
            key={id}
            onClick={() => onNav(id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '9px 0 3px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: 44,
                height: 30,
                borderRadius: '15px',
                background: on ? '#EDE9FE' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background .2s',
              }}
            >
              <Icon active={on} />
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: on ? '600' : '400',
                color: on ? '#8B5CF6' : '#94A3B8',
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
