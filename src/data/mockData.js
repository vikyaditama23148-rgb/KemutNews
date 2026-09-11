// Fallback content so the site renders a full, realistic preview even
// before Supabase is connected. Once NEXT_PUBLIC_SUPABASE_URL /
// NEXT_PUBLIC_SUPABASE_ANON_KEY are set and supabase/seed.sql has been run,
// src/lib/data.js reads from the real database instead.

export const categories = [
  { slug: "kabar-kemut", name: "Kabar KEMUT", description: "Berita resmi dan perkembangan komunitas" },
  { slug: "kegiatan", name: "Kegiatan", description: "Acara dan aktivitas keluarga besar KEMUT" },
  { slug: "tokoh", name: "Tokoh KEMUT", description: "Profil dan kisah anggota serta tokoh penting" },
  { slug: "cerita", name: "Cerita KEMUT", description: "Kisah personal, kenangan, dan cerita hangat" },
  { slug: "opini", name: "Opini", description: "Gagasan dan sudut pandang dari komunitas" },
  { slug: "galeri", name: "Galeri", description: "Dokumentasi foto kebersamaan" },
  { slug: "video", name: "Video", description: "Jurnalisme dan dokumentasi video" },
  { slug: "agenda", name: "Agenda", description: "Kegiatan yang akan datang" },
];

