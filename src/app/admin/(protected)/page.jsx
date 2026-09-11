import Link from "next/link";
import { Newspaper, Users, Image as ImageIcon, Video, CalendarDays, Plus } from "lucide-react";
import { getAdminStats } from "@/lib/admin/data";

const CARDS = [
  { key: "articles", label: "Artikel", icon: Newspaper },
  { key: "tokoh", label: "Tokoh KEMUT", icon: Users },
  { key: "gallery", label: "Foto Galeri", icon: ImageIcon },
  { key: "videos", label: "Video", icon: Video },
  { key: "agenda", label: "Agenda", icon: CalendarDays },
];

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-stone">Ringkasan konten KEMUTNEWS.</p>
        </div>
        <Link
          href="/admin/artikel/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Artikel Baru
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.key} className="rounded-card border border-cream-line bg-white p-5">
              <Icon size={20} className="text-gold-deep" strokeWidth={1.75} />
              <p className="mt-4 font-display text-3xl font-bold text-ink">{stats[card.key]}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-card border border-cream-line bg-white p-6">
        <h2 className="font-display text-lg font-bold text-ink">Kelola Konten</h2>
        <p className="mt-1 text-sm text-stone">
          Saat ini manajemen penuh (tambah/ubah/hapus) tersedia untuk <strong>Artikel</strong>,{" "}
          <strong>Tokoh KEMUT</strong>, dan <strong>Video</strong> (link + thumbnail). Galeri dan
          Agenda masih dikelola lewat Supabase Table Editor atau <code>supabase/seed.sql</code> —
          silakan minta pengembangan lanjutan bila ingin form khusus untuk itu juga.
        </p>
      </div>
    </div>
  );
}