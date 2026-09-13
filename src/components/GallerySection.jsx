import SectionHeading from "./SectionHeading";
import GalleryGrid from "./GalleryGrid";

export default function GallerySection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full">
      <SectionHeading title="KEMUT Moments" subtitle="Galeri Fotojurnalistik" href="/galeri" />
      <GalleryGrid items={items} compact />
    </section>
  );
}