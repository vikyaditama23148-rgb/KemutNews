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

export default function GalleryForm({ action, initialData, errorMessage }) {
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const supabase = createClient();
      const path = `gallery/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from("kemutnews-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from("kemutnews-media").getPublicUrl(path);
      setImageUrl(data.publicUrl);
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

      <div className="mb-6">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Foto <span className="text-red-500">*</span>
        </label>
        <input type="hidden" name="image_url" value={imageUrl} />
        <div className="flex items-center gap-4">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="Preview" className="h-28 w-28 rounded-card object-cover" />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-card border border-dashed border-cream-line text-stone-light">
              <UploadCloud size={24} strokeWidth={1.5} />
            </div>
          )}
          <label className="cursor-pointer rounded-card border border-cream-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-deep">
            {uploading ? "Mengunggah..." : "Pilih Foto"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          </label>
        </div>
        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
        <p className="mt-2 text-xs text-stone-light">Atau tempel URL gambar langsung:</p>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-card border border-cream-line px-3.5 py-2 text-xs focus:border-gold focus:outline-none"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Keterangan Foto
        </label>
        <input
          name="caption"
          defaultValue={initialData?.caption || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Contoh: Kehangatan dalam setiap pertemuan"
        />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Nama Acara / Momen
          </label>
          <input
            name="event_name"
            defaultValue={initialData?.event_name || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
            placeholder="Contoh: Gathering Tahunan"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Tanggal Foto
          </label>
          <input
            type="date"
            name="taken_at"
            defaultValue={initialData?.taken_at || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <SubmitButton label={initialData ? "Simpan Perubahan" : "Tambah ke Galeri"} />
    </form>
  );
}