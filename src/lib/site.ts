export const site = {
  name: "Johan Chuqui",
  role: "CS & Data Science @ Rutgers '27",
  tagline:
    "I turn messy data into clear answers, and ideas into working software.",
  lookingFor: "Open to Software Engineering and Data Analyst roles in the New York or Chicago Metropolitan Area",
  email: "johanchuqui05@gmail.com",
  resumePath: "/resume.pdf",
  // File name visitors get when they download it
  resumeDownloadName: "Johan_Chuqui_Resume.pdf",
  links: {
    // Your X (Twitter) profile, e.g. "https://x.com/yourhandle".
    // Leave it as "" to hide the icon.
    twitter: "https://x.com/jojocodes05",
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
