"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { UploadCloud, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function SubmitButton({ label }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 rounded-card bg-ink px-6 py-3 text-xs font-bold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink disabled:opacity-50"
    >
      {pending && <Loader2 size={14} className="animate-spin" />}
      {pending ? "Menyimpan..." : label}
    </button>
  );
}

export default function TokohForm({ action, initialData, errorMessage }) {
  const [photoUrl, setPhotoUrl] = useState(initialData?.photo_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));

  function autoSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const supabase = createClient();
      const path = `tokoh/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from("kemutnews-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from("kemutnews-media").getPublicUrl(path);
      setPhotoUrl(data.publicUrl);
    } catch (err) {
      setUploadError(
        err.message?.includes("Bucket not found")
          ? "Storage bucket 'kemutnews-media' belum dibuat. Jalankan ulang supabase/schema.sql."
          : `Upload gagal: ${err.message}`
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={action} className="max-w-2xl">
      {errorMessage && (
        <div className="mb-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Nama Lengkap
        </label>
        <input
          name="name"
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(autoSlug(e.target.value));
          }}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Nama tokoh"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Slug (URL)
        </label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlug(autoSlug(e.target.value));
            setSlugTouched(true);
          }}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm font-mono focus:border-gold focus:outline-none"
          placeholder="nama-tokoh"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Peran / Jabatan
        </label>
        <input
          name="role"
          defaultValue={initialData?.role || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Contoh: Sesepuh KEMUT, Koordinator Kegiatan"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Foto Profil
        </label>
        <input type="hidden" name="photo_url" value={photoUrl} />
        <div className="flex items-center gap-4">
          {photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photoUrl} alt="Preview" className="h-24 w-20 rounded-card object-cover" />
          ) : (
            <div className="flex h-24 w-20 items-center justify-center rounded-card border border-dashed border-cream-line text-stone-light">
              <UploadCloud size={20} strokeWidth={1.5} />
            </div>
          )}
          <label className="cursor-pointer rounded-card border border-cream-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-deep">
            {uploading ? "Mengunggah..." : "Pilih Foto"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          </label>
        </div>
        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
        <p className="mt-2 text-xs text-stone-light">Atau tempel URL foto langsung:</p>
        <input
          type="url"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-card border border-cream-line px-3.5 py-2 text-xs focus:border-gold focus:outline-none"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Deskripsi Singkat
        </label>
        <textarea
          name="short_description"
          rows={2}
          defaultValue={initialData?.short_description || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Muncul di kartu profil, 1 kalimat singkat"
        />
      </div>

      <div className="mb-7">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Biografi Lengkap
        </label>
        <textarea
          name="full_bio"
          rows={6}
          defaultValue={initialData?.full_bio || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm leading-relaxed focus:border-gold focus:outline-none"
          placeholder="Muncul di halaman profil lengkap tokoh"
        />
      </div>

      <SubmitButton label={initialData ? "Simpan Perubahan" : "Tambah Tokoh"} />
    </form>
  );
}