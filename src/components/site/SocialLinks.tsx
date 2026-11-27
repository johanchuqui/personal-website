import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from "./icons";

// Links with an empty address (e.g. twitter: "") are hidden.
const links: { href: string; label: string; Icon: typeof GitHubIcon }[] = [
  { href: site.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: site.links.twitter, label: "X (Twitter)", Icon: XIcon },
  { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon },
].filter((l) => l.href.trim() !== "");

export function SocialLinks() {
  return (
    <ul className="flex items-center gap-1">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-muted hover:bg-border/60 hover:text-fg block rounded-md p-2 transition-colors"
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  );
}
