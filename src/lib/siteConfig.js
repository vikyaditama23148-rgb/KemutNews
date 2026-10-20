// Satu sumber kebenaran untuk identitas KEMUTNEWS.
// Nama, deskripsi, dan tautan di sini dipakai bersama oleh data terstruktur
// (JSON-LD) dan llms.txt, supaya identitas situs KONSISTEN di mana pun ia
// muncul — konsistensi inilah yang membantu mesin pencari & AI mengenali
// KEMUTNEWS sebagai satu entitas yang sama.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kemut-news.vercel.app";
export const SITE_NAME = "KEMUTNEWS";
export const SITE_DESCRIPTION =
  "KEMUTNEWS adalah media informasi dan dokumentasi digital keluarga besar KEMUT — memuat kabar, kegiatan, tokoh, cerita, galeri, video, dan agenda komunitas.";
export const SITE_LANGUAGE = "id-ID";
export const LOGO_URL = `${SITE_URL}/icon-512.png`;

export const EDITOR_IN_CHIEF = {
  name: "Viky Aditama",
  role: "Pimpinan Redaksi",
  path: "/redaksi/pimpinan-redaksi",
};

// ISI DENGAN TAUTAN ASLI AKUN RESMI KEMUTNEWS (Instagram, Facebook, YouTube, TikTok, dll).
// Contoh: "https://www.instagram.com/kemutnews"
// Biarkan kosong kalau belum ada — jangan diisi dengan tautan yang tidak ada.
// Tautan ini dipakai sebagai "sameAs": cara memberi tahu Google & AI bahwa akun-akun
// tersebut milik entitas yang sama dengan situs ini.
export const SOCIAL_LINKS = [];