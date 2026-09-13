"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchPageBar({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery || "");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-brand-surfaceLow p-2">
      <Search size={18} className="ml-2 shrink-0 text-brand-inkVariant" strokeWidth={1.75} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari arsip berita, tokoh, kegiatan..."
        className="w-full bg-transparent py-1.5 text-sm text-brand-ink placeholder:text-brand-inkVariant focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 bg-brand-primary px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-primaryContainer"
      >
        Cari
      </button>
    </form>
  );
}