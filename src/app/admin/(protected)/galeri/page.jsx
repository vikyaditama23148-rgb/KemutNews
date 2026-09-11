import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getAdminGalleryList } from "@/lib/admin/data";
import DeleteGalleryButton from "@/components/admin/DeleteGalleryButton";

export const metadata = { title: "Kelola Galeri" };

export default async function AdminGaleriPage() {
  const items = await getAdminGalleryList();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Galeri</h1>
          <p className="mt-1 text-sm text-stone">{items.length} foto tersimpan.</p>
        </div>
        <Link
          href="/admin/galeri/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Tambah Foto
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-card border border-cream-line bg-white p-8 text-center text-sm text-stone">
          Belum ada foto. Klik &ldquo;Tambah Foto&rdquo; untuk mulai menambahkan.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-card border border-cream-line bg-white">
              <div className="relative aspect-square">
                <Image src={item.image_url} alt={item.caption || ""} fill sizes="240px" className="object-cover" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-ink">{item.caption || "(tanpa keterangan)"}</p>
                <p className="mt-0.5 truncate text-xs text-stone">{item.event_name || "-"}</p>
                <div className="mt-2 flex items-center justify-between">
                  <Link
                    href={`/admin/galeri/${item.id}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-gold-deep"
                  >
                    <Pencil size={13} /> Edit
                  </Link>
                  <DeleteGalleryButton id={item.id} caption={item.caption} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}