import { MessageCircle } from "lucide-react";
import { formatDateLong } from "@/lib/format";

function normalizeUrl(url) {
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

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
          {comments.map((c) => {
            const url = normalizeUrl(c.website);
            return (
              <div key={c.id} className="bg-brand-surfaceLow p-4">
                <div className="flex items-center justify-between">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer nofollow"
                      className="text-sm font-bold text-brand-primary hover:underline"
                    >
                      {c.name}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-brand-ink">{c.name}</p>
                  )}
                  <p className="text-[11px] text-brand-secondary">{formatDateLong(c.created_at)}</p>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-secondary">{c.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}