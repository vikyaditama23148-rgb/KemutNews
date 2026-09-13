import SectionHeading from "./SectionHeading";
import AgendaCard from "./AgendaCard";

export default function AgendaSection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full">
      <SectionHeading title="Agenda & Jadwal Kegiatan Warga" href="/agenda" />
      <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-2">
        {items.slice(0, 4).map((item, i) => (
          <AgendaCard key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}