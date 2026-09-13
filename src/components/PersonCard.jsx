import Link from "next/link";
import Image from "next/image";

export default function PersonCard({ person }) {
  return (
    <Link href={`/tokoh/${person.slug}`} className="group flex flex-col items-center text-center">
      <div className="relative aspect-square w-full max-w-[110px] overflow-hidden rounded-full bg-brand-surfaceHigh">
        <Image
          src={person.photo_url}
          alt={person.name}
          fill
          sizes="110px"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      </div>
      <h3 className="mt-3 font-headline text-sm font-bold text-brand-ink group-hover:text-brand-primary">
        {person.name}
      </h3>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-secondary">
        {person.role}
      </p>
    </Link>
  );
}