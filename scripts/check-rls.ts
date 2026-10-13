// Security self-test for the live database.
// Connects with ONLY the public (publishable) key — exactly what any visitor
// or attacker has — and tries things that must be blocked.
//
// Run:  npm run db:check
// Every line should say PASS. Re-run after any migration change.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local",
  );
  process.exit(1);
}

const db = createClient(url, key, { auth: { persistSession: false } });
let failures = 0;

function report(ok: boolean, label: string, detail = "") {
  if (!ok) failures++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label}${detail ? `  (${detail})` : ""}`,
  );
}

// A write "is blocked" if it errors OR silently affects zero rows.
function blocked(res: { error: unknown; data: unknown[] | null }) {
  return Boolean(res.error) || (res.data ?? []).length === 0;
}

async function main() {
  const posts = await db.from("posts").select("slug, status");
  report(!posts.error, "can read published posts", posts.error?.message);
  report(
    (posts.data ?? []).every((p) => p.status === "published"),
    "no draft posts visible",
  );

  const projects = await db.from("projects").select("slug, status");
  report(
    !projects.error,
    "can read published projects",
    projects.error?.message,
  );
  report(
    (projects.data ?? []).every((p) => p.status === "published"),
    "no draft projects visible",
  );

  report(
    blocked(
      await db.from("posts").insert({ slug: "rls-test", title: "x" }).select(),
    ),
    "cannot create posts",
  );
  report(
    blocked(
      await db
        .from("posts")
        .update({ title: "hacked" })
        .neq("slug", "")
        .select(),
    ),
    "cannot edit posts",
  );
  report(
    blocked(await db.from("projects").delete().neq("slug", "").select()),
    "cannot delete projects",
  );

  const msgs = await db.from("contact_messages").select("*");
  report(blocked(msgs), "cannot read contact messages");
  report(
    blocked(
      await db
        .from("contact_messages")
        .insert({
          name: "x",
          email: "x@x.co",
          message: "bypassing spam checks",
          ip_hash: "x",
        })
        .select(),
    ),
    "cannot insert contact messages directly (must go through the site)",
  );

  report(
    blocked(await db.from("admins").select("*")),
    "cannot read admins list",
  );
  report(
    blocked(
      await db
        .from("admins")
        .insert({ user_id: "00000000-0000-0000-0000-000000000000" })
        .select(),
    ),
    "cannot add an admin",
  );

  const isAdmin = await db.rpc("is_admin");
  report(
    isAdmin.data === false,
    "is_admin() is false for visitors",
    isAdmin.error?.message,
  );

  const upload = await db.storage
    .from("media")
    .upload(
      `rls-test-${Date.now()}.png`,
      new Blob(["x"], { type: "image/png" }),
    );
  report(Boolean(upload.error), "cannot upload images");

  const list = await db.storage.from("media").list();
  report(
    Boolean(list.error) || (list.data ?? []).length === 0,
    "cannot list stored images",
  );

  console.log(
    failures === 0
      ? "\nAll checks passed ✅"
      : `\n${failures} check(s) FAILED ❌`,
  );
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
