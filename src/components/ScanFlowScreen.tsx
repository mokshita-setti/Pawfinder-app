'use client';
import { useState } from 'react';
import { PawIcon, IcoCheck, IcoPhone, HeartFill } from './Icons';
import { PfBtn, PfInput, PfTextarea, PfCard, TopNav } from './UI';
import { AvatarBella } from './Avatars';

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
type Step = 'found' | 'profile' | 'form' | 'thanks';

export default function ScanFlowScreen({ nav }: { nav: (s: Screen) => void }) {
  const [step, setStep] = useState<Step>('found');
  const [f, setF] = useState({ name: '', phone: '', location: '', notes: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));
  const go = (s: Step) => setStep(s);

  if (step === 'found')
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="scan" onNav={nav} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 32,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,var(--pf-purple-tint),var(--pf-purple-muted))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
              boxShadow: '0 8px 36px rgba(139,92,246,.2)',
            }}
          >
            <PawIcon size={72} color="var(--pf-purple)" />
          </div>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: 'var(--pf-ink)',
              letterSpacing: '-.5px',
              marginBottom: 12,
            }}
          >
            You found Leo!
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--pf-ink-muted)',
              lineHeight: 1.6,
              marginBottom: 40,
            }}
          >
            Thank you for helping this pet.
          </p>
          <div style={{ width: '100%', maxWidth: 320 }}>
            <PfBtn variant="primary" onClick={() => go('profile')}>
              View Pet Profile
            </PfBtn>
          </div>
        </div>
      </div>
    );

  if (step === 'profile')
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="scan" onNav={nav} />
        <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <PfCard style={{ marginBottom: 20, textAlign: 'center', padding: '32px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <AvatarBella size={88} />
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: 'var(--pf-purple)',
                  letterSpacing: '-.5px',
                  marginBottom: 4,
                }}
              >
                Leo
              </h2>
              <p style={{ fontSize: 15, color: 'var(--pf-ink-muted)' }}>Golden Retriever</p>
              <p style={{ fontSize: 13, color: 'var(--pf-ink-subtle)' }}>4 Years Old</p>
            </PfCard>
            <PfCard style={{ marginBottom: 20 }}>
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
                    padding: '12px 0',
                    borderBottom: '1px solid var(--pf-bg)',
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--pf-ink-subtle)', fontWeight: 500 }}>
                    {label}
                  </span>
                  <span style={{ fontSize: 13.5, color: 'var(--pf-ink)', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </PfCard>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <PfBtn variant="secondary" small>
                <IcoPhone size={14} color="var(--pf-purple)" /> Call Owner
              </PfBtn>
              <PfBtn variant="primary" small onClick={() => go('form')}>
                I Found This Pet
              </PfBtn>
            </div>
          </div>
        </div>
      </div>
    );

  if (step === 'form')
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="scan" onNav={nav} />
        <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: 'var(--pf-ink)',
                letterSpacing: '-.5px',
                marginBottom: 6,
              }}
            >
              I Found This Pet
            </h1>
            <p style={{ fontSize: 15, color: 'var(--pf-ink-muted)', marginBottom: 32 }}>
              Please help us reunite <strong style={{ color: 'var(--pf-purple)' }}>Leo</strong> with
              her family.
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
          </div>
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
      <TopNav active="scan" onNav={nav} />
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
            width: 108,
            height: 108,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,var(--pf-purple-tint),var(--pf-purple-muted))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
            boxShadow: '0 8px 36px rgba(139,92,246,.15)',
          }}
        >
          <IcoCheck size={60} />
        </div>
        <h2
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: 'var(--pf-ink)',
            letterSpacing: '-.6px',
            marginBottom: 12,
          }}
        >
          Thank You!
        </h2>
        <p
          style={{ fontSize: 16, color: 'var(--pf-ink-muted)', lineHeight: 1.65, marginBottom: 16 }}
        >
          The owner has been notified.
          <br />
          You&apos;re amazing!
        </p>
        <HeartFill size={32} color="#C084FC" />
        <div style={{ width: '100%', maxWidth: 320, marginTop: 48 }}>
          <PfBtn variant="primary" onClick={() => nav('home')}>
            Back to Home
          </PfBtn>
        </div>
      </div>
    </div>
  );
}
