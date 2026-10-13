import type { Metadata } from "next";
import { DownloadIcon } from "@/components/site/icons";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ButtonAnchor, PageHeader, SectionHeading } from "@/components/site/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: ${site.role}.`,
};

// TODO: replace the placeholder text and skills with your own.
const skills = [
  {
    group: "Data",
    items: ["Python", "pandas", "SQL", "NumPy", "Jupyter", "Tableau"],
  },
  {
    group: "Software",
    items: ["TypeScript", "React", "Next.js", "Java", "Git", "PostgreSQL"],
  },
  {
    group: "Creative",
    items: ["Data visualization", "UI design", "Writing"],
  },
];

export default function AboutPage() {
  return (
    <article>
      <PageHeader path="about" title="About me">
        {site.role}. {site.lookingFor}.
      </PageHeader>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <section
            aria-labelledby="bio-heading"
            className="space-y-4 text-lg leading-relaxed"
          >
            <SectionHeading id="bio-heading">Hi, I&apos;m Johan</SectionHeading>
            <p>
              I&apos;m a Computer Science and Data Science student at Rutgers
              University, graduating in 2027. I like working where those two
              fields meet: finding the story in a dataset, then building the
              software that makes it useful to other people.
            </p>
            <p>
              This placeholder bio will be replaced with my own words: what got
              me into data and code, what I&apos;m working on now, and what kind
              of team I want to join.
            </p>
          </section>

          <section aria-labelledby="skills-heading">
            <SectionHeading id="skills-heading">Skills</SectionHeading>
            <dl className="space-y-4">
              {skills.map(({ group, items }) => (
                <div key={group}>
                  <dt className="text-muted mb-2 font-mono text-sm">{group}</dt>
                  <dd>
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
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="edu-heading">
            <SectionHeading id="edu-heading">Education</SectionHeading>
            <div className="border-border bg-surface rounded-xl border p-5">
              <p className="font-semibold">Rutgers University–New Brunswick</p>
              <p className="text-muted">
                B.S. Computer Science &amp; Data Science · Expected 2027
              </p>
            </div>
          </section>
        </div>

        <aside aria-label="Résumé and links" className="space-y-6">
          <div className="border-border bg-surface space-y-4 rounded-xl border p-5">
            <p className="text-muted font-mono text-sm">$ cat resume.pdf</p>
            <ButtonAnchor
              href={site.resumePath}
              download
              className="w-full justify-center"
            >
              <DownloadIcon /> Download résumé
            </ButtonAnchor>
          </div>
          <div className="border-border bg-surface rounded-xl border p-5">
            <p className="text-muted mb-2 font-mono text-sm">$ ls ~/links</p>
            <SocialLinks />
          </div>
        </aside>
      </div>
    </article>
  );
}
