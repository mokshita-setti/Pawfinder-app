'use client';
import { useEffect, useRef, useState } from 'react';
import { PawIcon, IcoPhone, IcoShield, IcoSettings, IcoArrowRight } from './Icons';
import { TopNav, PfCard, PfBadge } from './UI';
import { supabase } from '@/lib/supabase';

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

type Modal = 'contact' | 'security' | 'settings' | null;

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 12,
  border: '1.5px solid var(--pf-border-strong)',
  fontSize: 14,
  color: 'var(--pf-ink)',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12.5,
  fontWeight: 600,
  color: 'var(--pf-ink)',
  marginBottom: 5,
};

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!on)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 100,
        background: on ? 'var(--pf-purple)' : '#CBD5E1',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background .2s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'var(--pf-surface)',
          boxShadow: '0 1px 4px rgba(0,0,0,.2)',
          transition: 'left .2s',
        }}
      />
    </div>
  );
}

export default function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [petCount, setPetCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!modal) return;
    // Remember what triggered the modal so we can restore focus on close
    triggerRef.current = document.activeElement as HTMLElement;
    // Move focus into the modal
    const focusable = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModal(null);
      // Tab trap: keep focus inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const els = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      // Restore focus to the trigger when modal closes
      triggerRef.current?.focus();
    };
  }, [modal]);

  // Contact Info form
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [contactSaving, setContactSaving] = useState(false);
  const [contactMsg, setContactMsg] = useState('');

  // Security form
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');

  // Settings — initialise from localStorage lazily to avoid SSR mismatch
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('pf_dark') === '1';
  });
  const [emailNotifs, setEmailNotifs] = useState(() => {
    if (typeof window === 'undefined') return true;
    const v = localStorage.getItem('pf_notifs');
    return v === null ? true : v === '1';
  });

  useEffect(() => {
    // Sync dark mode class on mount
    document.body.classList.toggle('dark', darkMode);

    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoaded(true);
        return;
      }
      setEmail(user.email ?? '');
      const meta = user.user_metadata as Record<string, string> | undefined;
      if (meta?.name) setName(meta.name);
      else {
        const { data } = await supabase.from('users').select('name').eq('id', user.id).single();
        if (data?.name) setName(data.name);
      }
      if (meta?.phone) setPhone(meta.phone);
      if (meta?.address) setAddress(meta.address);
      const { count } = await supabase
        .from('pets')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setPetCount(count ?? 0);
      setLoaded(true);
    })();
  }, []);

  const toggleDark = (v: boolean) => {
    setDarkMode(v);
    localStorage.setItem('pf_dark', v ? '1' : '0');
    document.body.classList.toggle('dark', v);
  };

  const toggleNotifs = (v: boolean) => {
    setEmailNotifs(v);
    localStorage.setItem('pf_notifs', v ? '1' : '0');
  };

  const openContact = () => {
    setEditName(name);
    setEditPhone(phone);
    setEditAddress(address);
    setContactMsg('');
    setModal('contact');
  };

  const saveContact = async () => {
    setContactSaving(true);
    setContactMsg('');
    const { error } = await supabase.auth.updateUser({
      data: { name: editName, phone: editPhone, address: editAddress },
    });
    if (!error) {
      setName(editName);
      setPhone(editPhone);
      setAddress(editAddress);
      setContactMsg('Saved!');
    } else {
      setContactMsg(error.message);
    }
    setContactSaving(false);
  };

  const openSecurity = () => {
    setNewPw('');
    setConfirmPw('');
    setPwMsg('');
    setPwError('');
    setModal('security');
  };

  const savePassword = async () => {
    if (newPw !== confirmPw) {
      setPwError('Passwords do not match.');
      return;
    }
    if (newPw.length < 6) {
      setPwError('Password must be at least 6 characters.');
      return;
    }
    setPwSaving(true);
    setPwError('');
    setPwMsg('');
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (!error) {
      setPwMsg('Password updated!');
      setNewPw('');
      setConfirmPw('');
    } else {
      setPwError(error.message);
    }
    setPwSaving(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    nav('home');
  };

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
      icon: <PawIcon size={18} color="var(--pf-purple)" />,
      label: 'My Pets',
      sub: `${petCount} registered`,
      onClick: () => nav('pets'),
    },
    {
      icon: <IcoPhone size={18} color="#60A5FA" />,
      label: 'Contact Info',
      sub: 'Name, phone, address',
      onClick: openContact,
    },
    {
      icon: <IcoShield size={18} color="#C084FC" />,
      label: 'Privacy & Security',
      sub: 'Change password',
      onClick: openSecurity,
    },
    {
      icon: <IcoSettings size={18} color="var(--pf-ink-subtle)" />,
      label: 'Settings',
      sub: 'Dark mode & notifications',
      onClick: () => setModal('settings'),
    },
  ];

  if (loaded && !email)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="me" onNav={nav} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              boxShadow: '0 6px 24px rgba(139,92,246,.3)',
            }}
          >
            <span style={{ fontSize: 36 }}>🐾</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--pf-ink)', marginBottom: 8 }}>
            You&apos;re not signed in
          </h2>
          <p style={{ fontSize: 14, color: 'var(--pf-ink-muted)', marginBottom: 28 }}>
            Sign in to manage your pets and view your profile.
          </p>
          <a
            href="/login"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              borderRadius: 100,
              background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
              color: 'var(--pf-surface)',
              fontWeight: 700,
              fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(139,92,246,.3)',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: 'var(--pf-bg)',
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
                background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 6px 24px rgba(139,92,246,.3)',
              }}
            >
              <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--pf-surface)' }}>
                {loaded ? initials || '?' : '…'}
              </span>
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: 'var(--pf-ink)',
                letterSpacing: '-.5px',
                marginBottom: 4,
              }}
            >
              {name || 'My Profile'}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--pf-ink-muted)', marginBottom: 2 }}>{email}</p>
            {phone && (
              <p style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', marginBottom: 2 }}>
                {phone}
              </p>
            )}
            {address && (
              <p style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', marginBottom: 12 }}>
                {address}
              </p>
            )}
            {!phone && !address && <div style={{ marginBottom: 12 }} />}
            <PfBadge>
              {petCount} Pet{petCount !== 1 ? 's' : ''} Registered
            </PfBadge>
          </PfCard>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map(({ icon, label, sub, onClick }) => (
              <PfCard key={label} style={{ padding: '18px 22px', cursor: 'pointer' }}>
                <button
                  onClick={onClick}
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 13,
                      background: 'var(--pf-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--pf-ink)' }}>
                      {label}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', marginTop: 2 }}>
                      {sub}
                    </div>
                  </div>
                  <IcoArrowRight size={16} color="#CBD5E1" />
                </button>
              </PfCard>
            ))}
          </div>

          <button
            onClick={signOut}
            style={{
              width: '100%',
              marginTop: 24,
              padding: '14px',
              borderRadius: 14,
              background: '#FEF2F2',
              border: '1.5px solid #FECACA',
              color: '#DC2626',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="pf-backdrop-enter"
          onClick={() => setModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.4)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="pf-modal-enter"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--pf-surface)',
              borderRadius: 24,
              padding: 32,
              width: '100%',
              maxWidth: 460,
              boxShadow: '0 20px 60px rgba(0,0,0,.15)',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Contact Info */}
            {modal === 'contact' && (
              <>
                <h2
                  id="modal-title"
                  style={{ fontSize: 20, fontWeight: 800, color: 'var(--pf-ink)', marginBottom: 4 }}
                >
                  Contact Info
                </h2>
                <p style={{ fontSize: 13, color: 'var(--pf-ink-muted)', marginBottom: 24 }}>
                  This info helps pet finders reach you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      style={inputStyle}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      style={{
                        ...inputStyle,
                        background: 'var(--pf-bg)',
                        color: 'var(--pf-ink-subtle)',
                      }}
                      value={email}
                      readOnly
                    />
                    <p style={{ fontSize: 11, color: 'var(--pf-ink-subtle)', marginTop: 4 }}>
                      Email cannot be changed here
                    </p>
                  </div>
                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      style={inputStyle}
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="+1 234 567 8900"
                      type="tel"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Address</label>
                    <input
                      style={inputStyle}
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      placeholder="Your city or full address"
                    />
                  </div>
                  {contactMsg && (
                    <p
                      role="alert"
                      style={{
                        fontSize: 13,
                        color: contactMsg === 'Saved!' ? '#059669' : '#DC2626',
                        background: contactMsg === 'Saved!' ? '#F0FDF4' : '#FEF2F2',
                        border: `1px solid ${contactMsg === 'Saved!' ? '#BBF7D0' : '#FECACA'}`,
                        borderRadius: 10,
                        padding: '10px 14px',
                      }}
                    >
                      {contactMsg === 'Saved!' ? '✓ ' : ''}
                      {contactMsg}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button
                      onClick={() => setModal(null)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 12,
                        border: '1.5px solid var(--pf-border-strong)',
                        background: 'var(--pf-surface)',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: 'var(--pf-ink-muted)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveContact}
                      disabled={contactSaving}
                      style={{
                        flex: 2,
                        padding: '12px',
                        borderRadius: 12,
                        border: 'none',
                        background:
                          'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                        color: 'var(--pf-surface)',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {contactSaving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Security */}
            {modal === 'security' && (
              <>
                <h2
                  id="modal-title"
                  style={{ fontSize: 20, fontWeight: 800, color: 'var(--pf-ink)', marginBottom: 4 }}
                >
                  Change Password
                </h2>
                <p style={{ fontSize: 13, color: 'var(--pf-ink-muted)', marginBottom: 24 }}>
                  Choose a strong password of at least 6 characters.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={labelStyle}>New Password</label>
                    <input
                      style={inputStyle}
                      type="password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Confirm New Password</label>
                    <input
                      style={inputStyle}
                      type="password"
                      value={confirmPw}
                      onChange={(e) => setConfirmPw(e.target.value)}
                      placeholder="Repeat new password"
                    />
                  </div>
                  {pwError && (
                    <p
                      role="alert"
                      style={{
                        fontSize: 13,
                        color: '#DC2626',
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: 10,
                        padding: '10px 14px',
                      }}
                    >
                      {pwError}
                    </p>
                  )}
                  {pwMsg && (
                    <p
                      role="alert"
                      style={{
                        fontSize: 13,
                        color: '#059669',
                        background: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        borderRadius: 10,
                        padding: '10px 14px',
                      }}
                    >
                      ✓ {pwMsg}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button
                      onClick={() => setModal(null)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: 12,
                        border: '1.5px solid var(--pf-border-strong)',
                        background: 'var(--pf-surface)',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: 'var(--pf-ink-muted)',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={savePassword}
                      disabled={pwSaving}
                      style={{
                        flex: 2,
                        padding: '12px',
                        borderRadius: 12,
                        border: 'none',
                        background:
                          'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                        color: 'var(--pf-surface)',
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {pwSaving ? 'Updating…' : 'Update Password'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Settings */}
            {modal === 'settings' && (
              <>
                <h2
                  id="modal-title"
                  style={{ fontSize: 20, fontWeight: 800, color: 'var(--pf-ink)', marginBottom: 4 }}
                >
                  Settings
                </h2>
                <p style={{ fontSize: 13, color: 'var(--pf-ink-muted)', marginBottom: 24 }}>
                  Customise your PawFinder experience.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    {
                      label: 'Dark Mode',
                      sub: 'Switch to a dark colour scheme',
                      value: darkMode,
                      onChange: toggleDark,
                    },
                    {
                      label: 'Email Notifications',
                      sub: 'Get emailed when someone reports finding your pet',
                      value: emailNotifs,
                      onChange: toggleNotifs,
                    },
                  ].map(({ label, sub, value, onChange }, i, arr) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '18px 0',
                        borderBottom: i < arr.length - 1 ? '1px solid var(--pf-border)' : 'none',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--pf-ink)' }}>
                          {label}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', marginTop: 2 }}>
                          {sub}
                        </div>
                      </div>
                      <Toggle on={value} onChange={onChange} />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setModal(null)}
                  style={{
                    width: '100%',
                    marginTop: 24,
                    padding: '12px',
                    borderRadius: 12,
                    border: '1.5px solid var(--pf-border-strong)',
                    background: 'var(--pf-surface)',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: 'var(--pf-ink-muted)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
