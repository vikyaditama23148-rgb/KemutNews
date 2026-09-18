"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const VALID_EMOJIS = ["👍", "❤️", "😮", "😢", "😡"];

// Satu pengunjung = satu reaksi per artikel (dilacak lewat cookie berisi
// ID baris reaksinya). Klik emoji lain akan MENGGANTI reaksi lama,
// bukan menambah baris baru — supaya hitungan tidak digelembungkan.
export async function reactToArticleAction(slug, emoji) {
  if (!slug || !VALID_EMOJIS.includes(emoji)) return;

  const cookieStore = cookies();
  const cookieName = `reaction_${slug}`;
  const existingId = cookieStore.get(cookieName)?.value;

  try {
    const supabase = createClient();

    if (existingId) {
      const { error, data } = await supabase
        .from("article_reactions")
        .update({ emoji })
        .eq("id", existingId)
        .eq("article_slug", slug)
        .select("id");

      if (!error && data && data.length > 0) return; // berhasil ganti reaksi lama
      // kalau baris lama sudah tidak ada, lanjut buat baris baru di bawah
    }

    const { data, error } = await supabase
      .from("article_reactions")
      .insert({ article_slug: slug, emoji })
      .select("id")
      .single();

    if (!error && data) {
      cookieStore.set(cookieName, data.id, {
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }
  } catch (err) {
    console.error("[KEMUTNEWS] reactToArticleAction error:", err);
  }
}