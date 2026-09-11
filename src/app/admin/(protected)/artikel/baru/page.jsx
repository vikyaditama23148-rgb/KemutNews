import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategoriesForAdmin } from "@/lib/admin/data";
import { createArticleAction } from "@/lib/admin/actions";
import ArticleForm from "@/components/admin/ArticleForm";

export const metadata = { title: "Artikel Baru" };

export default async function NewArticlePage({ searchParams }) {
  const categories = await getCategoriesForAdmin();

  return (
    <div>
      <Link href="/admin/artikel" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Artikel
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Tulis Artikel Baru</h1>

      <ArticleForm
        action={createArticleAction}
        categories={categories}
        errorMessage={searchParams?.error}
      />
    </div>
  );
}
