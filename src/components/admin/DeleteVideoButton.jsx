"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteVideoAction } from "@/lib/admin/actions";

export default function DeleteVideoButton({ id, title }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Hapus video "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    startTransition(async () => {
      await deleteVideoAction(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Hapus video"
      className="flex items-center gap-1.5 text-xs font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
      Hapus
    </button>
  );
}