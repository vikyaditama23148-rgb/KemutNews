import { supabase, isSupabaseConfigured } from "./supabaseClient";
import {
  articles as mockArticles,
  categories as mockCategories,
  tokohList as mockTokoh,
  galleryItems as mockGallery,
  videos as mockVideos,
  agendaItems as mockAgenda,
} from "@/data/mockData";

const CATEGORY_MAP = Object.fromEntries(mockCategories.map((c) => [c.slug, c]));

function normalizeMockArticle(a) {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    cover_image_url: a.cover_image_url,
    category: CATEGORY_MAP[a.category_slug] || null,
    author: a.author,
    reading_time_minutes: a.reading_time_minutes,
    is_featured: a.is_featured,
    is_breaking: a.is_breaking,
    view_count: a.view_count,
    published_at: a.published_at,
  };
}

function normalizeDbArticle(row) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    cover_image_url: row.cover_image_url,
    category: row.categories
      ? { slug: row.categories.slug, name: row.categories.name }
      : null,
    author: row.authors
      ? { name: row.authors.name, role: row.authors.role, avatar_url: row.authors.avatar_url }
      : null,
    reading_time_minutes: row.reading_time_minutes,
    is_featured: row.is_featured,
    is_breaking: row.is_breaking,
    view_count: row.view_count,
    published_at: row.published_at,
  };
}

const ARTICLE_SELECT = `
  slug, title, excerpt, content, cover_image_url, reading_time_minutes,
  is_featured, is_breaking, view_count, published_at,
  categories ( slug, name ),
  authors ( name, role, avatar_url )
`;

// ---------------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------------

export async function getHomepageFeed() {
  if (!isSupabaseConfigured) {
    const sorted = [...mockArticles].sort(
      (a, b) => new Date(b.published_at) - new Date(a.published_at)
    );
    return {
      featured: sorted.find((a) => a.is_featured) || sorted[0],
      supporting: sorted.filter((a) => !a.is_featured).slice(0, 3).map(normalizeMockArticle),
      breaking: sorted.filter((a) => a.is_breaking).map(normalizeMockArticle),
      latest: sorted.map(normalizeMockArticle),
      mostRead: [...sorted].sort((a, b) => b.view_count - a.view_count).slice(0, 5).map(normalizeMockArticle),
    };
  }

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .order("published_at", { ascending: false })
    .limit(24);

  if (error) console.error("[KEMUTNEWS] getHomepageFeed error:", error);
  if (error || !data || data.length === 0) {
    return getHomepageFeed.__fallback();
  }

  const normalized = data.map(normalizeDbArticle);
  return {
    featured: normalized.find((a) => a.is_featured) || normalized[0],
    supporting: normalized.filter((a) => !a.is_featured).slice(0, 3),
    breaking: normalized.filter((a) => a.is_breaking),
    latest: normalized,
    mostRead: [...normalized].sort((a, b) => (b.view_count || 0) - (a.view_count || 0)).slice(0, 5),
  };
}
// small helper so we can reuse the mock branch above from within the try/catch shape
getHomepageFeed.__fallback = () => {
  const sorted = [...mockArticles].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );
  return {
    featured: normalizeMockArticle(sorted.find((a) => a.is_featured) || sorted[0]),
    supporting: sorted.filter((a) => !a.is_featured).slice(0, 3).map(normalizeMockArticle),
    breaking: sorted.filter((a) => a.is_breaking).map(normalizeMockArticle),
    latest: sorted.map(normalizeMockArticle),
    mostRead: [...sorted].sort((a, b) => b.view_count - a.view_count).slice(0, 5).map(normalizeMockArticle),
  };
};

export async function getArticleBySlug(slug) {
  if (!isSupabaseConfigured) {
    const found = mockArticles.find((a) => a.slug === slug);
    return found ? normalizeMockArticle(found) : null;
  }
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("slug", slug)
    .single();
  if (error) console.error("[KEMUTNEWS] getArticleBySlug error:", error);
  if (error || !data) {
    const found = mockArticles.find((a) => a.slug === slug);
    return found ? normalizeMockArticle(found) : null;
  }
  return normalizeDbArticle(data);
}

export async function getArticlesByCategory(categorySlug) {
  if (!isSupabaseConfigured) {
    return mockArticles
      .filter((a) => a.category_slug === categorySlug)
      .map(normalizeMockArticle);
  }
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .order("published_at", { ascending: false });
  if (error) console.error("[KEMUTNEWS] getArticlesByCategory error:", error);
  if (error || !data) {
    return mockArticles.filter((a) => a.category_slug === categorySlug).map(normalizeMockArticle);
  }
  return data
    .map(normalizeDbArticle)
    .filter((a) => a.category && a.category.slug === categorySlug);
}

