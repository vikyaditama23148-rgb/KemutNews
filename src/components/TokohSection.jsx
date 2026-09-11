import SectionHeading from "./SectionHeading";
import PersonCard from "./PersonCard";

export default function TokohSection({ tokoh }) {
  if (!tokoh || tokoh.length === 0) return null;

  return (
    <section className="container-editorial py-14 md:py-20">
      <SectionHeading title="Tokoh KEMUT" href="/tokoh" />
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {tokoh.slice(0, 4).map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </section>
  );
}
