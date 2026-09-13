export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi KEMUTNEWS mengenai pengumpulan dan penggunaan data pengunjung.",
};

const TOC = [
  { id: "informasi-dikumpulkan", label: "1. Informasi yang Dikumpulkan" },
  { id: "penggunaan-informasi", label: "2. Penggunaan Informasi" },
  { id: "berbagi-informasi", label: "3. Berbagi Informasi" },
  { id: "cookie", label: "4. Cookie" },
  { id: "keamanan-data", label: "5. Keamanan Data" },
  { id: "perubahan-kebijakan", label: "6. Perubahan Kebijakan" },
  { id: "hubungi-kami", label: "7. Hubungi Kami" },
];

export default function PrivasiPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Dokumen Legal / Kebijakan Privasi</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Standar Hukum &amp; Transparansi
          </span>
        </div>
        <h1 className="font-headline text-[26px] font-black leading-tight tracking-tight text-brand-ink md:text-[34px]">
          Kebijakan Privasi
        </h1>
        <p className="mt-1.5 text-[12px] text-brand-secondary">Terakhir diperbarui: September 2026</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 bg-brand-surfaceLow p-4">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-brand-ink">
              Daftar Isi
            </p>
            <ul className="flex flex-col gap-2.5">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="text-[13px] text-brand-secondary hover:text-brand-primary">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="prose-kemut max-w-[720px]">
          <p>
            KEMUTNEWS menghargai privasi setiap pengunjung situs. Kebijakan ini menjelaskan
            bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang kamu berikan
            saat menggunakan situs ini.
          </p>

          <h3 id="informasi-dikumpulkan" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            1. Informasi yang Kami Kumpulkan
          </h3>
          <p>
            Kami dapat mengumpulkan informasi berupa alamat email (bila kamu mendaftar untuk
            menerima kabar terbaru), serta data teknis dasar seperti jenis perangkat dan halaman
            yang dikunjungi untuk keperluan analitik internal.
          </p>

          <h3 id="penggunaan-informasi" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            2. Penggunaan Informasi
          </h3>
          <p>Informasi yang kami kumpulkan digunakan semata-mata untuk:</p>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-brand-ink/90">
            <li>Mengirimkan kabar terbaru dan agenda kegiatan KEMUT (bila kamu berlangganan).</li>
            <li>Memahami bagaimana pengunjung menggunakan situs untuk perbaikan ke depan.</li>
            <li>Menjaga keamanan dan mencegah penyalahgunaan situs.</li>
          </ul>

          <h3 id="berbagi-informasi" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            3. Berbagi Informasi
          </h3>
          <p>
            KEMUTNEWS tidak menjual, menyewakan, atau membagikan data pribadi pengunjung kepada
            pihak ketiga untuk tujuan komersial. Data hanya digunakan secara internal oleh
            pengurus dan redaksi KEMUTNEWS.
          </p>

          <h3 id="cookie" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            4. Cookie
          </h3>
          <p>
            Situs ini dapat menggunakan cookie sederhana untuk keperluan fungsional, seperti
            menjaga sesi login pada Admin Panel. Cookie ini tidak digunakan untuk melacak aktivitas
            pengunjung di luar situs KEMUTNEWS.
          </p>

          <h3 id="keamanan-data" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            5. Keamanan Data
          </h3>
          <p>
            Kami berupaya menjaga keamanan data yang dikumpulkan dengan langkah-langkah teknis yang
            wajar. Namun, tidak ada metode transmisi data melalui internet yang sepenuhnya bebas
            risiko.
          </p>

          <h3 id="perubahan-kebijakan" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            6. Perubahan Kebijakan
          </h3>
          <p>
            Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan akan
            diinformasikan melalui halaman ini.
          </p>

          <h3 id="hubungi-kami" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            7. Hubungi Kami
          </h3>
          <p>
            Bila ada pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui
            halaman <a href="/kontak" className="text-brand-primary hover:underline">Kontak</a>.
          </p>
        </div>
      </div>
    </div>
  );
}