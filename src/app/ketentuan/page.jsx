export const metadata = {
  title: "Ketentuan Penggunaan",
  description: "Ketentuan penggunaan situs KEMUTNEWS.",
};

const TOC = [
  { id: "tujuan-situs", label: "1. Tujuan Situs" },
  { id: "hak-cipta", label: "2. Hak Cipta Konten" },
  { id: "konten-pengguna", label: "3. Konten dari Pengguna" },
  { id: "perilaku-pengguna", label: "4. Perilaku Pengguna" },
  { id: "akurasi-informasi", label: "5. Akurasi Informasi" },
  { id: "perubahan-ketentuan", label: "6. Perubahan Ketentuan" },
  { id: "kontak", label: "7. Kontak" },
];

export default function KetentuanPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Dokumen Legal / Ketentuan Penggunaan</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Standar Hukum &amp; Transparansi
          </span>
        </div>
        <h1 className="font-headline text-[26px] font-black leading-tight tracking-tight text-brand-ink md:text-[34px]">
          Ketentuan Penggunaan
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
            Dengan mengakses dan menggunakan situs KEMUTNEWS, kamu dianggap telah membaca,
            memahami, dan menyetujui ketentuan penggunaan berikut ini.
          </p>

          <h3 id="tujuan-situs" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            1. Tujuan Situs
          </h3>
          <p>
            KEMUTNEWS adalah media informasi dan dokumentasi digital internal untuk keluarga besar
            KEMUT. Konten yang dipublikasikan bertujuan untuk mempererat silaturahmi dan berbagi
            informasi antar anggota komunitas.
          </p>

          <h3 id="hak-cipta" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            2. Hak Cipta Konten
          </h3>
          <p>
            Seluruh artikel, foto, dan video yang dipublikasikan di KEMUTNEWS adalah milik
            KEMUTNEWS dan/atau kontributor terkait, kecuali dinyatakan lain. Penggunaan ulang
            konten untuk kepentingan di luar keluarga besar KEMUT memerlukan izin tertulis dari
            redaksi.
          </p>

          <h3 id="konten-pengguna" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            3. Konten dari Pengguna
          </h3>
          <p>
            Anggota yang mengirimkan cerita, foto, atau materi lain kepada redaksi KEMUTNEWS
            dianggap memberikan izin kepada KEMUTNEWS untuk mempublikasikan, mengedit seperlunya
            (misalnya penyesuaian tata bahasa), dan menampilkan materi tersebut di situs ini.
          </p>

          <h3 id="perilaku-pengguna" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            4. Perilaku Pengguna
          </h3>
          <p>Pengunjung situs diharapkan untuk:</p>
          <ul className="mb-6 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-brand-ink">
            <li>Tidak menyalahgunakan situs untuk tujuan yang melanggar hukum.</li>
            <li>Tidak mencoba mengakses sistem atau data secara tidak sah.</li>
            <li>Menghormati privasi dan nama baik anggota lain yang disebut dalam konten.</li>
          </ul>

          <h3 id="akurasi-informasi" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            5. Akurasi Informasi
          </h3>
          <p>
            Kami berupaya menyajikan informasi yang akurat dan terkini. Namun, KEMUTNEWS tidak
            bertanggung jawab atas kesalahan atau ketidakakuratan yang mungkin terjadi, dan akan
            melakukan koreksi secepatnya bila ditemukan kekeliruan.
          </p>

          <h3 id="perubahan-ketentuan" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            6. Perubahan Ketentuan
          </h3>
          <p>
            Ketentuan ini dapat berubah sewaktu-waktu sesuai kebutuhan pengelolaan situs.
            Perubahan akan tercermin melalui tanggal pembaruan di halaman ini.
          </p>

          <h3 id="kontak" className="mt-8 font-headline text-xl font-bold text-brand-ink">
            7. Kontak
          </h3>
          <p>
            Pertanyaan mengenai ketentuan ini dapat disampaikan melalui halaman{" "}
            <a href="/kontak" className="text-brand-primary hover:underline">Kontak</a>.
          </p>
        </div>
      </div>
    </div>
  );
}