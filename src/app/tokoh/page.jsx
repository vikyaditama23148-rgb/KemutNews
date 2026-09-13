import { getTokohList } from "@/lib/data";
import PersonCard from "@/components/PersonCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Tokoh KEMUT" };

export default async function TokohPage() {
  const tokoh = await getTokohList();

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Tokoh KEMUT</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Dokumentasi Figur Komunitas
          </span>
        </div>
        <h1 className="font-headline text-[30px] font-black uppercase leading-tight tracking-tight text-brand-ink md:text-[42px]">
          Tokoh Penggerak KEMUT
        </h1>
        <p className="mt-2 max-w-xl text-[14px] text-brand-secondary">
          Mengenal sosok-sosok inspiratif dan tokoh penting yang mendedikasikan diri untuk keluarga
          besar KEMUT.
        </p>
      </div>

      {tokoh.length === 0 ? (
        <p className="py-16 text-center text-brand-secondary">Belum ada profil tokoh.</p>
      ) : (
        <div className="grid grid-cols-2 gap-8 bg-brand-surfaceLowest p-6 shadow-sm md:grid-cols-4">
          {tokoh.map((person) => (
            <PersonCard key={person.slug} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}