const authorRangga = { name: "Rangga Saputra", role: "Redaktur KEMUTNEWS", avatar_url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=256&h=256&fit=crop" };
const authorDinda = { name: "Dinda Ayu Larasati", role: "Jurnalis Komunitas", avatar_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop" };
const authorFajar = { name: "Fajar Ramadhan", role: "Kontributor", avatar_url: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=256&h=256&fit=crop" };

export const articles = [
  {
    slug: "keluarga-besar-kemut-kembali-berkumpul",
    title: "Keluarga Besar KEMUT Kembali Berkumpul dalam Momen Penuh Kebersamaan",
    excerpt: "Ratusan anggota keluarga besar KEMUT hadir dalam pertemuan tahunan yang berlangsung hangat dan penuh haru.",
    content: `Pertemuan tahunan keluarga besar KEMUT tahun ini berlangsung lebih meriah dibanding sebelumnya. Ratusan anggota dari berbagai daerah hadir untuk merayakan kebersamaan yang telah terjalin selama bertahun-tahun.

Acara dibuka dengan sambutan hangat dari perwakilan komunitas, dilanjutkan dengan sesi berbagi cerita antar generasi. Momen ini menjadi pengingat bahwa KEMUT bukan sekadar perkumpulan, melainkan keluarga yang terus tumbuh bersama waktu.

> "Yang kami rayakan bukan acaranya, tapi orang-orang di dalamnya," ujar salah satu panitia dalam sambutannya.

Ke depan, kegiatan serupa direncanakan menjadi agenda tahunan tetap yang akan terus mempererat tali silaturahmi antar anggota.`,
    cover_image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop",
    category_slug: "kabar-kemut",
    author: authorRangga,
    reading_time_minutes: 6,
    is_featured: true,
    is_breaking: true,
    view_count: 1240,
    published_at: "2026-09-10T09:00:00Z",
  },
  {
    slug: "menjaga-silaturahmi-merawat-cerita",
    title: "Menjaga Silaturahmi, Merawat Cerita, Menguatkan Keluarga KEMUT",
    excerpt: "Di tengah kesibukan masing-masing, keluarga besar KEMUT tetap berupaya menjaga tali silaturahmi lewat berbagai kegiatan rutin.",
    content: `Silaturahmi menjadi napas utama komunitas KEMUT. Melalui pertemuan rutin bulanan, obrolan santai, hingga kunjungan antar anggota, ikatan kekeluargaan terus dirawat dari waktu ke waktu.

"Yang membuat KEMUT istimewa bukan besarnya acara, tapi konsistensi kita saling hadir," ujar salah satu anggota senior.

Konsistensi inilah yang menjadi fondasi mengapa komunitas ini terus bertahan dan berkembang dari tahun ke tahun.`,
    cover_image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop",
    category_slug: "cerita",
    author: authorDinda,
    reading_time_minutes: 5,
    is_featured: false,
    is_breaking: false,
    view_count: 860,
    published_at: "2026-09-09T09:00:00Z",
  },
  {
    slug: "di-balik-kegiatan-kemut-kebersamaan",
    title: "Di Balik Kegiatan KEMUT: Tentang Kebersamaan yang Tidak Sekadar Bertemu",
    excerpt: "Setiap kegiatan KEMUT menyimpan cerita di baliknya — bukan hanya soal agenda, tapi soal makna kebersamaan itu sendiri.",
    content: `Banyak yang mengira kegiatan komunitas hanya soal mengisi jadwal. Namun bagi keluarga besar KEMUT, setiap kegiatan adalah ruang untuk saling mengenal lebih dalam.

Dari kegiatan bakti sosial hingga gathering santai, semangat yang sama selalu hadir: kebersamaan yang tulus.`,
    cover_image_url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop",
    category_slug: "kegiatan",
    author: authorFajar,
    reading_time_minutes: 4,
    is_featured: false,
    is_breaking: false,
    view_count: 512,
    published_at: "2026-09-08T09:00:00Z",
  },
  {
    slug: "gotong-royong-bersih-lingkungan",
    title: "KEMUT Peduli: Aksi Gotong Royong Bersihkan Lingkungan Sekitar",
    excerpt: "Puluhan anggota turun langsung membersihkan lingkungan sebagai bentuk kepedulian sosial keluarga besar KEMUT.",
    content: `Aksi gotong royong ini menjadi agenda rutin yang digagas oleh divisi sosial KEMUT. Selain mempererat kebersamaan, kegiatan ini juga menjadi wujud nyata kepedulian terhadap lingkungan sekitar.`,
    cover_image_url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&h=800&fit=crop",
    category_slug: "kegiatan",
    author: authorFajar,
    reading_time_minutes: 3,
    is_featured: false,
    is_breaking: false,
    view_count: 340,
    published_at: "2026-09-07T09:00:00Z",
  },
  {
    slug: "opini-pentingnya-regenerasi-komunitas",
    title: "Pentingnya Regenerasi dalam Menjaga Semangat Komunitas",
    excerpt: "Regenerasi bukan soal menggantikan, melainkan meneruskan nilai dan semangat yang sudah dibangun bersama.",
    content: `Regenerasi menjadi topik yang terus didiskusikan dalam forum keluarga besar KEMUT. Bagaimana nilai-nilai kekeluargaan bisa terus diteruskan ke generasi berikutnya menjadi perhatian bersama.`,
    cover_image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
    category_slug: "opini",
    author: authorDinda,
    reading_time_minutes: 4,
    is_featured: false,
    is_breaking: false,
    view_count: 275,
    published_at: "2026-09-06T09:00:00Z",
  },
  {
    slug: "dari-pertemuan-sederhana-tumbuh-keluarga",
    title: "Dari Pertemuan Sederhana, Tumbuh Menjadi Sebuah Keluarga",
    excerpt: "Berawal dari sebuah pertemuan kecil, KEMUT kini tumbuh menjadi keluarga besar yang saling menguatkan.",
    content: `Kisah ini bermula dari pertemuan sederhana bertahun-tahun lalu. Tak ada yang menyangka, momen kecil itu tumbuh menjadi ikatan keluarga yang besar dan hangat seperti sekarang.

Setiap anggota membawa cerita masing-masing, namun semuanya bermuara pada satu hal: rasa memiliki terhadap KEMUT.`,
    cover_image_url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&h=900&fit=crop",
    category_slug: "cerita",
    author: authorRangga,
    reading_time_minutes: 7,
    is_featured: false,
    is_breaking: false,
    view_count: 980,
    published_at: "2026-09-05T09:00:00Z",
  },
];

export const tokohList = [
  { slug: "budi-santoso", name: "Budi Santoso", role: "Sesepuh KEMUT", photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop", short_description: "Salah satu penggagas awal berdirinya komunitas KEMUT.", full_bio: "Budi Santoso telah menjadi bagian dari KEMUT sejak awal berdiri. Dedikasinya menjaga nilai kekeluargaan menjadi inspirasi bagi generasi berikutnya." },
  { slug: "siti-rahmawati", name: "Siti Rahmawati", role: "Koordinator Kegiatan", photo_url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=750&fit=crop", short_description: "Menggerakkan berbagai kegiatan sosial keluarga besar KEMUT.", full_bio: "Siti aktif menggerakkan program-program sosial dan kegiatan rutin yang mempererat anggota KEMUT." },
  { slug: "andika-pratama", name: "Andika Pratama", role: "Ketua Divisi Media", photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop", short_description: "Mengelola dokumentasi dan publikasi KEMUTNEWS.", full_bio: "Andika memimpin tim media yang mendokumentasikan setiap momen perjalanan KEMUT." },
  { slug: "maya-lestari", name: "Maya Lestari", role: "Perwakilan Generasi Muda", photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop", short_description: "Membawa suara anak muda dalam setiap diskusi komunitas.", full_bio: "Maya mewakili suara generasi muda KEMUT dan aktif dalam program regenerasi komunitas." },
];

export const galleryItems = [
  { image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop", caption: "Kehangatan dalam setiap pertemuan", event_name: "Gathering Tahunan" },
  { image_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop", caption: "Sesi foto bersama keluarga besar", event_name: "Gathering Tahunan" },
  { image_url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=1000&fit=crop", caption: "Momen santai sebelum acara dimulai", event_name: "Kopdar Bulanan" },
  { image_url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop", caption: "Diskusi hangat antar generasi", event_name: "Forum Komunitas" },
  { image_url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=1000&fit=crop", caption: "Gotong royong bersih lingkungan", event_name: "KEMUT Peduli" },
  { image_url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop", caption: "Cerita di sela kegiatan", event_name: "Kopdar Bulanan" },
];

export const videos = [
  { title: "Momen Kebersamaan Gathering Tahunan KEMUT", thumbnail_url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=675&fit=crop", category: "Kegiatan", duration_seconds: 245, is_featured: true },
  { title: "Cerita Singkat: Kenapa Kami Menyebutnya Keluarga", thumbnail_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop", category: "Cerita", duration_seconds: 132, is_featured: false },
  { title: "Dokumentasi Aksi KEMUT Peduli Lingkungan", thumbnail_url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop", category: "Kegiatan", duration_seconds: 178, is_featured: false },
  { title: "Profil Singkat: Tokoh di Balik KEMUT", thumbnail_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop", category: "Tokoh", duration_seconds: 205, is_featured: false },
];

export const agendaItems = [
  { title: "Gathering Keluarga KEMUT", event_date: "2026-09-15", event_time: "18:30 WIB", location: "Balai Warga Sukamaju", description: "Pertemuan rutin keluarga besar KEMUT dengan agenda ramah tamah dan makan malam bersama." },
  { title: "Rapat Koordinasi Divisi Sosial", event_date: "2026-09-22", event_time: "19:00 WIB", location: "Sekretariat KEMUT", description: "Membahas rencana kegiatan sosial untuk kuartal mendatang." },
  { title: "KEMUT Peduli: Bakti Sosial", event_date: "2026-09-30", event_time: "08:00 WIB", location: "Kampung Sukamaju Indah", description: "Kegiatan bakti sosial dan pembagian sembako untuk warga sekitar." },
  { title: "Kopdar Generasi Muda KEMUT", event_date: "2026-10-08", event_time: "16:00 WIB", location: "Taman Kota", description: "Ajang silaturahmi dan diskusi santai bersama anggota muda KEMUT." },
];
