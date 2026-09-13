import { getGalleryItems } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";

export const dynamic = "force-dynamic";
export const metadata = { title: "Galeri" };

export default async function GaleriPage() {
  const items = await getGalleryItems();

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Galeri</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Lembar Foto &amp; Arsip Warga
          </span>
        </div>
        <h1 className="font-headline text-[30px] font-black leading-tight tracking-tight text-brand-ink md:text-[42px]">
          KEMUT Moments
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-brand-secondary">
          Dokumentasi foto perjalanan dan kebersamaan keluarga besar KEMUT.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-brand-secondary">Belum ada foto di galeri.</p>
      ) : (
        <GalleryGrid items={items} />
      )}
    </div>
  );
}