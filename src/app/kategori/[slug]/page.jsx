import { notFound } from "next/navigation";
import { getArticlesByCategory, getCategoryBySlug } from "@/lib/data";
import NewsCard from "@/components/NewsCard";

// Selalu ambil data terbaru — jangan bekukan daftar artikel per kategori
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) return {};
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) notFound();

  const articles = await getArticlesByCategory(params.slug);

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Kategori</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 max-w-xl text-stone">{category.description}</p>
        )}
      </div>

      {articles.length === 0 ? (
        <p className="py-16 text-center text-stone">
          Belum ada artikel pada kategori ini. Nantikan kabar terbaru dari KEMUTNEWS.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}