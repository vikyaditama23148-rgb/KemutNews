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

export default function VideoForm({ action, initialData, errorMessage }) {
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.thumbnail_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const supabase = createClient();
      const path = `video-thumbnails/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from("kemutnews-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from("kemutnews-media").getPublicUrl(path);
      setThumbnailUrl(data.publicUrl);
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
          Judul Video
        </label>
        <input
          name="title"
          required
          defaultValue={initialData?.title || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Judul video"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Tautan Video
        </label>
        <input
          type="url"
          name="video_url"
          required
          defaultValue={initialData?.video_url || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="mt-1.5 text-xs text-stone-light">
          Tempel link YouTube, Instagram, atau platform lain. Video tidak di-upload ke server ini.
        </p>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Thumbnail
        </label>
        <input type="hidden" name="thumbnail_url" value={thumbnailUrl} />
        <div className="flex items-center gap-4">
          {thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumbnailUrl} alt="Preview" className="h-20 w-32 rounded-card object-cover" />
          ) : (
            <div className="flex h-20 w-32 items-center justify-center rounded-card border border-dashed border-cream-line text-stone-light">
              <UploadCloud size={20} strokeWidth={1.5} />
            </div>
          )}
          <label className="cursor-pointer rounded-card border border-cream-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-deep">
            {uploading ? "Mengunggah..." : "Pilih Thumbnail"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          </label>
        </div>
        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
        <p className="mt-2 text-xs text-stone-light">Atau tempel URL gambar langsung:</p>
        <input
          type="url"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-card border border-cream-line px-3.5 py-2 text-xs focus:border-gold focus:outline-none"
        />
      </div>

      <div className="mb-7 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Kategori
          </label>
          <input
            name="category"
            defaultValue={initialData?.category || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
            placeholder="Kegiatan, Cerita, Tokoh, dll"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Durasi (detik)
          </label>
          <input
            type="number"
            name="duration_seconds"
            min="1"
            defaultValue={initialData?.duration_seconds || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
            placeholder="Contoh: 180 (3 menit)"
          />
        </div>
      </div>

      <div className="mb-7">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={initialData?.is_featured}
            className="h-4 w-4 accent-gold-deep"
          />
          Tampilkan sebagai video utama (besar) di beranda
        </label>
      </div>

      <SubmitButton label={initialData ? "Simpan Perubahan" : "Tambah Video"} />
    </form>
  );
}