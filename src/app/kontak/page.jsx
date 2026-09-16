import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";

export const metadata = {
  title: "Kontak",
  description: "Hubungi KEMUTNEWS untuk pertanyaan, kritik, saran, atau kontribusi cerita.",
};

const CHANNELS = [
  { icon: Mail, label: "Email", value: "kemutgroup@gmail.com", href: "mailto:kemutgroup@gmail.com" },
  { icon: Phone, label: "WhatsApp", value: "+62 823-3727-5370", href: "https://wa.me/6282337275370" },
  { icon: MapPin, label: "Sekretariat", value: "Sekretariat KEMUT, Jl Kapten Tesna No 21 Pajagalan", href: null },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "@kemut_official23" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "Youtube", href: "@KemutTube" },
];

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      <nav className="mb-4 text-xs text-brand-secondary">
        <span className="text-brand-ink">Beranda / Kontak Sekretariat</span>
      </nav>

      <div className="mb-8 border-b-2 border-brand-primary pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-brand-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
            Saluran Resmi &amp; Pelayanan Publik
          </span>
        </div>
        <h1 className="font-headline text-[28px] font-black leading-tight tracking-tight text-brand-ink md:text-[38px]">
          Hubungi Kami
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-brand-secondary">
          Ada pertanyaan, kritik, saran, atau cerita yang ingin dibagikan? Kami senang mendengarnya.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-brand-ink">
            Saluran Kontak
          </h2>
          <div className="flex flex-col gap-3">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const content = (
                <div className="flex items-start gap-3 bg-brand-surfaceLowest p-4 shadow-sm transition hover:bg-brand-surfaceLow">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand-primary/10 text-brand-primary">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-brand-secondary">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-brand-ink">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {content}
                </a>
              ) : (
                <div key={c.label}>{content}</div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-brand-ink">
            Ikuti Media Sosial
          </h2>
          <div className="flex gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center border border-brand-outlineVariant text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              );
            })}
          </div>

          <div className="mt-6 bg-brand-surfaceLow p-6">
            <h3 className="font-headline text-base font-bold text-brand-ink">Jam Layanan</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-secondary">
              Senin–Jumat, 09.00–17.00 WIB. Pesan di luar jam tersebut akan kami balas pada hari
              kerja berikutnya.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-brand-secondary/70">
        Catatan: nomor, alamat, dan tautan sosial media di atas sebagai informasi tambahan<code> Ketua Redaksi Viky Aditama</code>.
      </p>
    </div>
  );
}