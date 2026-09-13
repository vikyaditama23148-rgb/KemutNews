import SectionHeading from "./SectionHeading";
import NewsCard from "./NewsCard";

export default function NewsList({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="w-full">
      <SectionHeading title="Berita Terbaru & Investigasi" href="/kategori/kabar-kemut" />
      <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 6).map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}