import Link from "next/link";
import Image from "next/image";
import { formatDate, formatReadingTime } from "@/lib/format";

export default function NewsCard({ article, layout = "vertical" }) {
  if (!article) return null;
  const href = `/artikel/${article.slug}`;

  if (layout === "horizontal") {
    return (
      <Link href={href} className="group flex gap-4">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-card md:h-28 md:w-40">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
          />
        </div>
        <div className="min-w-0 flex-1">
          {article.category && (
            <span className="eyebrow">{article.category.name}</span>
          )}
          <h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-snug text-ink group-hover:text-gold-deep md:text-lg">
            {article.title}
          </h3>
          <p className="mt-1.5 text-xs text-stone">
            {formatDate(article.published_at)} · {formatReadingTime(article.reading_time_minutes)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-card">
        <Image
          src={article.cover_image_url}
          alt={article.title}
          fill
          sizes="(min-width: 1024px) 400px, 100vw"
          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
        />
      </div>
      <div className="mt-4">
        {article.category && <span className="eyebrow">{article.category.name}</span>}
        <h3 className="mt-1.5 line-clamp-2 font-display text-xl font-bold leading-snug text-ink transition-colors group-hover:text-gold-deep">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone">
          {article.excerpt}
        </p>
        <p className="mt-3 text-xs font-medium text-stone-light">
          {article.author?.name} · {formatDate(article.published_at)} · {formatReadingTime(article.reading_time_minutes)}
        </p>
      </div>
    </Link>
  );
}
