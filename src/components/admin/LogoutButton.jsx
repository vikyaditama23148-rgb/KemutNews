"use client";

import { LogOut } from "lucide-react";
import { signOutAction } from "@/lib/admin/actions";

export default function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="mt-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-cream/60 transition hover:text-gold"
      >
        <LogOut size={14} strokeWidth={1.75} />
        Keluar
      </button>
    </form>
  );
}
