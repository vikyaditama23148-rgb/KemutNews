import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAdminCategoryList } from "@/lib/admin/data";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export const metadata = { title: "Kelola Kategori" };

export default async function AdminKategoriPage() {
  const categories = await getAdminCategoryList();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Kategori</h1>
          <p className="mt-1 text-sm text-stone">{categories.length} kategori tersedia.</p>
        </div>
        <Link
          href="/admin/kategori/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Tambah Kategori
        </Link>
      </div>

      <div className="mb-6 rounded-card border border-gold/30 bg-gold/5 p-4 text-sm text-stone-dark">
        <strong>Catatan:</strong> menu navigasi utama di bagian atas situs tidak otomatis mengikuti
        daftar ini. Kategori baru bisa langsung dipakai saat menulis artikel dan punya halamannya
        sendiri, tapi untuk memunculkannya di menu atas perlu penyesuaian kode tambahan.
      </div>

      <div className="overflow-hidden rounded-card border border-cream-line bg-white">
        {categories.length === 0 ? (
          <p className="p-8 text-center text-sm text-stone">Belum ada kategori.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-line bg-cream-soft text-left text-xs font-semibold uppercase tracking-wide text-stone">
                <th className="px-5 py-3">Nama</th>
                <th className="hidden px-5 py-3 md:table-cell">Slug</th>
                <th className="hidden px-5 py-3 md:table-cell">Deskripsi</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-cream-line last:border-0">
                  <td className="px-5 py-3 font-medium text-ink">{c.name}</td>
                  <td className="hidden px-5 py-3 font-mono text-xs text-stone md:table-cell">
                    /{c.slug}
                  </td>
                  <td className="hidden max-w-xs truncate px-5 py-3 text-stone md:table-cell">
                    {c.description || "-"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/kategori/${c.id}`}
                        className="flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-gold-deep"
                      >
                        <Pencil size={13} /> Edit
                      </Link>
                      <DeleteCategoryButton id={c.id} name={c.name} />
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