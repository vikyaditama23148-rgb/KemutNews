"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LiveViewCount({ slug, initialCount }) {
  const [count, setCount] = useState(initialCount || 0);

  useEffect(() => {
    const supabase = createClient();
    // Nama channel dibuat unik per-mount (bukan cuma per-slug) supaya tidak
    // bentrok dengan efek ganda React Strict Mode di mode development.
    const channelName = `views-${slug}-${Math.random().toString(36).slice(2)}`;

    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "articles", filter: `slug=eq.${slug}` },
        (payload) => {
          if (typeof payload.new?.view_count === "number") {
            setCount(payload.new.view_count);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  return (
    <span className="flex items-center gap-1.5 text-[11px] text-brand-secondary">
      <Eye size={13} />
      {count.toLocaleString("id-ID")}x dibaca
    </span>
  );
}