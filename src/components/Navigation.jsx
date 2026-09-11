"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
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
    <nav className="hidden md:block">
      <ul className="flex items-center gap-7">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`relative py-1 text-[13px] font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-gold-deep" : "text-ink/80 hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-gold transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { NAV_ITEMS };
