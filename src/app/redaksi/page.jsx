import { Mail } from "lucide-react";

export const metadata = {
  title: "Redaksi",
  description: "Susunan redaksi dan tim di balik KEMUTNEWS.",
};

const TEAM = [
  {
    name: "Viky Aditama",
    role: "Redaktur KEMUTNEWS",
    desc: "Bertanggung jawab atas arah editorial dan kualitas setiap kabar yang dipublikasikan.",
  },
  {
    name: "Nadila Maulidina",
    role: "Jurnalis Komunitas",
    desc: "Fokus meliput cerita, human interest, dan kisah personal anggota KEMUT.",
  },
  {
    name: "Yolan Neva Saputra",
    role: "Kontributor",
    desc: "Meliput kegiatan, agenda, dan dokumentasi acara keluarga besar KEMUT.",
  },
];

export default function RedaksiPage() {
  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Redaksi</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Susunan Redaksi KEMUTNEWS
        </h1>
        <p className="mt-2 max-w-xl text-stone">
          Tim yang mengelola dan menjaga kualitas kabar keluarga besar KEMUT.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="grid gap-6 sm:grid-cols-2">
          {TEAM.map((person) => (
            <div key={person.name} className="rounded-card border border-cream-line bg-white p-6">
              <h3 className="font-display text-lg font-bold text-ink">{person.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-gold-deep">
                {person.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-stone">{person.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-card border border-cream-line bg-cream-soft p-7">
          <h2 className="font-display text-lg font-bold text-ink">Ingin Berkontribusi?</h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone">
            KEMUTNEWS terbuka untuk menerima cerita, foto, maupun laporan kegiatan dari seluruh
            anggota keluarga besar KEMUT. Silakan hubungi redaksi melalui kontak di bawah ini.
          </p>
          <a
            href="mailto:redaksi@kemutnews.id"
            className="mt-4 inline-flex items-center gap-2 rounded-card bg-ink px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
          >
            <Mail size={15} /> kemutgroup@gmail.com
          </a>
        </div>

        <p className="mt-6 text-xs text-stone-light">
          Catatan: susunan redaksi di atas bisa diperbarui sesuai kebutuhan — atas persetujuan ketua redaksi <code>Viky Aditama</code>.
        </p>
      </div>
    </div>
  );
}