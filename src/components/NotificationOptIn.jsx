"use client";

import { Bell, BellRing, Loader2, BellOff } from "lucide-react";
import { usePushSubscription } from "@/lib/hooks/usePushSubscription";

export default function NotificationOptIn() {
  const { state, message, subscribe } = usePushSubscription();

  if (state === "checking") return null;

  if (state === "unsupported") {
    return (
      <p className="flex items-center gap-2 text-[12px] text-white/40">
        <BellOff size={14} />
        Notifikasi tidak didukung browser ini. Di iPhone, tambahkan situs ini ke Home Screen dulu.
      </p>
    );
  }

  if (state === "subscribed") {
    return (
      <p className="flex items-center gap-2 text-[12px] font-semibold text-brand-primaryContainer">
        <BellRing size={14} />
        Notifikasi aktif di perangkat ini
      </p>
    );
  }

  if (state === "denied") {
    return (
      <p className="flex items-center gap-2 text-[12px] text-white/40">
        <BellOff size={14} />
        Izin notifikasi diblokir. Aktifkan lewat pengaturan situs di browser kamu.
      </p>
    );
  }

  return (
    <div>
      <button
        onClick={subscribe}
        disabled={state === "loading"}
        className="flex items-center gap-2 bg-brand-primary px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-brand-primaryContainer disabled:opacity-60"
      >
        {state === "loading" ? <Loader2 size={14} className="animate-spin" /> : <Bell size={14} />}
        {state === "loading" ? "Mengaktifkan..." : "Aktifkan Notifikasi Berita"}
      </button>
      {message && <p className="mt-2 text-[11px] text-red-300">{message}</p>}
    </div>
  );
}