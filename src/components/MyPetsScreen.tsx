'use client';
import { useEffect, useState } from 'react';
import { IcoPlus, IcoEdit, IcoDownload, PawIcon } from './Icons';
import { TopNav, PfBadge } from './UI';
import { supabase } from '@/lib/supabase';
import { QRCodeSVG } from 'qrcode.react';
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

type Pet = {
  id: string;
  pet_id: string;
  pet_name: string;
  breed: string | null;
  age: string | null;
  status: string;
  photo_url: string | null;
  qr_code_url: string | null;
  medical_info: string | null;
  notes: string | null;
};

type Report = {
  id: string;
  finder_name: string;
  finder_phone: string | null;
  location: string | null;
  message: string | null;
  created_at: string;
};

type EditForm = {
  pet_name: string;
  breed: string;
  age: string;
  medical_info: string;
};

export default function MyPetsScreen({
  nav,
}: {
  nav: (s: Screen) => void;
  onSelectPet?: (petId: string) => void;
}) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Record<string, Report[]>>({});
  const [expandedPet, setExpandedPet] = useState<string | null>(null);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({
    pet_name: '',
    breed: '',
    age: '',
    medical_info: '',
  });
  const [saving, setSaving] = useState(false);
  const [togglingStatus, setTogglingStatus] = useState<string | null>(null);
  const [deletingPet, setDeletingPet] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      setOwnerName((user.user_metadata?.name as string) || user.email?.split('@')[0] || 'Owner');
      const { data } = await supabase
        .from('pets')
        .select(
          'id, pet_id, pet_name, breed, age, status, photo_url, qr_code_url, medical_info, notes'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setPets(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const loadReports = async (petId: string) => {
    if (reports[petId]) return;
    const { data } = await supabase
      .from('reports')
      .select('id, finder_name, finder_phone, location, message, created_at')
      .eq('pet_id', petId)
      .order('created_at', { ascending: false });
    setReports((prev) => ({ ...prev, [petId]: data ?? [] }));
  };

  const toggleExpand = (petId: string) => {
    if (expandedPet === petId) {
      setExpandedPet(null);
      return;
    }
    setExpandedPet(petId);
    loadReports(petId);
  };

  const toggleStatus = async (pet: Pet) => {
    setTogglingStatus(pet.pet_id);
    const newStatus = pet.status === 'missing' ? 'safe' : 'missing';
    const { error } = await supabase.from('pets').update({ status: newStatus }).eq('id', pet.id);
    if (!error)
      setPets((prev) => prev.map((p) => (p.id === pet.id ? { ...p, status: newStatus } : p)));
    setTogglingStatus(null);
  };

  const startEdit = (pet: Pet) => {
    setEditingPet(pet);
    setEditForm({
      pet_name: pet.pet_name,
      breed: pet.breed ?? '',
      age: pet.age ?? '',
      medical_info: pet.medical_info ?? '',
    });
  };

  const saveEdit = async () => {
    if (!editingPet || !editForm.pet_name.trim()) return;
    setSaving(true);
    const { error } = await supabase
      .from('pets')
      .update({
        pet_name: editForm.pet_name.trim(),
        breed: editForm.breed.trim() || null,
        age: editForm.age.trim() || null,
        medical_info: editForm.medical_info.trim() || null,
      })
      .eq('id', editingPet.id);
    if (!error) {
      setPets((prev) =>
        prev.map((p) =>
          p.id === editingPet.id
            ? {
                ...p,
                ...editForm,
                breed: editForm.breed || null,
                age: editForm.age || null,
                medical_info: editForm.medical_info || null,
              }
            : p
        )
      );
      setEditingPet(null);
    }
    setSaving(false);
  };

  const deletePet = async (pet: Pet) => {
    if (!confirm(`Delete ${pet.pet_name}? This cannot be undone.`)) return;
    setDeletingPet(pet.pet_id);
    await supabase.from('pets').delete().eq('id', pet.id);
    setPets((prev) => prev.filter((p) => p.id !== pet.id));
    setDeletingPet(null);
  };

  const downloadQR = (pet: Pet) => {
    const url = pet.qr_code_url ?? `${window.location.origin}/pet/${pet.pet_id}`;
    const svg = document.getElementById(`qr-${pet.pet_id}`);
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${pet.pet_id}-qr.svg`;
    a.click();
    URL.revokeObjectURL(a.href);
    void url;
  };

  const missingCount = pets.filter((p) => p.status === 'missing').length;
  const totalReports = Object.values(reports).reduce((s, r) => s + r.length, 0);

  if (loading)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          background: 'var(--pf-bg)',
        }}
      >
        <TopNav active="pets" onNav={nav} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--pf-ink-subtle)',
            fontSize: 15,
          }}
        >
          Loading…
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
      <TopNav active="pets" onNav={nav} />

      {/* Edit modal */}
      {editingPet && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15,23,42,.45)',
            backdropFilter: 'blur(6px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              background: 'var(--pf-surface)',
              borderRadius: 24,
              padding: 32,
              width: '100%',
              maxWidth: 480,
              boxShadow: '0 20px 60px rgba(0,0,0,.2)',
            }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--pf-ink)', marginBottom: 20 }}>
              Edit {editingPet.pet_name}
            </h2>
            {[
              { label: 'Pet Name *', key: 'pet_name', placeholder: 'e.g. Leo' },
              { label: 'Breed', key: 'breed', placeholder: 'e.g. Golden Retriever' },
              { label: 'Age', key: 'age', placeholder: 'e.g. 3 Years' },
            ].map(({ label, key, placeholder }) => (
              <div key={key} style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: 'var(--pf-ink)',
                    marginBottom: 5,
                  }}
                >
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={editForm[key as keyof EditForm]}
                  onChange={(e) => setEditForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 10,
                    border: '1.5px solid #E2E8F0',
                    fontSize: 14,
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: 'var(--pf-ink)',
                  marginBottom: 5,
                }}
              >
                Medical Notes
              </label>
              <textarea
                rows={3}
                placeholder="Allergies, medications…"
                value={editForm.medical_info}
                onChange={(e) => setEditForm((f) => ({ ...f, medical_info: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #E2E8F0',
                  fontSize: 14,
                  fontFamily: 'Inter, sans-serif',
                  outline: 'none',
                  resize: 'vertical',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setEditingPet(null)}
                style={{
                  flex: 1,
                  padding: '13px',
                  borderRadius: 12,
                  border: '1.5px solid #E2E8F0',
                  background: 'var(--pf-surface)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--pf-ink-muted)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                style={{
                  flex: 2,
                  padding: '13px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--pf-surface)',
                  opacity: saving ? 0.7 : 1,
                }}
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, padding: 'clamp(16px, 4vw, 60px) clamp(16px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 28,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 'clamp(22px,3vw,32px)',
                  fontWeight: 800,
                  color: 'var(--pf-ink)',
                  letterSpacing: '-.8px',
                  marginBottom: 4,
                }}
              >
                Welcome back{ownerName ? `, ${ownerName.split(' ')[0]}` : ''}! 👋
              </h1>
              <p style={{ fontSize: 14, color: 'var(--pf-ink-muted)' }}>
                Manage your pets and view found reports.
              </p>
            </div>
            <button
              onClick={() => nav('register')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '12px 20px',
                borderRadius: 100,
                background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--pf-surface)',
                boxShadow: '0 4px 14px rgba(139,92,246,.3)',
                fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap',
              }}
            >
              <IcoPlus size={14} color="var(--pf-surface)" /> Add Pet
            </button>
          </div>

          {/* Stats row */}
          {pets.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2,1fr)' : 'repeat(3,1fr)',
                gap: 12,
                marginBottom: 28,
              }}
            >
              {[
                {
                  label: 'Total Pets',
                  value: pets.length,
                  color: 'var(--pf-purple)',
                  bg: 'var(--pf-purple-bg)',
                },
                {
                  label: 'Missing',
                  value: missingCount,
                  color: missingCount > 0 ? '#DC2626' : '#10B981',
                  bg: missingCount > 0 ? '#FEF2F2' : '#ECFDF5',
                },
                { label: 'Reports Received', value: totalReports, color: '#0EA5E9', bg: '#F0F9FF' },
              ].map(({ label, value, color, bg }) => (
                <div
                  key={label}
                  style={{
                    background: 'var(--pf-surface)',
                    borderRadius: 16,
                    padding: '16px 20px',
                    border: '1px solid var(--pf-border)',
                    boxShadow: '0 2px 8px rgba(0,0,0,.04)',
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 800, color, marginBottom: 2 }}>
                    {value}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'var(--pf-ink-subtle)',
                      background: bg,
                      display: 'inline-block',
                      padding: '2px 8px',
                      borderRadius: 100,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Missing alert banner */}
          {missingCount > 0 && (
            <div
              style={{
                background: 'linear-gradient(135deg,#FEF2F2,#FFF1F2)',
                border: '1px solid #FECACA',
                borderRadius: 16,
                padding: '14px 20px',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 20 }}>🚨</span>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#DC2626' }}>
                {missingCount} pet{missingCount > 1 ? 's are' : ' is'} currently marked as missing.
                Share their QR code to help spread the word.
              </p>
            </div>
          )}

          {/* Empty state */}
          {pets.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 32px',
                background: 'var(--pf-surface)',
                borderRadius: 20,
                border: '1px solid var(--pf-border)',
              }}
            >
              <PawIcon size={48} color="var(--pf-purple-muted)" />
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--pf-ink)',
                  marginTop: 16,
                  marginBottom: 8,
                }}
              >
                No pets yet
              </h3>
              <p style={{ fontSize: 15, color: 'var(--pf-ink-subtle)', marginBottom: 24 }}>
                Register your first pet to get their QR tag.
              </p>
              <button
                onClick={() => nav('register')}
                style={{
                  padding: '12px 28px',
                  borderRadius: 100,
                  background: 'linear-gradient(135deg,var(--pf-purple-light),var(--pf-purple))',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--pf-surface)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                + Register a Pet
              </button>
            </div>
          )}

          {/* Pet cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {pets.map((pet) => {
              const isMissing = pet.status === 'missing';
              const isExpanded = expandedPet === pet.pet_id;
              const petReports = reports[pet.pet_id] ?? [];
              const qrUrl =
                pet.qr_code_url ??
                `${typeof window !== 'undefined' ? window.location.origin : ''}/pet/${pet.pet_id}`;

              return (
                <div
                  key={pet.id}
                  style={{
                    background: 'var(--pf-surface)',
                    borderRadius: 20,
                    border: `1px solid ${isMissing ? '#FECACA' : 'var(--pf-border)'}`,
                    boxShadow: '0 2px 12px rgba(0,0,0,.05)',
                    overflow: 'hidden',
                    transition: 'box-shadow .2s',
                  }}
                >
                  {/* Missing stripe */}
                  {isMissing && (
                    <div
                      style={{ background: 'linear-gradient(90deg,#EF4444,#DC2626)', height: 4 }}
                    />
                  )}

                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      {/* Photo */}
                      <div
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: `2.5px solid ${isMissing ? '#FECACA' : 'var(--pf-purple-tint)'}`,
                          background:
                            'linear-gradient(135deg,var(--pf-purple-tint),var(--pf-purple-muted))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {pet.photo_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={pet.photo_url}
                            alt={pet.pet_name}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <PawIcon size={30} color="var(--pf-purple-light)" />
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            flexWrap: 'wrap',
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--pf-ink)' }}>
                            {pet.pet_name}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '3px 10px',
                              borderRadius: 100,
                              background: isMissing ? '#FEF2F2' : '#ECFDF5',
                              color: isMissing ? '#DC2626' : '#059669',
                            }}
                          >
                            {isMissing ? '🔴 Missing' : '🟢 Safe'}
                          </span>
                        </div>
                        {pet.breed && (
                          <p
                            style={{ fontSize: 13, color: 'var(--pf-ink-muted)', marginBottom: 1 }}
                          >
                            {pet.breed}
                          </p>
                        )}
                        {pet.age && (
                          <p
                            style={{ fontSize: 12, color: 'var(--pf-ink-subtle)', marginBottom: 6 }}
                          >
                            {pet.age}
                          </p>
                        )}
                        <PfBadge>ID: {pet.pet_id}</PfBadge>
                      </div>

                      {/* Hidden QR for download */}
                      <div style={{ display: 'none' }}>
                        <QRCodeSVG id={`qr-${pet.pet_id}`} value={qrUrl} size={200} />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginTop: 16,
                        paddingTop: 16,
                        borderTop: '1px solid var(--pf-bg)',
                      }}
                    >
                      {/* Toggle status */}
                      <button
                        onClick={() => toggleStatus(pet)}
                        disabled={togglingStatus === pet.pet_id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 16px',
                          borderRadius: 100,
                          border: '1.5px solid',
                          borderColor: isMissing ? '#6EE7B7' : '#FECACA',
                          background: isMissing ? '#ECFDF5' : '#FEF2F2',
                          color: isMissing ? '#059669' : '#DC2626',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          opacity: togglingStatus === pet.pet_id ? 0.6 : 1,
                        }}
                      >
                        {togglingStatus === pet.pet_id
                          ? '…'
                          : isMissing
                            ? '✅ Mark Safe'
                            : '🚨 Mark Missing'}
                      </button>

                      {/* Edit */}
                      <button
                        onClick={() => startEdit(pet)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 16px',
                          borderRadius: 100,
                          border: '1.5px solid var(--pf-purple-muted)',
                          background: 'var(--pf-purple-bg)',
                          color: 'var(--pf-purple-dark)',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <IcoEdit size={12} color="var(--pf-purple-dark)" /> Edit
                      </button>

                      {/* Download QR */}
                      <button
                        onClick={() => downloadQR(pet)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 16px',
                          borderRadius: 100,
                          border: '1.5px solid #BAE6FD',
                          background: '#F0F9FF',
                          color: '#0284C7',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <IcoDownload size={12} color="#0284C7" /> QR Code
                      </button>

                      {/* View reports */}
                      <button
                        onClick={() => toggleExpand(pet.pet_id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 16px',
                          borderRadius: 100,
                          border: '1.5px solid #E2E8F0',
                          background: isExpanded ? 'var(--pf-bg)' : 'var(--pf-surface)',
                          color: 'var(--pf-ink-muted)',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        📋 Reports {isExpanded ? '▲' : '▼'}
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => deletePet(pet)}
                        disabled={deletingPet === pet.pet_id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '8px 16px',
                          borderRadius: 100,
                          border: '1.5px solid #FCA5A5',
                          background: '#FFF5F5',
                          color: '#EF4444',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          marginLeft: 'auto',
                          opacity: deletingPet === pet.pet_id ? 0.5 : 1,
                        }}
                      >
                        🗑 Delete
                      </button>
                    </div>

                    {/* Reports panel */}
                    {isExpanded && (
                      <div
                        style={{
                          marginTop: 16,
                          paddingTop: 16,
                          borderTop: '1px solid var(--pf-border)',
                        }}
                      >
                        <h4
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: 'var(--pf-ink-muted)',
                            marginBottom: 12,
                            textTransform: 'uppercase',
                            letterSpacing: '.5px',
                          }}
                        >
                          Found Pet Reports ({petReports.length})
                        </h4>
                        {petReports.length === 0 ? (
                          <p
                            style={{
                              fontSize: 13,
                              color: 'var(--pf-ink-subtle)',
                              textAlign: 'center',
                              padding: '20px 0',
                            }}
                          >
                            No reports yet for {pet.pet_name}.
                          </p>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {petReports.map((r) => (
                              <div
                                key={r.id}
                                style={{
                                  background: 'var(--pf-bg)',
                                  borderRadius: 12,
                                  padding: '14px 16px',
                                  border: '1px solid var(--pf-border)',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginBottom: 6,
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: 13,
                                      fontWeight: 700,
                                      color: 'var(--pf-ink)',
                                    }}
                                  >
                                    {r.finder_name}
                                  </span>
                                  <span style={{ fontSize: 11, color: 'var(--pf-ink-subtle)' }}>
                                    {new Date(r.created_at).toLocaleDateString('en-IN', {
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>
                                {r.finder_phone && (
                                  <p
                                    style={{
                                      fontSize: 12,
                                      color: 'var(--pf-ink-muted)',
                                      marginBottom: 3,
                                    }}
                                  >
                                    📞 {r.finder_phone}
                                  </p>
                                )}
                                {r.location && (
                                  <p
                                    style={{
                                      fontSize: 12,
                                      color: 'var(--pf-ink-muted)',
                                      marginBottom: 3,
                                    }}
                                  >
                                    📍 {r.location}
                                  </p>
                                )}
                                {r.message && (
                                  <p
                                    style={{
                                      fontSize: 12,
                                      color: '#475569',
                                      lineHeight: 1.5,
                                      marginTop: 6,
                                      fontStyle: 'italic',
                                    }}
                                  >
                                    &quot;{r.message}&quot;
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
