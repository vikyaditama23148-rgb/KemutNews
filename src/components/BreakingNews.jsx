import Link from "next/link";
import { getHomepageFeed } from "@/lib/data";

export default async function BreakingNews() {
  const { breaking } = await getHomepageFeed();
  const items = breaking && breaking.length > 0 ? breaking : [];

  if (items.length === 0) return null;

  // duplicate the list so the CSS marquee loop is seamless
  const loop = [...items, ...items];

  return (
    <div className="border-b border-ink/10 bg-ink text-cream">
      <div className="container-editorial flex items-center gap-4 py-2.5">
        <span className="flex shrink-0 items-center gap-1.5 rounded-sm bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
          Terkini
        </span>
        <div className="scroll-thin overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
            {loop.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/artikel/${item.slug}`}
                className="text-[13px] text-cream/80 transition hover:text-gold"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
