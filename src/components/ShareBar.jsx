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
    <div className="mt-10 flex items-center gap-4 border-t border-cream-line pt-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-stone-light">
        Bagikan
      </span>
      <button
        onClick={() => shareTo("whatsapp")}
        aria-label="Bagikan ke WhatsApp"
        className="text-stone transition hover:text-gold-deep"
      >
        <MessageCircle size={18} strokeWidth={1.75} />
      </button>
      <button
        onClick={() => shareTo("facebook")}
        aria-label="Bagikan ke Facebook"
        className="text-stone transition hover:text-gold-deep"
      >
        <Facebook size={18} strokeWidth={1.75} />
      </button>
      <button
        onClick={() => shareTo("twitter")}
        aria-label="Bagikan ke X (Twitter)"
        className="text-stone transition hover:text-gold-deep"
      >
        <Twitter size={18} strokeWidth={1.75} />
      </button>
      <button
        onClick={handleCopy}
        aria-label="Salin tautan"
        className="flex items-center gap-1.5 text-stone transition hover:text-gold-deep"
      >
        {copied ? (
          <Check size={18} strokeWidth={1.75} className="text-gold-deep" />
        ) : (
          <Link2 size={18} strokeWidth={1.75} />
        )}
        {copied && <span className="text-xs text-gold-deep">Tersalin!</span>}
      </button>
    </div>
  );
}