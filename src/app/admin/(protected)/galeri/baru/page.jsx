import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createGalleryAction } from "@/lib/admin/actions";
import GalleryForm from "@/components/admin/GalleryForm";

export const metadata = { title: "Tambah Foto" };

export default function NewGalleryPage({ searchParams }) {
  return (
    <div>
      <Link href="/admin/galeri" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Galeri
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Tambah Foto Baru</h1>

      <GalleryForm action={createGalleryAction} errorMessage={searchParams?.error} />
    </div>
  );
}