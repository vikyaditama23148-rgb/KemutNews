"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

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

export default function CategoryForm({ action, initialData, errorMessage }) {
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

  return (
    <form action={action} className="max-w-xl">
      {errorMessage && (
        <div className="mb-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Nama Kategori
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
          placeholder="Contoh: Wisata Komunitas"
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
          placeholder="wisata-komunitas"
        />
        <p className="mt-1.5 text-xs text-stone-light">
          Menentukan alamat halaman: /kategori/{slug || "..."}
        </p>
      </div>

      <div className="mb-7">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Deskripsi Singkat
        </label>
        <textarea
          name="description"
          rows={2}
          defaultValue={initialData?.description || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Muncul di bawah judul halaman kategori"
        />
      </div>

      <SubmitButton label={initialData ? "Simpan Perubahan" : "Tambah Kategori"} />
    </form>
  );
}