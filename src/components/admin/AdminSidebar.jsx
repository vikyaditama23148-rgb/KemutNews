"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Newspaper, Users, Video, Image as ImageIcon, ExternalLink } from "lucide-react";
import LogoutButton from "./LogoutButton";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Artikel", href: "/admin/artikel", icon: Newspaper },
  { label: "Tokoh KEMUT", href: "/admin/tokoh", icon: Users },
  { label: "Video", href: "/admin/video", icon: Video },
  { label: "Galeri", href: "/admin/galeri", icon: ImageIcon },
];

export default function AdminSidebar({ userEmail }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col justify-between bg-ink text-cream md:w-64 md:shrink-0">
      <div>
        <div className="border-b border-cream/10 px-6 py-6">
          <span className="font-display text-xl font-bold">
            KEMUT<span className="text-gold">NEWS</span>
          </span>
          <p className="mt-0.5 text-[11px] uppercase tracking-wide text-cream/40">Admin Panel</p>
        </div>
        <nav className="px-3 py-4">
          {NAV.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`mb-1 flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-gold text-ink" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            target="_blank"
            className="mt-1 flex items-center gap-3 rounded-card px-3 py-2.5 text-sm font-medium text-cream/70 transition hover:bg-cream/5 hover:text-cream"
          >
            <ExternalLink size={17} strokeWidth={1.75} />
            Lihat Situs
          </Link>
        </nav>
      </div>

      <div className="border-t border-cream/10 px-6 py-5">
        <p className="truncate text-xs text-cream/40">{userEmail}</p>
        <LogoutButton />
      </div>
    </aside>
  );
}