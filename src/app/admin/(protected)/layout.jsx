import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin" };

export default async function AdminLayout({ children }) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center text-cream">
        <div className="max-w-md">
          <h1 className="font-display text-2xl font-bold">Supabase Belum Dikonfigurasi</h1>
          <p className="mt-3 text-sm text-cream/60">
            Admin panel butuh koneksi Supabase aktif. Isi <code className="text-gold">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            dan <code className="text-gold">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> di <code>.env.local</code>, lalu
            jalankan <code>supabase/schema.sql</code> di Supabase SQL Editor.
          </p>
        </div>
      </div>
    );
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware.js already redirects unauthenticated requests, this is a
  // defense-in-depth check in case the layout renders before middleware.
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-cream-soft md:flex-row">
      <AdminSidebar userEmail={user.email} />
      <main className="flex-1 px-5 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  );
}
