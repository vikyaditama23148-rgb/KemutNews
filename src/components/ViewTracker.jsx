"use client";

import { useEffect, useRef } from "react";
import { trackViewAction } from "@/lib/actions/trackView";

// Komponen tak-tampak: sekali dimuat, memberi tahu server untuk menambah
// hitungan "dibaca" artikel ini (server yang memutuskan apakah pengunjung
// ini sudah pernah dihitung sebelumnya lewat cookie).
export default function ViewTracker({ slug }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackViewAction(slug);
  }, [slug]);

  return null;
}