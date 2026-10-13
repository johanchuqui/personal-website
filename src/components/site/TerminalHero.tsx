import { site } from "@/lib/site";

// The terminal-window intro on the home page. The typing animation is pure
// CSS (see .type-in in globals.css) and is turned off for reduced motion.
export function TerminalHero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="border-border bg-surface overflow-hidden rounded-xl border shadow-sm"
    >
      <div
        aria-hidden="true"
        className="border-border flex items-center gap-1.5 border-b px-4 py-3"
      >
        <span className="size-3 rounded-full bg-red-400/80" />
        <span className="size-3 rounded-full bg-amber-400/80" />
        <span className="size-3 rounded-full bg-emerald-400/80" />
        <span className="text-muted ml-3 font-mono text-xs">
          johan@rutgers: ~
        </span>
      </div>

      <div className="space-y-4 p-6 font-mono text-sm sm:p-8 sm:text-base">
        <p>
          <span className="text-accent">johan@rutgers:~$</span>{" "}
          <span
            className="type-in"
            style={{ "--chars": 6 } as React.CSSProperties}
          >
            whoami
          </span>
        </p>

        <div className="space-y-3 font-sans">
          <h1
            id="hero-name"
            className="text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {site.name}
          </h1>
          <p className="text-muted text-lg">{site.role}</p>
          <p className="max-w-2xl text-lg">{site.tagline}</p>
        </div>

        <p className="text-muted">
          <span className="text-accent">→</span> {site.lookingFor}
        </p>

        <p>
          <span className="text-accent">johan@rutgers:~$</span>{" "}
          <span aria-hidden="true" className="cursor-blink text-accent">
            █
          </span>
        </p>
      </div>
    </section>
  );
}
