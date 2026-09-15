"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { buildNavItems } from "./Navigation";

export default function MobileNav({ open, onClose, categories }) {
  const pathname = usePathname();
  const navItems = buildNavItems(categories);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute right-0 top-0 h-full w-[80%] max-w-xs bg-brand-ink text-white shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="font-headline text-xl font-black uppercase">
            KEMUT<span className="text-brand-primaryContainer">NEWS</span>
          </span>
          <button onClick={onClose} aria-label="Tutup menu" className="text-white/70 hover:text-brand-primaryContainer">
            <X size={22} strokeWidth={1.75} />
          </button>
        </div>
        <ul className="flex flex-col px-6 py-4">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="border-b border-white/5">
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block py-3.5 text-sm font-bold uppercase tracking-wide ${
                    active ? "text-brand-primaryContainer" : "text-white/85"
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