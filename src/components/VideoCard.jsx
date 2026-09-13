import Image from "next/image";
import { Play } from "lucide-react";
import { formatDuration } from "@/lib/format";

export default function VideoCard({ video, size = "small" }) {
  const large = size === "large";
  return (
    <a href={video.video_url || "#"} className="group block" target="_blank" rel="noreferrer">
      <div className="relative aspect-video overflow-hidden bg-brand-surfaceContainer">
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          sizes={large ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 280px, 45vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`flex items-center justify-center bg-brand-primary text-white shadow-lg transition-transform group-hover:scale-110 ${
              large ? "h-16 w-16" : "h-10 w-10"
            }`}
          >
            <Play size={large ? 26 : 16} fill="currentColor" className="ml-0.5" />
          </span>
        </div>
        {video.duration_seconds && (
          <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 text-[11px] font-medium text-white">
            {formatDuration(video.duration_seconds)}
          </span>
        )}
      </div>
      <div className="mt-3 bg-brand-surfaceLowest p-3 shadow-sm">
        {video.category && (
          <span className="text-[11px] font-bold uppercase tracking-wide text-brand-primary">{video.category}</span>
        )}
        <h3
          className={`mt-1 line-clamp-2 font-headline font-bold leading-snug text-brand-ink group-hover:text-brand-primary ${
            large ? "text-[20px] md:text-[24px]" : "text-[14px]"
          }`}
        >
          {video.title}
        </h3>
      </div>
    </a>
  );
}