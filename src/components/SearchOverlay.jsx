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
        className={`absolute inset-0 bg-ink/80 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute left-1/2 top-24 w-[92%] max-w-2xl -translate-x-1/2 transition-all duration-300 ease-premium ${
          open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 rounded-card border border-gold/30 bg-ink px-5 py-4 shadow-2xl"
        >
          <Search size={20} className="text-gold" strokeWidth={1.75} />
          <input
            autoFocus={open}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Cari berita, tokoh, kegiatan..."
            className="w-full bg-transparent font-body text-base text-cream placeholder:text-cream/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pencarian"
            className="text-cream/50 hover:text-gold"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </form>
      </div>
    </div>
  );
}
