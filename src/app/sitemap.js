import { getCategories, getAllArticlesForSitemap, getTokohList } from "@/lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kemut-news.vercel.app";

const STATIC_PAGES = [
  { path: "", priority: 1.0, changeFrequency: "hourly" },
  { path: "/tentang", priority: 0.5, changeFrequency: "monthly" },
  { path: "/redaksi", priority: 0.5, changeFrequency: "monthly" },
  { path: "/redaksi/pimpinan-redaksi", priority: 0.5, changeFrequency: "monthly" },
  { path: "/kontak", priority: 0.4, changeFrequency: "monthly" },
  { path: "/pengumuman", priority: 0.4, changeFrequency: "weekly" },
  { path: "/privasi", priority: 0.2, changeFrequency: "yearly" },
  { path: "/ketentuan", priority: 0.2, changeFrequency: "yearly" },
  { path: "/tokoh", priority: 0.6, changeFrequency: "weekly" },
  { path: "/galeri", priority: 0.5, changeFrequency: "weekly" },
  { path: "/video", priority: 0.6, changeFrequency: "weekly" },
  { path: "/agenda", priority: 0.6, changeFrequency: "weekly" },
];

// Route ini otomatis dilayani Next.js di /sitemap.xml
export default async function sitemap() {
  const [categories, articles, tokoh] = await Promise.all([
    getCategories(),
    getAllArticlesForSitemap(),
    getTokohList(),
  ]);

  const staticEntries = STATIC_PAGES.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${SITE_URL}/kategori/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const articleEntries = articles.map((a) => ({
    url: `${SITE_URL}/artikel/${a.slug}`,
    lastModified: a.published_at ? new Date(a.published_at) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const tokohEntries = tokoh.map((t) => ({
    url: `${SITE_URL}/tokoh/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...categoryEntries, ...articleEntries, ...tokohEntries];
}