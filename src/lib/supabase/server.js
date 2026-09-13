import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Used inside Server Components, Route Handlers, and Server Actions.
// Reads/writes the Supabase auth session via Next.js cookies().
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: {
        fetch: (url, options = {}) => fetch(url, { ...options, cache: "no-store" }),
      },
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component during render, where
            // cookies can't be mutated. Safe to ignore — middleware.js below
            // handles refreshing the session on every request instead.
          }
        },
      },
    }
  );
}