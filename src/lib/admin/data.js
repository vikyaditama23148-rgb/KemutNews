import { createClient } from "@/lib/supabase/server";

export async function getAdminArticles() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, slug, title, cover_image_url, is_featured, is_breaking, view_count, published_at, categories ( name ), authors ( name )"
    )
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAdminArticleById(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, slug, title, excerpt, content, cover_image_url, category_id, reading_time_minutes, is_featured, is_breaking, authors ( name )"
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getCategoriesForAdmin() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAdminStats() {
  const supabase = createClient();
  const [articles, tokoh, gallery, videos, agenda] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("tokoh").select("id", { count: "exact", head: true }),
    supabase.from("gallery_items").select("id", { count: "exact", head: true }),
    supabase.from("videos").select("id", { count: "exact", head: true }),
    supabase.from("agenda_items").select("id", { count: "exact", head: true }),
  ]);

  return {
    articles: articles.count || 0,
    tokoh: tokoh.count || 0,
    gallery: gallery.count || 0,
    videos: videos.count || 0,
    agenda: agenda.count || 0,
  };
}
