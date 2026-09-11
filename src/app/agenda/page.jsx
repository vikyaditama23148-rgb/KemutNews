import { getAgendaItems } from "@/lib/data";
import AgendaCard from "@/components/AgendaCard";

export const metadata = { title: "Agenda" };

export default async function AgendaPage() {
  const items = await getAgendaItems();

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Agenda</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Agenda KEMUT
        </h1>
        <p className="mt-2 max-w-xl text-stone">
          Kegiatan dan pertemuan yang akan datang dari keluarga besar KEMUT.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-stone">Belum ada agenda mendatang.</p>
      ) : (
        <div className="mx-auto max-w-2xl">
          {items.map((item, i) => (
            <AgendaCard key={`${item.title}-${i}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
