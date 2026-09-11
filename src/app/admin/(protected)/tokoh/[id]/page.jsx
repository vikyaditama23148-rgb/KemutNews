import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminTokohById } from "@/lib/admin/data";
import { updateTokohAction } from "@/lib/admin/actions";
import TokohForm from "@/components/admin/TokohForm";

export const metadata = { title: "Edit Tokoh" };

export default async function EditTokohPage({ params, searchParams }) {
  let tokoh;
  try {
    tokoh = await getAdminTokohById(params.id);
  } catch {
    notFound();
  }
  if (!tokoh) notFound();

  const updateWithId = updateTokohAction.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/tokoh" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Tokoh
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Edit Tokoh</h1>

      <TokohForm action={updateWithId} initialData={tokoh} errorMessage={searchParams?.error} />
    </div>
  );
}
