"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import SearchOverlay from "./SearchOverlay";

export default function Header() {
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
        className={`sticky top-0 z-50 border-b bg-cream/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-[0_2px_14px_rgba(0,0,0,0.06)] border-cream-line" : "border-transparent"
        }`}
      >
        <div className="container-editorial flex h-[76px] items-center justify-between md:h-[92px]">
          <Logo />

          <div className="hidden lg:block">
            <Navigation />
          </div>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buka pencarian"
              className="text-ink/70 transition hover:text-gold-deep"
            >
              <Search size={20} strokeWidth={1.75} />
            </button>
            <Link
              href="/agenda"
              className="hidden rounded-card border border-gold px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gold-deep transition hover:bg-gold hover:text-ink sm:inline-block"
            >
              Ikuti KEMUT
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu"
              className="text-ink/70 transition hover:text-gold-deep lg:hidden"
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
