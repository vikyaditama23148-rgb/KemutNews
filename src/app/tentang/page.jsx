import Image from "next/image";

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
            Melalui platform ini, kami mendokumentasikan perjalanan keluarga besar KEMUT — mulai
            dari kabar terbaru, kegiatan sosial, profil tokoh-tokoh yang berjasa, hingga
            cerita-cerita hangat dari anggota yang membentuk identitas komunitas ini dari waktu
            ke waktu.
          </p>

          <blockquote>
            Kami tidak sekadar mencatat sejarah — kami merawat rasa memiliki setiap anggota
            terhadap keluarga besar KEMUT.
          </blockquote>

          <p>
            KEMUTNEWS dikelola secara sukarela oleh anggota komunitas yang peduli terhadap
            dokumentasi dan komunikasi internal keluarga besar KEMUT. Kami terbuka terhadap
            kontribusi cerita, foto, maupun masukan dari seluruh anggota.
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