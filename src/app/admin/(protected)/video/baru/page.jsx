import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createVideoAction } from "@/lib/admin/actions";
import VideoForm from "@/components/admin/VideoForm";

export const metadata = { title: "Tambah Video" };

export default function NewVideoPage({ searchParams }) {
  return (
    <div>
      <Link href="/admin/video" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Video
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Tambah Video Baru</h1>

      <VideoForm action={createVideoAction} errorMessage={searchParams?.error} />
    </div>
  );
}