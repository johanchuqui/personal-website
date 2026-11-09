import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
} from "@/components/site/icons";
import {
  Chips,
  HobbyGrid,
  ProfilePhoto,
  ProjectGrid,
} from "@/components/site/portfolio";
import { TerminalHero } from "@/components/site/TerminalHero";
import { ButtonAnchor, ButtonLink, SectionHeading } from "@/components/site/ui";
import { profile } from "@/content/profile";
import { site } from "@/lib/site";

export default function Home() {
  const featured = profile.projects.filter((p) => p.featured);

  return (
    <div className="space-y-20">
      <div className="space-y-6">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <TerminalHero />
          <ProfilePhoto
            size={260}
            priority
            className="order-first mx-auto w-40 sm:w-52 md:order-last md:w-64"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonAnchor
            href={site.resumePath}
            download={site.resumeDownloadName}
          >
            <DownloadIcon /> Download résumé
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

      <section aria-labelledby="background-heading" className="space-y-4">
        <SectionHeading id="background-heading">Background</SectionHeading>
        <p className="max-w-3xl text-lg leading-relaxed">{profile.bio[0]}</p>
        <ButtonLink href="/about" variant="secondary">
          More about me
        </ButtonLink>
      </section>

      <section aria-labelledby="featured-heading" className="space-y-4">
        <SectionHeading id="featured-heading">Featured projects</SectionHeading>
        <ProjectGrid projects={featured} />
        <ButtonLink href="/projects" variant="secondary">
          All projects
        </ButtonLink>
      </section>

      <section aria-labelledby="hobbies-heading" className="space-y-6">
        <SectionHeading id="hobbies-heading">Outside of code</SectionHeading>
        <HobbyGrid />
        <div>
          <p className="text-muted mb-2 font-mono text-sm">
            $ cat interests.txt
          </p>
          <Chips items={profile.interests} />
        </div>
      </section>
    </div>
  );
}
