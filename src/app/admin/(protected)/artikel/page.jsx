import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAdminArticles } from "@/lib/admin/data";
import { formatDate } from "@/lib/format";
import DeleteArticleButton from "@/components/admin/DeleteArticleButton";

export const metadata = { title: "Kelola Artikel" };

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Artikel</h1>
          <p className="mt-1 text-sm text-stone">{articles.length} artikel dipublikasikan.</p>
        </div>
        <Link
          href="/admin/artikel/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Artikel Baru
        </Link>
      </div>

      <div className="overflow-hidden rounded-card border border-cream-line bg-white">
        {articles.length === 0 ? (
          <p className="p-8 text-center text-sm text-stone">
            Belum ada artikel. Klik &ldquo;Artikel Baru&rdquo; untuk mulai menulis.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-line bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-stone">
                <th className="px-5 py-3">Artikel</th>
                <th className="hidden px-5 py-3 md:table-cell">Kategori</th>
                <th className="hidden px-5 py-3 md:table-cell">Tanggal</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id} className="border-b border-cream-line last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-card bg-cream-soft">
                        {a.cover_image_url && (
                          <Image src={a.cover_image_url} alt={a.title} fill sizes="64px" className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{a.title}</p>
                        <div className="mt-0.5 flex gap-1.5">
                          {a.is_featured && (
                            <span className="rounded-sm bg-gold/15 px-1.5 py-0.5 text-[10px] font-semibold text-gold-deep">
                              Headline
                            </span>
                          )}
                          {a.is_breaking && (
                            <span className="rounded-sm bg-ink/10 px-1.5 py-0.5 text-[10px] font-semibold text-ink">
                              Ticker
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-stone md:table-cell">
                    {a.categories?.name || "-"}
                  </td>
                  <td className="hidden px-5 py-3 text-stone md:table-cell">
                    {formatDate(a.published_at)}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/artikel/${a.id}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-gold-deep"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteArticleButton id={a.id} title={a.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
