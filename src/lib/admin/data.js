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

export async function getAdminTokohList() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tokoh")
    .select("id, slug, name, role, photo_url, short_description")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAdminTokohById(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tokoh")
    .select("id, slug, name, role, photo_url, short_description, full_bio")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getAdminVideoList() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, thumbnail_url, video_url, category, duration_seconds, is_featured, published_at")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAdminVideoById(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("videos")
    .select("id, title, thumbnail_url, video_url, category, duration_seconds, is_featured")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getAdminGalleryList() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, image_url, caption, event_name, taken_at")
    .order("taken_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getAdminGalleryById(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("id, image_url, caption, event_name, taken_at")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getAdminAgendaList() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agenda_items")
    .select("id, title, event_date, event_time, location, description")
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getAdminAgendaById(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("agenda_items")
    .select("id, title, event_date, event_time, location, description")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
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