import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";

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
    title: "Navigasi",
    links: [
      { label: "Kabar KEMUT", href: "/kategori/kabar-kemut" },
      { label: "Kegiatan", href: "/kategori/kegiatan" },
      { label: "Tokoh", href: "/tokoh" },
      { label: "Cerita", href: "/kategori/cerita" },
      { label: "Galeri", href: "/galeri" },
    ],
  },
  {
    title: "Informasi",
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
    <footer className="bg-ink text-cream">
      <div className="container-editorial py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-3xl font-bold">
              KEMUT<span className="text-gold">NEWS</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/50">
              Satu Keluarga, Banyak Cerita.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-gold/80">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-cream/60 transition hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-gold/80">Follow Us</h4>
            <div className="mt-4 flex gap-4">
              <a href="#" aria-label="Instagram" className="text-cream/60 transition hover:text-gold">
                <Instagram size={18} strokeWidth={1.75} />
              </a>
              <a href="#" aria-label="Facebook" className="text-cream/60 transition hover:text-gold">
                <Facebook size={18} strokeWidth={1.75} />
              </a>
              <a href="#" aria-label="Youtube" className="text-cream/60 transition hover:text-gold">
                <Youtube size={18} strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/20">
        <div className="container-editorial flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} KEMUTNEWS. All Rights Reserved.</p>
          <p>Media Informasi Keluarga Besar KEMUT</p>
        </div>
      </div>
    </footer>
  );
}
