import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, getHomepageFeed, getApprovedComments } from "@/lib/data";
import { formatDate, formatDateLong, formatReadingTime } from "@/lib/format";
import NewsCard from "@/components/NewsCard";
import ShareBar from "@/components/ShareBar";
import TrendingSidebar from "@/components/TrendingSidebar";
import CommentForm from "@/components/CommentForm";
import CommentList from "@/components/CommentList";
import ViewTracker from "@/components/ViewTracker";

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

  const [related, { mostRead }, comments] = await Promise.all([
    getRelatedArticles(article.category?.slug, article.slug, 3),
    getHomepageFeed(),
    getApprovedComments(article.slug),
  ]);

  const paragraphs = (article.content || "").split(/\n\s*\n/).filter(Boolean);

  return (
    <article>
      <ViewTracker slug={article.slug} />
      <div className="mx-auto max-w-[1440px] px-4 pt-6 md:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-brand-secondary">
          <Link href="/" className="hover:text-brand-primary">
            Beranda
          </Link>
          {article.category && (
            <>
              <span className="mx-1.5">/</span>
              <Link href={`/kategori/${article.category.slug}`} className="hover:text-brand-primary">
                {article.category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* MAIN COLUMN */}
          <div className="min-w-0">
            <div className="mx-auto w-full max-w-[720px]">
              {article.category && (
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-brand-primary" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
                    {article.category.name}
                  </span>
                </div>
              )}

              <h1 className="font-headline text-[28px] font-black leading-[1.2] tracking-tight text-brand-ink md:text-[38px] md:leading-[1.15]">
                {article.title}
              </h1>
              <p className="mt-4 text-[17px] leading-relaxed text-brand-secondary md:text-[19px]">
                {article.excerpt}
              </p>

              {/* Byline */}
              <div className="mt-6 flex items-center gap-3 border-y border-brand-outlineVariant/40 py-4">
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand-surfaceContainer">
                  {article.author?.avatar_url && (
                    <Image
                      src={article.author.avatar_url}
                      alt={article.author.name || "Penulis"}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-brand-ink">
                    {article.author?.name || "Redaksi KEMUTNEWS"}
                  </p>
                  <p className="text-[11px] text-brand-secondary">
                    {article.author?.role || "Kontributor"}
                  </p>
                </div>
                <div className="hidden shrink-0 flex-col items-end text-[11px] text-brand-secondary sm:flex">
                  <span>{formatDateLong(article.published_at)}</span>
                  <span>{formatReadingTime(article.reading_time_minutes)}</span>
                </div>
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-brand-secondary sm:hidden">
                <span>{formatDate(article.published_at)}</span>
                <span>{formatReadingTime(article.reading_time_minutes)}</span>
              </div>
            </div>

            {/* Cover image */}
            {article.cover_image_url && (
              <div className="mx-auto mt-6 w-full max-w-[720px]">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-surfaceContainer">
                  <Image
                    src={article.cover_image_url}
                    alt={article.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Body */}
            <div className="prose-kemut mx-auto mt-8 w-full max-w-[720px]">
              {paragraphs.map((p, i) =>
                p.startsWith(">") ? (
                  <blockquote key={i}>{p.replace(/^>\s*/, "")}</blockquote>
                ) : (
                  <p key={i}>{p}</p>
                )
              )}

              <ShareBar title={article.title} />

              {/* Author bio card */}
              <div className="mt-8 flex items-start gap-4 bg-brand-surfaceLow p-5">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-brand-surfaceContainer">
                  {article.author?.avatar_url && (
                    <Image
                      src={article.author.avatar_url}
                      alt={article.author.name || "Penulis"}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
                    Ditulis Oleh
                  </p>
                  <p className="mt-0.5 font-headline text-base font-bold text-brand-ink">
                    {article.author?.name || "Redaksi KEMUTNEWS"}
                  </p>
                  <p className="text-[13px] text-brand-secondary">
                    {article.author?.role || "Kontributor KEMUTNEWS"}
                  </p>
                </div>
              </div>
            </div>

            {/* Komentar — sengaja di luar wrapper "prose-kemut" supaya
                gaya drop-cap & tipografi artikel tidak ikut ke teks komentar */}
            <div className="mx-auto mt-8 w-full max-w-[720px]">
              <div className="border-t border-brand-outlineVariant/40 pt-6">
                <CommentList comments={comments} />
                <div className="mt-6">
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-brand-secondary">
                    Tinggalkan Komentar
                  </p>
                  <CommentForm articleSlug={article.slug} />
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TrendingSidebar articles={mostRead} />
            </div>
          </aside>
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-4 py-14 md:px-8">
          <div className="mb-6 flex items-center justify-between bg-brand-surfaceLow px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 bg-brand-primary" />
              <h2 className="font-headline text-[16px] font-bold uppercase tracking-tight text-brand-ink">
                Artikel Terkait {article.category ? `Kategori ${article.category.name}` : ""}
              </h2>
            </div>
          </div>
          <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <NewsCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* Mobile: trending list below related (sidebar hidden on mobile) */}
      <div className="mx-auto max-w-[1440px] px-4 pb-12 md:px-8 lg:hidden">
        <TrendingSidebar articles={mostRead} />
      </div>
    </article>
  );
}