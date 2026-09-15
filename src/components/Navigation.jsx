"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Slug-slug ini punya halaman khusus sendiri (bukan listing kategori artikel
// biasa), jadi sengaja tidak ikut ditampilkan otomatis dari tabel kategori
// supaya tidak dobel dengan menu tetap di bawah.
const RESERVED_SLUGS = ["tokoh", "galeri", "video", "agenda"];

const FIXED_TAIL = [
  { label: "Tokoh", href: "/tokoh" },
  { label: "Galeri", href: "/galeri" },
  { label: "Video", href: "/video" },
  { label: "Agenda", href: "/agenda" },
];

export function buildNavItems(categories) {
  const dynamicCategories = (categories || [])
    .filter((c) => !RESERVED_SLUGS.includes(c.slug))
    .map((c) => ({ label: c.name, href: `/kategori/${c.slug}` }));

  return [{ label: "Beranda", href: "/" }, ...dynamicCategories, ...FIXED_TAIL];
}

export default function Navigation({ categories }) {
  const pathname = usePathname();
  const navItems = buildNavItems(categories);

  return (
    <nav className="hidden h-11 items-center gap-0.5 border-t border-brand-outlineVariant/40 bg-brand-surfaceLowest px-8 lg:flex">
      {navItems.map((item) => {
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