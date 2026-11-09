import type { Metadata } from "next";
import { ProjectGrid } from "@/components/site/portfolio";
import { PageHeader, SectionHeading } from "@/components/site/ui";
import { categoryLabels, profile, type Project } from "@/content/profile";

export const metadata: Metadata = { title: "Projects" };

const categories = Object.keys(categoryLabels) as Project["category"][];

export default function ProjectsPage() {
  const groups = categories
    .map((c) => ({
      category: c,
      projects: profile.projects.filter((p) => p.category === c),
    }))
    .filter((g) => g.projects.length > 0);

  return (
    <>
      <PageHeader path="projects" title="Projects">
        Data analysis, software, and creative work.
      </PageHeader>

      {groups.length > 1 && (
        <nav aria-label="Project categories" className="mb-10">
          <ul className="flex flex-wrap gap-2 font-mono text-sm">
            {groups.map(({ category, projects }) => (
              <li key={category}>
                <a
                  href={`#${category}`}
                  className="border-border hover:bg-border/60 block rounded-md border px-3 py-1.5"
                >
                  {categoryLabels[category]}{" "}
                  <span className="text-muted">({projects.length})</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="space-y-14">
        {groups.map(({ category, projects }) => (
          <section
            key={category}
            id={category}
            aria-labelledby={`${category}-heading`}
            className="scroll-mt-24"
          >
            <SectionHeading id={`${category}-heading`}>
              {categoryLabels[category]}
            </SectionHeading>
            <ProjectGrid projects={projects} />
          </section>
        ))}
      </div>
    </>
  );
}
