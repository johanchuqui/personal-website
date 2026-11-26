import { Chips, HobbyGrid, ProjectGrid } from "@/components/site/portfolio";
import { Hero } from "@/components/site/Hero";
import { ButtonLink, SectionHeading } from "@/components/site/ui";
import { profile } from "@/content/profile";

export default function Home() {
  const featured = profile.projects.filter((p) => p.featured);

  return (
    <div className="space-y-20">
      <Hero />

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
        <HobbyGrid wide />
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
