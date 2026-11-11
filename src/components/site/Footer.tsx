import { site } from "@/lib/site";
import { SocialLinks } from "./SocialLinks";

// The site is built as static files, so the year is filled in at build time
// (every deploy refreshes it).
function CurrentYear() {
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
