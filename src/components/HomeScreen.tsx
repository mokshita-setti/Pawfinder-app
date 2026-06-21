'use client';
import {
  PawIcon,
  PawFinderLogo,
  HeartFill,
  IcoScan,
  StepSvg1,
  StepSvg2,
  StepSvg3,
  StepSvg4,
  WhySvg1,
  WhySvg2,
  WhySvg3,
  NavHome,
  NavPets,
  NavNotif,
  NavProfile,
} from './Icons';
import { HeroDog } from './Illustrations';
import { HOW_STEPS, WHY_QR } from '@/data/pets';
import { useIsMobile } from '@/hooks/useIsMobile';

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

const STEP_SVGS = [
  <StepSvg1 key="s1" />,
  <StepSvg2 key="s2" />,
  <StepSvg3 key="s3" />,
  <StepSvg4 key="s4" />,
];
const WHY_SVGS = [<WhySvg1 key="w1" />, <WhySvg2 key="w2" />, <WhySvg3 key="w3" />];

export default function HomeScreen({ nav }: { nav: (s: Screen) => void }) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        background: '#F8FAFC',
        overflowX: 'hidden',
      }}
    >
      {/* Top Nav */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(139,92,246,.08)',
          padding: isMobile ? '0 16px' : '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => nav('home')}
        >
          <PawFinderLogo size={36} hideText />
          <span
            style={{
              fontSize: isMobile ? 17 : 20,
              fontWeight: 800,
              color: '#7C3AED',
              letterSpacing: '-.5px',
            }}
          >
            PawFinder
          </span>
        </div>

        {/* Nav items — hidden on mobile */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {[
              { id: 'home' as Screen, label: 'Home', Icon: NavHome },
              { id: 'pets' as Screen, label: 'My Pets', Icon: NavPets },
              { id: 'notif' as Screen, label: 'Alerts', Icon: NavNotif },
              { id: 'me' as Screen, label: 'Profile', Icon: NavProfile },
            ].map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => nav(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '8px 16px',
                  borderRadius: 100,
                  background: 'transparent',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#64748B',
                  cursor: 'pointer',
                  transition: 'all .15s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F5F3FF';
                  (e.currentTarget as HTMLButtonElement).style.color = '#7C3AED';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = '#64748B';
                }}
              >
                <Icon active={false} />
                {label}
              </button>
            ))}
          </nav>
        )}

        {/* CTA / mobile icon nav */}
        {isMobile ? (
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'home' as Screen, Icon: NavHome },
              { id: 'pets' as Screen, Icon: NavPets },
              { id: 'notif' as Screen, Icon: NavNotif },
              { id: 'me' as Screen, Icon: NavProfile },
            ].map(({ id, Icon }) => (
              <button
                key={id}
                onClick={() => nav(id)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon active={false} />
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => nav('register')}
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
            Register My Pet
          </button>
        )}
      </header>

      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #EDE9FE 0%, #E0E7FF 40%, #EFF6FF 100%)',
          padding: isMobile ? '36px 20px 40px' : '72px 80px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 32 : 48,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative paws */}
        <div style={{ position: 'absolute', top: 24, right: 340, opacity: 0.08 }}>
          <PawIcon size={60} color="#8B5CF6" />
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: 60, opacity: 0.06 }}>
          <PawIcon size={40} color="#60A5FA" />
        </div>
        <div style={{ position: 'absolute', top: 40, left: 200, opacity: 0.05 }}>
          <PawIcon size={24} color="#C084FC" />
        </div>

        {/* Left content */}
        <div style={{ flex: 1, maxWidth: 560 }}>
          {/* Logo mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
            <PawIcon size={28} color="#8B5CF6" />
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#8B5CF6',
                  letterSpacing: '-.5px',
                  lineHeight: 1,
                }}
              >
                PawFinder
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8', letterSpacing: '.4px', marginTop: 3 }}>
                Scan. Identify. Reunite.
              </div>
            </div>
          </div>

          <h1
            style={{
              fontSize: isMobile ? 38 : 52,
              fontWeight: 900,
              color: '#7C3AED',
              lineHeight: 1.1,
              letterSpacing: isMobile ? '-1px' : '-2px',
              marginBottom: 20,
            }}
          >
            Scan. Identify.
            <br />
            Reunite.
          </h1>
          <p
            style={{
              fontSize: 17,
              color: '#475569',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 460,
            }}
          >
            PawFinder gives every pet a{' '}
            <strong style={{ color: '#1E293B' }}>unique QR code tag</strong>. If your pet is ever
            lost, anyone who finds them can scan the tag with any smartphone to instantly see your
            contact info — no app needed.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => nav('register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 28px',
                borderRadius: 100,
                background: 'linear-gradient(135deg,#A78BFA,#8B5CF6)',
                color: '#fff',
                border: 'none',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(139,92,246,.35)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <PawIcon size={16} color="#fff" /> Register My Pet →
            </button>
            <button
              onClick={() => nav('pets')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 100,
                background: '#fff',
                color: '#7C3AED',
                border: '1.5px solid #DDD6FE',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,.06)',
              }}
            >
              <svg
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7C3AED"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              My Pets
            </button>
            <button
              onClick={() => nav('demo')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '14px 24px',
                borderRadius: 100,
                background: '#fff',
                color: '#64748B',
                border: '1.5px solid #E5E7EB',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                boxShadow: '0 2px 8px rgba(0,0,0,.04)',
              }}
            >
              <svg
                width={15}
                height={15}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              View Demo Profiles
            </button>
          </div>
        </div>

        {/* Right — dog illustration with bubble */}
        <div
          style={{ flexShrink: 0, position: 'relative', alignSelf: isMobile ? 'center' : 'auto' }}
        >
          {/* Speech bubble — hidden on mobile to save space */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                top: -16,
                left: -20,
                zIndex: 2,
                background: '#fff',
                borderRadius: 20,
                padding: '10px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,.10)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 700,
                color: '#1E293B',
                whiteSpace: 'nowrap',
              }}
            >
              <PawIcon size={14} color="#8B5CF6" /> Hi! I&apos;m Leo!
            </div>
          )}

          {/* Floating card — hidden on mobile */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: -20,
                zIndex: 2,
                background: '#fff',
                borderRadius: 16,
                padding: '12px 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,.10)',
                maxWidth: 180,
              }}
            >
              <HeartFill size={14} color="#8B5CF6" />
              <p style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 1.4 }}>
                One scan can bring them back home.
              </p>
            </div>
          )}

          {/* Circular dog photo */}
          <div
            style={{
              width: isMobile ? 220 : 340,
              height: isMobile ? 220 : 340,
              borderRadius: '50%',
              border: '7px solid #fff',
              boxShadow: '0 20px 60px rgba(139,92,246,.2), 0 0 0 2px rgba(139,92,246,.1)',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=700&auto=format&fit=crop&q=80"
              alt="Leo the Golden Retriever"
              fetchPriority="high"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
              }}
            />
          </div>
        </div>
      </section>

      {/* About PawFinder */}
      <section style={{ padding: isMobile ? '40px 20px' : '64px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#F5F3FF',
              borderRadius: 100,
              padding: '6px 16px 6px 10px',
              marginBottom: 20,
            }}
          >
            <HeartFill size={13} color="#EC4899" />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#7C3AED' }}>About PawFinder</span>
          </div>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: '#1E293B',
              letterSpacing: '-1px',
              marginBottom: 8,
            }}
          >
            Built for pets.
          </h2>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: '#7C3AED',
              letterSpacing: '-1px',
              marginBottom: 20,
            }}
          >
            Powered by technology.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: '#475569',
              lineHeight: 1.7,
              maxWidth: 620,
              margin: '0 auto',
            }}
          >
            PawFinder was created to help families reunite with their pets faster. When a pet gets
            lost, every minute matters. PawFinder uses{' '}
            <strong style={{ color: '#1E293B' }}>QR code technology</strong> to create a digital
            identity for your pet — so anyone who finds them can instantly reach you, no app needed.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: '#EEEDF8', padding: isMobile ? '40px 20px' : '64px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.8px',
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
                marginBottom: 8,
              }}
            >
              <div style={{ height: 1, width: 48, background: '#CBD5E1' }} />
              <PawIcon size={14} color="#8B5CF6" />
              <div style={{ height: 1, width: 48, background: '#CBD5E1' }} />
            </div>
            <p style={{ fontSize: 14, color: '#64748B' }}>
              Four simple steps to keep your pet safe — forever.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
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

      {/* Why a QR Code? */}
      <section style={{ padding: isMobile ? '40px 20px' : '64px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.8px',
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
                maxWidth: 520,
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
                  background: '#F8FAFC',
                  borderRadius: 18,
                  padding: '20px 24px',
                  display: 'flex',
                  gap: 18,
                  alignItems: 'flex-start',
                  border: '1px solid #F1F5F9',
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
          padding: isMobile ? '24px 20px' : '28px 80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 12 : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <PawIcon size={16} color="#8B5CF6" />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#8B5CF6' }}>PawFinder</span>
        </div>
        <p style={{ fontSize: 12, color: '#94A3B8' }}>
          © 2026 PawFinder. Keeping pets safe, one scan at a time.
        </p>
        <button
          onClick={() => nav('scan')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 100,
            background: 'transparent',
            border: '1.5px solid #DDD6FE',
            color: '#8B5CF6',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <IcoScan size={14} color="#8B5CF6" /> Scan QR Demo
        </button>
      </footer>
    </div>
  );
}
