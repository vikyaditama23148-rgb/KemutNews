import Image from "next/image";
import { Play } from "lucide-react";
import { formatDuration } from "@/lib/format";

export default function VideoCard({ video, size = "small" }) {
  const large = size === "large";
  return (
    <a href={video.video_url || "#"} className="group block" target="_blank" rel="noreferrer">
      <div className={`relative overflow-hidden rounded-card ${large ? "aspect-video" : "aspect-video"}`}>
        <Image
          src={video.thumbnail_url}
          alt={video.title}
          fill
          sizes={large ? "(min-width: 1024px) 700px, 100vw" : "(min-width: 1024px) 280px, 45vw"}
          className="object-cover transition-transform duration-500 ease-premium group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-ink/20 transition-colors group-hover:bg-ink/35" />
        <div
          className={`absolute inset-0 flex items-center justify-center`}
        >
          <span
            className={`flex items-center justify-center rounded-full bg-gold/90 text-ink shadow-lg transition-transform group-hover:scale-110 ${
              large ? "h-16 w-16" : "h-11 w-11"
            }`}
          >
            <Play size={large ? 26 : 18} fill="currentColor" className="ml-0.5" />
          </span>
        </div>
        {video.duration_seconds && (
          <span className="absolute bottom-2 right-2 rounded-sm bg-ink/80 px-1.5 py-0.5 text-[11px] font-medium text-cream">
            {formatDuration(video.duration_seconds)}
          </span>
        )}
      </div>
      <div className="mt-3">
        {video.category && <span className="eyebrow">{video.category}</span>}
        <h3
          className={`mt-1 line-clamp-2 font-display font-bold leading-snug text-ink group-hover:text-gold-deep ${
            large ? "text-xl md:text-2xl" : "text-sm"
          }`}
        >
          {video.title}
        </h3>
      </div>
    </a>
  );
}
