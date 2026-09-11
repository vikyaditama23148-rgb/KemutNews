import SectionHeading from "./SectionHeading";
import NewsCard from "./NewsCard";

export default function NewsList({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="container-editorial py-14 md:py-20">
      <SectionHeading title="Berita Terbaru" href="/kategori/kabar-kemut" />
      <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.slice(0, 6).map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
