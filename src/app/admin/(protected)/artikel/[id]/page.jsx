import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminArticleById, getCategoriesForAdmin } from "@/lib/admin/data";
import { updateArticleAction } from "@/lib/admin/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export const metadata = { title: "Edit Artikel" };

export default async function EditArticlePage({ params, searchParams }) {
  let article;
  try {
    article = await getAdminArticleById(params.id);
  } catch {
    notFound();
  }
  if (!article) notFound();

  const categories = await getCategoriesForAdmin();
  const updateWithId = updateArticleAction.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/artikel" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Artikel
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Edit Artikel</h1>

      <ArticleForm
        action={updateWithId}
        categories={categories}
        initialData={article}
        errorMessage={searchParams?.error}
      />
    </div>
  );
}
