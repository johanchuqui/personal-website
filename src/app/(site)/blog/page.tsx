import type { Metadata } from "next";
import { ComingSoon, PageHeader } from "@/components/site/ui";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <PageHeader path="blog" title="Blog">
        Notes on data, code, and things I&apos;m learning.
      </PageHeader>
      <ComingSoon what="posts" />
    </>
  );
}
