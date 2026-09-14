"use client";

import { useTransition } from "react";
import { Check, X, Trash2, Loader2 } from "lucide-react";
import { approveCommentAction, rejectCommentAction, deleteCommentAction } from "@/lib/admin/actions";

export default function CommentModerationButtons({ id, status }) {
  const [isPending, startTransition] = useTransition();

  function handle(action) {
    startTransition(async () => {
      await action(id);
    });
  }

  return (
    <div className="flex items-center gap-3">
      {status !== "approved" && (
        <button
          onClick={() => handle(approveCommentAction)}
          disabled={isPending}
          className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800 disabled:opacity-50"
        >
          {isPending ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
          Setujui
        </button>
      )}
      {status !== "rejected" && (
        <button
          onClick={() => handle(rejectCommentAction)}
          disabled={isPending}
          className="flex items-center gap-1 text-xs font-semibold text-yellow-700 hover:text-yellow-800 disabled:opacity-50"
        >
          <X size={13} />
          Tolak
        </button>
      )}
      <button
        onClick={() => {
          if (confirm("Hapus komentar ini secara permanen?")) handle(deleteCommentAction);
        }}
        disabled={isPending}
        className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
      >
        <Trash2 size={13} />
        Hapus
      </button>
    </div>
  );
}