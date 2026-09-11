"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function resolveAuthorId(supabase, authorName) {
  const name = (authorName || "").trim();
  if (!name) return null;

  const { data: existing } = await supabase
    .from("authors")
    .select("id")
    .eq("name", name)
    .maybeSingle();

  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from("authors")
    .insert({ name, role: "Kontributor" })
    .select("id")
    .single();

  if (error) throw error;
  return created.id;
}

function buildArticlePayload(formData) {
  return {
    title: formData.get("title")?.toString().trim(),
    excerpt: formData.get("excerpt")?.toString().trim(),
    content: formData.get("content")?.toString().trim(),
    cover_image_url: formData.get("cover_image_url")?.toString().trim() || null,
    category_id: formData.get("category_id")?.toString() || null,
    reading_time_minutes: Number(formData.get("reading_time_minutes")) || 3,
    is_featured: formData.get("is_featured") === "on",
    is_breaking: formData.get("is_breaking") === "on",
  };
}

export async function createArticleAction(formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildArticlePayload(formData);
  const authorId = await resolveAuthorId(supabase, formData.get("author_name")?.toString());

  let slug = slugify(formData.get("slug")?.toString() || payload.title || "");
  if (!slug) slug = `artikel-${Date.now()}`;

  const { error } = await supabase.from("articles").insert({
    ...payload,
    slug,
    author_id: authorId,
    view_count: 0,
    published_at: new Date().toISOString(),
  });

  if (error) {
    redirect(`/admin/artikel/baru?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/artikel");
  revalidatePath("/");
  redirect("/admin/artikel");
}

export async function updateArticleAction(id, formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildArticlePayload(formData);
  const authorId = await resolveAuthorId(supabase, formData.get("author_name")?.toString());
  const slug = slugify(formData.get("slug")?.toString() || payload.title || "");

  const { error } = await supabase
    .from("articles")
    .update({ ...payload, slug, author_id: authorId })
    .eq("id", id);

  if (error) {
    redirect(`/admin/artikel/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/artikel");
  revalidatePath(`/artikel/${slug}`);
  revalidatePath("/");
  redirect("/admin/artikel");
}

export async function deleteArticleAction(id) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/artikel");
  revalidatePath("/");
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// ---------------------------------------------------------------------
// TOKOH KEMUT
// ---------------------------------------------------------------------

function buildTokohPayload(formData) {
  return {
    name: formData.get("name")?.toString().trim(),
    role: formData.get("role")?.toString().trim() || null,
    photo_url: formData.get("photo_url")?.toString().trim() || null,
    short_description: formData.get("short_description")?.toString().trim() || null,
    full_bio: formData.get("full_bio")?.toString().trim() || null,
  };
}

export async function createTokohAction(formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildTokohPayload(formData);
  let slug = slugify(formData.get("slug")?.toString() || payload.name || "");
  if (!slug) slug = `tokoh-${Date.now()}`;

  const { error } = await supabase.from("tokoh").insert({ ...payload, slug });

  if (error) {
    redirect(`/admin/tokoh/baru?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/tokoh");
  revalidatePath("/tokoh");
  revalidatePath("/");
  redirect("/admin/tokoh");
}

export async function updateTokohAction(id, formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildTokohPayload(formData);
  const slug = slugify(formData.get("slug")?.toString() || payload.name || "");

  const { error } = await supabase.from("tokoh").update({ ...payload, slug }).eq("id", id);

  if (error) {
    redirect(`/admin/tokoh/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/tokoh");
  revalidatePath(`/tokoh/${slug}`);
  revalidatePath("/tokoh");
  revalidatePath("/");
  redirect("/admin/tokoh");
}

export async function deleteTokohAction(id) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { error } = await supabase.from("tokoh").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/tokoh");
  revalidatePath("/tokoh");
  revalidatePath("/");
}

// ---------------------------------------------------------------------
// VIDEO
// ---------------------------------------------------------------------

function buildVideoPayload(formData) {
  return {
    title: formData.get("title")?.toString().trim(),
    video_url: formData.get("video_url")?.toString().trim(),
    thumbnail_url: formData.get("thumbnail_url")?.toString().trim() || null,
    category: formData.get("category")?.toString().trim() || null,
    duration_seconds: Number(formData.get("duration_seconds")) || null,
    is_featured: formData.get("is_featured") === "on",
  };
}

export async function createVideoAction(formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildVideoPayload(formData);

  const { error } = await supabase.from("videos").insert({
    ...payload,
    published_at: new Date().toISOString(),
  });

  if (error) {
    redirect(`/admin/video/baru?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/video");
  revalidatePath("/kategori/video");
  revalidatePath("/");
  redirect("/admin/video");
}

export async function updateVideoAction(id, formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildVideoPayload(formData);

  const { error } = await supabase.from("videos").update(payload).eq("id", id);

  if (error) {
    redirect(`/admin/video/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/video");
  revalidatePath("/kategori/video");
  revalidatePath("/");
  redirect("/admin/video");
}

export async function deleteVideoAction(id) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/video");
  revalidatePath("/kategori/video");
  revalidatePath("/");
}

// ---------------------------------------------------------------------
// GALERI (KEMUT Moments)
// ---------------------------------------------------------------------

function buildGalleryPayload(formData) {
  return {
    image_url: formData.get("image_url")?.toString().trim(),
    caption: formData.get("caption")?.toString().trim() || null,
    event_name: formData.get("event_name")?.toString().trim() || null,
    taken_at: formData.get("taken_at")?.toString() || null,
  };
}

export async function createGalleryAction(formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildGalleryPayload(formData);

  if (!payload.image_url) {
    redirect(`/admin/galeri/baru?error=${encodeURIComponent("Foto wajib diunggah terlebih dahulu.")}`);
  }

  const { error } = await supabase.from("gallery_items").insert(payload);

  if (error) {
    redirect(`/admin/galeri/baru?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  revalidatePath("/");
  redirect("/admin/galeri");
}

export async function updateGalleryAction(id, formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const payload = buildGalleryPayload(formData);

  const { error } = await supabase.from("gallery_items").update(payload).eq("id", id);

  if (error) {
    redirect(`/admin/galeri/${id}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  revalidatePath("/");
  redirect("/admin/galeri");
}

export async function deleteGalleryAction(id) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { error } = await supabase.from("gallery_items").delete().eq("id", id);
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  revalidatePath("/");
}