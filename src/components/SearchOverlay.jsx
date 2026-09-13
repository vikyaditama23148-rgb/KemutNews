"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search } from "lucide-react";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute left-1/2 top-24 w-[92%] max-w-2xl -translate-x-1/2 transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border border-brand-primaryContainer/50 bg-brand-ink px-5 py-4 shadow-2xl"
        >
          <Search size={20} className="text-brand-primaryContainer" strokeWidth={1.75} />
          <input
            autoFocus={open}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Cari arsip berita, tokoh, kegiatan..."
            className="w-full bg-transparent font-broadsheet text-base text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pencarian"
            className="text-white/50 hover:text-brand-primaryContainer"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </div>
  );
}