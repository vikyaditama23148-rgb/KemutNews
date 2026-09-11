import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminAgendaById } from "@/lib/admin/data";
import { updateAgendaAction } from "@/lib/admin/actions";
import AgendaFormAdmin from "@/components/admin/AgendaFormAdmin";

export const metadata = { title: "Edit Agenda" };

export default async function EditAgendaPage({ params, searchParams }) {
  let item;
  try {
    item = await getAdminAgendaById(params.id);
  } catch {
    notFound();
  }
  if (!item) notFound();

  const updateWithId = updateAgendaAction.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/agenda" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Agenda
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Edit Agenda</h1>

      <AgendaFormAdmin action={updateWithId} initialData={item} errorMessage={searchParams?.error} />
    </div>
  );
}