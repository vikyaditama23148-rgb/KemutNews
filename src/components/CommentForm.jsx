"use client";

import { useEffect, useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const STORAGE_KEY = "kemutnews_commenter_info";

export default function CommentForm({ articleSlug }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [content, setContent] = useState("");
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  // Muat data tersimpan (kalau pernah centang "ingat saya" sebelumnya)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setEmail(parsed.email || "");
        setWebsite(parsed.website || "");
        setRemember(true);
      }
    } catch {
      // localStorage tidak tersedia (mis. mode privat ketat) — abaikan saja
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.from("comments").insert({
        article_slug: articleSlug,
        name: name.trim(),
        email: email.trim() || null,
        website: website.trim() || null,
        content: content.trim(),
        status: "pending",
      });

      if (error) {
        setStatus("error");
        setMessage(
          error.message?.includes("relation") || error.code === "42P01"
            ? "Fitur komentar belum siap — tabel belum dibuat di database."
            : "Gagal mengirim komentar. Coba lagi beberapa saat lagi."
        );
        return;
      }

      // Simpan atau hapus data tersimpan sesuai centang "ingat saya"
      try {
        if (remember) {
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ name: name.trim(), email: email.trim(), website: website.trim() })
          );
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        // abaikan kalau localStorage tidak tersedia
      }

      setStatus("success");
      setMessage("Terima kasih! Komentar kamu akan tampil setelah disetujui redaksi.");
      setContent("");
    } catch {
      setStatus("error");
      setMessage("Gagal mengirim komentar. Periksa koneksi internet kamu.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 bg-brand-surfaceLow p-4 text-sm text-brand-ink">
        <CheckCircle2 size={18} className="shrink-0 text-brand-primary" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === "loading"}
          placeholder="Nama *"
          className="border border-brand-outlineVariant/60 px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-brand-secondary/60 focus:border-brand-primary focus:outline-none disabled:opacity-50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          placeholder="Email (tidak ditampilkan)"
          className="border border-brand-outlineVariant/60 px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-brand-secondary/60 focus:border-brand-primary focus:outline-none disabled:opacity-50"
        />
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          disabled={status === "loading"}
          placeholder="Situs Web (opsional)"
          className="border border-brand-outlineVariant/60 px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-brand-secondary/60 focus:border-brand-primary focus:outline-none disabled:opacity-50"
        />
      </div>

      <textarea
        required
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={status === "loading"}
        placeholder="Tulis komentar kamu..."
        className="border border-brand-outlineVariant/60 px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-brand-secondary/60 focus:border-brand-primary focus:outline-none disabled:opacity-50"
      />

      <label className="flex items-center gap-2 text-xs text-brand-secondary">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 accent-brand-primary"
        />
        Ingat nama, email, dan situs saya di browser ini untuk komentar berikutnya
      </label>

      {status === "error" && <p className="text-xs text-red-600">{message}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-fit items-center gap-2 bg-brand-primary px-5 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-primaryContainer disabled:opacity-60"
      >
        {status === "loading" && <Loader2 size={14} className="animate-spin" />}
        {status === "loading" ? "Mengirim..." : "Kirim Komentar"}
      </button>
    </form>
  );
}