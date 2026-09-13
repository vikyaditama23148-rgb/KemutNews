import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format";

export default function CommunitySpotlight({ article }) {
  if (!article) return null;

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center gap-2 bg-brand-surfaceLow px-3 py-2">
        <span className="h-2.5 w-2.5 bg-brand-tertiaryContainer" />
        <h2 className="font-headline text-[18px] font-bold uppercase tracking-tight text-brand-ink">
          Community Spotlight
        </h2>
      </div>
      <Link
        href={`/artikel/${article.slug}`}
        className="group grid gap-0 bg-brand-surfaceLowest shadow-sm lg:grid-cols-[280px_1fr]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-surfaceHigh lg:aspect-auto">
          <Image
            src={article.cover_image_url}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 280px, 100vw"
            className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-tertiaryContainer">
            Kisah Inspiratif
          </span>
          <h3 className="mt-2 font-headline text-[22px] italic leading-snug text-brand-ink transition-colors group-hover:text-brand-primary md:text-[28px]">
            &ldquo;{article.title}&rdquo;
          </h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-brand-secondary">
            {article.excerpt}
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-wide text-brand-secondary">
            {article.author?.name || "Redaksi KEMUTNEWS"} · {formatDate(article.published_at)}
          </p>
        </div>
      </Link>
    </section>
  );
}