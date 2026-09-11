import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ title, subtitle, href, hrefLabel = "Lihat Semua" }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4 border-b border-cream-line pb-4">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink md:text-[28px]">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-stone">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gold-deep sm:flex"
        >
          {hrefLabel}
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
