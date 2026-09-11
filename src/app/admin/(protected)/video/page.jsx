import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { getAdminVideoList } from "@/lib/admin/data";
import { formatDuration } from "@/lib/format";
import DeleteVideoButton from "@/components/admin/DeleteVideoButton";

export const metadata = { title: "Kelola Video" };

export default async function AdminVideoPage() {
  const videos = await getAdminVideoList();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Video</h1>
          <p className="mt-1 text-sm text-stone">{videos.length} video tersimpan.</p>
        </div>
        <Link
          href="/admin/video/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Tambah Video
        </Link>
      </div>

      <div className="overflow-hidden rounded-card border border-cream-line bg-white">
        {videos.length === 0 ? (
          <p className="p-8 text-center text-sm text-stone">
            Belum ada video. Klik &ldquo;Tambah Video&rdquo; untuk mulai menambahkan.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-line bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-stone">
                <th className="px-5 py-3">Video</th>
                <th className="hidden px-5 py-3 md:table-cell">Kategori</th>
                <th className="hidden px-5 py-3 md:table-cell">Durasi</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v.id} className="border-b border-cream-line last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-card bg-cream-soft">
                        {v.thumbnail_url && (
                          <Image src={v.thumbnail_url} alt={v.title} fill sizes="80px" className="object-cover" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{v.title}</p>
                        <a
                          href={v.video_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-0.5 flex items-center gap-1 text-xs text-gold-deep hover:underline"
                        >
                          Buka tautan <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-stone md:table-cell">{v.category || "-"}</td>
                  <td className="hidden px-5 py-3 text-stone md:table-cell">
                    {v.duration_seconds ? formatDuration(v.duration_seconds) : "-"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/video/${v.id}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-gold-deep"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteVideoButton id={v.id} title={v.title} />
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