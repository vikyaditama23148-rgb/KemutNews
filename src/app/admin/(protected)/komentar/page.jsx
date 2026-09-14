import Link from "next/link";
import { getAdminComments } from "@/lib/admin/data";
import { formatDateLong } from "@/lib/format";
import CommentModerationButtons from "@/components/admin/CommentModerationButtons";

export const metadata = { title: "Kelola Komentar" };

const STATUS_LABEL = {
  pending: { text: "Menunggu", className: "bg-yellow-100 text-yellow-800" },
  approved: { text: "Disetujui", className: "bg-green-100 text-green-800" },
  rejected: { text: "Ditolak", className: "bg-red-100 text-red-700" },
};

export default async function AdminKomentarPage({ searchParams }) {
  const allComments = await getAdminComments();
  const filter = searchParams?.status;
  const comments = filter ? allComments.filter((c) => c.status === filter) : allComments;

  const counts = {
    all: allComments.length,
    pending: allComments.filter((c) => c.status === "pending").length,
    approved: allComments.filter((c) => c.status === "approved").length,
    rejected: allComments.filter((c) => c.status === "rejected").length,
  };

  const TABS = [
    { key: "", label: "Semua", count: counts.all },
    { key: "pending", label: "Menunggu", count: counts.pending },
    { key: "approved", label: "Disetujui", count: counts.approved },
    { key: "rejected", label: "Ditolak", count: counts.rejected },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-ink">Kelola Komentar</h1>
        <p className="mt-1 text-sm text-stone">{allComments.length} komentar total.</p>
      </div>

      <div className="mb-6 flex gap-2">
        {TABS.map((tab) => (
          <Link
            key={tab.key}
            href={tab.key ? `/admin/komentar?status=${tab.key}` : "/admin/komentar"}
            className={`rounded-card px-3.5 py-2 text-xs font-semibold ${
              (filter || "") === tab.key
                ? "bg-ink text-cream"
                : "bg-cream-soft text-stone hover:bg-cream-line"
            }`}
          >
            {tab.label} ({tab.count})
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-card border border-cream-line bg-white">
        {comments.length === 0 ? (
          <p className="p-8 text-center text-sm text-stone">Tidak ada komentar untuk filter ini.</p>
        ) : (
          <ul className="divide-y divide-cream-line">
            {comments.map((c) => (
              <li key={c.id} className="p-5">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">{c.name}</span>
                    <span
                      className={`rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase ${STATUS_LABEL[c.status]?.className}`}
                    >
                      {STATUS_LABEL[c.status]?.text || c.status}
                    </span>
                  </div>
                  <span className="text-xs text-stone-light">{formatDateLong(c.created_at)}</span>
                </div>
                <p className="text-sm leading-relaxed text-stone-dark">{c.content}</p>
                <p className="mt-2 text-xs text-stone-light">
                  Pada artikel:{" "}
                  <Link href={`/artikel/${c.article_slug}`} target="_blank" className="text-gold-deep hover:underline">
                    {c.articles?.title || c.article_slug}
                  </Link>
                </p>
                <div className="mt-3">
                  <CommentModerationButtons id={c.id} status={c.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}