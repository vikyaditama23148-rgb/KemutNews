import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createAgendaAction } from "@/lib/admin/actions";
import AgendaFormAdmin from "@/components/admin/AgendaFormAdmin";

export const metadata = { title: "Tambah Agenda" };

export default function NewAgendaPage({ searchParams }) {
  return (
    <div>
      <Link href="/admin/agenda" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Agenda
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Tambah Agenda Baru</h1>

      <AgendaFormAdmin action={createAgendaAction} errorMessage={searchParams?.error} />
    </div>
  );
}