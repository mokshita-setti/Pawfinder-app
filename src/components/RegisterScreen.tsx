'use client';
import { useRef, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { PawIcon, IcoUpload, IcoCheck } from './Icons';
import { PfTopBar, PfBtn, PfInput, PfTextarea } from './UI';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function RegisterScreen({ nav }: { nav: (s: Screen) => void }) {
  const [f, setF] = useState({
    petName: '',
    breed: '',
    age: '',
    ownerName: '',
    phone: '',
    emergency: '',
    address: '',
    medNotes: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    if (!f.petName.trim()) {
      setError('Pet name is required.');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }

      let photo_url: string | null = null;

      if (photoFile) {
        const ext = photoFile.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('pet-photos')
          .upload(path, photoFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from('pet-photos').getPublicUrl(path);
        photo_url = urlData.publicUrl;
      }

      const petId = `PF-${Date.now().toString(36).toUpperCase()}`;
      const qr_code_url = `${process.env.NEXT_PUBLIC_APP_URL ?? ''}/pet/${petId}`;

      const { error: insertErr } = await supabase.from('pets').insert({
        pet_id: petId,
        user_id: user.id,
        pet_name: f.petName.trim(),
        breed: f.breed.trim() || null,
        age: f.age.trim() || null,
        medical_info: f.medNotes.trim() || null,
        photo_url,
        qr_code_url,
        status: 'safe',
        notes: JSON.stringify({
          ownerName: f.ownerName.trim(),
          phone: f.phone.trim(),
          emergency: f.emergency.trim(),
          address: f.address.trim(),
        }),
      });

      if (insertErr) throw insertErr;

      setDone(true);
      setTimeout(() => nav('pets'), 1600);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

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

        {error && (
          <div
            style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: '12px',
              padding: '12px 16px',
              marginBottom: '16px',
              fontSize: '13px',
              color: '#DC2626',
            }}
          >
            {error}
          </div>
        )}

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
        <PfInput
          label="Address"
          value={f.address}
          onChange={set('address')}
          placeholder="e.g. 12 MG Road, Mumbai"
          optional
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
            Pet Photo <span style={{ color: '#94A3B8', fontWeight: '400' }}>(Optional)</span>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: '2px dashed #DDD6FE',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
              background: '#FAFAFF',
              cursor: 'pointer',
              overflow: 'hidden',
            }}
          >
            {photoPreview ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoPreview}
                  alt="Preview"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #DDD6FE',
                  }}
                />
                <p
                  style={{
                    fontSize: '12px',
                    color: '#8B5CF6',
                    marginTop: '8px',
                    fontWeight: '600',
                  }}
                >
                  Tap to change
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                  <IcoUpload size={28} color="#A78BFA" />
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#8B5CF6',
                    marginBottom: '3px',
                  }}
                >
                  Upload Photo
                </p>
                <p style={{ fontSize: '11.5px', color: '#94A3B8' }}>JPG, PNG up to 5MB</p>
              </>
            )}
          </div>
        </div>

        <PfBtn variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            'Saving…'
          ) : (
            <>
              <PawIcon size={15} color="#fff" /> Register Pet
            </>
          )}
        </PfBtn>
        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
