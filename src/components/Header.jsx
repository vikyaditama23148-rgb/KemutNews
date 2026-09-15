"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, CreditCard } from "lucide-react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import SearchOverlay from "./SearchOverlay";

export default function Header({ categories }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b border-brand-outlineVariant/40 bg-brand-surfaceLowest/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_10px_rgba(0,0,0,0.06)]" : ""
        }`}
      >
        <div className="flex h-20 items-center gap-6 px-4 md:h-24 md:px-8">
          <Logo />

          <div className="hidden flex-1 items-center gap-2 bg-brand-surfaceLow px-3 py-1.5 lg:flex">
            <Search size={18} className="text-brand-inkVariant" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Cari arsip berita, liputan, tokoh..."
              onFocus={(e) => {
                e.target.blur();
                setSearchOpen(true);
              }}
              className="w-full bg-transparent text-sm text-brand-ink placeholder:text-brand-inkVariant focus:outline-none"
            />
          </div>

          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Buka pencarian"
            className="text-brand-ink transition hover:text-brand-primary lg:hidden"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>

          <Link
            href="/agenda"
            className="hidden shrink-0 items-center gap-1.5 bg-brand-primary px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-brand-onPrimary transition hover:bg-brand-primaryContainer sm:flex"
          >
            <CreditCard size={14} /> Ikuti KEMUT
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Buka menu"
            className="text-brand-ink transition hover:text-brand-primary lg:hidden"
          >
            <Menu size={22} strokeWidth={1.75} />
          </button>
        </div>

        <Navigation categories={categories} />
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} categories={categories} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}