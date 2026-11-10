import Image from "next/image";
import Link from "next/link";
import { categoryLabels, profile, type Project } from "@/content/profile";
import { GitHubIcon } from "./icons";

// Building blocks for the portfolio sections (photo, chips, project cards,
// hobbies). Content comes from src/content/profile.ts.

export function ProfilePhoto({
  size = 240,
  priority = false,
  className = "",
}: {
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const { src, alt, position = "50% 50%", zoom = 1 } = profile.photo;
  return (
    // The frame clips the photo, so zooming in never spills outside it.
    <div
      className={`border-border aspect-square overflow-hidden rounded-2xl border shadow-sm ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        priority={priority}
        style={{
          objectPosition: position,
          transform: zoom !== 1 ? `scale(${zoom})` : undefined,
          transformOrigin: position,
        }}
        className="size-full object-cover"
      />
    </div>
  );
}

export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="border-border bg-surface rounded-md border px-2.5 py-1 font-mono text-xs"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-border bg-surface group relative flex flex-col overflow-hidden rounded-xl border transition hover:shadow-md">
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={640}
          height={360}
          className="border-border aspect-video w-full border-b object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="border-border bg-accent/10 text-accent flex aspect-video items-center justify-center border-b font-mono text-sm"
        >
          ./{project.slug}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-accent font-mono text-xs">
          {categoryLabels[project.category]}
          {project.date && (
            <span className="text-muted"> · {project.date}</span>
          )}
        </p>
        <h3 className="text-lg font-semibold tracking-tight">
          {/* The stretched link makes the whole card clickable. */}
          <Link
            href={`/projects/${project.slug}`}
            className="group-hover:underline after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="text-muted flex-1">{project.summary}</p>
        <Chips items={project.tech} />
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-fg relative z-10 inline-flex w-fit items-center gap-1.5 font-mono text-xs"
          >
            <GitHubIcon className="size-4" /> Source
          </a>
        )}
      </div>
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}

export function HobbyGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {profile.hobbies.map((h) => (
        <li
          key={h.name}
          className="border-border bg-surface flex gap-4 rounded-xl border p-5"
        >
          <span aria-hidden="true" className="text-3xl leading-none">
            {h.icon}
          </span>
          <div>
            <p className="font-semibold">{h.name}</p>
            <p className="text-muted text-sm">{h.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
