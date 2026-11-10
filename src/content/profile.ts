// ─────────────────────────────────────────────────────────────────────────────
// YOUR PORTFOLIO CONTENT
//
// This is the one file to edit to fill in your site. Every page (Home, About,
// Projects) reads from here. Name, tagline, email, GitHub and LinkedIn live in
// src/lib/site.ts.
//
// Images: put files in the `public/images/` folder and refer to them as
// "/images/your-file.jpg". Square photos (at least 600×600) work best for
// your headshot; 16:9 screenshots work best for projects.
// ─────────────────────────────────────────────────────────────────────────────

export type Photo = {
  src: string;
  alt: string;
  /**
   * Which part of the photo stays in view when it's cropped to a square.
   * "50% 50%" is the center. Raise the first number to shift toward the
   * right side of the photo ("70% 50%"), lower it to shift left ("30% 50%").
   * The second number does the same for top (0%) to bottom (100%).
   */
  position?: string;
};

export type Project = {
  /** Used in the URL: /projects/<slug>. Lowercase letters, numbers, dashes. */
  slug: string;
  title: string;
  /** One or two sentences shown on the project card. */
  summary: string;
  /** Longer write-up on the project's own page. One string per paragraph. */
  description: string[];
  category: "data" | "software" | "creative";
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  /** Optional screenshot, e.g. "/images/projects/transit.png". */
  image?: Photo;
  /** Featured projects also appear on the home page. */
  featured?: boolean;
  /** e.g. "Spring 2026" */
  date?: string;
};

export type Experience = {
  role: string;
  org: string;
  dates: string;
  location?: string;
  points: string[];
};

export type Hobby = {
  /** An emoji works well here. */
  icon: string;
  name: string;
  description: string;
};

export const profile = {
  // TODO: replace with "/images/profile.jpg" once you add your photo.
  photo: {
    src: "/images/profile-placeholder.svg",
    alt: "Portrait of Johan Chuqui",
    position: "50% 50%",
  } satisfies Photo,

  location: "New Jersey, USA",

  // Short greeting above your name on the home page.
  greeting: "Hi, I'm",

  // Quick stats shown on the home page. TODO: make these true for you.
  highlights: [
    { value: "3+", label: "years coding" },
    { value: "10+", label: "projects built" },
    { value: "'27", label: "Rutgers grad" },
    { value: "∞", label: "cups of coffee" },
  ],

  // What you're up to right now. Shown as a "currently" card on the home page.
  // TODO: update these every few months — it keeps the site feeling alive.
  now: [
    { label: "Building", value: "This portfolio site" },
    { label: "Learning", value: "Machine learning with scikit-learn" },
    { label: "Reading", value: "Storytelling with Data" },
    { label: "Listening to", value: "Lo-fi beats while coding" },
  ],

  // Your background, one string per paragraph.
  // TODO: rewrite these in your own words.
  bio: [
    "I'm a Computer Science and Data Science student at Rutgers University, graduating in 2027. I like working where those two fields meet: finding the story in a dataset, then building the software that makes it useful to other people.",
    "I got into programming by automating small, annoying tasks, and stayed for the feeling of seeing an idea actually run. These days I split my time between data analysis projects, web development, and coursework in algorithms and statistics.",
    "I'm looking for a team where I can learn quickly, ship things people use, and ask a lot of questions along the way.",
  ],

  education: [
    {
      school: "Rutgers University–New Brunswick",
      degree: "B.S. Computer Science & Data Science",
      dates: "2023 – 2027 (expected)",
      details: [
        "Relevant coursework: Data Structures, Algorithms, Databases, Statistics, Machine Learning",
      ],
    },
  ],

  // TODO: replace with your real experience (jobs, internships, research,
  // clubs). Delete the array items you don't need.
  experience: [
    {
      role: "Data Analyst Intern",
      org: "Company Name",
      dates: "Summer 2026",
      location: "New Jersey",
      points: [
        "Built a dashboard that replaced a weekly manual report.",
        "Cleaned and joined data from three sources with SQL and pandas.",
      ],
    },
    {
      role: "Member",
      org: "Rutgers Student Club",
      dates: "2024 – present",
      points: ["Helped organize workshops and hackathon teams."],
    },
  ] satisfies Experience[],

  skills: [
    {
      group: "Data",
      items: ["Python", "pandas", "SQL", "NumPy", "Jupyter", "Tableau"],
    },
    {
      group: "Software",
      items: ["TypeScript", "React", "Next.js", "Java", "Git", "PostgreSQL"],
    },
    {
      group: "Creative",
      items: ["Data visualization", "UI design", "Writing"],
    },
  ],

  // TODO: make these yours.
  hobbies: [
    {
      icon: "📷",
      name: "Photography",
      description: "Shooting street and campus scenes, mostly on weekends.",
    },
    {
      icon: "⚽",
      name: "Soccer",
      description: "Pickup games and following the Champions League.",
    },
    {
      icon: "🎧",
      name: "Music",
      description: "Making playlists for every mood and occasionally DJing.",
    },
    {
      icon: "🍳",
      name: "Cooking",
      description: "Trying to recreate family recipes from memory.",
    },
  ] satisfies Hobby[],

  // Topics you're curious about, shown as tags.
  interests: [
    "Machine learning",
    "Sports analytics",
    "Public transit",
    "Open data",
    "Web design",
    "Personal finance",
  ],

  // TODO: replace with your real projects. Add as many as you like; the order
  // here is the order on the site.
  projects: [
    {
      slug: "nj-transit-delays",
      title: "NJ Transit Delay Analysis",
      summary:
        "Which lines run late, and when? An exploratory analysis of a year of train data.",
      description: [
        "Question: which NJ Transit lines have the worst delays, and do they depend on time of day?",
        "I cleaned about a million rows with pandas, aggregated them in SQL, and visualized the results with Matplotlib.",
        "Placeholder: replace with your real findings.",
      ],
      category: "data",
      tech: ["Python", "pandas", "SQL", "Matplotlib"],
      githubUrl: "https://github.com/johanchuqui",
      featured: true,
      date: "Spring 2026",
    },
    {
      slug: "personal-website",
      title: "This Website",
      summary:
        "My portfolio site, built with Next.js, TypeScript and Tailwind CSS.",
      description: [
        "A fast, accessible portfolio with a light and dark theme, built with Next.js, TypeScript and Tailwind CSS.",
        "All of the content comes from a single file, so updating the site is as easy as editing a list.",
      ],
      category: "software",
      tech: ["TypeScript", "Next.js", "Tailwind CSS"],
      githubUrl: "https://github.com/johanchuqui/personal-website",
      featured: true,
      date: "Fall 2026",
    },
    {
      slug: "campus-photo-series",
      title: "Campus Photo Series",
      summary:
        "A small photography project documenting Rutgers through the seasons.",
      description: ["Placeholder for a creative project."],
      category: "creative",
      tech: ["Photography", "Lightroom"],
      date: "2025",
    },
  ] satisfies Project[],
};

export const categoryLabels: Record<Project["category"], string> = {
  data: "Data",
  software: "Software",
  creative: "Creative",
};

export function getProject(slug: string): Project | undefined {
  return (profile.projects as Project[]).find((p) => p.slug === slug);
}
