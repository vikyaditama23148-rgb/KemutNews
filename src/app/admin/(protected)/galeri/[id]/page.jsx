import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminGalleryById } from "@/lib/admin/data";
import { updateGalleryAction } from "@/lib/admin/actions";
import GalleryForm from "@/components/admin/GalleryForm";

export const metadata = { title: "Edit Foto" };

export default async function EditGalleryPage({ params, searchParams }) {
  let item;
  try {
    item = await getAdminGalleryById(params.id);
  } catch {
    notFound();
  }
  if (!item) notFound();

  const updateWithId = updateGalleryAction.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/galeri" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Galeri
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Edit Foto</h1>

      <GalleryForm action={updateWithId} initialData={item} errorMessage={searchParams?.error} />
    </div>
  );
}