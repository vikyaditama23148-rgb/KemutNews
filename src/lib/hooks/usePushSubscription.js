"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

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

// Hook bersama untuk status & aksi langganan notifikasi push.
// Dipakai oleh NotificationBanner (mengambang) dan NotificationOptIn (di Footer)
// supaya keduanya selalu sinkron dan tidak ada logika yang terduplikasi.
export function usePushSubscription() {
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

    navigator.serviceWorker
      .getRegistration()
      .then((reg) => reg?.pushManager.getSubscription())
      .then((sub) => setState(sub ? "subscribed" : "idle"))
      .catch(() => setState("idle"));
  }, []);

  async function subscribe() {
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

      if (error && error.code !== "23505") {
        setState("error");
        setMessage("Gagal mendaftarkan notifikasi. Coba lagi nanti.");
        return;
      }

      setState("subscribed");
    } catch {
      setState("error");
      setMessage("Gagal mengaktifkan notifikasi di perangkat ini.");
    }
  }

  return { state, message, subscribe };
}