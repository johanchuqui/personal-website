import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLinkIcon, GitHubIcon } from "@/components/site/icons";
import { Chips } from "@/components/site/portfolio";
import { ButtonAnchor } from "@/components/site/ui";
import { categoryLabels, getProject, profile } from "@/content/profile";

// Every project page is built ahead of time; unknown slugs show a 404.
export function generateStaticParams() {
  return profile.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/projects"
        className="text-muted hover:text-fg font-mono text-sm"
      >
        ← ~/projects
      </Link>

      <header className="space-y-3">
        <p className="text-accent font-mono text-sm">
          {categoryLabels[project.category]}
          {project.date && (
            <span className="text-muted"> · {project.date}</span>
          )}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-muted text-lg">{project.summary}</p>
      </header>

      {project.image && (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={1200}
          height={675}
          priority
          className="border-border w-full rounded-xl border"
        />
      )}

      <Chips items={project.tech} />

      {(project.githubUrl || project.demoUrl) && (
        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <ButtonAnchor
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <GitHubIcon /> View source
            </ButtonAnchor>
          )}
          {project.demoUrl && (
            <ButtonAnchor
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon /> Live demo
            </ButtonAnchor>
          )}
        </div>
      )}

      <div className="space-y-4 text-lg leading-relaxed">
        {project.description.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
    </article>
  );
}
