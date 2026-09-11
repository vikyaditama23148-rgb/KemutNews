import { Megaphone } from "lucide-react";
import { formatDateLong } from "@/lib/format";

export const metadata = {
  title: "Pengumuman",
  description: "Pengumuman resmi dari pengurus keluarga besar KEMUT.",
};

// Data contoh — ganti/tambah sesuai kebutuhan, atau hubungkan ke Supabase
// nanti dengan pola yang sama seperti Agenda bila ingin dikelola dari Admin Panel.
const ANNOUNCEMENTS = [
  {
    title: "Pembukaan Pendaftaran Anggota Baru Keluarga Besar KEMUT",
    date: "2026-09-01T09:00:00Z",
    content:
      "Pengurus KEMUT membuka pendaftaran bagi anggota keluarga yang belum terdaftar secara resmi. Pendaftaran dapat dilakukan melalui sekretariat atau menghubungi kontak redaksi.",
  },
  {
    title: "Jadwal Libur Sekretariat KEMUT",
    date: "2026-08-20T09:00:00Z",
    content:
      "Sekretariat KEMUT akan tutup sementara pada tanggal-tanggal tertentu menyesuaikan hari libur nasional. Informasi lebih lanjut dapat dilihat di halaman Agenda.",
  },
  {
    title: "Perubahan Jadwal Pertemuan Rutin Bulanan",
    date: "2026-08-05T09:00:00Z",
    content:
      "Pertemuan rutin bulanan keluarga besar KEMUT mengalami penyesuaian jadwal. Pantau terus halaman Agenda untuk informasi terbaru.",
  },
];

export default function PengumumanPage() {
  return (
    <div className="container-editorial py-10 md:py-14">
      <div className="mb-10 border-b border-cream-line pb-6">
        <span className="eyebrow">Pengumuman</span>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-[42px]">
          Pengumuman Resmi
        </h1>
        <p className="mt-2 max-w-xl text-stone">
          Informasi dan pengumuman resmi dari pengurus keluarga besar KEMUT.
        </p>
      </div>

      <div className="mx-auto max-w-2xl space-y-5">
        {ANNOUNCEMENTS.map((item, i) => (
          <div key={i} className="rounded-card border border-cream-line bg-white p-6">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold-deep">
                <Megaphone size={16} strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs font-medium text-stone-light">{formatDateLong(item.date)}</p>
                <h2 className="mt-1 font-display text-lg font-bold text-ink">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-stone">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-xs text-stone-light">
        Catatan: pengumuman di atas hanya formalitas{" "}
        <code>Viky Aditama - Ketua Redaksi</code> (array <code>ANNOUNCEMENTS</code>).
      </p>
    </div>
  );
}