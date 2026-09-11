import Link from "next/link";
import { Plus, Pencil, MapPin, Clock } from "lucide-react";
import { getAdminAgendaList } from "@/lib/admin/data";
import { formatDate } from "@/lib/format";
import DeleteAgendaButton from "@/components/admin/DeleteAgendaButton";

export const metadata = { title: "Kelola Agenda" };

export default async function AdminAgendaPage() {
  const items = await getAdminAgendaList();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Agenda KEMUT</h1>
          <p className="mt-1 text-sm text-stone">{items.length} kegiatan terjadwal.</p>
        </div>
        <Link
          href="/admin/agenda/baru"
          className="flex items-center gap-2 rounded-card bg-ink px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream transition hover:bg-gold hover:text-ink"
        >
          <Plus size={15} /> Tambah Agenda
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="rounded-card border border-cream-line bg-white p-8 text-center text-sm text-stone">
          Belum ada agenda. Klik &ldquo;Tambah Agenda&rdquo; untuk mulai menambahkan.
        </div>
      ) : (
        <div className="overflow-hidden rounded-card border border-cream-line bg-white">
          <ul className="divide-y divide-cream-line">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 p-5">
                <div className="min-w-0">
                  <p className="font-display text-base font-bold text-ink">{item.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone">
                    <span>{formatDate(item.event_date)}</span>
                    {item.event_time && (
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {item.event_time}
                      </span>
                    )}
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {item.location}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <Link
                    href={`/admin/agenda/${item.id}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-ink transition hover:text-gold-deep"
                  >
                    <Pencil size={13} /> Edit
                  </Link>
                  <DeleteAgendaButton id={item.id} title={item.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}