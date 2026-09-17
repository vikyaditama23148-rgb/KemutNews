"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search, TrendingUp, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popular, setPopular] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Ambil daftar kategori & artikel terpopuler sekali saat overlay dibuka
  useEffect(() => {
    if (!open || popular.length > 0 || categories.length > 0) return;

    (async () => {
      try {
        const supabase = createClient();
        const [catRes, popRes] = await Promise.all([
          supabase.from("categories").select("slug, name").order("name"),
          supabase
            .from("articles")
            .select("slug, title, view_count")
            .order("view_count", { ascending: false })
            .limit(5),
        ]);
        if (catRes.data) setCategories(catRes.data);
        if (popRes.data) setPopular(popRes.data);
      } catch {
        // abaikan — panel saran cuma pelengkap, pencarian utama tetap jalan
      }
    })();
  }, [open, popular.length, categories.length]);

  // Saran langsung saat mengetik (dengan jeda 250ms supaya tidak membanjiri server)
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("articles")
          .select("slug, title")
          .ilike("title", `%${q}%`)
          .limit(6);
        setSuggestions(data || []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!query.trim()) return;
    handleClose();
    router.push(`/cari?q=${encodeURIComponent(query.trim())}`);
  }

  function handleClose() {
    setQuery("");
    setSuggestions([]);
    onClose();
  }

  function goTo(href) {
    handleClose();
    router.push(href);
  }

  const showSuggestions = query.trim().length >= 2;

  return (
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={handleClose}
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
          <Search size={20} className="shrink-0 text-brand-primaryContainer" strokeWidth={1.75} />
          <input
            autoFocus={open}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Cari arsip berita, tokoh, kegiatan..."
            className="w-full bg-transparent font-broadsheet text-base text-white placeholder:text-white/40 focus:outline-none"
          />
          {loading && <Loader2 size={16} className="shrink-0 animate-spin text-white/50" />}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Tutup pencarian"
            className="shrink-0 text-white/50 hover:text-brand-primaryContainer"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </form>

        {/* Panel saran */}
        <div className="max-h-[60vh] overflow-y-auto border-x border-b border-brand-primaryContainer/30 bg-brand-ink/95 backdrop-blur">
          {showSuggestions ? (
            <div className="p-4">
              {suggestions.length > 0 ? (
                <>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Saran Artikel
                  </p>
                  <ul className="flex flex-col">
                    {suggestions.map((s) => (
                      <li key={s.slug}>
                        <button
                          onClick={() => goTo(`/artikel/${s.slug}`)}
                          className="w-full border-b border-white/5 py-2.5 text-left text-sm text-white/85 transition hover:text-brand-primaryContainer"
                        >
                          {s.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleSubmit}
                    className="mt-3 text-[11px] font-bold uppercase tracking-wide text-brand-primaryContainer hover:underline"
                  >
                    Lihat semua hasil untuk &ldquo;{query.trim()}&rdquo; →
                  </button>
                </>
              ) : (
                !loading && (
                  <p className="py-3 text-center text-sm text-white/40">
                    Tidak ada artikel yang cocok. Tekan Enter untuk mencari lebih luas.
                  </p>
                )
              )}
            </div>
          ) : (
            open && (
              <div className="p-4">
                {categories.length > 0 && (
                  <div className="mb-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Jelajahi Kategori
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((c) => (
                        <button
                          key={c.slug}
                          onClick={() => goTo(`/kategori/${c.slug}`)}
                          className="bg-white/10 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white/80 transition hover:bg-brand-primary hover:text-white"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {popular.length > 0 && (
                  <div>
                    <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/40">
                      <TrendingUp size={12} /> Paling Banyak Dibaca
                    </p>
                    <ul className="flex flex-col">
                      {popular.map((p, i) => (
                        <li key={p.slug}>
                          <button
                            onClick={() => goTo(`/artikel/${p.slug}`)}
                            className="flex w-full items-start gap-3 border-b border-white/5 py-2.5 text-left transition hover:text-brand-primaryContainer"
                          >
                            <span className="font-headline text-sm font-light text-white/30">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-sm text-white/85">{p.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}