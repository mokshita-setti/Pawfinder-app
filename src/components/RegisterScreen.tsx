'use client';
import { useState } from 'react';
import { PawIcon, IcoUpload, IcoCheck } from './Icons';
import { PfTopBar, PfBtn, PfInput, PfTextarea } from './UI';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me';

export default function RegisterScreen({ nav }: { nav: (s: Screen) => void }) {
  const [f, setF] = useState({
    petName: '',
    breed: '',
    age: '',
    ownerName: '',
    phone: '',
    emergency: '',
    medNotes: '',
  });
  const [done, setDone] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  if (done)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8FAFC',
          gap: '16px',
          padding: '32px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#EDE9FE,#DDD6FE)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(139,92,246,.18)',
          }}
        >
          <IcoCheck size={52} />
        </div>
        <h2
          style={{ fontSize: '22px', fontWeight: '800', color: '#1E293B', letterSpacing: '-.5px' }}
        >
          Pet Registered!
        </h2>
        <p style={{ fontSize: '14px', color: '#64748B' }}>Taking you to your pets…</p>
      </div>
    );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PfTopBar onBack={() => nav('home')} rightEl={<div style={{ width: 36 }} />} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <h1
          style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#1E293B',
            letterSpacing: '-.5px',
            marginBottom: '3px',
          }}
        >
          Register Your Pet
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '22px' }}>
          Create a profile for your pet in minutes.
        </p>

        <PfInput
          label="Pet Name"
          value={f.petName}
          onChange={set('petName')}
          placeholder="e.g. Bella"
        />
        <PfInput
          label="Breed"
          value={f.breed}
          onChange={set('breed')}
          placeholder="e.g. Golden Retriever"
        />
        <PfInput label="Age" value={f.age} onChange={set('age')} placeholder="e.g. 3 Years" />
        <PfInput
          label="Owner Name"
          value={f.ownerName}
          onChange={set('ownerName')}
          placeholder="e.g. Sarah Johnson"
        />
        <PfInput
          label="Phone Number"
          value={f.phone}
          onChange={set('phone')}
          placeholder="e.g. +91 98765 43210"
          type="tel"
        />
        <PfInput
          label="Emergency Contact"
          value={f.emergency}
          onChange={set('emergency')}
          placeholder="e.g. +91 91234 56789"
          type="tel"
        />
        <PfTextarea
          label="Medical Notes"
          value={f.medNotes}
          onChange={set('medNotes')}
          placeholder="Any allergies, medications, special needs…"
          optional
        />

        {/* Photo upload */}
        <div style={{ marginBottom: '24px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '12.5px',
              fontWeight: '600',
              color: '#1E293B',
              marginBottom: '6px',
            }}
          >
            Pet Photo
          </label>
          <div
            style={{
              border: '2px dashed #DDD6FE',
              borderRadius: '16px',
              padding: '26px',
              textAlign: 'center',
              background: '#FAFAFF',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <IcoUpload size={28} color="#A78BFA" />
            </div>
            <p
              style={{ fontSize: '14px', fontWeight: '600', color: '#8B5CF6', marginBottom: '3px' }}
            >
              Upload Photo
            </p>
            <p style={{ fontSize: '11.5px', color: '#94A3B8' }}>JPG, PNG up to 5MB</p>
          </div>
        </div>

        <PfBtn
          variant="primary"
          onClick={() => {
            setDone(true);
            setTimeout(() => nav('pets'), 1600);
          }}
        >
          <PawIcon size={15} color="#fff" /> Register Pet
        </PfBtn>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
