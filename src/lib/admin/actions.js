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
