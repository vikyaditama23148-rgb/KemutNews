import SectionHeading from "./SectionHeading";
import PersonCard from "./PersonCard";

export default function TokohSection({ tokoh }) {
  if (!tokoh || tokoh.length === 0) return null;

  return (
    <section className="w-full">
      <SectionHeading title="Tokoh Penggerak KEMUT" href="/tokoh" />
      <div className="grid grid-cols-2 gap-6 bg-brand-surfaceLowest p-6 shadow-sm md:grid-cols-4">
        {tokoh.slice(0, 4).map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </section>
  );
}