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
    <section className="w-full bg-brand-ink px-4 py-14 text-center text-white md:px-8">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-primaryContainer">
          Dukung Jurnalisme Independen KEMUT
        </p>
        <h2 className="mt-3 font-headline text-[28px] font-black leading-tight md:text-[34px]">
          Jadi Bagian dari Setiap Cerita KEMUT
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-white/60">
          Dapatkan kabar terbaru, agenda kegiatan, dan cerita hangat dari keluarga besar KEMUT
          langsung ke email kamu.
        </p>

        {status === "success" ? (
          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 border border-brand-primaryContainer/40 bg-white/5 px-5 py-4 text-sm text-brand-onPrimaryContainer">
            <CheckCircle2 size={18} strokeWidth={1.75} />
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              placeholder="Alamat email kamu"
              className="w-full border border-white/20 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-brand-primaryContainer focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex shrink-0 items-center justify-center gap-2 bg-brand-primary px-6 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-primaryContainer disabled:opacity-60"
            >
              {status === "loading" && <Loader2 size={14} className="animate-spin" />}
              {status === "loading" ? "Memproses..." : "Berlangganan"}
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