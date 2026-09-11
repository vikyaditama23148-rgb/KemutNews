export const metadata = {
  title: "Ketentuan Penggunaan",
  description: "Ketentuan penggunaan situs KEMUTNEWS.",
};

export default function KetentuanPage() {
  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Ketentuan Penggunaan
        </h1>
        <p className="mt-2 text-sm text-stone-light">Halaman terakhir diperbarui: September 2026</p>
      </div>

      <div className="prose-kemut mx-auto max-w-3xl">
        <p>
          Dengan mengakses dan menggunakan situs KEMUTNEWS, kamu dianggap telah membaca,
          memahami, dan menyetujui ketentuan penggunaan berikut ini.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">1. Tujuan Situs</h3>
        <p>
          KEMUTNEWS adalah media informasi dan dokumentasi digital internal untuk keluarga besar
          KEMUT. Konten yang dipublikasikan bertujuan untuk mempererat silaturahmi dan berbagi
          informasi antar anggota komunitas.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">2. Hak Cipta Konten</h3>
        <p>
          Seluruh artikel, foto, dan video yang dipublikasikan di KEMUTNEWS adalah milik
          KEMUTNEWS dan/atau kontributor terkait, kecuali dinyatakan lain. Penggunaan ulang
          konten untuk kepentingan di luar keluarga besar KEMUT memerlukan izin tertulis dari
          redaksi.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">3. Konten dari Pengguna</h3>
        <p>
          Anggota yang mengirimkan cerita, foto, atau materi lain kepada redaksi KEMUTNEWS
          dianggap memberikan izin kepada KEMUTNEWS untuk mempublikasikan, mengedit seperlunya
          (misalnya penyesuaian tata bahasa), dan menampilkan materi tersebut di situs ini.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">4. Perilaku Pengguna</h3>
        <p>Pengunjung situs diharapkan untuk:</p>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-ink/90">
          <li>Tidak menyalahgunakan situs untuk tujuan yang melanggar hukum.</li>
          <li>Tidak mencoba mengakses sistem atau data secara tidak sah.</li>
          <li>Menghormati privasi dan nama baik anggota lain yang disebut dalam konten.</li>
        </ul>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">5. Akurasi Informasi</h3>
        <p>
          Kami berupaya menyajikan informasi yang akurat dan terkini. Namun, KEMUTNEWS tidak
          bertanggung jawab atas kesalahan atau ketidakakuratan yang mungkin terjadi, dan akan
          melakukan koreksi secepatnya bila ditemukan kekeliruan.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">6. Perubahan Ketentuan</h3>
        <p>
          Ketentuan ini dapat berubah sewaktu-waktu sesuai kebutuhan pengelolaan situs.
          Perubahan akan tercermin melalui tanggal pembaruan di halaman ini.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">7. Kontak</h3>
        <p>
          Pertanyaan mengenai ketentuan ini dapat disampaikan melalui halaman{" "}
          <a href="/kontak" className="text-gold-deep hover:underline">Kontak</a>.
        </p>
      </div>
    </div>
  );
}