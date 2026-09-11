import SectionHeading from "./SectionHeading";
import NewsCard from "./NewsCard";

export default function CategorySection({ title, articles, href }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="container-editorial py-14 md:py-20">
      <SectionHeading title={title} href={href} />
      <div className="grid gap-8 lg:grid-cols-3">
        {articles.slice(0, 3).map((article) => (
          <NewsCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
