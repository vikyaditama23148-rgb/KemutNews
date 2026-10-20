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
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LANGUAGE, LOGO_URL, SOCIAL_LINKS, EDITOR_IN_CHIEF } from "@/lib/siteConfig";

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

  // Data terstruktur: memperjelas identitas KEMUTNEWS sebagai satu entitas media
  // bagi Google dan mesin AI (nama, logo, deskripsi, pemimpin redaksi, akun resmi).
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        logo: { "@type": "ImageObject", url: LOGO_URL, width: 512, height: 512 },
        inLanguage: SITE_LANGUAGE,
        employee: {
          "@type": "Person",
          name: EDITOR_IN_CHIEF.name,
          jobTitle: EDITOR_IN_CHIEF.role,
          url: `${SITE_URL}${EDITOR_IN_CHIEF.path}`,
        },
        ...(SOCIAL_LINKS.length ? { sameAs: SOCIAL_LINKS } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: SITE_LANGUAGE,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/cari?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
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