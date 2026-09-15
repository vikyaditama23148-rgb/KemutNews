import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminCategoryById } from "@/lib/admin/data";
import { updateCategoryAction } from "@/lib/admin/actions";
import CategoryForm from "@/components/admin/CategoryForm";

export const metadata = { title: "Edit Kategori" };

export default async function EditCategoryPage({ params, searchParams }) {
  let category;
  try {
    category = await getAdminCategoryById(params.id);
  } catch {
    notFound();
  }
  if (!category) notFound();

  const updateWithId = updateCategoryAction.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/kategori" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Kategori
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Edit Kategori</h1>

      <CategoryForm action={updateWithId} initialData={category} errorMessage={searchParams?.error} />
    </div>
  );
}