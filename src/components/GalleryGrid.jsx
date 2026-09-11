import Image from "next/image";
import { Expand } from "lucide-react";

export default function GalleryGrid({ items, compact = false }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
      {items.slice(0, compact ? 6 : items.length).map((item, i) => (
        <figure
          key={`${item.image_url}-${i}`}
          className="group relative block break-inside-avoid overflow-hidden rounded-card"
        >
          <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? "4/5" : "4/3" }}>
            <Image
              src={item.image_url}
              alt={item.caption || "KEMUT Moments"}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-ink/0 p-4 opacity-0 transition-all duration-300 group-hover:bg-ink/60 group-hover:opacity-100">
              <Expand size={16} className="mb-2 text-gold" strokeWidth={1.75} />
              <figcaption className="text-xs font-medium text-cream">{item.caption}</figcaption>
            </div>
          </div>
        </figure>
      ))}
    </div>
  );
}
