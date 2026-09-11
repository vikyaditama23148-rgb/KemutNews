import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { formatDate } from "@/lib/format";

export default function TrendingList({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="bg-ink-soft py-14 text-cream md:py-20">
      <div className="container-editorial">
        <div className="mb-7 flex items-end justify-between border-b border-cream/10 pb-4">
          <h2 className="font-display text-2xl font-bold text-cream md:text-[28px]">
            Paling Dibaca
          </h2>
        </div>
        <ol className="divide-y divide-cream/10">
          {articles.map((article, i) => (
            <li key={article.slug}>
              <Link
                href={`/artikel/${article.slug}`}
                className="group flex items-center gap-6 py-5"
              >
                <span className="font-display text-3xl font-bold text-gold/70 transition-colors group-hover:text-gold md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  {article.category && (
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-gold/70">
                      {article.category.name}
                    </span>
                  )}
                  <h3 className="mt-1 line-clamp-2 font-display text-base font-bold leading-snug text-cream group-hover:text-gold md:text-lg">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-xs text-cream/40">{formatDate(article.published_at)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
