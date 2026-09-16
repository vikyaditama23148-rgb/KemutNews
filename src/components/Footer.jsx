import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "KEMUTNEWS",
    links: [
      { label: "Tentang Kami", href: "/tentang" },
      { label: "Redaksi", href: "/redaksi" },
      { label: "Kontak", href: "/kontak" },
    ],
  },
  {
    title: "Kanal Berita Utama",
    links: [
      { label: "Kabar KEMUT", href: "/kategori/kabar-kemut" },
      { label: "Kegiatan", href: "/kategori/kegiatan" },
      { label: "Tokoh", href: "/tokoh" },
      { label: "Cerita", href: "/kategori/cerita" },
      { label: "Galeri", href: "/galeri" },
    ],
  },
  {
    title: "Layanan Redaksi & Standar",
    links: [
      { label: "Agenda", href: "/agenda" },
      { label: "Pengumuman", href: "/pengumuman" },
      { label: "Kebijakan Privasi", href: "/privasi" },
      { label: "Ketentuan", href: "/ketentuan" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-brand-ink text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <span className="font-headline text-2xl font-black uppercase">
              KEMUT<span className="text-brand-primaryContainer">NEWS</span>
            </span>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/50">
              Jurnalisme komprehensif dan independen untuk keluarga besar KEMUT.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-primaryContainer">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[13px] text-white/60 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-primaryContainer">
              Ikuti Kami
            </h4>
            <div className="mt-4 flex gap-4">
              <a href="#" aria-label="Facebook" className="text-white/60 transition hover:text-white">
                <Facebook size={17} strokeWidth={1.75} />
              </a>
              <a href="https://www.instagram.com/kemut_official23" aria-label="Instagram" className="text-white/60 transition hover:text-white">
                <Instagram size={17} strokeWidth={1.75} />
              </a>
              <a href="https://www.youtube.com/@KemutTube" aria-label="Youtube" className="text-white/60 transition hover:text-white">
                <Youtube size={17} strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-[11px] uppercase tracking-wide text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} KEMUTNEWS. Seluruh Hak Cipta Dilindungi.</p>
          <p>Media Informasi Keluarga Besar KEMUT</p>
        </div>
      </div>
    </footer>
  );
}