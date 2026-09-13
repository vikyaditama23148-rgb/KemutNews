import SectionHeading from "./SectionHeading";
import VideoCard from "./VideoCard";

export default function VideoSection({ videos }) {
  if (!videos || videos.length === 0) return null;

  const featured = videos.find((v) => v.is_featured) || videos[0];
  const rest = videos.filter((v) => v !== featured).slice(0, 3);

  return (
    <section className="w-full bg-brand-ink p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 bg-brand-primaryContainer" />
        <h2 className="font-headline text-[18px] font-bold uppercase tracking-tight text-white">
          KEMUT Video — Liputan Dokumenter
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <VideoCard video={featured} size="large" />
        <div className="flex flex-col gap-4">
          {rest.map((video, i) => (
            <VideoCard key={`${video.title}-${i}`} video={video} size="small" />
          ))}
        </div>
      </div>
    </section>
  );
}