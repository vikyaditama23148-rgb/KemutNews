// Opsional: jalankan `npm run seed` untuk mengisi Supabase langsung dari
// src/data/mockData.js memakai service role key (tidak lewat SQL editor).
//
// Cara pakai:
//   1. Pastikan supabase/schema.sql sudah dijalankan di Supabase SQL Editor.
//   2. Isi SUPABASE_SERVICE_ROLE_KEY di .env (JANGAN commit ke git).
//   3. Jalankan: npm run seed

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import {
  categories,
  articles,
  tokohList,
  galleryItems,
  videos,
  agendaItems,
} from "../src/data/mockData.js";

config({ path: ".env" });
config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Isi NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY di .env sebelum menjalankan seed."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function run() {
  console.log("Seeding categories...");
  const { data: cats, error: catErr } = await supabase
    .from("categories")
    .upsert(categories, { onConflict: "slug" })
    .select("id, slug");
  if (catErr) throw catErr;
  const categoryIdBySlug = Object.fromEntries(cats.map((c) => [c.slug, c.id]));

  console.log("Seeding authors...");
  const authorNames = [...new Set(articles.map((a) => a.author?.name).filter(Boolean))];
  const authorRows = authorNames.map((name) => {
    const found = articles.find((a) => a.author?.name === name).author;
    return { name: found.name, role: found.role, avatar_url: found.avatar_url };
  });
  const { data: authors, error: authorErr } = await supabase
    .from("authors")
    .upsert(authorRows, { onConflict: "name" })
    .select("id, name");
  if (authorErr) throw authorErr;
  const authorIdByName = Object.fromEntries(authors.map((a) => [a.name, a.id]));

  console.log("Seeding articles...");
  const articleRows = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    cover_image_url: a.cover_image_url,
    category_id: categoryIdBySlug[a.category_slug] || null,
    author_id: authorIdByName[a.author?.name] || null,
    reading_time_minutes: a.reading_time_minutes,
    is_featured: a.is_featured,
    is_breaking: a.is_breaking,
    view_count: a.view_count,
    published_at: a.published_at,
  }));
  const { error: articleErr } = await supabase
    .from("articles")
    .upsert(articleRows, { onConflict: "slug" });
  if (articleErr) throw articleErr;

  console.log("Seeding tokoh...");
  const { error: tokohErr } = await supabase.from("tokoh").upsert(tokohList, { onConflict: "slug" });
  if (tokohErr) throw tokohErr;

  console.log("Seeding gallery...");
  const { error: galleryErr } = await supabase.from("gallery_items").insert(galleryItems);
  if (galleryErr && !String(galleryErr.message).includes("duplicate")) throw galleryErr;

  console.log("Seeding videos...");
  const { error: videoErr } = await supabase.from("videos").insert(videos);
  if (videoErr && !String(videoErr.message).includes("duplicate")) throw videoErr;

  console.log("Seeding agenda...");
  const { error: agendaErr } = await supabase.from("agenda_items").insert(agendaItems);
  if (agendaErr && !String(agendaErr.message).includes("duplicate")) throw agendaErr;

  console.log("Selesai! Data KEMUTNEWS berhasil di-seed ke Supabase.");
}

run().catch((err) => {
  console.error("Seeding gagal:", err.message || err);
  process.exit(1);
});
