import { DownloadIcon } from "@/components/site/icons";
import { TerminalHero } from "@/components/site/TerminalHero";
import {
  ButtonAnchor,
  ButtonLink,
  ComingSoon,
  SectionHeading,
} from "@/components/site/ui";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="space-y-16">
      <div className="space-y-6">
        <TerminalHero />
        <div className="flex flex-wrap gap-3">
          <ButtonAnchor href={site.resumePath} download>
            <DownloadIcon /> Download résumé
          </ButtonAnchor>
          <ButtonLink href="/projects" variant="secondary">
            View projects
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>

      <section aria-labelledby="featured-heading">
        <SectionHeading id="featured-heading">Featured projects</SectionHeading>
        <ComingSoon what="projects" />
      </section>

      <section aria-labelledby="latest-heading">
        <SectionHeading id="latest-heading">Latest posts</SectionHeading>
        <ComingSoon what="posts" />
      </section>
    </div>
  );
}
