import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, getHomepageFeed } from "@/lib/data";
import { formatDateLong, formatReadingTime } from "@/lib/format";
import NewsCard from "@/components/NewsCard";
import TrendingList from "@/components/TrendingList";
import ShareBar from "@/components/ShareBar";

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const [related, { mostRead }] = await Promise.all([
    getRelatedArticles(article.category?.slug, article.slug, 3),
    getHomepageFeed(),
  ]);

  const paragraphs = (article.content || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <article>
      <div className="container-editorial pt-8">
        <nav className="mb-5 text-xs text-stone">
          <Link href="/" className="hover:text-gold-deep">
            Home
          </Link>
          {article.category && (
            <>
              <span className="mx-1.5">/</span>
              <Link href={`/kategori/${article.category.slug}`} className="hover:text-gold-deep">
                {article.category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="mx-auto max-w-3xl">
          {article.category && <span className="eyebrow">{article.category.name}</span>}
          <h1 className="mt-3 font-display text-3xl font-bold leading-[1.2] text-ink md:text-[42px]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone">{article.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-cream-line py-4 text-sm text-stone-light">
            <span className="font-medium text-ink">{article.author?.name || "Redaksi KEMUTNEWS"}</span>
            <span>{formatDateLong(article.published_at)}</span>
            <span>{formatReadingTime(article.reading_time_minutes)}</span>
          </div>
        </div>
      </div>

      {article.cover_image_url && (
        <div className="container-editorial mt-8">
          <div className="relative mx-auto aspect-[16/9] max-w-4xl overflow-hidden rounded-card">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mx-auto mt-2 max-w-4xl text-center text-xs text-stone-light">
            {article.title}
          </p>
        </div>
      )}

      <div className="container-editorial">
        <div className="mx-auto grid max-w-4xl gap-10 py-10 lg:grid-cols-[1fr_680px_1fr]">
          <div className="hidden lg:block" />
          <div className="prose-kemut mx-auto w-full max-w-[720px]">
            {paragraphs.map((p, i) =>
              p.startsWith(">") ? (
                <blockquote key={i}>{p.replace(/^>\s*/, "")}</blockquote>
              ) : (
                <p key={i}>{p}</p>
              )
            )}
            <ShareBar title={article.title} />
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-editorial border-t border-cream-line py-14">
          <h2 className="mb-7 font-display text-2xl font-bold text-ink">Artikel Terkait</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <TrendingList articles={mostRead} />
    </article>
  );
}
