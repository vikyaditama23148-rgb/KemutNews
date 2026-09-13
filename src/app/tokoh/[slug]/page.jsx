import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTokohBySlug } from "@/lib/data";

// Selalu ambil data terbaru — jangan bekukan profil tokoh
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const person = await getTokohBySlug(params.slug);
  if (!person) return {};
  return { title: person.name, description: person.short_description };
}

export default async function TokohDetailPage({ params }) {
  const person = await getTokohBySlug(params.slug);
  if (!person) notFound();

  const bioParagraphs = (person.full_bio || person.short_description || "")
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-6 text-xs text-brand-secondary">
        <Link href="/" className="hover:text-brand-primary">
          Beranda
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/tokoh" className="hover:text-brand-primary">
          Tokoh KEMUT
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-brand-ink">{person.name}</span>
      </nav>

      <div className="grid gap-0 bg-brand-surfaceLowest shadow-sm md:grid-cols-[320px_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-surfaceHigh md:aspect-auto">
          <Image
            src={person.photo_url}
            alt={person.name}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-10">
          <span className="inline-block bg-brand-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {person.role}
          </span>
          <h1 className="mt-3 font-headline text-[32px] font-black leading-tight text-brand-ink md:text-[42px]">
            {person.name}
          </h1>
          {person.short_description && (
            <p className="mt-3 max-w-xl text-[16px] italic leading-relaxed text-brand-secondary">
              {person.short_description}
            </p>
          )}

          <div className="prose-kemut mt-6 max-w-2xl border-t border-brand-outlineVariant/40 pt-6">
            {bioParagraphs.length > 0 ? (
              bioParagraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p>Belum ada biografi lengkap untuk tokoh ini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}