import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/format";

export default function CommunitySpotlight({ article }) {
  if (!article) return null;

  return (
    <section className="bg-cream-soft py-14 md:py-20">
      <div className="container-editorial">
        <p className="eyebrow mb-7 border-b border-cream-line pb-4">Cerita dari Keluarga KEMUT</p>
        <Link href={`/artikel/${article.slug}`} className="group grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:order-2">
            <Image
              src={article.cover_image_url}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 640px, 100vw"
              className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
            />
          </div>
          <div className="lg:order-1">
            <h3 className="font-display text-3xl font-bold leading-[1.2] text-ink transition-colors group-hover:text-gold-deep md:text-4xl">
              {article.title}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-stone">{article.excerpt}</p>
            <p className="mt-5 text-sm font-medium text-stone-light">
              {article.author?.name} · {formatDate(article.published_at)}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gold-deep">
              Baca Selengkapnya
              <span className="h-px w-6 bg-gold-deep transition-all group-hover:w-10" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
