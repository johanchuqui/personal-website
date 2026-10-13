import type { Metadata } from "next";
import { SocialLinks } from "@/components/site/SocialLinks";
import { PageHeader } from "@/components/site/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

// The contact form arrives in milestone M8; for now, direct links.
export default function ContactPage() {
  return (
    <>
      <PageHeader path="contact" title="Get in touch">
        Hiring, collaborating, or just want to say hi? Reach out.
      </PageHeader>
      <div className="border-border bg-surface space-y-4 rounded-xl border p-6">
        <p>
          Email me at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent font-mono underline underline-offset-4"
          >
            {site.email}
          </a>
        </p>
        <SocialLinks />
      </div>
    </>
  );
}
