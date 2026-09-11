import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getAdminVideoById } from "@/lib/admin/data";
import { updateVideoAction } from "@/lib/admin/actions";
import VideoForm from "@/components/admin/VideoForm";

export const metadata = { title: "Edit Video" };

export default async function EditVideoPage({ params, searchParams }) {
  let video;
  try {
    video = await getAdminVideoById(params.id);
  } catch {
    notFound();
  }
  if (!video) notFound();

  const updateWithId = updateVideoAction.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/video" className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-stone hover:text-ink">
        <ArrowLeft size={14} /> Kembali ke Daftar Video
      </Link>
      <h1 className="mb-7 font-display text-2xl font-bold text-ink">Edit Video</h1>

      <VideoForm action={updateWithId} initialData={video} errorMessage={searchParams?.error} />
    </div>
  );
}