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
    borderRadius: 'var(--pf-r-pill)',
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
      background: 'var(--pf-grad)',
      color: '#fff',
      boxShadow: 'var(--pf-shadow-purple)',
    },
    secondary: {
      background: 'var(--pf-surface)',
      color: 'var(--pf-purple)',
      border: '1.5px solid var(--pf-border-strong)',
      boxShadow: 'var(--pf-shadow-sm)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--pf-purple)',
      border: '1.5px solid var(--pf-purple-muted)',
    },
  };
  return (
    <button
      className="pf-btn"
      style={{ ...base, ...variants[variant] }}
      onClick={onClick}
      disabled={disabled}
    >
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
          color: 'var(--pf-ink)',
          marginBottom: '5px',
        }}
      >
        {label}
        {optional && (
          <span style={{ color: 'var(--pf-ink-subtle)', fontWeight: '400', marginLeft: '4px' }}>
            (Optional)
          </span>
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
          borderRadius: 'var(--pf-r-input)',
          border: `1.5px solid ${focused ? 'var(--pf-purple-light)' : 'var(--pf-border-strong)'}`,
          fontSize: '13.5px',
          color: 'var(--pf-ink)',
          background: 'var(--pf-surface)',
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
          color: 'var(--pf-ink)',
          marginBottom: '5px',
        }}
      >
        {label}
        {optional && (
          <span style={{ color: 'var(--pf-ink-subtle)', fontWeight: '400', marginLeft: '4px' }}>
            (Optional)
          </span>
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
          borderRadius: 'var(--pf-r-input)',
          border: `1.5px solid ${focused ? 'var(--pf-purple-light)' : 'var(--pf-border-strong)'}`,
          fontSize: '13.5px',
          color: 'var(--pf-ink)',
          background: 'var(--pf-surface)',
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
      background: 'var(--pf-surface)',
      borderRadius: 'var(--pf-r-card)',
      border: '1px solid var(--pf-border)',
      boxShadow: 'var(--pf-shadow-md)',
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
      background: 'var(--pf-surface)',
      borderBottom: '1px solid var(--pf-border)',
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
          background: 'var(--pf-bg)',
          border: '1px solid var(--pf-border-strong)',
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
        style={{
          fontSize: '17px',
          fontWeight: '800',
          color: 'var(--pf-purple)',
          letterSpacing: '-.5px',
        }}
      >
        PawFinder
      </span>
      <PawIcon size={17} color="var(--pf-purple)" />
    </div>
    {rightEl !== undefined ? (
      rightEl
    ) : (
      <button
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--pf-bg)',
          border: '1px solid var(--pf-border-strong)',
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
      borderRadius: 'var(--pf-r-pill)',
      background: 'var(--pf-purple-tint)',
      color: 'var(--pf-purple-dark)',
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
    <>
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
        <button
          aria-label="Go to home"
          onClick={() => onNav('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
          }}
        >
          <PawIcon size={22} color="var(--pf-purple)" />
          <span
            style={{
              fontSize: mobile ? 17 : 20,
              fontWeight: 800,
              color: 'var(--pf-purple)',
              letterSpacing: '-.5px',
            }}
          >
            PawFinder
          </span>
        </button>
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
                    borderRadius: 'var(--pf-r-pill)',
                    background: on ? 'var(--pf-purple-bg)' : 'transparent',
                    border: 'none',
                    fontSize: 14,
                    fontWeight: on ? 600 : 500,
                    color: on ? 'var(--pf-purple-dark)' : 'var(--pf-ink-muted)',
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
          <button
            onClick={() => onNav('register')}
            aria-label="Register a pet"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--pf-grad)',
              color: '#fff',
              border: 'none',
              fontSize: 20,
              lineHeight: 1,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--pf-shadow-purple)',
            }}
          >
            +
          </button>
        ) : (
          <button
            onClick={() => onNav('register')}
            style={{
              padding: '10px 22px',
              borderRadius: 'var(--pf-r-pill)',
              background: 'var(--pf-grad)',
              color: '#fff',
              border: 'none',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--pf-shadow-cta)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            + Register Pet
          </button>
        )}
      </header>
      {mobile && (
        <nav
          aria-label="Main navigation"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 40,
            display: 'flex',
            background: 'var(--pf-surface)',
            borderTop: '1px solid var(--pf-border)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            boxShadow: '0 -4px 20px rgba(0,0,0,.05)',
          }}
        >
          {tabs
            .filter((t) => t.id !== 'directory')
            .map(({ id, label, Icon }) => {
              const on = active === id;
              return (
                <button
                  key={id}
                  onClick={() => onNav(id)}
                  aria-label={label}
                  aria-current={on ? 'page' : undefined}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    padding: '9px 0 3px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    minHeight: 56,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 30,
                      borderRadius: 15,
                      background: on ? 'var(--pf-purple-tint)' : 'transparent',
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
                      fontSize: 10,
                      fontWeight: on ? 600 : 400,
                      color: on ? 'var(--pf-purple)' : 'var(--pf-ink-subtle)',
                    }}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
        </nav>
      )}
    </>
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
        background: 'var(--pf-surface)',
        borderTop: '1px solid var(--pf-border)',
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
                background: on ? 'var(--pf-purple-tint)' : 'transparent',
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
                color: on ? 'var(--pf-purple)' : 'var(--pf-ink-subtle)',
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
