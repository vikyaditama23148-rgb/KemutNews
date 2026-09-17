import webpush from "web-push";
import { createClient } from "@/lib/supabase/server";

let configured = false;

function configureWebPush() {
  if (configured) return true;

  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const privateKey = process.env.VAPID_PRIVATE_KEY;
  const subject = process.env.VAPID_SUBJECT || "mailto:redaksi@kemutnews.id";

  if (!publicKey || !privateKey) {
    console.warn("[KEMUTNEWS] VAPID key belum diatur — notifikasi push dilewati.");
    return false;
  }

  webpush.setVapidDetails(subject, publicKey, privateKey);
  configured = true;
  return true;
}

// Mengirim notifikasi ke SEMUA perangkat yang sudah berlangganan.
// Fungsi ini sengaja "tidak pernah melempar error" — kalau pengiriman gagal,
// proses publikasi artikel tetap berjalan normal.
export async function sendPushToAll({ title, body, url, image }) {
  try {
    if (!configureWebPush()) return { sent: 0, failed: 0 };

    const supabase = createClient();
    const { data: subscriptions, error } = await supabase
      .from("push_subscriptions")
      .select("id, endpoint, p256dh, auth");

    if (error || !subscriptions || subscriptions.length === 0) {
      if (error) console.error("[KEMUTNEWS] Gagal membaca push_subscriptions:", error);
      return { sent: 0, failed: 0 };
    }

    const payload = JSON.stringify({ title, body, url, image });
    let sent = 0;
    let failed = 0;
    const expiredIds = [];

    await Promise.all(
      subscriptions.map(async (sub) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: sub.endpoint,
              keys: { p256dh: sub.p256dh, auth: sub.auth },
            },
            payload
          );
          sent += 1;
        } catch (err) {
          failed += 1;
          // 404/410 = langganan sudah kedaluwarsa / dicabut oleh browser
          if (err?.statusCode === 404 || err?.statusCode === 410) {
            expiredIds.push(sub.id);
          } else {
            console.error("[KEMUTNEWS] Gagal kirim push:", err?.statusCode, err?.body);
          }
        }
      })
    );

    // Bersihkan langganan yang sudah tidak valid
    if (expiredIds.length > 0) {
      await supabase.from("push_subscriptions").delete().in("id", expiredIds);
    }

    return { sent, failed };
  } catch (err) {
    console.error("[KEMUTNEWS] sendPushToAll exception:", err);
    return { sent: 0, failed: 0 };
  }
}