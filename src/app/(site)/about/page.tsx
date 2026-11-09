import type { Metadata } from "next";
import { DownloadIcon, MapPinIcon } from "@/components/site/icons";
import { Chips, HobbyGrid, ProfilePhoto } from "@/components/site/portfolio";
import { SocialLinks } from "@/components/site/SocialLinks";
import { ButtonAnchor, PageHeader, SectionHeading } from "@/components/site/ui";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: ${site.role}.`,
};

// All text on this page comes from src/content/profile.ts.
export default function AboutPage() {
  return (
    <article>
      <PageHeader path="about" title="About me">
        {site.role}. {site.lookingFor}.
      </PageHeader>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-14">
          <section
            aria-labelledby="bio-heading"
            className="space-y-4 text-lg leading-relaxed"
          >
            <SectionHeading id="bio-heading">My background</SectionHeading>
            {profile.bio.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </section>

          <section aria-labelledby="exp-heading">
            <SectionHeading id="exp-heading">Experience</SectionHeading>
            <ol className="border-border space-y-8 border-l pl-6">
              {profile.experience.map((job) => (
                <li key={`${job.role}-${job.org}`} className="relative">
                  <span
                    aria-hidden="true"
                    className="bg-accent absolute top-2 -left-[29px] size-2.5 rounded-full"
                  />
                  <p className="font-semibold">
                    {job.role} <span className="text-muted">· {job.org}</span>
                  </p>
                  <p className="text-muted font-mono text-xs">
                    {job.dates}
                    {job.location && ` · ${job.location}`}
                  </p>
                  {job.points.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {job.points.map((pt) => (
                        <li key={pt}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="edu-heading">
            <SectionHeading id="edu-heading">Education</SectionHeading>
            <div className="space-y-4">
              {profile.education.map((ed) => (
                <div
                  key={ed.school}
                  className="border-border bg-surface rounded-xl border p-5"
                >
                  <p className="font-semibold">{ed.school}</p>
                  <p className="text-muted">
                    {ed.degree} · {ed.dates}
                  </p>
                  {ed.details.map((d) => (
                    <p key={d} className="mt-2 text-sm">
                      {d}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="skills-heading">
            <SectionHeading id="skills-heading">Skills</SectionHeading>
            <dl className="space-y-4">
              {profile.skills.map(({ group, items }) => (
                <div key={group}>
                  <dt className="text-muted mb-2 font-mono text-sm">{group}</dt>
                  <dd>
                    <Chips items={items} />
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="hobbies-heading" className="space-y-6">
            <SectionHeading id="hobbies-heading">
              Hobbies &amp; interests
            </SectionHeading>
            <HobbyGrid />
            <Chips items={profile.interests} />
          </section>
        </div>

        <aside
          aria-label="Photo, résumé and links"
          className="space-y-6 md:sticky md:top-24 md:self-start"
        >
          <ProfilePhoto size={320} priority className="w-full" />
          <p className="text-muted flex items-center gap-2 text-sm">
            <MapPinIcon className="size-4" /> {profile.location}
          </p>
          <div className="border-border bg-surface space-y-4 rounded-xl border p-5">
            <p className="text-muted font-mono text-sm">$ cat resume.pdf</p>
            <ButtonAnchor
              href={site.resumePath}
              download={site.resumeDownloadName}
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
