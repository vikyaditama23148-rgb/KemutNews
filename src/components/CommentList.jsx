import { MessageCircle } from "lucide-react";
import { formatDateLong } from "@/lib/format";

export default function CommentList({ comments }) {
  return (
    <div className="mt-6">
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle size={16} className="text-brand-primary" />
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-brand-ink">
          {comments.length > 0 ? `${comments.length} Komentar` : "Belum Ada Komentar"}
        </h3>
      </div>

      {comments.length > 0 && (
        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <div key={c.id} className="bg-brand-surfaceLow p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-brand-ink">{c.name}</p>
                <p className="text-[11px] text-brand-secondary">{formatDateLong(c.created_at)}</p>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-brand-secondary">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}