"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (signInError) {
      setError("Email atau password salah. Coba lagi.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-display text-3xl font-bold text-cream">
            KEMUT<span className="text-gold">NEWS</span>
          </span>
          <p className="mt-2 text-xs uppercase tracking-wide text-cream/40">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-card border border-cream/10 bg-ink-soft p-7">
          <div className="mb-5 flex items-center justify-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10">
              <Lock size={18} className="text-gold" strokeWidth={1.75} />
            </span>
          </div>

          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream/60">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-card border border-cream/15 bg-transparent px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="admin@kemutnews.id"
          />

          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-cream/60">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 w-full rounded-card border border-cream/15 bg-transparent px-3.5 py-2.5 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none"
            placeholder="••••••••"
          />

          {error && <p className="mb-3 text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-card bg-gold py-2.5 text-xs font-bold uppercase tracking-wide text-ink transition hover:bg-gold-bright disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-cream/30">
          Akses terbatas untuk redaksi KEMUTNEWS. Hubungi admin sistem bila belum punya akun.
        </p>
      </div>
    </div>
  );
}
