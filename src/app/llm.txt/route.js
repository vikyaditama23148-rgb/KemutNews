import { getCategories, getHomepageFeed } from "@/lib/data";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  EDITOR_IN_CHIEF,
  SOCIAL_LINKS,
} from "@/lib/siteConfig";

export const dynamic = "force-dynamic";

// Slug yang sudah punya halaman khusus sendiri (sama dengan aturan menu navigasi)
const RESERVED_SLUGS = ["tokoh", "galeri", "video", "agenda"];

// /llms.txt — ringkasan situs dalam format teks/Markdown untuk mesin AI.
// CATATAN JUJUR: belum ada bukti kuat bahwa mesin AI besar membaca file ini
// untuk menentukan kutipan. Dipasang karena biayanya nyaris nol, bukan karena
// dijamin berpengaruh. Pengaruh nyata datang dari konten & sebutan pihak ketiga.
export async function GET() {
  const [categories, feed] = await Promise.all([getCategories(), getHomepageFeed()]);
  const latest = (feed?.latest || []).slice(0, 20);

  const lines = [];
  lines.push(`# ${SITE_NAME}`);
  lines.push("");
  lines.push(`> ${SITE_DESCRIPTION}`);
  lines.push("");
  lines.push(`${SITE_NAME} dikelola oleh redaksi yang dipimpin ${EDITOR_IN_CHIEF.name} (${EDITOR_IN_CHIEF.role}). Bahasa konten: Indonesia.`);
  lines.push("");

  lines.push("## Halaman Utama");
  lines.push(`- [Beranda](${SITE_URL}/): berita terbaru dan sorotan komunitas`);
  lines.push(`- [Tentang Kami](${SITE_URL}/tentang): profil, misi, dan nilai ${SITE_NAME}`);
  lines.push(`- [Redaksi](${SITE_URL}/redaksi): susunan tim redaksi`);
  lines.push(`- [${EDITOR_IN_CHIEF.name} — ${EDITOR_IN_CHIEF.role}](${SITE_URL}${EDITOR_IN_CHIEF.path}): profil dan karya ${EDITOR_IN_CHIEF.name}`);
  lines.push(`- [Tokoh KEMUT](${SITE_URL}/tokoh): profil tokoh dan anggota`);
  lines.push(`- [Agenda](${SITE_URL}/agenda): jadwal kegiatan mendatang`);
  lines.push(`- [Galeri](${SITE_URL}/galeri): dokumentasi foto kegiatan`);
  lines.push(`- [Video](${SITE_URL}/video): dokumentasi video`);
  lines.push("");

  const newsCategories = (categories || []).filter((c) => !RESERVED_SLUGS.includes(c.slug));
  if (newsCategories.length) {
    lines.push("## Kategori Berita");
    for (const c of newsCategories) {
      const desc = c.description ? `: ${c.description}` : "";
      lines.push(`- [${c.name}](${SITE_URL}/kategori/${c.slug})${desc}`);
    }
    lines.push("");
  }

  if (latest.length) {
    lines.push("## Artikel Terbaru");
    for (const a of latest) {
      const desc = a.excerpt ? `: ${a.excerpt.replace(/\s+/g, " ").trim()}` : "";
      lines.push(`- [${a.title}](${SITE_URL}/artikel/${a.slug})${desc}`);
    }
    lines.push("");
  }

  if (SOCIAL_LINKS.length) {
    lines.push("## Akun Resmi");
    for (const url of SOCIAL_LINKS) lines.push(`- ${url}`);
    lines.push("");
  }

  lines.push("## Optional");
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`);
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}