import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCategoryAction } from "@/lib/admin/actions";
import CategoryForm from "@/components/admin/CategoryForm";

export const metadata = { title: "Tambah Kategori" };

export default function NewCategoryPage({ searchParams }) {
  return (
    <div>
      <Link href="/admin/kategori" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Kategori
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Tambah Kategori Baru</h1>

      <CategoryForm action={createCategoryAction} errorMessage={searchParams?.error} />
    </div>
  );
}