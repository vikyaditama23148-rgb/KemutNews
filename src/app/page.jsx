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
      <HeroNews featured={featured} supporting={supporting} />
      <NewsList articles={latest} />
      <TrendingList articles={mostRead} />
      <CategorySection title="Kegiatan KEMUT" articles={kegiatan} href="/kategori/kegiatan" />
      <CommunitySpotlight article={spotlight} />
      <TokohSection tokoh={tokoh} />
      <GallerySection items={gallery} />
      <VideoSection videos={videos} />
      <AgendaSection items={agenda} />
      <NewsletterCTA />
    </>
  );
}
