import Link from "next/link";
import Image from "next/image";

export default function PersonCard({ person }) {
  return (
    <Link href={`/tokoh/${person.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-ink">
        <Image
          src={person.photo_url}
          alt={person.name}
          fill
          sizes="(min-width: 1024px) 300px, 45vw"
          className="object-cover opacity-95 transition-transform duration-500 ease-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-lg font-bold text-cream">{person.name}</h3>
          <p className="text-xs font-semibold uppercase tracking-wide text-gold">{person.role}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone">
        {person.short_description}
      </p>
      <span className="mt-2 inline-block text-xs font-semibold uppercase tracking-wide text-gold-deep">
        Lihat Profil
      </span>
    </Link>
  );
}
