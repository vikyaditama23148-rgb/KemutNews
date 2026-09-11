import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-editorial flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-display text-7xl font-bold text-gold/40">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Halaman Tidak Ditemukan</h1>
      <p className="mt-2 max-w-sm text-stone">
        Sepertinya halaman yang kamu cari sudah dipindahkan atau tidak tersedia.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-card bg-ink px-6 py-3 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
