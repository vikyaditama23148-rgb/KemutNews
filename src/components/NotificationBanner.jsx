"use client";

import { useEffect, useState } from "react";
import { Bell, X, Loader2 } from "lucide-react";
import { usePushSubscription } from "@/lib/hooks/usePushSubscription";

const DISMISS_KEY = "kemutnews_notif_banner_dismissed";
const SHOW_DELAY_MS = 3000;

export default function NotificationBanner() {
  const { state, subscribe } = usePushSubscription();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // default true = aman, tidak flash muncul sebelum cek

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    if (state !== "idle") return; // cuma tampil kalau belum berlangganan & belum ditolak/unsupported

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [dismissed, state]);

  // Begitu berhasil berlangganan atau ditolak, banner otomatis hilang
  useEffect(() => {
    if (state === "subscribed" || state === "denied") setVisible(false);
  }, [state]);

  function handleDismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // abaikan kalau localStorage tidak tersedia
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] animate-[slideUp_0.3s_ease-out] px-4 pb-4 sm:inset-x-auto sm:right-4">
      <div className="mx-auto flex max-w-md items-start gap-3 border border-brand-primaryContainer/30 bg-brand-ink p-4 shadow-2xl">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center bg-brand-primary/20 text-brand-primaryContainer">
          <Bell size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-white">Jangan Lewatkan Kabar Terbaru</p>
          <p className="mt-0.5 text-[12px] leading-relaxed text-white/60">
            Aktifkan notifikasi supaya kamu langsung tahu begitu ada artikel baru dari KEMUTNEWS.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={subscribe}
              disabled={state === "loading"}
              className="flex items-center gap-1.5 bg-brand-primary px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-primaryContainer disabled:opacity-60"
            >
              {state === "loading" && <Loader2 size={12} className="animate-spin" />}
              {state === "loading" ? "Mengaktifkan..." : "Aktifkan"}
            </button>
            <button
              onClick={handleDismiss}
              className="text-[11px] font-semibold text-white/50 hover:text-white"
            >
              Nanti Saja
            </button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          aria-label="Tutup"
          className="shrink-0 text-white/40 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}