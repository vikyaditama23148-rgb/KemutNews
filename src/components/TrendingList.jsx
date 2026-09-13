import Link from "next/link";
import { formatDate } from "@/lib/format";

export default function TrendingList({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="w-full bg-brand-ink py-8 px-4 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-5 flex items-center gap-2 border-b-2 border-brand-primaryContainer pb-3">
          <span className="h-2.5 w-2.5 bg-brand-primaryContainer" />
          <h2 className="font-headline text-[18px] font-bold uppercase tracking-tight text-white">
            Paling Dibaca 24 Jam Terakhir
          </h2>
        </div>
        <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <li key={article.slug}>
              <Link href={`/artikel/${article.slug}`} className="group flex items-start gap-4">
                <span className="font-headline text-[36px] font-light leading-none text-brand-outlineVariant/50 group-hover:text-brand-primaryContainer">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  {article.category && (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primaryContainer">
                      {article.category.name}
                    </span>
                  )}
                  <h3 className="mt-1 line-clamp-2 font-headline text-[15px] font-bold leading-snug text-white group-hover:text-brand-onPrimaryContainer">
                    {article.title}
                  </h3>
                  <p className="mt-1 text-[11px] text-white/40">{formatDate(article.published_at)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}