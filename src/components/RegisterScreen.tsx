'use client';
import { useState, useRef } from 'react';
import { PawIcon, IcoUpload, IcoCheck } from './Icons';
import { PfBtn, PfInput, PfTextarea, TopNav } from './UI';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
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
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const name = (user.user_metadata?.name as string) || '';
      const phone = (user.user_metadata?.phone as string) || '';
      setF((prev) => ({
        ...prev,
        ownerName: prev.ownerName || name,
        phone: prev.phone || phone,
      }));
    })();
  }, []);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const handleRegister = async () => {
    if (!f.petName.trim()) {
      setError('Pet name is required.');
      return;
    }
    setLoading(true);
    setError('');

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError('You must be logged in to register a pet.');
      setLoading(false);
      return;
    }

    const petId = `PF-${Date.now().toString(36).toUpperCase()}`;
    const qr_code_url = `${process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin}/pet/${petId}`;

    let photo_url: string | null = null;
    if (photoFile) {
      const ext = photoFile.name.split('.').pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from('pet-photos')
        .upload(path, photoFile, { upsert: true });
      if (upErr) {
        setError(upErr.message);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from('pet-photos').getPublicUrl(path);
      photo_url = urlData.publicUrl;
    }

    const { error: insertError } = await supabase.from('pets').insert({
      user_id: user.id,
      pet_id: petId,
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

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setTimeout(() => nav('pets'), 1600);
  };

  if (done)
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          background: '#F8FAFC',
        }}
      >
        <TopNav active="register" onNav={nav} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 16,
            padding: 32,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
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
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#1E293B', letterSpacing: '-.5px' }}>
            Pet Registered!
          </h2>
          <p style={{ fontSize: 15, color: '#64748B' }}>Taking you to your pets…</p>
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
      <TopNav active="register" onNav={nav} />

      <div style={{ flex: 1, padding: 'clamp(16px, 5vw, 80px) clamp(16px, 8vw, 80px)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ marginBottom: 36 }}>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#1E293B',
                letterSpacing: '-.8px',
                marginBottom: 6,
              }}
            >
              Register Your Pet
            </h1>
            <p style={{ fontSize: 15, color: '#64748B' }}>
              Create a profile for your pet in minutes.
            </p>
          </div>

          {error && (
            <div
              style={{
                marginBottom: 20,
                padding: '12px 16px',
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: 12,
                fontSize: 14,
                color: '#DC2626',
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: isMobile ? 24 : 40,
            }}
          >
            {/* Left column — pet info */}
            <div>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1E293B',
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: '1px solid #F1F5F9',
                }}
              >
                Pet Information
              </h2>
              <PfInput
                label="Pet Name"
                value={f.petName}
                onChange={set('petName')}
                placeholder="e.g. Leo"
              />
              <PfInput
                label="Breed"
                value={f.breed}
                onChange={set('breed')}
                placeholder="e.g. Golden Retriever"
              />
              <PfInput label="Age" value={f.age} onChange={set('age')} placeholder="e.g. 3 Years" />
              <PfTextarea
                label="Medical Notes"
                value={f.medNotes}
                onChange={set('medNotes')}
                placeholder="Any allergies, medications, special needs…"
                optional
              />

              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: '#1E293B',
                    marginBottom: 6,
                  }}
                >
                  Pet Photo <span style={{ color: '#94A3B8', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setPhotoFile(file);
                    setPhotoPreview(URL.createObjectURL(file));
                  }}
                />
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: '2px dashed #DDD6FE',
                    borderRadius: 16,
                    padding: '32px 24px',
                    textAlign: 'center',
                    background: '#FAFAFF',
                    cursor: 'pointer',
                  }}
                >
                  {photoPreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt="Preview"
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '3px solid #DDD6FE',
                          marginBottom: 8,
                        }}
                      />
                      <p style={{ fontSize: 12, color: '#8B5CF6', fontWeight: 600 }}>
                        Tap to change
                      </p>
                    </>
                  ) : (
                    <>
                      <IcoUpload size={28} color="#A78BFA" />
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#8B5CF6',
                          marginTop: 8,
                          marginBottom: 3,
                        }}
                      >
                        Upload Photo
                      </p>
                      <p style={{ fontSize: 12, color: '#94A3B8' }}>JPG, PNG up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right column — owner info */}
            <div>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#1E293B',
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: '1px solid #F1F5F9',
                }}
              >
                Owner & Contact Details
              </h2>
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
                placeholder="e.g. 12 MG Road, Mumbai, Maharashtra"
              />

              <div
                style={{
                  marginTop: 24,
                  background: 'linear-gradient(135deg,#EDE9FE,#F5F3FF)',
                  borderRadius: 16,
                  padding: '24px 20px',
                  textAlign: 'center',
                }}
              >
                <PawIcon size={28} color="#8B5CF6" />
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#7C3AED',
                    marginTop: 10,
                    marginBottom: 6,
                  }}
                >
                  Your pet gets a unique QR tag
                </p>
                <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6 }}>
                  Once registered, download and print your pet&apos;s QR code to attach to their
                  collar.
                </p>
              </div>

              <div style={{ marginTop: 28 }}>
                <PfBtn variant="primary" onClick={handleRegister} disabled={loading}>
                  <PawIcon size={15} color="#fff" /> {loading ? 'Registering…' : 'Register Pet'}
                </PfBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
