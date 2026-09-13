import { Facebook, Instagram, Youtube } from "lucide-react";

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
    <div className="hidden h-9 w-full items-center justify-between bg-brand-surfaceLow px-4 text-[11px] font-bold uppercase tracking-wide text-brand-inkVariant md:flex md:px-8">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 font-semibold normal-case text-brand-ink">
          {todayLabel()}
        </span>
        <span className="text-brand-outlineVariant">|</span>
        <span className="tracking-wider">Edisi Digital KEMUT</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 pr-3 text-brand-inkVariant">
          <a href="/tentang" className="normal-case transition-colors hover:text-brand-primary">
            Tentang KEMUT
          </a>
          <span className="text-brand-outlineVariant">|</span>
          <a href="/kontak" className="normal-case transition-colors hover:text-brand-primary">
            Kontak Redaksi
          </a>
        </div>
        <div className="flex items-center gap-2.5 border-l border-brand-outlineVariant pl-3">
          <a href="#" aria-label="Facebook" className="transition-colors hover:text-brand-primary">
            <Facebook size={13} strokeWidth={1.75} />
          </a>
          <a href="#" aria-label="Instagram" className="transition-colors hover:text-brand-primary">
            <Instagram size={13} strokeWidth={1.75} />
          </a>
          <a href="#" aria-label="Youtube" className="transition-colors hover:text-brand-primary">
            <Youtube size={13} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </div>
  );
}