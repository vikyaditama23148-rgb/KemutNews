# KEMUTNEWS

Media informasi dan dokumentasi digital untuk keluarga besar **KEMUT** ("Kecil dan Imut") — dibangun dengan **Next.js 14 (App Router)**, **Tailwind CSS**, dan **Supabase** sebagai database. Identitas visual: premium newsroom, hitam & emas, editorial.

Situs ini sudah tersambung ke skema database lengkap (artikel, kategori, penulis, tokoh, galeri, video, agenda) dan tetap tampil sempurna dengan **data contoh (mock data)** meski Supabase belum dikonfigurasi — jadi bisa langsung dijalankan begitu di-*clone*.

---

## 1. Menjalankan di VS Code (lokal)

**Prasyarat:** Node.js 18.18+ dan npm. Cek dengan `node -v`.

```bash
# 1. Buka folder ini di VS Code
code kemutnews

# 2. Install dependency
npm install

# 3. Salin file environment
cp .env.example .env.local
# lalu isi NEXT_PUBLIC_SUPABASE_URL & NEXT_PUBLIC_SUPABASE_ANON_KEY
# (boleh dikosongkan dulu — situs tetap jalan pakai data contoh)

# 4. Jalankan development server
npm run dev
```

Buka **http://localhost:3000**. Ekstensi VS Code yang direkomendasikan: **Tailwind CSS IntelliSense** dan **ES7+ React/Redux/React-Native snippets**.

---

## 2. Menghubungkan Supabase (database)

