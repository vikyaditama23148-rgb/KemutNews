import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeading({ title, subtitle, href, hrefLabel = "Lihat Semua" }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 bg-brand-surfaceLow px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 shrink-0 bg-brand-primary" />
        <h2 className="font-headline text-[18px] font-bold uppercase leading-6 tracking-tight text-brand-ink">
          {title}
        </h2>
        {subtitle && <span className="hidden text-xs text-brand-secondary sm:inline">— {subtitle}</span>}
      </div>
      {href && (
        <Link
          href={href}
          className="group hidden shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-primary sm:flex"
        >
          {hrefLabel}
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}