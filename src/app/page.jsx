import HeroNews from "@/components/HeroNews";
import NewsList from "@/components/NewsList";
import TrendingList from "@/components/TrendingList";
import CategorySection from "@/components/CategorySection";
import CommunitySpotlight from "@/components/CommunitySpotlight";
import TokohSection from "@/components/TokohSection";
import GallerySection from "@/components/GallerySection";
import VideoSection from "@/components/VideoSection";
import AgendaSection from "@/components/AgendaSection";
import NewsletterCTA from "@/components/NewsletterCTA";

import { getHomepageFeed, getArticlesByCategory, getTokohList, getGalleryItems, getVideos, getAgendaItems } from "@/lib/data";

export default async function HomePage() {
  const [{ featured, supporting, latest, mostRead }, kegiatan, tokoh, gallery, videos, agenda] =
    await Promise.all([
      getHomepageFeed(),
      getArticlesByCategory("kegiatan"),
      getTokohList(),
      getGalleryItems(),
      getVideos(),
      getAgendaItems(),
    ]);

  const spotlight = latest.find((a) => a.category?.slug === "cerita") || latest[1];

  return (
    <>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-6 md:px-8">
        <HeroNews featured={featured} supporting={supporting} />
        <NewsList articles={latest} />
      </div>

      <TrendingList articles={mostRead} />

      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-8 md:px-8">
        <CategorySection title="Kegiatan KEMUT" articles={kegiatan} href="/kategori/kegiatan" />
        <CommunitySpotlight article={spotlight} />
        <TokohSection tokoh={tokoh} />
        <GallerySection items={gallery} />
      </div>

      <div className="px-4 py-8 md:px-8">
        <div className="mx-auto max-w-[1440px]">
          <VideoSection videos={videos} />
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8">
        <AgendaSection items={agenda} />
      </div>

      <NewsletterCTA />
    </>
  );
}