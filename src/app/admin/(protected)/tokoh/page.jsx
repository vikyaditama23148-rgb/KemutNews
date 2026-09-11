import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAdminTokohList } from "@/lib/admin/data";
import DeleteTokohButton from "@/components/admin/DeleteTokohButton";

export const metadata = { title: "Kelola Tokoh" };

export default async function AdminTokohPage() {
  const tokoh = await getAdminTokohList();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Tokoh KEMUT</h1>
          <p className="mt-1 text-sm text-stone">{tokoh.length} profil tersimpan.</p>
        </div>
        <Link
          href="/admin/tokoh/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Tambah Tokoh
        </Link>
      </div>

      <div className="overflow-hidden rounded-card border border-cream-line bg-white">
        {tokoh.length === 0 ? (
          <p className="p-8 text-center text-sm text-stone">
            Belum ada profil tokoh. Klik &ldquo;Tambah Tokoh&rdquo; untuk mulai menambahkan.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-line bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-stone">
                <th className="px-5 py-3">Nama</th>
                <th className="hidden px-5 py-3 md:table-cell">Peran</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tokoh.map((t) => (
                <tr key={t.id} className="border-b border-cream-line last:border-0">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-card bg-cream-soft">
                        {t.photo_url && (
                          <Image src={t.photo_url} alt={t.name} fill sizes="40px" className="object-cover" />
                        )}
                      </div>
                      <p className="font-medium text-ink">{t.name}</p>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3 text-stone md:table-cell">{t.role || "-"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/tokoh/${t.id}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-gold-deep"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteTokohButton id={t.id} name={t.name} />
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