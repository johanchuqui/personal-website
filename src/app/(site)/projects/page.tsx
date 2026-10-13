import type { Metadata } from "next";
import { ComingSoon, PageHeader } from "@/components/site/ui";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHeader path="projects" title="Projects">
        Data analysis, software, and creative work.
      </PageHeader>
      <ComingSoon what="projects" />
    </>
  );
}
