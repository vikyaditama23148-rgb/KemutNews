import SectionHeading from "./SectionHeading";
import GalleryGrid from "./GalleryGrid";

export default function GallerySection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="container-editorial py-14 md:py-20">
      <SectionHeading title="KEMUT Moments" subtitle="Dokumentasi kebersamaan keluarga besar KEMUT" href="/galeri" />
      <GalleryGrid items={items} compact />
    </section>
  );
}
