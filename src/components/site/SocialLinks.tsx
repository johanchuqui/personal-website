import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const links = [
  { href: site.links.github, label: "GitHub", Icon: GitHubIcon },
  { href: site.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
  { href: `mailto:${site.email}`, label: "Email", Icon: MailIcon },
];

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
