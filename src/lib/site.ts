// Central place for site-wide info. Edit this file to change your name,
// tagline, links, or navigation — every page reads from here.

export const site = {
  name: "Johan Chuqui",
  role: "CS & Data Science @ Rutgers '27",
  tagline:
    "I turn messy data into clear answers, and ideas into working software.",
  lookingFor: "Open to Data Analyst & Software Engineering roles",
  email: "johanchuqui05@gmail.com",
  resumePath: "/resume.pdf",
  // File name visitors get when they download it
  resumeDownloadName: "Johan_Chuqui_Resume.pdf",
  links: {
    github: "https://github.com/johanchuqui",
    // TODO: replace with your real LinkedIn profile URL
    linkedin: "https://www.linkedin.com/in/johanchuqui",
  },
} as const;

export const nav = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
] as const;
