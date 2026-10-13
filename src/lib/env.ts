// Reads environment variables and fails with a clear message if one is
// missing, instead of a confusing error deep inside a library.
//
// NEXT_PUBLIC_ variables must be written out in full (process.env.NEXT_PUBLIC_X)
// so Next.js can inline them into browser code; a dynamic lookup won't work.

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in (see README).`,
    );
  }
  return value;
}

export function supabaseUrl() {
  return required(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
}

export function supabasePublishableKey() {
  return required(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
