'use client';
import { IcoDots, IcoDownload, IcoPhone, IcoEdit, IcoShare } from './Icons';
import { PfTopBar, PfCard, PfBadge, PfBtn } from './UI';
import { AvatarBella } from './Avatars';
import { QRCodeSvg } from './Illustrations';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me';

export default function PetProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PfTopBar
        onBack={() => nav('pets')}
        rightEl={
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
            <IcoDots size={20} />
          </button>
        }
      />
      <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC', padding: '20px' }}>
        {/* Pet header card */}
        <PfCard style={{ marginBottom: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <AvatarBella size={80} />
              <div
                style={{
                  position: 'absolute',
                  bottom: 2,
                  right: 2,
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: '#10B981',
                  border: '2.5px solid white',
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#8B5CF6',
                  letterSpacing: '-.5px',
                  marginBottom: '2px',
                }}
              >
                Bella
              </h1>
              <p style={{ fontSize: '13.5px', color: '#64748B' }}>Golden Retriever</p>
              <p style={{ fontSize: '12.5px', color: '#94A3B8', marginBottom: '8px' }}>
                4 Years Old
              </p>
              <PfBadge>ID: PF1001</PfBadge>
            </div>
          </div>
        </PfCard>

        {/* QR Code card */}
        <PfCard style={{ marginBottom: '14px', textAlign: 'center', padding: '20px' }}>
          <h3
            style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', marginBottom: '14px' }}
          >
            QR Code
          </h3>
          <div
            style={{
              display: 'inline-block',
              border: '1.5px solid #EDE9FE',
              borderRadius: '16px',
              padding: '10px',
              background: '#FAFAFF',
            }}
          >
            <QRCodeSvg size={142} />
          </div>
          <p style={{ fontSize: '12px', color: '#94A3B8', marginTop: '10px' }}>
            Scan to view pet profile
          </p>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '7px 16px',
              borderRadius: '100px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#8B5CF6',
              fontSize: '13px',
              fontWeight: '600',
              marginTop: '4px',
            }}
          >
            <IcoDownload size={13} color="#8B5CF6" /> Download QR
          </button>
        </PfCard>

        {/* Pet Information */}
        <PfCard style={{ marginBottom: '16px' }}>
          <h3
            style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', marginBottom: '13px' }}
          >
            Pet Information
          </h3>
          {[
            { label: 'Owner', value: 'Sarah Johnson', mono: false },
            { label: 'Phone', value: '+91 98765 43210', icon: <IcoPhone size={14} />, mono: true },
            { label: 'Emergency Contact', value: '+91 91234 56789', mono: true },
            {
              label: 'Medical Notes',
              value: 'Needs daily medication\nAllergic to certain foods',
              mono: false,
            },
          ].map(({ label, value, icon, mono }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '9px 0',
                borderBottom: '1px solid #F8FAFC',
              }}
            >
              <span
                style={{
                  fontSize: '11.5px',
                  color: '#94A3B8',
                  fontWeight: '500',
                  width: '135px',
                  flexShrink: 0,
                  lineHeight: '1.3',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  flex: 1,
                  justifyContent: 'flex-end',
                  minWidth: 0,
                }}
              >
                <span
                  style={{
                    fontSize: '12.5px',
                    color: '#1E293B',
                    fontWeight: '500',
                    textAlign: 'right',
                    whiteSpace: mono ? 'nowrap' : 'pre-line',
                  }}
                >
                  {value}
                </span>
                {icon}
              </div>
            </div>
          ))}
        </PfCard>

        {/* Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '8px',
          }}
        >
          <PfBtn variant="secondary" small>
            <IcoEdit size={13} color="#8B5CF6" /> Edit Profile
          </PfBtn>
          <PfBtn variant="primary" small>
            <IcoShare size={13} color="#fff" /> Share Profile
          </PfBtn>
        </div>
        <div style={{ height: 12 }} />
      </div>
    </div>
  );
}
