"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { reactToArticleAction } from "@/lib/actions/reactToArticle";

const EMOJIS = [
  { emoji: "👍", label: "Suka" },
  { emoji: "❤️", label: "Cinta" },
  { emoji: "😮", label: "Kaget" },
  { emoji: "😢", label: "Sedih" },
  { emoji: "😡", label: "Marah" },
];

export default function ArticleReactions({ slug, initialCounts }) {
  const [counts, setCounts] = useState(initialCounts || {});
  const [selected, setSelected] = useState(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function refetch() {
      const { data } = await supabase.from("article_reactions").select("emoji").eq("article_slug", slug);
      if (!data) return;
      const next = {};
      data.forEach((r) => {
        next[r.emoji] = (next[r.emoji] || 0) + 1;
      });
      setCounts(next);
    }

    // Nama channel dibuat unik per-mount (bukan cuma per-slug) supaya tidak
    // bentrok dengan efek ganda React Strict Mode di mode development.
    const channelName = `reactions-${slug}-${Math.random().toString(36).slice(2)}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "article_reactions", filter: `article_slug=eq.${slug}` },
        refetch
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  async function handleClick(emoji) {
    if (pending) return;
    setPending(true);
    setSelected(emoji);
    try {
      await reactToArticleAction(slug, emoji);
    } finally {
      setPending(false);
    }
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-wrap items-center gap-2 bg-brand-surfaceLow p-4">
      <span className="mr-1 w-full text-[11px] font-bold uppercase tracking-wide text-brand-secondary sm:w-auto">
        Bagaimana perasaanmu?
      </span>
      {EMOJIS.map(({ emoji, label }) => (
        <button
          key={emoji}
          onClick={() => handleClick(emoji)}
          title={label}
          className={`flex items-center gap-1.5 border px-3 py-1.5 text-sm transition ${
            selected === emoji
              ? "border-brand-primary bg-brand-primary/10"
              : "border-brand-outlineVariant/50 bg-brand-surfaceLowest hover:border-brand-primary"
          }`}
        >
          <span className="text-base leading-none">{emoji}</span>
          {counts[emoji] > 0 && (
            <span className="text-xs font-semibold text-brand-secondary">{counts[emoji]}</span>
          )}
        </button>
      ))}
      {total > 0 && <span className="ml-auto text-[11px] text-brand-secondary">{total} reaksi</span>}
    </div>
  );
}