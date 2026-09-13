import Link from "next/link";
import Image from "next/image";
import { formatDate, formatReadingTime } from "@/lib/format";

export default function NewsCard({ article, layout = "vertical" }) {
  if (!article) return null;
  const href = `/artikel/${article.slug}`;

  if (layout === "horizontal") {
    return (
      <Link href={href} className="group flex gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden bg-brand-surfaceContainer md:h-28 md:w-40">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          {article.category && (
            <span className="text-[11px] font-bold uppercase text-brand-primary">{article.category.name}</span>
          )}
          <h3 className="mt-1 line-clamp-2 font-headline text-base font-bold leading-snug text-brand-ink group-hover:text-brand-primary md:text-lg">
            {article.title}
          </h3>
          <p className="mt-1.5 text-xs text-brand-secondary">
            {formatDate(article.published_at)} · {formatReadingTime(article.reading_time_minutes)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group flex flex-col bg-brand-surfaceLowest shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-surfaceContainer">
        <Image
          src={article.cover_image_url}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        {article.category && (
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">
            {article.category.name}
          </span>
        )}
        <h3 className="mt-1.5 line-clamp-2 font-headline text-[17px] font-bold leading-snug text-brand-ink transition-colors group-hover:text-brand-primary">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-brand-secondary">
          {article.excerpt}
        </p>
        <div className="mt-3 border-t border-brand-outlineVariant/40 pt-2 text-[11px] font-semibold text-brand-secondary">
          {formatDate(article.published_at)} · {formatReadingTime(article.reading_time_minutes)}
        </div>
      </div>
    </Link>
  );
}