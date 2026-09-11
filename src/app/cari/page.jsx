import { searchArticles } from "@/lib/data";
import NewsCard from "@/components/NewsCard";

export const metadata = { title: "Pencarian" };

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";
  const results = query ? await searchArticles(query) : [];

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Pencarian</span>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink md:text-3xl">
          {query ? (
            <>
              Hasil untuk <span className="text-gold-deep">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Cari berita, tokoh, kegiatan..."
          )}
        </h1>
        {query && (
          <p className="mt-2 text-sm text-stone">
            {results.length} artikel ditemukan
          </p>
        )}
      </div>

      {query && results.length === 0 && (
        <p className="py-16 text-center text-stone">
          Tidak ada hasil yang cocok dengan pencarian kamu. Coba kata kunci lain.
        </p>
      )}

      {results.length > 0 && (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
