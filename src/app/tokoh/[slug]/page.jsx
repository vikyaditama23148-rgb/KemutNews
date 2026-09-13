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

  return (
    <div className="container-editorial py-10 md:py-14">
      <nav className="mb-8 text-xs text-stone">
        <Link href="/tokoh" className="hover:text-gold-deep">
          Tokoh KEMUT
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">{person.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-[300px_1fr] md:gap-14">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-ink">
          <Image src={person.photo_url} alt={person.name} fill sizes="300px" className="object-cover" />
        </div>
        <div>
          <span className="eyebrow">{person.role}</span>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
            {person.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone">
            {person.full_bio || person.short_description}
          </p>
        </div>
      </div>
    </div>
  );
}