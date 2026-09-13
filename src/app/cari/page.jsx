import Link from "next/link";
import { SearchX } from "lucide-react";
import { searchArticles, getCategories } from "@/lib/data";
import SearchResultCard from "@/components/SearchResultCard";
import SearchPageBar from "@/components/SearchPageBar";

export const metadata = { title: "Pencarian" };

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";
  const [results, categories] = await Promise.all([
    query ? searchArticles(query) : Promise.resolve([]),
    getCategories(),
  ]);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-8 md:px-8">
      <div className="mb-6 flex items-center gap-2">
        <span className="h-2.5 w-2.5 bg-brand-primary" />
        <h1 className="text-[11px] font-bold uppercase tracking-widest text-brand-ink">
          Pencarian Arsip Berita
        </h1>
      </div>

      <SearchPageBar initialQuery={query} />

      {query && (
        <p className="mt-4 text-[13px] text-brand-secondary">
          Menampilkan <strong className="text-brand-ink">{results.length}</strong> hasil untuk{" "}
          <strong className="text-brand-ink">&ldquo;{query}&rdquo;</strong>
        </p>
      )}

      {!query && (
        <p className="mt-6 text-center text-brand-secondary">
          Ketikkan kata kunci di atas untuk mencari artikel, tokoh, atau kegiatan.
        </p>
      )}

      {query && results.length === 0 && (
        <div className="mt-10 flex flex-col items-center bg-brand-surfaceLowest p-10 text-center shadow-sm">
          <SearchX size={36} className="mb-3 text-brand-outlineVariant" strokeWidth={1.5} />
          <p className="font-headline text-lg font-bold text-brand-ink">
            Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1.5 max-w-sm text-sm text-brand-secondary">
            Coba kata kunci lain, atau jelajahi kategori berita di bawah ini.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className="bg-brand-surfaceLow px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-ink transition hover:bg-brand-primary hover:text-white"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {results.map((article) => (
            <SearchResultCard key={article.slug} article={article} query={query} />
          ))}
        </div>
      )}
    </div>
  );
}