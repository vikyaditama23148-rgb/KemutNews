"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NAV_ITEMS } from "./Navigation";

export default function MobileNav({ open, onClose }) {
  const pathname = usePathname();

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[78%] max-w-xs bg-ink text-cream shadow-2xl transition-transform duration-300 ease-premium ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-cream/10 px-6 py-5">
          <span className="font-display text-xl font-bold">
            KEMUT<span className="text-gold">NEWS</span>
          </span>
          <button onClick={onClose} aria-label="Tutup menu" className="text-cream/70 hover:text-gold">
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-4">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="border-b border-cream/5">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block py-3.5 text-sm font-semibold uppercase tracking-wide ${
                    active ? "text-gold" : "text-cream/85"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
