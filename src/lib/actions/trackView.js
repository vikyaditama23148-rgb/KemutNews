"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

// Menambah view_count sebuah artikel, tapi HANYA sekali per pengunjung
// (dicek lewat cookie). Refresh berulang tidak akan menggelembungkan angka.
export async function trackViewAction(slug) {
  if (!slug || !isSupabaseConfigured) return;

  const cookieStore = cookies();
  const cookieName = `viewed_${slug}`;

  if (cookieStore.get(cookieName)) {
    return; // pengunjung ini sudah pernah dihitung untuk artikel ini
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.rpc("increment_view_count", { article_slug: slug });

    if (error) {
      console.error("[KEMUTNEWS] trackViewAction error:", error);
      return;
    }

    cookieStore.set(cookieName, "1", {
      maxAge: 60 * 60 * 24 * 365, // 1 tahun
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
  } catch (err) {
    console.error("[KEMUTNEWS] trackViewAction exception:", err);
  }
}