import Link from "next/link";
import Image from "next/image";
import { formatDate, formatReadingTime } from "@/lib/format";

export default function HeroNews({ featured, supporting }) {
  if (!featured) return null;

  return (
    <section className="container-editorial pt-8 md:pt-12">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
        {/* Main story */}
        <Link href={`/artikel/${featured.slug}`} className="group block">
          <div className="relative aspect-[16/9] overflow-hidden rounded-card">
            <Image
              src={featured.cover_image_url}
              alt={featured.title}
              fill
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            {featured.category && (
              <span className="absolute left-5 top-5 rounded-sm bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
                {featured.category.name}
              </span>
            )}
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.15] text-ink transition-colors group-hover:text-gold-deep md:text-[44px]">
            {featured.title}
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone md:text-[17px]">
            {featured.excerpt}
          </p>
          <p className="mt-4 text-sm font-medium text-stone-light">
            {featured.author?.name} · {formatDate(featured.published_at)} ·{" "}
            {formatReadingTime(featured.reading_time_minutes)}
          </p>
        </Link>

        {/* Supporting stories */}
        <div className="flex flex-col gap-6 divide-y divide-cream-line lg:pt-1">
          {supporting.map((item, i) => (
            <Link
              key={item.slug}
              href={`/artikel/${item.slug}`}
              className={`group flex gap-4 ${i === 0 ? "" : "pt-6"}`}
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-card md:h-24 md:w-32">
                <Image
                  src={item.cover_image_url}
                  alt={item.title}
                  fill
                  sizes="128px"
                  className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
                />
              </div>
              <div className="min-w-0">
                {item.category && <span className="eyebrow">{item.category.name}</span>}
                <h3 className="mt-1 line-clamp-2 font-display text-[15px] font-bold leading-snug text-ink group-hover:text-gold-deep md:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-stone-light">{formatDate(item.published_at)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
