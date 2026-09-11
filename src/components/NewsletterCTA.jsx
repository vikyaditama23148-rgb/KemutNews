"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;

    setStatus("loading");
    setMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email: trimmed });

      if (error) {
        if (error.code === "23505") {
          setStatus("error");
          setMessage("Email ini sudah terdaftar sebelumnya.");
        } else if (error.message?.includes("relation") || error.code === "42P01") {
          setStatus("error");
          setMessage("Fitur ini belum siap — tabel newsletter belum dibuat di database.");
        } else {
          setStatus("error");
          setMessage("Gagal mendaftar. Coba lagi beberapa saat lagi.");
        }
        return;
      }

      setStatus("success");
      setMessage("Terima kasih! Email kamu berhasil terdaftar.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Gagal mendaftar. Periksa koneksi internet kamu.");
    }
  }

  return (
    <section className="bg-ink py-16 text-cream md:py-20">
      <div className="container-editorial max-w-2xl text-center">
        <p className="eyebrow mb-3">Satu Keluarga, Banyak Cerita</p>
        <h2 className="font-display text-3xl font-bold leading-tight text-cream md:text-4xl">
          Jadi Bagian dari Setiap Cerita KEMUT
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-cream/60">
          Dapatkan kabar terbaru, agenda kegiatan, dan cerita hangat dari keluarga besar KEMUT
          langsung ke email kamu.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-card border border-gold/30 bg-gold/10 px-5 py-4 text-sm text-gold">
            <CheckCircle2 size={18} strokeWidth={1.75} />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="Alamat email kamu"
              className="w-full rounded-card border border-cream/20 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex shrink-0 items-center justify-center gap-2 rounded-card bg-gold px-6 py-3 text-xs font-bold uppercase tracking-wide text-ink transition hover:bg-gold-bright disabled:opacity-60"
            >
              {status === "loading" && <Loader2 size={14} className="animate-spin" />}
              {status === "loading" ? "Memproses..." : "Bergabung"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mx-auto mt-3 max-w-md text-xs text-red-300">{message}</p>
        )}
      </div>
    </section>
  );
}