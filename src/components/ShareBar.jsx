"use client";

import { useState } from "react";
import { MessageCircle, Facebook, Twitter, Link2, Check } from "lucide-react";

export default function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);

  function shareTo(platform) {
    const url = window.location.href;
    const text = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const links = {
      whatsapp: `https://wa.me/?text=${text}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`,
    };

    window.open(links[platform], "_blank", "noopener,noreferrer,width=600,height=500");
  }

  function handleCopy() {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-2.5 border-t border-brand-outlineVariant/40 pt-6">
      <span className="mr-1 text-[11px] font-bold uppercase tracking-wide text-brand-secondary">
        Bagikan Artikel Ini
      </span>
      <button
        onClick={() => shareTo("whatsapp")}
        aria-label="Bagikan ke WhatsApp"
        className="flex h-9 w-9 items-center justify-center bg-[#25D366] text-white transition hover:opacity-90"
      >
        <MessageCircle size={16} strokeWidth={2} />
      </button>
      <button
        onClick={() => shareTo("facebook")}
        aria-label="Bagikan ke Facebook"
        className="flex h-9 w-9 items-center justify-center bg-[#1877F2] text-white transition hover:opacity-90"
      >
        <Facebook size={16} strokeWidth={2} />
      </button>
      <button
        onClick={() => shareTo("twitter")}
        aria-label="Bagikan ke X (Twitter)"
        className="flex h-9 w-9 items-center justify-center bg-black text-white transition hover:opacity-90"
      >
        <Twitter size={16} strokeWidth={2} />
      </button>
      <button
        onClick={handleCopy}
        aria-label="Salin tautan"
        className="flex h-9 items-center gap-1.5 border border-brand-outlineVariant px-3 text-[11px] font-bold uppercase tracking-wide text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        {copied ? "Tersalin!" : "Salin"}
      </button>
    </div>
  );
}