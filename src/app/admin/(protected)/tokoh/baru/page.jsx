import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createTokohAction } from "@/lib/admin/actions";
import TokohForm from "@/components/admin/TokohForm";

export const metadata = { title: "Tambah Tokoh" };

export default function NewTokohPage({ searchParams }) {
  return (
    <div>
      <Link href="/admin/tokoh" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Tokoh
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Tambah Tokoh Baru</h1>

      <TokohForm action={createTokohAction} errorMessage={searchParams?.error} />
    </div>
  );
}