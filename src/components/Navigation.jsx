"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Kabar KEMUT", href: "/kategori/kabar-kemut" },
  { label: "Kegiatan", href: "/kategori/kegiatan" },
  { label: "Tokoh", href: "/tokoh" },
  { label: "Cerita", href: "/kategori/cerita" },
  { label: "Opini", href: "/kategori/opini" },
  { label: "Galeri", href: "/galeri" },
  { label: "Video", href: "/kategori/video" },
  { label: "Agenda", href: "/agenda" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden h-11 items-center gap-0.5 border-t border-brand-outlineVariant/40 bg-brand-surfaceLowest px-8 lg:flex">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex h-full items-center px-3.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
              active
                ? "bg-brand-primaryContainer text-brand-onPrimary"
                : "text-brand-inkVariant hover:text-brand-ink"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export { NAV_ITEMS };