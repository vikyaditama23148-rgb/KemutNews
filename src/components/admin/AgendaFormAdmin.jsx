"use client";

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

export default function AgendaFormAdmin({ action, initialData, errorMessage }) {
  return (
    <form action={action} className="max-w-2xl">
      {errorMessage && (
        <div className="mb-5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Judul Kegiatan
        </label>
        <input
          name="title"
          required
          defaultValue={initialData?.title || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Contoh: Gathering Keluarga KEMUT"
        />
      </div>

      <div className="mb-5 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Tanggal <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="event_date"
            required
            defaultValue={initialData?.event_date || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
            Jam
          </label>
          <input
            name="event_time"
            defaultValue={initialData?.event_time || ""}
            className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
            placeholder="Contoh: 18:30 WIB"
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Lokasi
        </label>
        <input
          name="location"
          defaultValue={initialData?.location || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm focus:border-gold focus:outline-none"
          placeholder="Contoh: Balai Warga Sukamaju"
        />
      </div>

      <div className="mb-7">
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone">
          Deskripsi
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={initialData?.description || ""}
          className="w-full rounded-card border border-cream-line px-3.5 py-2.5 text-sm leading-relaxed focus:border-gold focus:outline-none"
          placeholder="Detail singkat kegiatan ini"
        />
      </div>

      <SubmitButton label={initialData ? "Simpan Perubahan" : "Tambah Agenda"} />
    </form>
  );
}