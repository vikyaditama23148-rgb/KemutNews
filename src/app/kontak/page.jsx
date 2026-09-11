import { Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";

export const metadata = {
  title: "Kontak",
  description: "Hubungi KEMUTNEWS untuk pertanyaan, kritik, saran, atau kontribusi cerita.",
};

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    value: "kemutgroup@gmail.com",
    href: "mailto:kemutgroup@gmail.com",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 823-3727-5370",
    href: "https://wa.me/6282337275370",
  },
  {
    icon: MapPin,
    label: "Sekretariat",
    value: "Sekretariat KEMUT, Pajagalan, Jl Kapten Tesna No 21",
    href: null,
  },
];

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "kemut_official23" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "Youtube", href: "#" },
];

export default function KontakPage() {
  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Kontak</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Hubungi Kami
        </h1>
        <p className="mt-2 max-w-xl text-stone">
          Ada pertanyaan, kritik, saran, atau cerita yang ingin dibagikan? Kami senang mendengarnya.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2">
        <div>
          <h2 className="mb-5 font-display text-lg font-bold text-ink">Saluran Kontak</h2>
          <div className="space-y-4">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              const content = (
                <div className="flex items-start gap-3 rounded-card border border-cream-line bg-white p-4 transition hover:border-gold">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone-light">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-ink">{c.value}</p>
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
          <h2 className="mb-5 font-display text-lg font-bold text-ink">Ikuti Media Sosial</h2>
          <div className="flex gap-3">
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-line text-ink transition hover:border-gold hover:text-gold-deep"
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              );
            })}
          </div>

          <div className="mt-8 rounded-card border border-cream-line bg-cream-soft p-6">
            <h3 className="font-display text-base font-bold text-ink">Jam Layanan</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Senin–Jumat, 09.00–17.00 WIB. Pesan di luar jam tersebut akan kami balas pada hari
              kerja berikutnya.
            </p>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-3xl text-xs text-stone-light">
        Catatan: nomor, alamat, dan tautan sosial media di atas masih data contoh — silakan ganti
        dengan data resmi keluarga besar KEMUT pada file <code>src/app/kontak/page.jsx</code>.
      </p>
    </div>
  );
}