export async function searchArticles(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];

  if (!isSupabaseConfigured) {
    return mockArticles
      .filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
      .map(normalizeMockArticle);
  }

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`)
    .order("published_at", { ascending: false });

  if (error) console.error("[KEMUTNEWS] searchArticles error:", error);
  if (error || !data) {
    return mockArticles
      .filter((a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
      .map(normalizeMockArticle);
  }
  return data.map(normalizeDbArticle);
}

export async function getRelatedArticles(categorySlug, excludeSlug, limit = 3) {
  const list = await getArticlesByCategory(categorySlug);
  return list.filter((a) => a.slug !== excludeSlug).slice(0, limit);
}

// ---------------------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------------------

export async function getCategories() {
  if (!isSupabaseConfigured) return mockCategories;
  const { data, error } = await supabase.from("categories").select("slug, name, description");
  if (error) console.error("[KEMUTNEWS] getCategories error:", error);
  if (error || !data || data.length === 0) return mockCategories;
  return data;
}

export async function getCategoryBySlug(slug) {
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) || null;
}

// ---------------------------------------------------------------------
// TOKOH
// ---------------------------------------------------------------------

export async function getTokohList() {
  if (!isSupabaseConfigured) return mockTokoh;
  const { data, error } = await supabase
    .from("tokoh")
    .select("slug, name, role, photo_url, short_description, full_bio")
    .order("created_at", { ascending: true });
  if (error) console.error("[KEMUTNEWS] getTokohList error:", error);
  if (error || !data || data.length === 0) return mockTokoh;
  return data;
}

export async function getTokohBySlug(slug) {
  if (!isSupabaseConfigured) return mockTokoh.find((t) => t.slug === slug) || null;
  const { data, error } = await supabase
    .from("tokoh")
    .select("slug, name, role, photo_url, short_description, full_bio")
    .eq("slug", slug)
    .single();
  if (error) console.error("[KEMUTNEWS] getTokohBySlug error:", error);
  if (error || !data) return mockTokoh.find((t) => t.slug === slug) || null;
  return data;
}

// ---------------------------------------------------------------------
// GALLERY
// ---------------------------------------------------------------------

export async function getGalleryItems() {
  if (!isSupabaseConfigured) return mockGallery;
  const { data, error } = await supabase
    .from("gallery_items")
    .select("image_url, caption, event_name, taken_at")
    .order("taken_at", { ascending: false });
  if (error) console.error("[KEMUTNEWS] getGalleryItems error:", error);
  if (error || !data || data.length === 0) return mockGallery;
  return data;
}

// ---------------------------------------------------------------------
// VIDEOS
// ---------------------------------------------------------------------

export async function getVideos() {
  if (!isSupabaseConfigured) return mockVideos;
  const { data, error } = await supabase
    .from("videos")
    .select("title, thumbnail_url, video_url, category, duration_seconds, is_featured, published_at")
    .order("published_at", { ascending: false });
  if (error) console.error("[KEMUTNEWS] getVideos error:", error);
  if (error || !data || data.length === 0) return mockVideos;
  return data;
}

// ---------------------------------------------------------------------
// AGENDA
// ---------------------------------------------------------------------

export async function getAgendaItems() {
  if (!isSupabaseConfigured) return mockAgenda;
  const { data, error } = await supabase
    .from("agenda_items")
    .select("title, event_date, event_time, location, description")
    .order("event_date", { ascending: true });
  if (error) console.error("[KEMUTNEWS] getAgendaItems error:", error);
  if (error || !data || data.length === 0) return mockAgenda;
  return data;
}

// ---------------------------------------------------------------------
// COMMENTS
// ---------------------------------------------------------------------

export async function getApprovedComments(articleSlug) {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("comments")
    .select("id, name, website, content, created_at")
    .eq("article_slug", articleSlug)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[KEMUTNEWS] getApprovedComments error:", error);
    return [];
  }
  return data || [];
}

// ---------------------------------------------------------------------
// REAKSI EMOJI
// ---------------------------------------------------------------------

export async function getReactionCounts(articleSlug) {
  if (!isSupabaseConfigured) return {};
  const { data, error } = await supabase
    .from("article_reactions")
    .select("emoji")
    .eq("article_slug", articleSlug);

  if (error) {
    console.error("[KEMUTNEWS] getReactionCounts error:", error);
    return {};
  }

  const counts = {};
  for (const row of data || []) {
    counts[row.emoji] = (counts[row.emoji] || 0) + 1;
  }
  return counts;
}