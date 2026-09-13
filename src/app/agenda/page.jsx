import { getAgendaItems } from "@/lib/data";
import AgendaCard from "@/components/AgendaCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const items = await getAgendaItems();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Agenda</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Direktori Kegiatan Warga
          </span>
        </div>
        <h1 className="font-headline text-[30px] font-black leading-tight tracking-tight text-brand-ink md:text-[42px]">
          Agenda KEMUT
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-brand-secondary">
          Jadwal pertemuan, kegiatan sosial, dan agenda keluarga besar KEMUT yang akan datang.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-brand-secondary">Belum ada agenda mendatang.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <AgendaCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}