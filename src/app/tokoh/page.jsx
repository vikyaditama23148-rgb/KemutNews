import { getTokohList } from "@/lib/data";
import PersonCard from "@/components/PersonCard";

export const metadata = { title: "Tokoh KEMUT" };

export default async function TokohPage() {
  const tokoh = await getTokohList();

  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Profil</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Tokoh KEMUT
        </h1>
        <p className="mt-2 max-w-xl text-stone">
          Profil dan kisah anggota serta tokoh penting keluarga besar KEMUT.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {tokoh.map((person) => (
          <PersonCard key={person.slug} person={person} />
        ))}
      </div>
    </div>
  );
}
