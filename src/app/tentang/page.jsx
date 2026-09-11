import Image from "next/image";

export const metadata = {
  title: "Tentang Kami",
  description: "Mengenal KEMUTNEWS — media informasi dan dokumentasi digital keluarga besar KEMUT.",
};

export default function TentangPage() {
  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Tentang Kami</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Satu Keluarga, Banyak Cerita
        </h1>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-card">
          <Image
            src="https://rkwuogwvahvrcpeakpdi.supabase.co/storage/v1/object/public/kemutnews-media/covers/1789126957809-1000827486.jpg"
            alt="Keluarga Besar KEMUT"
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="prose-kemut">
          <p>
            KEMUTNEWS lahir dari sebuah keinginan sederhana: menjaga agar setiap kabar, kegiatan,
            dan cerita dalam keluarga besar KEMUT tidak hilang begitu saja ditelan waktu. Kami
            percaya bahwa sebuah komunitas dibangun bukan hanya dari acara-acara besar, tetapi
            dari kumpulan momen kecil yang terus dirawat dan diceritakan ulang.
          </p>

          <p>
            Melalui platform ini, kami mendokumentasikan perjalanan keluarga besar KEMUT — mulai
            dari kabar terbaru, kegiatan sosial, profil teman-teman yang berjasa, hingga
            cerita-cerita hangat dari anggota yang membentuk identitas komunitas ini dari waktu
            ke waktu.
          </p>

          <blockquote>
            Kami tidak sekadar mencatat sejarah — kami merawat kualitas pertemuan untuk hari dimana
            kami hanya bisa diam untuk mengenang setiap moment.
          </blockquote>

          <p>
            KEMUTNEWS dikelola secara sukarela oleh anggota komunitas yang peduli terhadap
            dokumentasi dan komunikasi internal keluarga besar KEMUT. Kami terbuka terhadap
            kontribusi cerita, foto, maupun masukan dari seluruh anggota — karena pada akhirnya,
            setiap orang di KEMUT punya cerita yang layak untuk didengar.
          </p>

          <h3 className="mt-10 font-display text-xl font-bold text-ink">Yang Kami Percaya</h3>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-ink/90">
            <li>Setiap anggota keluarga besar KEMUT memiliki cerita yang berharga.</li>
            <li>Silaturahmi terjaga bukan hanya lewat pertemuan, tapi juga lewat cerita yang terus dibagikan.</li>
            <li>Dokumentasi yang baik adalah warisan untuk generasi KEMUT berikutnya.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}