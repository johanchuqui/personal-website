import { createClient } from "@supabase/supabase-js";
import { supabasePublishableKey, supabaseUrl } from "@/lib/env";
import type { Database } from "./database.types";

// Read-only client for PUBLIC pages (home, blog, projects).
// It doesn't use cookies, so it always acts as an anonymous visitor: the
// database's RLS rules mean it can only ever see published content. Not
// touching cookies also lets these pages be cached and served fast.
export function createPublicClient() {
  return createClient<Database>(supabaseUrl(), supabasePublishableKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
