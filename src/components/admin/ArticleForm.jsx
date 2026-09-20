"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { UploadCloud, Loader2, Bold, Italic, Quote, Heading2, List } from "lucide-react";
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

export default function ArticleForm({ action, categories, initialData, errorMessage }) {
  const [coverUrl, setCoverUrl] = useState(initialData?.cover_image_url || "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initialData?.slug));
  const contentRef = useRef(null);

  function wrapSelection(before, after = before) {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const value = el.value;
    const selected = value.slice(start, end) || "teks";
    const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
    el.value = newValue;
    el.focus();
    const cursorPos = start + before.length + selected.length + after.length;
    el.setSelectionRange(cursorPos, cursorPos);
  }

  function prefixLine(prefix) {
    const el = contentRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const value = el.value;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    el.value = newValue;
    el.focus();
    const cursorPos = start + prefix.length;
    el.setSelectionRange(cursorPos, cursorPos);
  }

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
      const path = `covers/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error } = await supabase.storage.from("kemutnews-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from("kemutnews-media").getPublicUrl(path);
      setCoverUrl(data.publicUrl);
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
          Judul Artikel
        </label>
        <input
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(autoSlug(e.target.value));
          }}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Judul berita atau artikel"
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
          placeholder="judul-berita-atau-artikel"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Ringkasan
        </label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={initialData?.excerpt}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Ringkasan singkat 1-2 kalimat"
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Isi Artikel
        </label>

        <div className="mb-1.5 flex flex-wrap gap-1 rounded-t-card border border-b-0 border-cream-line bg-cream-soft p-1.5">
          <button
            type="button"
            onClick={() => wrapSelection("**")}
            title="Tebal (Bold)"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink transition hover:bg-cream-line"
          >
            <Bold size={15} />
          </button>
          <button
            type="button"
            onClick={() => wrapSelection("*")}
            title="Miring (Italic)"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink transition hover:bg-cream-line"
          >
            <Italic size={15} />
          </button>
          <button
            type="button"
            onClick={() => prefixLine("## ")}
            title="Sub-judul"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink transition hover:bg-cream-line"
          >
            <Heading2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => prefixLine("> ")}
            title="Kutipan Menonjol"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink transition hover:bg-cream-line"
          >
            <Quote size={15} />
          </button>
          <button
            type="button"
            onClick={() => prefixLine("- ")}
            title="Daftar Poin"
            className="flex h-8 w-8 items-center justify-center rounded-sm text-ink transition hover:bg-cream-line"
          >
            <List size={15} />
          </button>
          <span className="ml-1 flex items-center text-[11px] text-stone-light">
            Blok teks lalu klik tombol untuk memformat
          </span>
        </div>

        <textarea
          ref={contentRef}
          name="content"
          required
          rows={10}
          defaultValue={initialData?.content}
          className="w-full rounded-b-card border border-cream-line px-3.5 py-2.5 text-sm leading-relaxed focus:border-gold focus:outline-none"
          placeholder="Tulis isi artikel di sini. Pisahkan paragraf dengan baris kosong."
        />
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Gambar Sampul
        </label>
        <input type="hidden" name="cover_image_url" value={coverUrl} />
        <div className="flex items-center gap-4">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt="Preview" className="h-20 w-28 rounded-card object-cover" />
          ) : (
            <div className="flex h-20 w-28 items-center justify-center rounded-card border border-dashed border-cream-line text-stone-light">
              <UploadCloud size={20} strokeWidth={1.5} />
            </div>
          )}
          <label className="cursor-pointer rounded-card border border-cream-line px-4 py-2 text-xs font-semibold uppercase tracking-wide text-ink transition hover:border-gold hover:text-gold-deep">
            {uploading ? "Mengunggah..." : "Pilih Gambar"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          </label>
        </div>
        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
        <p className="mt-2 text-xs text-stone-light">
          Atau tempel URL gambar langsung: 
        </p>
        <input
          type="url"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
          placeholder="https://..."
          className="mt-1 w-full rounded-card border border-cream-line px-3.5 py-2 text-xs focus:border-gold focus:outline-none"
        />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Kategori
          </label>
          <select
            name="category_id"
            required
            defaultValue={initialData?.category_id || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Waktu Baca (menit)
          </label>
          <input
            type="number"
            name="reading_time_minutes"
            min="1"
            defaultValue={initialData?.reading_time_minutes || 4}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Nama Penulis
        </label>
        <input
          name="author_name"
          defaultValue={initialData?.authors?.name || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Nama penulis (dibuat otomatis bila belum ada)"
        />
      </div>

      <div className="mb-7 flex gap-6">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={initialData?.is_featured}
            className="h-4 w-4 accent-gold-deep"
          />
          Tampilkan sebagai Headline
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input
            type="checkbox"
            name="is_breaking"
            defaultChecked={initialData?.is_breaking}
            className="h-4 w-4 accent-gold-deep"
          />
          Tampilkan di Ticker Terkini
        </label>
      </div>

      <SubmitButton label={initialData ? "Simpan Perubahan" : "Publikasikan Artikel"} />
    </form>
  );
}