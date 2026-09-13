import Link from "next/link";
import Image from "next/image";
import { formatDate, formatReadingTime } from "@/lib/format";

export default function HeroNews({ featured, supporting }) {
  if (!featured) return null;

  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between bg-brand-surfaceLow px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <h2 className="font-headline text-[18px] font-bold uppercase tracking-tight text-brand-ink">
            Laporan Utama Hari Ini
          </h2>
        </div>
        <span className="hidden text-[11px] font-bold uppercase tracking-wide text-brand-secondary sm:inline">
          {formatDate(new Date().toISOString())}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main hero */}
        <article className="flex flex-col bg-brand-surfaceLowest p-4 shadow-sm lg:col-span-8 lg:p-5">
          <Link href={`/artikel/${featured.slug}`} className="group block">
            <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden bg-brand-surfaceHigh">
              <Image
                src={featured.cover_image_url}
                alt={featured.title}
                fill
                priority
                sizes="(min-width: 1024px) 760px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {featured.category && (
                <span className="absolute left-3 top-3 bg-brand-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {featured.category.name}
                </span>
              )}
            </div>
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] font-semibold text-brand-secondary">
              <span className="font-bold text-brand-primary uppercase">
                {featured.category?.name || "Kabar Utama"}
              </span>
              <span>•</span>
              <span>{formatReadingTime(featured.reading_time_minutes)}</span>
              <span>•</span>
              <span>Oleh {featured.author?.name || "Redaksi KEMUTNEWS"}</span>
            </div>
            <h1 className="mb-3 font-headline text-[30px] font-black leading-[1.15] tracking-tight text-brand-ink transition-colors group-hover:text-brand-primary md:text-[44px] md:leading-[52px]">
              {featured.title}
            </h1>
            <p className="mb-4 font-broadsheet text-[16px] leading-relaxed text-brand-secondary md:text-[18px] md:leading-[28px]">
              {featured.excerpt}
            </p>
          </Link>
          <div className="flex items-center justify-between bg-brand-surfaceLow px-4 py-2 text-brand-secondary">
            <span className="text-[11px] font-bold uppercase tracking-wide">
              {formatDate(featured.published_at)}
            </span>
            <Link
              href={`/artikel/${featured.slug}`}
              className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-brand-primary hover:underline"
            >
              Baca Laporan Penuh →
            </Link>
          </div>
        </article>

        {/* Supporting stories */}
        <aside className="flex flex-col gap-3 lg:col-span-4">
          <div className="bg-brand-surfaceLow px-3 py-2">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-ink">
              Perkembangan Terkini
            </h3>
          </div>
          {supporting.map((item) => (
            <Link
              key={item.slug}
              href={`/artikel/${item.slug}`}
              className="group flex items-start gap-3.5 bg-brand-surfaceLowest p-4 shadow-sm transition-colors hover:bg-brand-surfaceLow"
            >
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {item.category && (
                  <span className="text-[11px] font-bold uppercase text-brand-primary">
                    {item.category.name}
                  </span>
                )}
                <h4 className="line-clamp-2 font-headline text-[16px] font-bold leading-snug text-brand-ink group-hover:text-brand-primary">
                  {item.title}
                </h4>
                <span className="mt-1 text-[11px] text-brand-secondary">
                  {formatDate(item.published_at)}
                </span>
              </div>
              <div className="relative h-[65px] w-[90px] shrink-0 overflow-hidden bg-brand-surfaceContainer">
                <Image src={item.cover_image_url} alt={item.title} fill sizes="90px" className="object-cover" />
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </section>
  );
}