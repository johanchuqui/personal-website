// ⚠️ SERVER ONLY. This client uses the SECRET key, which BYPASSES all
// row-level security. Use it only for the few things visitors must never be
// able to do directly (saving contact messages after spam checks).
//
// `import "server-only"` makes the build fail if this file is ever imported
// from browser code, so the secret key can't leak into the bundle.
import "server-only";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/env";
import type { Database } from "./database.types";

export function createAdminSupabase() {
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing environment variable SUPABASE_SECRET_KEY.");
  }
  return createClient<Database>(supabaseUrl(), secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
