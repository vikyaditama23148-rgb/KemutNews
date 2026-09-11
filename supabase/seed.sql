-- ============================================================
-- KEMUTNEWS — Seed Data (contoh)
-- Jalankan setelah schema.sql. Aman dijalankan ulang (upsert by slug).
-- ============================================================

-- CATEGORIES
insert into categories (slug, name, description) values
  ('kabar-kemut', 'Kabar KEMUT', 'Berita resmi dan perkembangan komunitas'),
  ('kegiatan', 'Kegiatan', 'Acara dan aktivitas keluarga besar KEMUT'),
  ('tokoh', 'Tokoh KEMUT', 'Profil dan kisah anggota serta tokoh penting'),
  ('cerita', 'Cerita KEMUT', 'Kisah personal, kenangan, dan cerita hangat'),
  ('opini', 'Opini', 'Gagasan dan sudut pandang dari komunitas'),
  ('galeri', 'Galeri', 'Dokumentasi foto kebersamaan'),
  ('video', 'Video', 'Jurnalisme dan dokumentasi video'),
  ('agenda', 'Agenda', 'Kegiatan yang akan datang')
on conflict (slug) do nothing;

-- AUTHORS
insert into authors (name, role, avatar_url, bio) values
  ('Rangga Saputra', 'Redaktur KEMUTNEWS', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=256&h=256&fit=crop', 'Menulis kabar komunitas sejak 2021.'),
  ('Dinda Ayu Larasati', 'Jurnalis Komunitas', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&h=256&fit=crop', 'Fokus pada cerita dan human interest KEMUT.'),
  ('Fajar Ramadhan', 'Kontributor', 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=256&h=256&fit=crop', 'Meliput kegiatan dan agenda keluarga besar KEMUT.')
on conflict do nothing;

-- ARTICLES
with c as (select id, slug from categories), a as (select id, name from authors)
insert into articles (slug, title, excerpt, content, cover_image_url, category_id, author_id, reading_time_minutes, is_featured, is_breaking, view_count, published_at)
select
  v.slug, v.title, v.excerpt, v.content, v.cover_image_url,
  (select id from c where c.slug = v.category_slug),
  (select id from a where a.name = v.author_name),
  v.reading_time, v.is_featured, v.is_breaking, v.view_count, v.published_at
from (values
  ('keluarga-besar-kemut-kembali-berkumpul',
   'Keluarga Besar KEMUT Kembali Berkumpul dalam Momen Penuh Kebersamaan',
   'Ratusan anggota keluarga besar KEMUT hadir dalam pertemuan tahunan yang berlangsung hangat dan penuh haru.',
   'Pertemuan tahunan keluarga besar KEMUT tahun ini berlangsung lebih meriah dibanding sebelumnya. Ratusan anggota dari berbagai daerah hadir untuk merayakan kebersamaan yang telah terjalin selama bertahun-tahun.\n\nAcara dibuka dengan sambutan hangat dari perwakilan komunitas, dilanjutkan dengan sesi berbagi cerita antar generasi. Momen ini menjadi pengingat bahwa KEMUT bukan sekadar perkumpulan, melainkan keluarga yang terus tumbuh bersama waktu.',
   'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=800&fit=crop',
   'kabar-kemut', 'Rangga Saputra', 6, true, true, 1240, now() - interval '2 hours'),

  ('menjaga-silaturahmi-merawat-cerita',
   'Menjaga Silaturahmi, Merawat Cerita, Menguatkan Keluarga KEMUT',
   'Di tengah kesibukan masing-masing, keluarga besar KEMUT tetap berupaya menjaga tali silaturahmi lewat berbagai kegiatan rutin.',
   'Silaturahmi menjadi napas utama komunitas KEMUT. Melalui pertemuan rutin bulanan, obrolan santai, hingga kunjungan antar anggota, ikatan kekeluargaan terus dirawat dari waktu ke waktu.\n\n"Yang membuat KEMUT istimewa bukan besarnya acara, tapi konsistensi kita saling hadir," ujar salah satu anggota senior.',
   'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=800&fit=crop',
   'cerita', 'Dinda Ayu Larasati', 5, false, false, 860, now() - interval '1 day'),

  ('di-balik-kegiatan-kemut-kebersamaan',
   'Di Balik Kegiatan KEMUT: Tentang Kebersamaan yang Tidak Sekadar Bertemu',
   'Setiap kegiatan KEMUT menyimpan cerita di baliknya — bukan hanya soal agenda, tapi soal makna kebersamaan itu sendiri.',
   'Banyak yang mengira kegiatan komunitas hanya soal mengisi jadwal. Namun bagi keluarga besar KEMUT, setiap kegiatan adalah ruang untuk saling mengenal lebih dalam.\n\nDari kegiatan bakti sosial hingga gathering santai, semangat yang sama selalu hadir: kebersamaan yang tulus.',
   'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&h=800&fit=crop',
   'kegiatan', 'Fajar Ramadhan', 4, false, false, 512, now() - interval '2 days'),

  ('gotong-royong-bersih-lingkungan',
   'KEMUT Peduli: Aksi Gotong Royong Bersihkan Lingkungan Sekitar',
   'Puluhan anggota turun langsung membersihkan lingkungan sebagai bentuk kepedulian sosial keluarga besar KEMUT.',
   'Aksi gotong royong ini menjadi agenda rutin yang digagas oleh divisi sosial KEMUT. Selain mempererat kebersamaan, kegiatan ini juga menjadi wujud nyata kepedulian terhadap lingkungan sekitar.',
   'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=1200&h=800&fit=crop',
   'kegiatan', 'Fajar Ramadhan', 3, false, false, 340, now() - interval '3 days'),

  ('opini-pentingnya-regenerasi-komunitas',
   'Pentingnya Regenerasi dalam Menjaga Semangat Komunitas',
   'Regenerasi bukan soal menggantikan, melainkan meneruskan nilai dan semangat yang sudah dibangun bersama.',
   'Regenerasi menjadi topik yang terus didiskusikan dalam forum keluarga besar KEMUT. Bagaimana nilai-nilai kekeluargaan bisa terus diteruskan ke generasi berikutnya menjadi perhatian bersama.',
   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
   'opini', 'Dinda Ayu Larasati', 4, false, false, 275, now() - interval '4 days'),

  ('dari-pertemuan-sederhana-tumbuh-keluarga',
   'Dari Pertemuan Sederhana, Tumbuh Menjadi Sebuah Keluarga',
   'Berawal dari sebuah pertemuan kecil, KEMUT kini tumbuh menjadi keluarga besar yang saling menguatkan.',
   'Kisah ini bermula dari pertemuan sederhana bertahun-tahun lalu. Tak ada yang menyangka, momen kecil itu tumbuh menjadi ikatan keluarga yang besar dan hangat seperti sekarang.\n\nSetiap anggota membawa cerita masing-masing, namun semuanya bermuara pada satu hal: rasa memiliki terhadap KEMUT.',
   'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&h=900&fit=crop',
   'cerita', 'Rangga Saputra', 7, false, false, 980, now() - interval '5 days')
) as v(slug, title, excerpt, content, cover_image_url, category_slug, author_name, reading_time, is_featured, is_breaking, view_count, published_at)
on conflict (slug) do nothing;

-- TOKOH
insert into tokoh (slug, name, role, photo_url, short_description, full_bio) values
  ('budi-santoso', 'Budi Santoso', 'Sesepuh KEMUT', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop', 'Salah satu penggagas awal berdirinya komunitas KEMUT.', 'Budi Santoso telah menjadi bagian dari KEMUT sejak awal berdiri. Dedikasinya menjaga nilai kekeluargaan menjadi inspirasi bagi generasi berikutnya.'),
  ('siti-rahmawati', 'Siti Rahmawati', 'Koordinator Kegiatan', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=750&fit=crop', 'Menggerakkan berbagai kegiatan sosial keluarga besar KEMUT.', 'Siti aktif menggerakkan program-program sosial dan kegiatan rutin yang mempererat anggota KEMUT.'),
  ('andika-pratama', 'Andika Pratama', 'Ketua Divisi Media', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=750&fit=crop', 'Mengelola dokumentasi dan publikasi KEMUTNEWS.', 'Andika memimpin tim media yang mendokumentasikan setiap momen perjalanan KEMUT.'),
  ('maya-lestari', 'Maya Lestari', 'Perwakilan Generasi Muda', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=750&fit=crop', 'Membawa suara anak muda dalam setiap diskusi komunitas.', 'Maya mewakili suara generasi muda KEMUT dan aktif dalam program regenerasi komunitas.')
on conflict (slug) do nothing;

-- GALLERY
insert into gallery_items (image_url, caption, event_name, taken_at) values
  ('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=1000&fit=crop', 'Kehangatan dalam setiap pertemuan', 'Gathering Tahunan', current_date - 30),
  ('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop', 'Sesi foto bersama keluarga besar', 'Gathering Tahunan', current_date - 30),
  ('https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=1000&fit=crop', 'Momen santai sebelum acara dimulai', 'Kopdar Bulanan', current_date - 45),
  ('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop', 'Diskusi hangat antar generasi', 'Forum Komunitas', current_date - 60),
  ('https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=1000&fit=crop', 'Gotong royong bersih lingkungan', 'KEMUT Peduli', current_date - 15),
  ('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&h=600&fit=crop', 'Cerita di sela kegiatan', 'Kopdar Bulanan', current_date - 45)
on conflict do nothing;

-- VIDEOS
insert into videos (title, thumbnail_url, video_url, category, duration_seconds, is_featured, published_at) values
  ('Momen Kebersamaan Gathering Tahunan KEMUT', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=675&fit=crop', 'https://example.com/video/gathering-tahunan', 'Kegiatan', 245, true, now() - interval '3 days'),
  ('Cerita Singkat: Kenapa Kami Menyebutnya Keluarga', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=450&fit=crop', 'https://example.com/video/kenapa-keluarga', 'Cerita', 132, false, now() - interval '5 days'),
  ('Dokumentasi Aksi KEMUT Peduli Lingkungan', 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=450&fit=crop', 'https://example.com/video/kemut-peduli', 'Kegiatan', 178, false, now() - interval '7 days'),
  ('Profil Singkat: Tokoh di Balik KEMUT', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop', 'https://example.com/video/profil-tokoh', 'Tokoh', 205, false, now() - interval '9 days')
on conflict do nothing;

-- AGENDA
insert into agenda_items (title, event_date, event_time, location, description) values
  ('Gathering Keluarga KEMUT', current_date + 5, '18:30 WIB', 'Balai Warga Sukamaju', 'Pertemuan rutin keluarga besar KEMUT dengan agenda ramah tamah dan makan malam bersama.'),
  ('Rapat Koordinasi Divisi Sosial', current_date + 12, '19:00 WIB', 'Sekretariat KEMUT', 'Membahas rencana kegiatan sosial untuk kuartal mendatang.'),
  ('KEMUT Peduli: Bakti Sosial', current_date + 20, '08:00 WIB', 'Kampung Sukamaju Indah', 'Kegiatan bakti sosial dan pembagian sembako untuk warga sekitar.'),
  ('Kopdar Generasi Muda KEMUT', current_date + 28, '16:00 WIB', 'Taman Kota', 'Ajang silaturahmi dan diskusi santai bersama anggota muda KEMUT.')
on conflict do nothing;
