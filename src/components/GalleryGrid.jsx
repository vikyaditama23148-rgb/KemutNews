import Image from "next/image";
import { Expand } from "lucide-react";

export default function GalleryGrid({ items, compact = false }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
      {items.slice(0, compact ? 8 : items.length).map((item, i) => (
        <figure
          key={`${item.image_url}-${i}`}
          className="group relative block aspect-square overflow-hidden bg-brand-surfaceContainer"
        >
          <Image
            src={item.image_url}
            alt={item.caption || "KEMUT Moments"}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-black/0 p-3 opacity-0 transition-all duration-300 group-hover:bg-black/60 group-hover:opacity-100">
            <Expand size={14} className="mb-1.5 text-brand-primaryContainer" strokeWidth={2} />
            <figcaption className="text-[11px] font-medium text-white">{item.caption}</figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}