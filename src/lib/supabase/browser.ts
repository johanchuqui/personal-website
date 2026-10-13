import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

// Client for code running in the browser (used by the admin image uploader).
// It uses the logged-in admin's session cookie, and storage RLS rules decide
// what it may do. Only public (NEXT_PUBLIC_) values can be used here.
export function createBrowserSupabase() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
