"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing, Loader2, BellOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Mengubah VAPID public key (base64url) menjadi Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function NotificationOptIn() {
  const [state, setState] = useState("checking"); // checking | unsupported | idle | loading | subscribed | denied | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setState("unsupported");
      return;
    }

    if (Notification.permission === "denied") {
      setState("denied");
      return;
    }

    // Cek apakah perangkat ini sudah pernah berlangganan
    navigator.serviceWorker
      .getRegistration()
      .then((reg) => reg?.pushManager.getSubscription())
      .then((sub) => setState(sub ? "subscribed" : "idle"))
      .catch(() => setState("idle"));
  }, []);

  async function handleSubscribe() {
    setState("loading");
    setMessage("");

    try {
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidKey) {
        setState("error");
        setMessage("Kunci notifikasi (VAPID) belum diatur di server.");
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setState(permission === "denied" ? "denied" : "idle");
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const json = subscription.toJSON();
      const supabase = createClient();
      const { error } = await supabase.from("push_subscriptions").insert({
        endpoint: json.endpoint,
        p256dh: json.keys?.p256dh,
        auth: json.keys?.auth,
        user_agent: navigator.userAgent?.slice(0, 200) || null,
      });

      // Kode 23505 = endpoint sudah terdaftar sebelumnya, itu bukan masalah
      if (error && error.code !== "23505") {
        setState("error");
        setMessage("Gagal mendaftarkan notifikasi. Coba lagi nanti.");
        return;
      }

      setState("subscribed");
    } catch (err) {
      setState("error");
      setMessage("Gagal mengaktifkan notifikasi di perangkat ini.");
    }
  }

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
        onClick={handleSubscribe}
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