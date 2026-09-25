import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Redaksi",
  description: "Susunan redaksi dan tim di balik KEMUTNEWS.",
};

const TEAM = [
  {
    name: "Viky Aditama",
    role: "Pimpinan Redaksi",
    desc: "Bertanggung jawab penuh atas arah editorial dan standar jurnalistik KEMUTNEWS.",
    href: "/redaksi/pimpinan-redaksi",
  },
  {
    name: "Nadila Maulidina",
    role: "Redaktur KEMUTNEWS",
    desc: "Bertanggung jawab atas arah editorial dan kualitas setiap kabar yang dipublikasikan.",
  },
  {
    name: "Nefita Putri Mulyadi",
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
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Struktur Redaksi</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Lembaga Pers Independen KEMUT Indonesia
          </span>
        </div>
        <h1 className="font-headline text-[28px] font-black leading-tight tracking-tight text-brand-ink md:text-[38px]">
          Susunan Redaksi KEMUTNEWS
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-brand-secondary">
          Tim yang mengelola dan menjaga kualitas kabar keluarga besar KEMUT dan berita terkini lainnya.
        </p>
      </div>

      <div className="grid gap-px bg-brand-outlineVariant/30 sm:grid-cols-3">
          {TEAM.map((person) => (
            <div key={person.name} className="bg-brand-surfaceLowest p-6">
              {person.href ? (
                <Link href={person.href}>
                  <h3 className="font-headline text-lg font-bold text-brand-ink hover:text-brand-primary">
                    {person.name}
                  </h3>
                </Link>
              ) : (
                <h3 className="font-headline text-lg font-bold text-brand-ink">{person.name}</h3>
              )}
              <p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-brand-primary">
                {person.role}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-brand-secondary">{person.desc}</p>
            </div>
          ))}
        </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 bg-brand-ink p-7 text-white sm:flex-row sm:items-center">
        <div>
          <h2 className="font-headline text-lg font-bold">Ingin Berkontribusi?</h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/60">
            KEMUTNEWS terbuka untuk menerima cerita, foto, maupun laporan kegiatan dari seluruh
            anggota keluarga besar KEMUT.
          </p>
        </div>
        <a
          href="mailto:kemutgroup@gmail.com"
          className="flex shrink-0 items-center gap-2 bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand-primaryContainer"
        >
          <Mail size={15} /> kemutgroup@gmail.com
        </a>
      </div>

      <p className="mt-6 text-xs text-brand-secondary/70">
        Catatan: susunan redaksi di atas bisa diperbarui sesuai kebutuhan atas persetujuan Ketua Redaksi{" "}
        <code>Viky Aditama</code>.
      </p>
    </div>
  );
}