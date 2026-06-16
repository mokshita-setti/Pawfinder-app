'use client';
import { useState } from 'react';
import { PawIcon, IcoArrowLeft, IcoCheck, IcoPhone, HeartFill } from './Icons';
import { PfBtn, PfInput, PfTextarea, PfCard, BottomNav } from './UI';
import { AvatarBella } from './Avatars';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me';
type Step = 'found' | 'profile' | 'form' | 'thanks';

const TopBar = ({ onBack }: { onBack: () => void }) => (
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
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span
        style={{ fontSize: '17px', fontWeight: '800', color: '#8B5CF6', letterSpacing: '-.5px' }}
      >
        PawFinder
      </span>
      <PawIcon size={17} color="#8B5CF6" />
    </div>
    <div style={{ width: 36 }} />
  </div>
);

export default function ScanFlowScreen({ nav }: { nav: (s: Screen) => void }) {
  const [step, setStep] = useState<Step>('found');
  const [f, setF] = useState({ name: '', phone: '', location: '', notes: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  const go = (s: Step) => setStep(s);

  if (step === 'found')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopBar onBack={() => nav('home')} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F8FAFC',
            padding: '32px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#EDE9FE 0%,#DDD6FE 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 8px 36px rgba(139,92,246,.2)',
            }}
          >
            <PawIcon size={66} color="#8B5CF6" />
          </div>
          <div style={{ position: 'absolute', top: '22%', left: '15%', opacity: 0.2 }}>
            <PawIcon size={18} color="#A78BFA" />
          </div>
          <div style={{ position: 'absolute', top: '28%', right: '14%', opacity: 0.15 }}>
            <PawIcon size={13} color="#60A5FA" />
          </div>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#1E293B',
              letterSpacing: '-.5px',
              marginBottom: '10px',
            }}
          >
            You found Bella!
          </h2>
          <p
            style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.6', marginBottom: '36px' }}
          >
            Thank you for helping
            <br />
            this pet.
          </p>
          <div style={{ width: '100%', maxWidth: '280px' }}>
            <PfBtn variant="primary" onClick={() => go('profile')}>
              View Pet Profile
            </PfBtn>
          </div>
        </div>
        <BottomNav active="notif" onNav={nav} />
      </div>
    );

  if (step === 'profile')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopBar onBack={() => go('found')} />
        <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC', padding: '20px' }}>
          <PfCard style={{ marginBottom: '14px', textAlign: 'center', padding: '24px 20px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <AvatarBella size={76} />
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#8B5CF6',
                letterSpacing: '-.5px',
                marginBottom: '3px',
              }}
            >
              Bella
            </h2>
            <p style={{ fontSize: '13.5px', color: '#64748B' }}>Golden Retriever</p>
            <p style={{ fontSize: '12.5px', color: '#94A3B8' }}>4 Years Old</p>
          </PfCard>
          <PfCard style={{ marginBottom: '16px' }}>
            {[
              { label: 'Owner', value: 'Sarah Johnson' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Medical Notes', value: 'Needs daily medication' },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #F8FAFC',
                }}
              >
                <span style={{ fontSize: '12.5px', color: '#94A3B8', fontWeight: '500' }}>
                  {label}
                </span>
                <span style={{ fontSize: '12.5px', color: '#1E293B', fontWeight: '500' }}>
                  {value}
                </span>
              </div>
            ))}
          </PfCard>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <PfBtn variant="secondary" small>
              <IcoPhone size={13} color="#8B5CF6" /> Call Owner
            </PfBtn>
            <PfBtn variant="primary" small onClick={() => go('form')}>
              I Found This Pet
            </PfBtn>
          </div>
        </div>
      </div>
    );

  if (step === 'form')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TopBar onBack={() => go('profile')} />
        <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC', padding: '20px' }}>
          <h1
            style={{
              fontSize: '21px',
              fontWeight: '800',
              color: '#1E293B',
              letterSpacing: '-.5px',
              marginBottom: '3px',
            }}
          >
            I Found This Pet
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
            Please help us reunite <strong style={{ color: '#8B5CF6' }}>Bella</strong> with her
            family.
          </p>
          <PfInput
            label="Your Name"
            value={f.name}
            onChange={set('name')}
            placeholder="e.g. John Doe"
          />
          <PfInput
            label="Phone Number"
            value={f.phone}
            onChange={set('phone')}
            placeholder="e.g. +91 98765 43210"
            type="tel"
          />
          <PfInput
            label="Location"
            value={f.location}
            onChange={set('location')}
            placeholder="e.g. Park Street, Mumbai"
          />
          <PfTextarea
            label="Additional Notes"
            value={f.notes}
            onChange={set('notes')}
            placeholder="Any additional information…"
            optional
          />
          <PfBtn variant="primary" onClick={() => go('thanks')}>
            Submit
          </PfBtn>
          <div style={{ height: 24 }} />
        </div>
      </div>
    );

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F8FAFC' }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#EDE9FE 0%,#DDD6FE 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 8px 36px rgba(139,92,246,.15)',
          }}
        >
          <IcoCheck size={58} />
        </div>
        <h2
          style={{
            fontSize: '26px',
            fontWeight: '800',
            color: '#1E293B',
            letterSpacing: '-.6px',
            marginBottom: '10px',
          }}
        >
          Thank You!
        </h2>
        <p style={{ fontSize: '15px', color: '#64748B', lineHeight: '1.65', marginBottom: '14px' }}>
          The owner has been notified.
          <br />
          You&apos;re amazing!
        </p>
        <HeartFill size={30} color="#C084FC" />
        <div style={{ width: '100%', maxWidth: '280px', marginTop: '42px' }}>
          <PfBtn variant="primary" onClick={() => nav('home')}>
            Back to Home
          </PfBtn>
        </div>
      </div>
      <BottomNav active="notif" onNav={nav} />
    </div>
  );
}
