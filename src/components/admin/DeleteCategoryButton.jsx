"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteCategoryAction } from "@/lib/admin/actions";

export default function DeleteCategoryButton({ id, name }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (
      !confirm(
        `Hapus kategori "${name}"? Artikel yang memakai kategori ini akan kehilangan kategorinya (tidak ikut terhapus). Tindakan ini tidak bisa dibatalkan.`
      )
    )
      return;
    startTransition(async () => {
      await deleteCategoryAction(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Hapus kategori"
      className="flex items-center gap-1.5 text-xs font-semibold text-red-600 transition hover:text-red-700 disabled:opacity-50"
    >
      {isPending ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
      Hapus
    </button>
  );
}