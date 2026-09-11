export const metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi KEMUTNEWS mengenai pengumpulan dan penggunaan data pengunjung.",
};

export default function PrivasiPage() {
  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Legal</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Kebijakan Privasi
        </h1>
        <p className="mt-2 text-sm text-stone-light">Halaman terakhir diperbarui: September 2026</p>
      </div>

      <div className="prose-kemut mx-auto max-w-3xl">
        <p>
          KEMUTNEWS menghargai privasi setiap pengunjung situs. Kebijakan ini menjelaskan
          bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi yang kamu berikan
          saat menggunakan situs ini.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">1. Informasi yang Kami Kumpulkan</h3>
        <p>
          Kami dapat mengumpulkan informasi berupa alamat email (bila kamu mendaftar untuk
          menerima kabar terbaru), serta data teknis dasar seperti jenis perangkat dan halaman
          yang dikunjungi untuk keperluan analitik internal.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">2. Penggunaan Informasi</h3>
        <p>Informasi yang kami kumpulkan digunakan semata-mata untuk:</p>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-ink/90">
          <li>Mengirimkan kabar terbaru dan agenda kegiatan KEMUT (bila kamu berlangganan).</li>
          <li>Memahami bagaimana pengunjung menggunakan situs untuk perbaikan ke depan.</li>
          <li>Menjaga keamanan dan mencegah penyalahgunaan situs.</li>
        </ul>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">3. Berbagi Informasi</h3>
        <p>
          KEMUTNEWS tidak menjual, menyewakan, atau membagikan data pribadi pengunjung kepada
          pihak ketiga untuk tujuan komersial. Data hanya digunakan secara internal oleh
          pengurus dan redaksi KEMUTNEWS.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">4. Cookie</h3>
        <p>
          Situs ini dapat menggunakan cookie sederhana untuk keperluan fungsional, seperti
          menjaga sesi login pada Admin Panel. Cookie ini tidak digunakan untuk melacak aktivitas
          pengunjung di luar situs KEMUTNEWS.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">5. Keamanan Data</h3>
        <p>
          Kami berupaya menjaga keamanan data yang dikumpulkan dengan langkah-langkah teknis yang
          wajar. Namun, tidak ada metode transmisi data melalui internet yang sepenuhnya bebas
          risiko.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">6. Perubahan Kebijakan</h3>
        <p>
          Kebijakan privasi ini dapat diperbarui dari waktu ke waktu. Perubahan akan
          diinformasikan melalui halaman ini.
        </p>

        <h3 className="mt-8 font-display text-xl font-bold text-ink">7. Hubungi Kami</h3>
        <p>
          Bila ada pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami melalui
          halaman <a href="/kontak" className="text-gold-deep hover:underline">Kontak</a>.
        </p>
      </div>
    </div>
  );
}