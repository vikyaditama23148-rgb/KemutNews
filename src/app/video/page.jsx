import { getVideos } from "@/lib/data";
import VideoCard from "@/components/VideoCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "KEMUT Video" };

export default async function VideoPage() {
  const videos = await getVideos();
  const featured = videos.find((v) => v.is_featured) || videos[0];
  const rest = videos.filter((v) => v !== featured);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Video</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Kanal Dokumentasi Visual
          </span>
        </div>
        <h1 className="font-headline text-[30px] font-black leading-tight tracking-tight text-brand-ink md:text-[42px]">
          KEMUT <span className="text-brand-primary">Video</span>
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-brand-secondary">
          Dokumentasi video kegiatan, cerita, dan momen keluarga besar KEMUT.
        </p>
      </div>

      {videos.length === 0 ? (
        <p className="py-16 text-center text-brand-secondary">Belum ada video.</p>
      ) : (
        <>
          {featured && (
            <div className="mb-10">
              <VideoCard video={featured} size="large" />
            </div>
          )}

          {rest.length > 0 && (
            <>
              <div className="mb-4 border-b border-brand-outlineVariant/40 pb-2">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-brand-secondary">
                  Video Lainnya
                </h2>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((video, i) => (
                  <VideoCard key={`${video.title}-${i}`} video={video} size="small" />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}