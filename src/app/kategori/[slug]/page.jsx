import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticlesByCategory, getCategoryBySlug, getCategories, getHomepageFeed } from "@/lib/data";
import NewsCard from "@/components/NewsCard";
import TrendingSidebar from "@/components/TrendingSidebar";

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

  const [articles, categories, { mostRead }] = await Promise.all([
    getArticlesByCategory(params.slug),
    getCategories(),
    getHomepageFeed(),
  ]);

  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      {/* Breadcrumb */}
      <nav className="mb-4 text-xs text-brand-secondary">
        <Link href="/" className="hover:text-brand-primary">
          Beranda
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-brand-ink">{category.name}</span>
      </nav>

      {/* Header kategori */}
      <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-brand-primary pb-4">
        <div>
          <h1 className="font-headline text-[28px] font-black uppercase leading-tight tracking-tight text-brand-ink md:text-[38px]">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-1.5 max-w-xl text-[14px] text-brand-secondary">{category.description}</p>
          )}
        </div>
        <span className="hidden shrink-0 bg-brand-surfaceLow px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-ink sm:block">
          {articles.length} Berita
        </span>
      </div>

      {articles.length === 0 ? (
        <p className="py-16 text-center text-brand-secondary">
          Belum ada artikel pada kategori ini. Nantikan kabar terbaru dari KEMUTNEWS.
        </p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* MAIN COLUMN */}
          <div className="min-w-0">
            {/* Featured pertama, lebih besar */}
            {featured && (
              <div className="mb-6">
                <NewsCard article={featured} />
              </div>
            )}

            {/* Sisanya, grid */}
            {rest.length > 0 && (
              <>
                <div className="mb-4 border-b border-brand-outlineVariant/40 pb-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-widest text-brand-secondary">
                    Berita Lainnya
                  </h2>
                </div>
                <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-2">
                  {rest.map((article) => (
                    <NewsCard key={article.slug} article={article} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="flex flex-col gap-6">
            <TrendingSidebar articles={mostRead} />

            <div className="bg-brand-surfaceLowest p-5 shadow-sm">
              <h3 className="mb-3 border-b border-brand-outlineVariant/40 pb-3 text-[13px] font-bold uppercase tracking-wide text-brand-ink">
                Jelajahi Kategori Lain
              </h3>
              <ul className="flex flex-col gap-2">
                {categories
                  .filter((c) => c.slug !== category.slug)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/kategori/${c.slug}`}
                        className="flex items-center justify-between py-1.5 text-[13px] font-semibold text-brand-ink transition hover:text-brand-primary"
                      >
                        {c.name}
                        <span className="text-brand-outlineVariant">→</span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}