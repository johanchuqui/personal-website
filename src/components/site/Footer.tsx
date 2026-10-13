import { cacheLife } from "next/cache";
import { site } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

// Next.js needs to know how long a time-based value may be cached so the page
// can stay static. The year is recomputed at most once a day.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <p className="text-muted font-mono text-xs">
          © <CurrentYear /> {site.name} · built with Next.js
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
