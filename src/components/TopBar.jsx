import { Instagram, Youtube, Facebook } from "lucide-react";

function todayLabel() {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const d = new Date();
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function TopBar() {
  return (
    <div className="hidden bg-ink text-cream/70 md:block">
      <div className="container-editorial flex h-9 items-center justify-between text-[11px] tracking-wide">
        <p className="uppercase text-cream/60">
          KEMUTNEWS <span className="mx-2 text-gold/60">—</span> Media Informasi Keluarga Besar KEMUT
        </p>
        <div className="flex items-center gap-5">
          <span>{todayLabel()}</span>
          <div className="flex items-center gap-3 text-cream/50">
            <a href="#" aria-label="Instagram KEMUTNEWS" className="transition hover:text-gold">
              <Instagram size={13} strokeWidth={1.75} />
            </a>
            <a href="#" aria-label="Facebook KEMUTNEWS" className="transition hover:text-gold">
              <Facebook size={13} strokeWidth={1.75} />
            </a>
            <a href="#" aria-label="Youtube KEMUTNEWS" className="transition hover:text-gold">
              <Youtube size={13} strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
