'use client';
import {
  PawIcon,
  HeartFill,
  IcoScan,
  StepSvg1,
  StepSvg2,
  StepSvg3,
  StepSvg4,
  WhySvg1,
  WhySvg2,
  WhySvg3,
} from './Icons';
import { PfTopBar, PfBtn, BottomNav } from './UI';
import { HeroDog } from './Illustrations';
import { HOW_STEPS, WHY_QR } from '@/data/pets';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me';

const STEP_SVGS = [
  <StepSvg1 key="s1" />,
  <StepSvg2 key="s2" />,
  <StepSvg3 key="s3" />,
  <StepSvg4 key="s4" />,
];
const WHY_SVGS = [<WhySvg1 key="w1" />, <WhySvg2 key="w2" />, <WhySvg3 key="w3" />];

export default function HomeScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PfTopBar />
      <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC' }}>
        {/* Hero */}
        <div
          style={{
            background: 'linear-gradient(155deg,#EDE9FE 0%,#EFF6FF 55%,#F8FAFC 100%)',
            padding: '22px 20px 28px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 14, right: 22, opacity: 0.12 }}>
            <PawIcon size={34} color="#8B5CF6" />
          </div>
          <div style={{ position: 'absolute', bottom: 28, left: 18, opacity: 0.09 }}>
            <PawIcon size={20} color="#60A5FA" />
          </div>
          <div style={{ position: 'absolute', top: 60, left: 10, opacity: 0.07 }}>
            <PawIcon size={14} color="#C084FC" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ flex: 1, paddingTop: '6px' }}>
              <h1
                style={{
                  fontSize: '28px',
                  fontWeight: '900',
                  color: '#7C3AED',
                  lineHeight: '1.15',
                  letterSpacing: '-1px',
                  marginBottom: '10px',
                }}
              >
                Scan. Identify. Reunite.
              </h1>
              <p
                style={{
                  fontSize: '12.5px',
                  color: '#64748B',
                  lineHeight: '1.5',
                  marginBottom: '8px',
                }}
              >
                Every pet deserves a way home.
              </p>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.6' }}>
                PawFinder gives every pet a{' '}
                <strong style={{ color: '#1E293B' }}>unique QR code tag</strong>. If your pet is
                ever lost, anyone who finds them can scan the tag with any smartphone to instantly
                see your contact info — no app needed.
              </p>
            </div>
            <div style={{ flexShrink: 0, marginTop: '-6px' }}>
              <HeroDog size={152} />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div
          style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
          <PfBtn variant="primary" onClick={() => nav('register')}>
            <PawIcon size={15} color="#fff" /> Register My Pet
          </PfBtn>
          <PfBtn variant="secondary" onClick={() => nav('petprofile')}>
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            View Demo Profile
          </PfBtn>
          <PfBtn variant="outline" onClick={() => nav('scan')}>
            <IcoScan size={16} color="#8B5CF6" /> Scan QR Demo
          </PfBtn>
        </div>

        {/* About PawFinder */}
        <div style={{ padding: '18px 20px 0' }}>
          <div
            style={{
              background: 'linear-gradient(145deg,#EDE9FE 0%,#F5F3FF 100%)',
              borderRadius: '20px',
              padding: '22px 20px 24px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', bottom: -8, right: 12, opacity: 0.07 }}>
              <PawIcon size={72} color="#8B5CF6" />
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fff',
                borderRadius: '100px',
                padding: '5px 13px 5px 8px',
                marginBottom: '14px',
                boxShadow: '0 1px 6px rgba(139,92,246,.12)',
                whiteSpace: 'nowrap',
              }}
            >
              <HeartFill size={13} color="#EC4899" />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#1E293B',
                  letterSpacing: '-.1px',
                }}
              >
                About PawFinder
              </span>
            </div>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: '900',
                color: '#1E293B',
                lineHeight: '1.15',
                letterSpacing: '-.6px',
                marginBottom: '2px',
              }}
            >
              Built for pets.
            </h2>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: '900',
                color: '#7C3AED',
                lineHeight: '1.15',
                letterSpacing: '-.6px',
                marginBottom: '14px',
              }}
            >
              Powered by technology.
            </h2>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.65' }}>
              PawFinder was created to help families reunite with their pets faster. When a pet gets
              lost, every minute matters. PawFinder uses{' '}
              <strong style={{ color: '#1E293B' }}>QR code technology</strong> to create a digital
              identity for your pet — so anyone who finds them can instantly reach you, no app
              needed.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div style={{ background: '#EEEDF8', padding: '24px 16px 28px', marginTop: '18px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#1E293B',
                letterSpacing: '-.5px',
                marginBottom: '8px',
              }}
            >
              How PawFinder Works
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <div style={{ height: '1px', width: 32, background: '#CBD5E1' }} />
              <PawIcon size={13} color="#8B5CF6" />
              <div style={{ height: '1px', width: 32, background: '#CBD5E1' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Four simple steps to keep your pet safe — forever.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {HOW_STEPS.map(({ num, label, desc }, i) => (
              <div
                key={num}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '16px 14px',
                  position: 'relative',
                }}
              >
                {(i === 0 || i === 2) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '34px',
                      right: '-5px',
                      width: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      zIndex: 2,
                    }}
                  >
                    {[0, 1, 2].map((d) => (
                      <div
                        key={d}
                        style={{
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          background: '#CBD5E1',
                          margin: '0 auto',
                        }}
                      />
                    ))}
                  </div>
                )}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg,${i < 2 ? '#60A5FA' : '#A78BFA'} 0%,#8B5CF6 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    boxShadow: '0 4px 14px rgba(139,92,246,.25)',
                  }}
                >
                  {STEP_SVGS[i]}
                </div>
                <p
                  style={{
                    fontSize: '11.5px',
                    fontWeight: '700',
                    color: '#8B5CF6',
                    marginBottom: '5px',
                    letterSpacing: '-.1px',
                  }}
                >
                  {num}. {label}
                </p>
                <p style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.55' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why a QR Code? */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#1E293B',
                letterSpacing: '-.5px',
                marginBottom: '8px',
              }}
            >
              Why a QR Code?
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.6', padding: '0 8px' }}>
              A QR code is a scannable barcode any smartphone camera can read instantly. PawFinder
              prints your pet&apos;s unique code on a collar tag — no batteries, no signal needed.
            </p>
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '28px' }}
          >
            {WHY_QR.map(({ label, desc }, i) => (
              <div
                key={label}
                style={{
                  background: '#EEEDF8',
                  borderRadius: '16px',
                  padding: '18px 16px',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '13px',
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
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#1E293B',
                      marginBottom: '4px',
                    }}
                  >
                    {label}
                  </p>
                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.6' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 20 }} />
      </div>
      <BottomNav active="home" onNav={nav} />
    </div>
  );
}
