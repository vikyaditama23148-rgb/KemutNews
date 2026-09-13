import Link from "next/link";
import { getHomepageFeed } from "@/lib/data";

export default async function BreakingNews() {
  const { breaking } = await getHomepageFeed();
  const items = breaking && breaking.length > 0 ? breaking : [];

  if (items.length === 0) return null;

  const loop = [...items, ...items];

  return (
    <section className="flex w-full items-center overflow-hidden bg-brand-primary px-4 py-1.5 shadow-sm md:px-8">
      <div className="flex shrink-0 items-center gap-3 pr-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="bg-brand-primaryContainer px-2 py-0.5 text-[11px] font-black uppercase tracking-widest text-white">
          Breaking News
        </span>
      </div>
      <div className="relative w-full flex-1 overflow-hidden whitespace-nowrap">
        <div className="inline-flex w-max animate-marquee gap-8 text-[13px] font-medium tracking-wide text-white">
          {loop.map((item, i) => (
            <Link key={`${item.slug}-${i}`} href={`/artikel/${item.slug}`} className="inline-flex items-center gap-2 hover:underline">
              <span className="text-brand-onPrimaryContainer">■</span> {item.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}