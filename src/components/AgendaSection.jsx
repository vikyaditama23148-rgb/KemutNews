import SectionHeading from "./SectionHeading";
import AgendaCard from "./AgendaCard";

export default function AgendaSection({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="container-editorial py-14 md:py-20">
      <SectionHeading title="Agenda KEMUT" href="/agenda" />
      <div className="mx-auto max-w-2xl">
        {items.slice(0, 4).map((item, i) => (
          <AgendaCard key={`${item.title}-${i}`} item={item} />
        ))}
      </div>
    </section>
  );
}
