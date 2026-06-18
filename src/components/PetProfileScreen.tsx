'use client';
import { useEffect, useRef, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { IcoDownload, IcoEdit, IcoUpload } from './Icons';
import { PfTopBar, PfCard, PfBadge, PfBtn, PfInput, PfTextarea } from './UI';
import { QRCodeSvg } from './Illustrations';

type Screen = 'home' | 'register' | 'pets' | 'petprofile' | 'scan' | 'notif' | 'me' | 'demo';

type Pet = {
  pet_id: string;
  pet_name: string;
  breed: string | null;
  age: string | null;
  medical_info: string | null;
  photo_url: string | null;
  qr_code_url: string | null;
  status: string;
  notes: string | null;
};

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PetProfileScreen({
  nav,
  petId,
}: {
  nav: (s: Screen) => void;
  petId?: string;
}) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(!!petId);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // edit form state
  const [editF, setEditF] = useState({
    petName: '',
    breed: '',
    age: '',
    ownerName: '',
    phone: '',
    emergency: '',
    address: '',
    medNotes: '',
  });
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  const [newPhotoPreview, setNewPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      if (!petId) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('pets')
        .select('pet_id,pet_name,breed,age,medical_info,photo_url,qr_code_url,status,notes')
        .eq('pet_id', petId)
        .single();
      if (data) setPet(data);
      setLoading(false);
    }
    load();
  }, [petId]);

  function ownerInfo(p: Pet) {
    try {
      return JSON.parse(p.notes ?? '{}');
    } catch {
      return {};
    }
  }

  function openEdit() {
    if (!pet) return;
    const o = ownerInfo(pet);
    setEditF({
      petName: pet.pet_name,
      breed: pet.breed ?? '',
      age: pet.age ?? '',
      ownerName: o.ownerName ?? '',
      phone: o.phone ?? '',
      emergency: o.emergency ?? '',
      address: o.address ?? '',
      medNotes: pet.medical_info ?? '',
    });
    setNewPhotoFile(null);
    setNewPhotoPreview(null);
    setEditing(true);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewPhotoFile(file);
    setNewPhotoPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    if (!pet || !editF.petName.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      let photo_url = pet.photo_url;

      if (newPhotoFile && user) {
        const ext = newPhotoFile.name.split('.').pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from('pet-photos')
          .upload(path, newPhotoFile, { upsert: true });
        if (upErr) throw upErr;
        const { data: urlData } = supabase.storage.from('pet-photos').getPublicUrl(path);
        photo_url = urlData.publicUrl;
      }

      const { error: updErr } = await supabase
        .from('pets')
        .update({
          pet_name: editF.petName.trim(),
          breed: editF.breed.trim() || null,
          age: editF.age.trim() || null,
          medical_info: editF.medNotes.trim() || null,
          photo_url,
          notes: JSON.stringify({
            ownerName: editF.ownerName.trim(),
            phone: editF.phone.trim(),
            emergency: editF.emergency.trim(),
            address: editF.address.trim(),
          }),
        })
        .eq('pet_id', pet.pet_id);

      if (updErr) throw updErr;
      setPet((p) =>
        p
          ? {
              ...p,
              pet_name: editF.petName.trim(),
              breed: editF.breed.trim() || null,
              age: editF.age.trim() || null,
              medical_info: editF.medNotes.trim() || null,
              photo_url,
              notes: JSON.stringify({
                ownerName: editF.ownerName.trim(),
                phone: editF.phone.trim(),
                emergency: editF.emergency.trim(),
                address: editF.address.trim(),
              }),
            }
          : p
      );
      setEditing(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!pet || !confirm(`Delete ${pet.pet_name}? This cannot be undone.`)) return;
    setDeleting(true);
    await supabase.from('pets').delete().eq('pet_id', pet.pet_id);
    setDeleting(false);
    nav('pets');
  }

  async function toggleStatus() {
    if (!pet) return;
    const next = pet.status === 'missing' ? 'safe' : 'missing';
    await supabase.from('pets').update({ status: next }).eq('pet_id', pet.pet_id);
    setPet((p) => (p ? { ...p, status: next } : p));
  }

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: '3px solid #EDE9FE',
            borderTopColor: '#8B5CF6',
            borderRadius: '50%',
            animation: 'spin .8s linear infinite',
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  if (!pet && !loading)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <PfTopBar onBack={() => nav('pets')} rightEl={<div style={{ width: 36 }} />} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 12,
            padding: 24,
          }}
        >
          <p style={{ fontSize: 14, color: '#64748B' }}>Pet not found.</p>
        </div>
      </div>
    );

  const o = pet ? ownerInfo(pet) : {};
  const missing = pet?.status === 'missing';

  // Edit mode
  if (editing && pet)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <PfTopBar onBack={() => setEditing(false)} rightEl={<div style={{ width: 36 }} />} />
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <h1
            style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#1E293B',
              letterSpacing: '-.4px',
              marginBottom: '18px',
            }}
          >
            Edit Pet
          </h1>
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
            value={editF.petName}
            onChange={(e) => setEditF((p) => ({ ...p, petName: e.target.value }))}
            placeholder="e.g. Bella"
          />
          <PfInput
            label="Breed"
            value={editF.breed}
            onChange={(e) => setEditF((p) => ({ ...p, breed: e.target.value }))}
            placeholder="e.g. Golden Retriever"
          />
          <PfInput
            label="Age"
            value={editF.age}
            onChange={(e) => setEditF((p) => ({ ...p, age: e.target.value }))}
            placeholder="e.g. 3 Years"
          />
          <PfInput
            label="Owner Name"
            value={editF.ownerName}
            onChange={(e) => setEditF((p) => ({ ...p, ownerName: e.target.value }))}
            placeholder="e.g. Sarah Johnson"
          />
          <PfInput
            label="Phone"
            value={editF.phone}
            onChange={(e) => setEditF((p) => ({ ...p, phone: e.target.value }))}
            placeholder="+91 98765 43210"
            type="tel"
          />
          <PfInput
            label="Emergency Contact"
            value={editF.emergency}
            onChange={(e) => setEditF((p) => ({ ...p, emergency: e.target.value }))}
            placeholder="+91 91234 56789"
            type="tel"
          />
          <PfInput
            label="Address"
            value={editF.address}
            onChange={(e) => setEditF((p) => ({ ...p, address: e.target.value }))}
            placeholder="e.g. 12 MG Road, Mumbai"
            optional
          />
          <PfTextarea
            label="Medical Notes"
            value={editF.medNotes}
            onChange={(e) => setEditF((p) => ({ ...p, medNotes: e.target.value }))}
            placeholder="Allergies, medications…"
            optional
          />

          {/* Photo change */}
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: '600',
                color: '#1E293B',
                marginBottom: '6px',
              }}
            >
              Photo <span style={{ color: '#94A3B8', fontWeight: '400' }}>(Optional)</span>
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
                padding: '16px',
                textAlign: 'center',
                background: '#FAFAFF',
                cursor: 'pointer',
              }}
            >
              {newPhotoPreview || pet.photo_url ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={newPhotoPreview ?? pet.photo_url!}
                    alt="Pet"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #DDD6FE',
                    }}
                  />
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#8B5CF6',
                      marginTop: '6px',
                      fontWeight: '600',
                    }}
                  >
                    Tap to change
                  </p>
                </>
              ) : (
                <>
                  <IcoUpload size={24} color="#A78BFA" />
                  <p
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#8B5CF6',
                      marginTop: '6px',
                    }}
                  >
                    Upload Photo
                  </p>
                </>
              )}
            </div>
          </div>

          <PfBtn variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save Changes'}
          </PfBtn>
          <div style={{ marginTop: '10px' }}>
            <PfBtn variant="outline" onClick={() => setEditing(false)}>
              Cancel
            </PfBtn>
          </div>
          <div style={{ height: 24 }} />
        </div>
      </div>
    );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PfTopBar onBack={() => nav('pets')} rightEl={<div style={{ width: 36 }} />} />
      <div style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC', padding: '20px' }}>
        {/* Pet header card */}
        <PfCard style={{ marginBottom: '14px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#EDE9FE',
                flexShrink: 0,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {pet?.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={pet.photo_url}
                  alt={pet.pet_name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <svg width={40} height={40} viewBox="0 0 24 24" fill="#A78BFA">
                  <path d="M4.5 10.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 22c-4 0-7-2.5-7-6 0-2 1.5-4 3.5-5s3.5-1 3.5-1 1.5 0 3.5 1 3.5 3 3.5 5c0 3.5-3 6-7 6z" />
                </svg>
              )}
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
                {pet?.pet_name}
              </h1>
              {pet?.breed && <p style={{ fontSize: '13.5px', color: '#64748B' }}>{pet.breed}</p>}
              {pet?.age && (
                <p style={{ fontSize: '12.5px', color: '#94A3B8', marginBottom: '8px' }}>
                  {pet.age}
                </p>
              )}
              <PfBadge>ID: {pet?.pet_id}</PfBadge>
            </div>
          </div>
          {missing && (
            <div
              style={{
                marginTop: 12,
                padding: '8px 14px',
                background: '#FEF2F2',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#DC2626',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#DC2626' }}>
                MISSING — tap below to update status
              </span>
            </div>
          )}
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
          {pet?.qr_code_url && (
            <p
              style={{
                fontSize: '11px',
                color: '#A78BFA',
                marginTop: '4px',
                wordBreak: 'break-all',
              }}
            >
              {pet.qr_code_url}
            </p>
          )}
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
            { label: 'Owner', value: o.ownerName },
            { label: 'Phone', value: o.phone },
            { label: 'Emergency', value: o.emergency },
            { label: 'Address', value: o.address },
            { label: 'Medical Notes', value: pet?.medical_info },
          ]
            .filter((r) => r.value)
            .map(({ label, value }) => (
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
                    flexShrink: 0,
                    marginRight: 12,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: '12.5px',
                    color: '#1E293B',
                    fontWeight: '500',
                    textAlign: 'right',
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
        </PfCard>

        {/* Actions */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          <PfBtn variant="secondary" small onClick={openEdit}>
            <IcoEdit size={13} color="#8B5CF6" /> Edit Profile
          </PfBtn>
          <PfBtn variant={missing ? 'secondary' : 'outline'} small onClick={toggleStatus}>
            {missing ? '✓ Mark Safe' : '⚠ Mark Missing'}
          </PfBtn>
        </div>
        <PfBtn variant="outline" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete Pet'}
        </PfBtn>
        <div style={{ height: 16 }} />
      </div>
    </div>
  );
}
