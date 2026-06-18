'use client';
import {
  PawIcon,
  IcoScan,
  HeartFill,
  StepSvg1,
  StepSvg2,
  StepSvg3,
  StepSvg4,
  WhySvg1,
  WhySvg2,
  WhySvg3,
} from './Icons';
import { HOW_STEPS, WHY_QR } from '@/data/pets';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

const STEP_SVGS = [
  <StepSvg1 key="s1" />,
  <StepSvg2 key="s2" />,
  <StepSvg3 key="s3" />,
  <StepSvg4 key="s4" />,
];
const WHY_SVGS = [<WhySvg1 key="w1" />, <WhySvg2 key="w2" />, <WhySvg3 key="w3" />];

export default function HomeScreen({ nav }: { nav: (s: Screen, petId?: string) => void }) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}
    >
      {/* Top Navbar */}
      <header
        style={{
          background: '#fff',
          borderBottom: '1px solid #F1F5F9',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        {/* Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          onClick={() => nav('home')}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: '#EDE9FE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PawIcon size={20} color="#8B5CF6" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: '#8B5CF6', letterSpacing: '-.4px' }}>
            PawFinder
          </span>
        </div>

        {/* Nav links — hidden on mobile */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="pf-dev-nav">
          {[
            { label: 'Home', screen: 'home' as Screen },
            { label: 'My Pets', screen: 'pets' as Screen },
            { label: 'Alerts', screen: 'notif' as Screen },
            { label: 'Profile', screen: 'me' as Screen },
          ].map(({ label, screen }) => (
            <button
              key={label}
              onClick={() => nav(screen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 0',
                fontFamily: 'inherit',
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => nav('register')}
          style={{
            background: '#8B5CF6',
            color: '#fff',
            border: 'none',
            borderRadius: 100,
            padding: '10px 22px',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
            boxShadow: '0 4px 14px rgba(139,92,246,.3)',
            whiteSpace: 'nowrap',
          }}
        >
          Register My Pet
        </button>
      </header>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(155deg,#EDE9FE 0%,#F0EFFE 40%,#EFF6FF 100%)',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          padding: '60px 48px',
          gap: 48,
          position: 'relative',
          overflow: 'hidden',
          minHeight: 480,
        }}
      >
        {/* Background paw prints */}
        <div style={{ position: 'absolute', top: 32, right: 200, opacity: 0.07 }}>
          <PawIcon size={80} color="#8B5CF6" />
        </div>
        <div style={{ position: 'absolute', bottom: 40, left: 48, opacity: 0.05 }}>
          <PawIcon size={50} color="#8B5CF6" />
        </div>

        {/* Left: text */}
        <div style={{ flex: 1, maxWidth: 560 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <PawIcon size={16} color="#8B5CF6" />
            <span
              style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6', letterSpacing: '-.1px' }}
            >
              PawFinder
            </span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>· Scan. Identify. Reunite.</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px,5vw,64px)',
              fontWeight: 900,
              color: '#8B5CF6',
              lineHeight: 1.1,
              letterSpacing: '-2px',
              marginBottom: 20,
            }}
          >
            Scan. Identify.
            <br />
            Reunite.
          </h1>

          <p
            style={{
              fontSize: 16,
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 480,
            }}
          >
            PawFinder gives every pet a{' '}
            <strong style={{ color: '#1E293B' }}>unique QR code tag</strong>. If your pet is ever
            lost, anyone who finds them can scan the tag with any smartphone to instantly see your
            contact info — no app needed.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
            <button
              onClick={() => nav('register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#8B5CF6',
                color: '#fff',
                border: 'none',
                borderRadius: 100,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                boxShadow: '0 4px 16px rgba(139,92,246,.35)',
              }}
            >
              <PawIcon size={16} color="#fff" /> Register My Pet →
            </button>
            <button
              onClick={() => nav('pets')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                color: '#8B5CF6',
                border: '1.5px solid #DDD6FE',
                borderRadius: 100,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
              My Pets
            </button>
          </div>
          <button
            onClick={() => nav('demo')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: '#64748B',
              border: '1.5px solid #E2E8F0',
              borderRadius: 100,
              padding: '11px 24px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#64748B"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            View Demo Profiles
          </button>
        </div>

        {/* Right: dog photo */}
        <div
          style={{
            flexShrink: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Speech bubble */}
          <div
            style={{
              position: 'absolute',
              top: -16,
              left: -20,
              background: '#fff',
              borderRadius: 16,
              padding: '10px 16px',
              boxShadow: '0 4px 20px rgba(0,0,0,.1)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 2,
              whiteSpace: 'nowrap',
            }}
          >
            <PawIcon size={14} color="#8B5CF6" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>
              Hi! I&apos;m Leo!
            </span>
          </div>

          {/* Circle photo */}
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '6px solid #fff',
              boxShadow: '0 20px 60px rgba(139,92,246,.25)',
              background: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)',
              flexShrink: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=560&h=560&fit=crop&crop=face"
              alt="Happy dog"
              width={280}
              height={280}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Bottom card */}
          <div
            style={{
              position: 'absolute',
              bottom: -16,
              right: -24,
              background: '#fff',
              borderRadius: 16,
              padding: '12px 18px',
              boxShadow: '0 4px 20px rgba(0,0,0,.1)',
              maxWidth: 200,
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <HeartFill size={14} color="#EC4899" />
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', lineHeight: 1.4 }}>
              One scan can bring them back home.
            </p>
          </div>
        </div>
      </section>

      {/* About PawFinder */}
      <section style={{ padding: '64px 48px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#EDE9FE',
              borderRadius: 100,
              padding: '5px 14px 5px 8px',
              marginBottom: 20,
            }}
          >
            <HeartFill size={13} color="#EC4899" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#7C3AED' }}>About PawFinder</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px,3.5vw,44px)',
              fontWeight: 900,
              color: '#1E293B',
              letterSpacing: '-1px',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Built for pets.
            <br />
            <span style={{ color: '#8B5CF6' }}>Powered by technology.</span>
          </h2>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.75, maxWidth: 640 }}>
            PawFinder was created to help families reunite with their pets faster. When a pet gets
            lost, every minute matters. PawFinder uses{' '}
            <strong style={{ color: '#1E293B' }}>QR code technology</strong> to create a digital
            identity for your pet — so anyone who finds them can instantly reach you, no app needed.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: '#F5F3FF', padding: '64px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 'clamp(24px,3vw,36px)',
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.5px',
                marginBottom: 12,
              }}
            >
              How PawFinder Works
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginBottom: 10,
              }}
            >
              <div style={{ height: 1, width: 40, background: '#C4B5FD' }} />
              <PawIcon size={14} color="#8B5CF6" />
              <div style={{ height: 1, width: 40, background: '#C4B5FD' }} />
            </div>
            <p style={{ fontSize: 14, color: '#64748B' }}>
              Four simple steps to keep your pet safe — forever.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: 16,
            }}
          >
            {HOW_STEPS.map(({ num, label, desc }, i) => (
              <div key={num} style={{ background: '#fff', borderRadius: 20, padding: '24px 20px' }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg,${i < 2 ? '#60A5FA' : '#A78BFA'} 0%,#8B5CF6 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                    boxShadow: '0 4px 14px rgba(139,92,246,.25)',
                  }}
                >
                  {STEP_SVGS[i]}
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#8B5CF6', marginBottom: 6 }}>
                  {num}. {label}
                </p>
                <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why QR */}
      <section style={{ background: '#fff', padding: '64px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2
              style={{
                fontSize: 'clamp(24px,3vw,36px)',
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.5px',
                marginBottom: 12,
              }}
            >
              Why a QR Code?
            </h2>
            <p
              style={{
                fontSize: 14,
                color: '#64748B',
                lineHeight: 1.7,
                maxWidth: 540,
                margin: '0 auto',
              }}
            >
              A QR code is a scannable barcode any smartphone camera can read instantly. PawFinder
              prints your pet&apos;s unique code on a collar tag — no batteries, no signal needed.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {WHY_QR.map(({ label, desc }, i) => (
              <div
                key={label}
                style={{
                  background: '#F5F3FF',
                  borderRadius: 16,
                  padding: '20px 24px',
                  display: 'flex',
                  gap: 18,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(139,92,246,.1)',
                  }}
                >
                  {WHY_SVGS[i]}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: '#F8FAFC',
          borderTop: '1px solid #F1F5F9',
          padding: '24px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <PawIcon size={14} color="#8B5CF6" />
        <span style={{ fontSize: 13, color: '#94A3B8' }}>
          PawFinder · Built for pets, powered by technology.
        </span>
      </footer>
    </div>
  );
}
