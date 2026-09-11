import { getGalleryItems } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata = { title: "Galeri" };

export default async function GaleriPage() {
  const items = await getGalleryItems();

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Galeri</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          KEMUT Moments
        </h1>
        <p className="mt-2 max-w-xl text-stone">
          Dokumentasi foto perjalanan dan kebersamaan keluarga besar KEMUT.
        </p>
      </div>

      <GalleryGrid items={items} />
    </div>
  );
}
