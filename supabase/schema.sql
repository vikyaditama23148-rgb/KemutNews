-- ============================================================
-- KEMUTNEWS — Supabase Schema
-- Jalankan file ini di Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- CATEGORIES
-- ------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- AUTHORS
-- ------------------------------------------------------------
create table if not exists authors (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  role text,
  avatar_url text,
  bio text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- ARTICLES  (Kabar KEMUT, Kegiatan, Cerita, Opini, dst — dibedakan via category)
-- ------------------------------------------------------------
create table if not exists articles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,                          -- markdown / rich text
  cover_image_url text,
  category_id uuid references categories(id) on delete set null,
  author_id uuid references authors(id) on delete set null,
  reading_time_minutes int default 3,
  is_featured boolean default false,     -- tampil di Hero
  is_breaking boolean default false,     -- tampil di ticker
  view_count int default 0,
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

create index if not exists idx_articles_category on articles(category_id);
create index if not exists idx_articles_published on articles(published_at desc);
create index if not exists idx_articles_featured on articles(is_featured);

-- ------------------------------------------------------------
-- TOKOH KEMUT (community profiles)
-- ------------------------------------------------------------
create table if not exists tokoh (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  role text,
  photo_url text,
  short_description text,
  full_bio text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- GALLERY (KEMUT Moments)
-- ------------------------------------------------------------
create table if not exists gallery_items (
  id uuid primary key default uuid_generate_v4(),
  image_url text not null,
  caption text,
  event_name text,
  taken_at date,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------
-- VIDEOS (KEMUT Video)
-- ------------------------------------------------------------
create table if not exists videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  thumbnail_url text,
  video_url text,
  category text,
  duration_seconds int,
  is_featured boolean default false,
  published_at timestamptz default now()
);

-- ------------------------------------------------------------
-- AGENDA (upcoming events)
-- ------------------------------------------------------------
create table if not exists agenda_items (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  event_date date not null,
  event_time text,
  location text,
  description text,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Public read-only access (anon key), write access reserved for
-- service role only (used by an admin dashboard in a later phase).
-- ============================================================
alter table categories enable row level security;
alter table authors enable row level security;
alter table articles enable row level security;
alter table tokoh enable row level security;
alter table gallery_items enable row level security;
alter table videos enable row level security;
alter table agenda_items enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read authors" on authors for select using (true);
create policy "Public read articles" on articles for select using (true);
create policy "Public read tokoh" on tokoh for select using (true);
create policy "Public read gallery" on gallery_items for select using (true);
create policy "Public read videos" on videos for select using (true);
create policy "Public read agenda" on agenda_items for select using (true);

-- Write access is intentionally NOT granted to anon/authenticated here.
-- Phase 2+ (admin dashboard) should insert/update using the service role
-- key from a secure server context, or add authenticated-only policies
-- scoped to an "editors" role.

-- ============================================================
-- PHASE 2 — ADMIN WRITE ACCESS
-- Anyone who can log in (via Supabase Auth) is treated as an editor.
-- There is no public sign-up flow in this project: admins are added
-- manually from Supabase Dashboard > Authentication > Users > Add user.
-- ============================================================

create policy "Authenticated manage articles" on articles
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated manage categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated manage authors" on authors
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated manage tokoh" on tokoh
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated manage gallery" on gallery_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated manage videos" on videos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Authenticated manage agenda" on agenda_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ------------------------------------------------------------
-- STORAGE — bucket for cover images / uploaded media
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('kemutnews-media', 'kemutnews-media', true)
on conflict (id) do nothing;

create policy "Public read media" on storage.objects
  for select using (bucket_id = 'kemutnews-media');

create policy "Authenticated upload media" on storage.objects
  for insert with check (bucket_id = 'kemutnews-media' and auth.role() = 'authenticated');

create policy "Authenticated update media" on storage.objects
  for update using (bucket_id = 'kemutnews-media' and auth.role() = 'authenticated');

create policy "Authenticated delete media" on storage.objects
  for delete using (bucket_id = 'kemutnews-media' and auth.role() = 'authenticated');
