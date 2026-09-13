import Link from "next/link";

export default function TrendingSidebar({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-brand-ink p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="h-2 w-2 bg-brand-primaryContainer" />
        <h3 className="text-[13px] font-bold uppercase tracking-wide text-white">
          Paling Dibaca 24 Jam
        </h3>
      </div>
      <ol className="flex flex-col gap-4">
        {articles.map((article, i) => (
          <li key={article.slug}>
            <Link href={`/artikel/${article.slug}`} className="group flex items-start gap-3">
              <span className="font-headline text-2xl font-light leading-none text-brand-outlineVariant/50 group-hover:text-brand-primaryContainer">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="line-clamp-3 pt-0.5 font-headline text-[13px] font-bold leading-snug text-white group-hover:text-brand-onPrimaryContainer">
                {article.title}
              </h4>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}