1. Buat project baru di [supabase.com](https://supabase.com).
2. Masuk ke **SQL Editor** → **New query**, tempel isi `supabase/schema.sql`, lalu **Run**. Ini membuat semua tabel (`articles`, `categories`, `authors`, `tokoh`, `gallery_items`, `videos`, `agenda_items`) beserta Row Level Security (akses baca publik, tulis dibatasi).
3. Buat query baru lagi, tempel isi `supabase/seed.sql`, lalu **Run**. Ini mengisi data contoh berbahasa Indonesia agar situs langsung terisi konten nyata.
   - Alternatif: jalankan `npm run seed` dari terminal (memakai `scripts/seed.mjs`) — perlu `SUPABASE_SERVICE_ROLE_KEY` di `.env`.
4. Buka **Project Settings → API**, salin **Project URL** dan **anon public key**, isi ke `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

5. Restart `npm run dev`. Situs otomatis membaca dari Supabase — tidak perlu ubah kode apa pun, karena `src/lib/data.js` sudah menangani logika "pakai Supabase jika tersedia, kalau tidak pakai data contoh".

> **Catatan:** Fase ini hanya menyediakan **pembacaan (read)** data ke frontend, sesuai roadmap pada dokumen brief (Fase 2–12: admin dashboard, autentikasi, upload gambar, dst. adalah pengembangan lanjutan).

---

## 3. Publish ke GitHub

```bash
git init
git add .
git commit -m "Initial commit: KEMUTNEWS"

# Buat repo baru di github.com, lalu:
git remote add origin https://github.com/USERNAME/kemutnews.git
git branch -M main
git push -u origin main
```

File `.env.local` **tidak akan ikut ter-commit** (sudah ada di `.gitignore`) — kredensial Supabase kamu aman.

---

## 4. Deploy ke Vercel

**Cara termudah (lewat dashboard):**

1. Buka [vercel.com/new](https://vercel.com/new) dan **Import** repo GitHub `kemutnews` yang baru dibuat.
2. Vercel otomatis mendeteksi framework **Next.js** — tidak perlu ubah build settings.
3. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Klik **Deploy**. Selesai dalam ±1 menit, situs langsung online.

**Atau lewat CLI:**

```bash
npm i -g vercel
vercel login
vercel        # deploy preview
vercel --prod # deploy production
```

Setiap kali kamu `git push` ke `main`, Vercel otomatis build & deploy ulang (CI/CD bawaan).

---

## 5. Fase 2 — Admin Panel (Login, CRUD Artikel, Upload Gambar)

Situs ini sudah dilengkapi panel admin di **`/admin`** untuk mengelola artikel tanpa menyentuh kode maupun Supabase Table Editor.

### Membuat akun admin

Tidak ada halaman pendaftaran publik (disengaja, demi keamanan). Tambahkan akun admin manual:

1. Buka dashboard Supabase → **Authentication → Users → Add user**.
2. Isi email & password, centang **Auto Confirm User**.
3. Login di `https://situs-kamu.vercel.app/admin/login` (atau `http://localhost:3000/admin/login`) dengan akun tadi.

### Yang bisa dilakukan di Admin Panel

- **Dashboard** (`/admin`) — ringkasan jumlah artikel, tokoh, foto, video, dan agenda.
- **Kelola Artikel** (`/admin/artikel`) — lihat semua artikel, edit, atau hapus.
- **Artikel Baru** (`/admin/artikel/baru`) — form lengkap: judul, slug otomatis, ringkasan, isi, kategori, waktu baca, penanda Headline/Ticker, dan **upload gambar sampul langsung ke Supabase Storage** (bucket `kemutnews-media`, dibuat otomatis oleh `schema.sql`).
- **Edit Artikel** (`/admin/artikel/[id]`) — form yang sama, terisi otomatis dengan data yang ada.
- Perubahan langsung tersinkron ke situs publik (revalidate otomatis).

> Tokoh KEMUT, Galeri, Video, dan Agenda untuk saat ini masih dikelola lewat Supabase Table Editor atau `supabase/seed.sql` — pola form yang sama seperti Artikel bisa ditambahkan sebagai pengembangan lanjutan.

### Cara kerja proteksi

- `middleware.js` memeriksa sesi Supabase Auth di setiap request ke `/admin/*` dan mengarahkan ke `/admin/login` jika belum login.
- Baca/tulis ke tabel `articles` dkk. hanya diizinkan untuk **pengguna yang sudah login** (kebijakan RLS `Authenticated manage ...` di `schema.sql`) — publik tetap hanya bisa membaca.
- Upload gambar tersimpan di bucket Storage publik-baca `kemutnews-media`; hanya pengguna login yang bisa mengunggah/menghapus (lihat kebijakan storage di `schema.sql`).

---

## 6. Struktur Proyek

```
kemutnews/
├── middleware.js                # Proteksi rute /admin (cek sesi Supabase)
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/            # Halaman login (publik)
│   │   │   └── (protected)/      # Dashboard & kelola artikel (butuh login)
│   │   ├── page.jsx             # Homepage
│   │   ├── layout.jsx           # Layout global (font, TopBar, Header, Footer)
│   │   ├── artikel/[slug]/      # Halaman detail artikel
│   │   ├── kategori/[slug]/     # Listing per kategori
│   │   ├── cari/                # Hasil pencarian
│   │   ├── galeri/              # KEMUT Moments (galeri foto)
│   │   ├── agenda/              # Agenda KEMUT
│   │   └── tokoh/               # Tokoh KEMUT (listing & detail)
│   ├── components/
│   │   └── admin/               # Komponen khusus admin panel
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.js        # Supabase client untuk browser
│   │   │   ├── server.js        # Supabase client untuk Server Components/Actions
│   │   │   └── middleware.js    # Refresh sesi di middleware
│   │   ├── admin/
│   │   │   ├── data.js          # Query khusus admin (butuh sesi login)
│   │   │   └── actions.js       # Server Actions: create/update/delete artikel, sign out
│   │   ├── supabaseClient.js    # Supabase client publik (anon, read-only)
│   │   ├── data.js              # Data access layer (Supabase + fallback)
│   │   └── format.js            # Helper format tanggal/waktu Indonesia
│   └── data/mockData.js         # Data contoh (dipakai jika Supabase belum diisi)
├── supabase/
│   ├── schema.sql               # Skema tabel + RLS + bucket Storage
│   └── seed.sql                 # Data contoh untuk database
├── scripts/seed.mjs             # Seed alternatif via Supabase JS client
└── .env.example
```

## 7. Fitur yang sudah dibangun

- Halaman publik: Home, Detail Artikel, Kategori, Pencarian, Galeri, Agenda, Tokoh (listing & detail)
- Admin Panel: Login (Supabase Auth), Dashboard ringkasan, CRUD Artikel penuh, upload gambar ke Supabase Storage
- Komponen editorial lengkap: Breaking News ticker, Hero News, Most Read, Community Spotlight, Tokoh KEMUT, KEMUT Moments (galeri masonry), KEMUT Video, Agenda, Newsletter CTA
- Desain sepenuhnya responsif (mobile, tablet, laptop, desktop) dengan navigasi drawer mobile & search overlay
- Sistem desain konsisten: warna hitam-emas-krem, tipografi Playfair Display + Inter, spacing 8px

## 8. Pengembangan lanjutan (roadmap)

- Form CRUD serupa untuk Tokoh, Galeri, Video, dan Agenda (saat ini masih lewat Supabase Table Editor)
- Manajemen kategori & daftar penulis dari Admin Panel
- Sistem peran (role) — misalnya Editor vs Kontributor — dengan Supabase Row Level Security bertingkat
- Pencarian full-text yang lebih canggih (Postgres `tsvector` / Supabase full-text search)
- Analitik pembaca dan statistik artikel
