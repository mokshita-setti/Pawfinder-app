'use client';
import { useEffect, useState } from 'react';
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

type Modal = 'contact' | 'security' | null;

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 12,
  border: '1.5px solid #E5E7EB',
  fontSize: 14,
  color: '#1E293B',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  boxSizing: 'border-box',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 12.5,
  fontWeight: 600,
  color: '#1E293B',
  marginBottom: 5,
};

export default function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [petCount, setPetCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState<Modal>(null);

  // Contact Info form state
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [contactSaving, setContactSaving] = useState(false);
  const [contactMsg, setContactMsg] = useState('');

  // Security form state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');
  const [pwError, setPwError] = useState('');

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoaded(true);
        return;
      }
      setEmail(user.email ?? '');
      const metaName = user.user_metadata?.name as string | undefined;
      const metaPhone = user.user_metadata?.phone as string | undefined;
      if (metaName) setName(metaName);
      else {
        const { data } = await supabase.from('users').select('name').eq('id', user.id).single();
        if (data?.name) setName(data.name);
      }
      if (metaPhone) setPhone(metaPhone);
      const { count } = await supabase
        .from('pets')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);
      setPetCount(count ?? 0);
      setLoaded(true);
    })();
  }, []);

  const openContact = () => {
    setEditName(name);
    setEditPhone(phone);
    setContactMsg('');
    setModal('contact');
  };

  const saveContact = async () => {
    setContactSaving(true);
    setContactMsg('');
    const { error } = await supabase.auth.updateUser({
      data: { name: editName, phone: editPhone },
    });
    if (!error) {
      setName(editName);
      setPhone(editPhone);
      setContactMsg('Saved!');
    } else {
      setContactMsg(error.message);
    }
    setContactSaving(false);
  };

  const openSecurity = () => {
    setCurrentPw('');
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
      setCurrentPw('');
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
      icon: <PawIcon size={18} color="#8B5CF6" />,
      label: 'My Pets',
      sub: `${petCount} registered`,
      onClick: () => nav('pets'),
    },
    {
      icon: <IcoPhone size={18} color="#60A5FA" />,
      label: 'Contact Info',
      sub: 'Update name & phone',
      onClick: openContact,
    },
    {
      icon: <IcoShield size={18} color="#C084FC" />,
      label: 'Privacy & Security',
      sub: 'Change password',
      onClick: openSecurity,
    },
    {
      icon: <IcoSettings size={18} color="#94A3B8" />,
      label: 'Settings',
      sub: 'App preferences',
      onClick: undefined,
    },
  ];

  if (loaded && !email)
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
              background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
              boxShadow: '0 6px 24px rgba(139,92,246,.3)',
            }}
          >
            <span style={{ fontSize: 36 }}>🐾</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1E293B', marginBottom: 8 }}>
            You&apos;re not signed in
          </h2>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
            Sign in to manage your pets and view your profile.
          </p>
          <a
            href="/login"
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              borderRadius: 100,
              background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
              color: '#fff',
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
                {loaded ? initials || '?' : '…'}
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
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 4 }}>{email}</p>
            {phone && <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>{phone}</p>}
            {!phone && <div style={{ marginBottom: 12 }} />}
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

      {/* Modal backdrop */}
      {modal && (
        <div
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
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: 32,
              width: '100%',
              maxWidth: 440,
              boxShadow: '0 20px 60px rgba(0,0,0,.15)',
            }}
          >
            {/* Contact Info Modal */}
            {modal === 'contact' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 6 }}>
                  Contact Info
                </h2>
                <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
                  This info helps pet finders reach you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      style={inputStyle}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Your full name"
                    />
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
                  {contactMsg && (
                    <p
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
                        border: '1.5px solid #E5E7EB',
                        background: '#fff',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: '#64748B',
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
                        background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                        color: '#fff',
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

            {/* Security Modal */}
            {modal === 'security' && (
              <>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1E293B', marginBottom: 6 }}>
                  Change Password
                </h2>
                <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
                  Choose a strong password of at least 6 characters.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
                        border: '1.5px solid #E5E7EB',
                        background: '#fff',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        color: '#64748B',
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
                        background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                        color: '#fff',
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
          </div>
        </div>
      )}
    </div>
  );
}
