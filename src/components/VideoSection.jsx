import SectionHeading from "./SectionHeading";
import VideoCard from "./VideoCard";

export default function VideoSection({ videos }) {
  if (!videos || videos.length === 0) return null;

  const featured = videos.find((v) => v.is_featured) || videos[0];
  const rest = videos.filter((v) => v !== featured).slice(0, 3);

  return (
    <section className="bg-cream-soft py-14 md:py-20">
      <div className="container-editorial">
        <SectionHeading title="KEMUT Video" href="/kategori/video" />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <VideoCard video={featured} size="large" />
          <div className="flex flex-col gap-6">
            {rest.map((video, i) => (
              <VideoCard key={`${video.title}-${i}`} video={video} size="small" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
