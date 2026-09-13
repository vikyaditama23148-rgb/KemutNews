import Link from "next/link";
import Image from "next/image";
import { formatDate, formatReadingTime } from "@/lib/format";

function highlight(text, query) {
  if (!query || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-yellow-200 text-brand-primary">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function SearchResultCard({ article, query }) {
  return (
    <Link href={`/artikel/${article.slug}`} className="group flex gap-4 bg-brand-surfaceLowest p-4 shadow-sm">
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
        <h3 className="mt-1 line-clamp-2 font-headline text-[17px] font-bold leading-snug text-brand-ink group-hover:text-brand-primary">
          {highlight(article.title, query)}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-brand-secondary">
          {highlight(article.excerpt, query)}
        </p>
        <p className="mt-2 text-[11px] font-semibold text-brand-secondary">
          {formatDate(article.published_at)} · {formatReadingTime(article.reading_time_minutes)}
        </p>
      </div>
    </Link>
  );
}