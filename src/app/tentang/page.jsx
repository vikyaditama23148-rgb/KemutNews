import Image from "next/image";
import Link from "next/link";
import { SITE_URL, SITE_NAME, EDITOR_IN_CHIEF } from "@/lib/siteConfig";

export const metadata = {
  title: "Tentang Kami",
  description: "Mengenal KEMUTNEWS — media informasi dan dokumentasi digital keluarga besar KEMUT.",
};

const BELIEFS = [
  {
    number: "01",
    title: "Setiap Cerita Berharga",
    desc: "Setiap anggota keluarga besar KEMUT memiliki cerita yang layak untuk didengar dan dirawat.",
  },
  {
    number: "02",
    title: "Silaturahmi Berkelanjutan",
    desc: "Terjaga bukan hanya lewat pertemuan tatap muka, tapi juga lewat cerita yang terus dibagikan.",
  },
  {
    number: "03",
    title: "Warisan untuk Generasi",
    desc: "Dokumentasi yang baik hari ini adalah warisan berharga untuk generasi KEMUT berikutnya.",
  },
];

export default function TentangPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Profil / Tentang KEMUTNEWS</span>
      </nav>

      <div className="mx-auto max-w-[800px]">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Media Informasi Keluarga Besar KEMUT
          </span>
        </div>
        <h1 className="font-headline text-[30px] font-black leading-tight tracking-tight text-brand-ink md:text-[40px]">
          Satu Keluarga, Banyak Cerita
        </h1>

        {/* Fakta singkat: kalimat definisi yang jelas & faktual — mudah dibaca mesin
            pencari dan AI, juga berguna bagi pembaca baru. Tambahkan fakta lain yang
            BENAR (tahun berdiri, lokasi sekretariat, kontak) langsung di daftar ini. */}
        <p className="mt-4 text-[16px] leading-relaxed text-brand-ink">
          <strong>{SITE_NAME}</strong> adalah media informasi dan dokumentasi digital milik komunitas KEMUT yang menjadi sebuah brand
          pemberitaan yang dikelola oleh redaksi jurnalisme KEMUT News{" "}
          <Link href={EDITOR_IN_CHIEF.path} className="font-semibold text-brand-primary hover:underline">
            {EDITOR_IN_CHIEF.name}
          </Link>{" "}
          ({EDITOR_IN_CHIEF.role}).
        </p>

        <dl className="mt-6 grid gap-px bg-brand-outlineVariant/30 text-sm sm:grid-cols-2">
          <div className="bg-brand-surfaceLowest p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">Nama</dt>
            <dd className="mt-1 font-semibold text-brand-ink">{SITE_NAME}</dd>
          </div>
          <div className="bg-brand-surfaceLowest p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">Jenis</dt>
            <dd className="mt-1 font-semibold text-brand-ink">Media informasi &amp; dokumentasi digital komunitas</dd>
          </div>
          <div className="bg-brand-surfaceLowest p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">{EDITOR_IN_CHIEF.role}</dt>
            <dd className="mt-1 font-semibold text-brand-ink">{EDITOR_IN_CHIEF.name}</dd>
          </div>
          <div className="bg-brand-surfaceLowest p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">Situs resmi</dt>
            <dd className="mt-1 font-semibold text-brand-ink">{SITE_URL.replace(/^https?:\/\//, "")}</dd>
          </div>
          <div className="bg-brand-surfaceLowest p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">Bahasa</dt>
            <dd className="mt-1 font-semibold text-brand-ink">Indonesia</dd>
          </div>
          <div className="bg-brand-surfaceLowest p-4">
            <dt className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">Cakupan liputan</dt>
            <dd className="mt-1 font-semibold text-brand-ink">Kabar, kegiatan, tokoh, cerita, agenda</dd>
          </div>
        </dl>

        <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-brand-surfaceContainer">
          <Image
            src="https://rkwuogwvahvrcpeakpdi.supabase.co/storage/v1/object/public/kemutnews-media/covers/1789126957809-1000827486.jpg"
            alt="Keluarga Besar KEMUT"
            fill
            sizes="(min-width: 1024px) 800px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="prose-kemut mt-8">
          <p>
            KEMUTNEWS lahir dari sebuah keinginan sederhana: menjaga agar setiap kabar, kegiatan,
            dan cerita dalam keluarga besar KEMUT tidak hilang begitu saja ditelan waktu. Kami
            percaya bahwa sebuah komunitas dibangun bukan hanya dari acara-acara besar, tetapi
            dari kumpulan momen kecil yang terus dirawat dan diceritakan ulang.
          </p>

          <p>
            Melalui platform ini, kami tidak hanya mendokumentasikan setiap perjalanan komunitas melainkan juga sebagai media pemberitaan umum yang independen, terverifikasi, dan faktual
          </p>

          <blockquote>
            Kami tidak sekadar mencatat sejarah — kami merawat rasa memiliki setiap anggota
            terhadap keluarga besar KEMUT.
          </blockquote>

          <p>
            KEMUTNEWS dikelola secara sukarela oleh anggota komunitas yang peduli terhadap
            dokumentasi dan komunikasi internal keluarga besar KEMUT. Kami terbuka terhadap
            kontribusi luar untuk pemberitaan umum.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1000px]">
        <div className="mb-6 flex items-center justify-between border-b border-brand-outlineVariant/40 pb-3">
          <h2 className="font-headline text-xl font-bold text-brand-ink">Yang Kami Percaya</h2>
        </div>
        <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-3">
          {BELIEFS.map((b) => (
            <div key={b.number} className="bg-brand-surfaceLowest p-6">
              <span className="font-headline text-3xl font-light text-brand-primary/40">
                {b.number}
              </span>
              <h3 className="mt-2 font-headline text-base font-bold text-brand-ink">{b.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-brand-secondary">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}