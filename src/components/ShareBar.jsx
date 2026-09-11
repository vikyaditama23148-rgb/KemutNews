"use client";

import { MessageCircle, Facebook, Link2, Instagram } from "lucide-react";

export default function ShareBar({ title }) {
  function handleCopy() {
    if (typeof window === "undefined") return;
    navigator.clipboard?.writeText(window.location.href);
  }

  const shareText = encodeURIComponent(title);

  return (
    <div className="mt-10 flex items-center gap-4 border-t border-cream-line pt-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-stone-light">
        Bagikan
      </span>
      <a
        href={`https://wa.me/?text=${shareText}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Bagikan ke WhatsApp"
        className="text-stone transition hover:text-gold-deep"
      >
        <MessageCircle size={18} strokeWidth={1.75} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Bagikan ke Instagram"
        className="text-stone transition hover:text-gold-deep"
      >
        <Instagram size={18} strokeWidth={1.75} />
      </a>
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Bagikan ke Facebook"
        className="text-stone transition hover:text-gold-deep"
      >
        <Facebook size={18} strokeWidth={1.75} />
      </a>
      <button onClick={handleCopy} aria-label="Salin tautan" className="text-stone transition hover:text-gold-deep">
        <Link2 size={18} strokeWidth={1.75} />
      </button>
    </div>
  );
}
