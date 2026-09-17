// Service Worker KEMUTNEWS — menangani notifikasi push
// File ini harus berada di folder /public agar bisa diakses di /sw.js

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "KEMUTNEWS", body: "Ada kabar terbaru dari keluarga besar KEMUT." };
  }

  const title = data.title || "KEMUTNEWS";
  const options = {
    body: data.body || "Ada kabar terbaru dari keluarga besar KEMUT.",
    icon: data.icon || "/icon-192.png",
    badge: "/icon-192.png",
    image: data.image || undefined,
    data: { url: data.url || "/" },
    tag: data.tag || "kemutnews-berita",
    renotify: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      // Kalau situs sudah terbuka di salah satu tab, fokuskan tab itu
      for (const client of windowClients) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      // Kalau belum, buka tab baru
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});