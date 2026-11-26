import { site } from "@/lib/site";
import { DownloadIcon, GitHubIcon, LinkedInIcon } from "./icons";
import { ProfilePhoto } from "./portfolio";
import { ButtonAnchor, ButtonLink } from "./ui";

// The intro at the top of the home page: availability badge, name, role,
// tagline and buttons on the left, photo on the right (on top on phones).
// Text comes from src/lib/site.ts.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-name"
      className="grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14"
    >
      <div className="space-y-6">
        <p className="fade-up border-border bg-surface/70 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm">
          {/* Green "available" dot with a soft pulse. */}
          <span aria-hidden="true" className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          {site.lookingFor}
        </p>

        <div className="space-y-3">
          <p
            className="fade-up text-accent font-mono text-sm sm:text-base"
            style={{ "--d": 1 } as React.CSSProperties}
          >
            Hi, I&apos;m
          </p>
          <h1
            id="hero-name"
            className="fade-up text-5xl font-semibold tracking-tight sm:text-6xl"
            style={{ "--d": 2 } as React.CSSProperties}
          >
            {site.name}
          </h1>
          <p
            className="fade-up text-muted text-xl"
            style={{ "--d": 3 } as React.CSSProperties}
          >
            {site.role}
          </p>
        </div>

        <p
          className="fade-up max-w-xl text-lg leading-relaxed"
          style={{ "--d": 4 } as React.CSSProperties}
        >
          {site.tagline}
        </p>

        <div
          className="fade-up flex flex-wrap gap-3 pt-2"
          style={{ "--d": 5 } as React.CSSProperties}
        >
          <ButtonAnchor
            href={site.resumePath}
            download={site.resumeDownloadName}
          >
            <DownloadIcon /> Download resume
          </ButtonAnchor>
          <ButtonAnchor
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <LinkedInIcon /> LinkedIn
          </ButtonAnchor>
          <ButtonAnchor
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
          >
            <GitHubIcon /> GitHub
          </ButtonAnchor>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>

      {/* Photo with a soft accent-colored glow behind it. */}
      <div className="fade-up relative order-first mx-auto w-44 sm:w-56 md:order-last md:w-72">
        <div
          aria-hidden="true"
          className="bg-accent/25 absolute -inset-4 -z-10 rounded-full blur-3xl"
        />
        <ProfilePhoto size={300} priority className="w-full" />
      </div>
    </section>
  );
}
