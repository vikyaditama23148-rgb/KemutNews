const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kemut-news.vercel.app";

// Route ini otomatis dilayani Next.js di /robots.txt
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}