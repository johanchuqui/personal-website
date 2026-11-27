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
  /**
   * Zoom in on the photo. 1 = no zoom, 1.3 = 30% closer, 2 = twice as close.
   * Zooming centers on `position`, so set that to where your face is.
   */
  zoom?: number;
};

export type ProfilePhotoSettings = Photo & {
  /**
   * Frame shape for your profile photo:
   *   "rounded"  – square with soft corners (default)
   *   "circle"   – round
   *   "square"   – sharp corners
   *   "portrait" – taller rectangle (4:5) with soft corners
   */
  shape?: "rounded" | "circle" | "square" | "portrait";
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
  /** Optional emoji shown next to the name. Use "" for none. */
  icon?: string;
  name: string;
  description: string;
  /**
   * Optional photo, e.g. { src: "/images/hobbies/soccer.jpg", alt: "..." }.
   * Put the file in public/images/hobbies/. `position` works the same as for
   * your profile photo.
   */
  image?: { src: string; alt: string; position?: string };
};

export const profile = {
  photo: {
    src: "/images/profile.jpg",
    alt: "Portrait of Johan Chuqui",
    position: "55% 0%",
    zoom: 1.25,
    shape: "circle",
  } satisfies ProfilePhotoSettings,

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
    "I'm a Computer Science and Data Science student at Rutgers University—New Brunswick, graduating in 2027",
    "I got into programming in high school, when my school offered a programming elective. Since tech had been one of \
    my biggest interests since I was a kid, I decided to drop my science elective and take the programming elective instead. \
    I quickly fell in love, and it turned into one of the best decisions I made and also helped me a lot when picking a major \
    in college",
    "Outside of programming, I like spending time with my family and close friends. ",
  ],

  education: [
    {
      school: "Rutgers University–New Brunswick",
      degree: "B.S. Computer Science & Data Science",
      dates: "2023 – 2027 (expected)",
      details: [
        "Relevant coursework: Data Structures, Design and Analysis of Algorithms, Databases, Software Methodology, \
        Computer Architecture, Regression Methods, Statistical Inference, Data Management for Data Science",
      ],
    },
  ],

  // TODO: replace with your real experience (jobs, internships, research,
  // clubs). Delete the array items you don't need.
  experience: [
    {
      role: "Specialist",
      org: "kite+key, Rutgers Tech Store",
      dates: "Sep 2026 - present",
      location: "Piscataway, New Jersey",
      points: [
        "Serve 50+ students, faculty, and staff per shift in a high-traffic university tech retail environment, providing \
        device consultations and troubleshooting across Apple, Dell, and Lenovo product lines.",
        "Manage intake for 5+ computer repairs per shift and handle device setup and configuration, backed by Apple SEED \
        training for authorized product expertise.",
        "Process point-of-sale transactions and coordinate payroll-deduction purchases for university employees through \
        Rutgers OneSource, while maintaining inventory accuracy and in-store merchandising.",
      ],
    },
    {
      role: "Front Desk & STEM Instructor",
      org: "Rutgers Math & Science Learning Center",
      dates: "Sep 2023 – present",
      location: "Piscataway, New Jersey",
      points: [
        "Deliver interactive physics and mathematics lessons to classroom-sized groups of elementary school students during \
        university tours, adapting established curricula with original demonstrations to boost engagement and represent the \
        center to the community.",
        "Serve as the first point of contact for 100+ students and visitors daily, managing check-ins, answering inquiries, \
        and keeping classrooms ready in a fast-paced academic environment.",
        "Train and onboard new front desk staff, drawing on three years of experience to model center procedures and serve \
        as a trusted go-to team member for leadership.",
      ],
    },
    {
      role: "Founding Father",
      org: "Sigma Alpha Mu - Sigma Delta ",
      dates: "Jan 2025 - present",
      location: "New Brunswick, New Jersey",
      points: [
        "Reinstated the Sigma Delta chapter at Rutgers alongside 12 founding members, coauthoring chapter bylaws and \
        partnering with national headquarters and university administration to reestablish official recognition.",
        "Served two semesters as Recruitment Chair, doubling chapter membership through outreach events, one-on-one \
        engagement, and recruitment budgets built with the President and Exchequer; now advise on the Recruitment Committee \
        and serve on the Standards Board.",
        "Organized philanthropy and community service initiatives, including blood drives, campus cleanups, and fundraisers \
        like tie-dye sales, coffee and pastry sales, and Pie a Brother, with all proceeds benefiting the Judy Fund in support \
        of the Alzheimer's Association.",
      ],
    },
    {
      role: "Expeditor",
      org: "Robbinsville Bar & Grill",
      dates: "June 2025 - Oct 2026",
      location: "Robbinsville, New Jersey",
      points: [
        "Served as the final quality checkpoint for a 40+ table restaurant with a 15-seat bar and full patio, verifying \
        accuracy, plating, and presentation and catching errors before dishes reached guests.",
        "Directed a team of food runners and coordinated real-time communication between kitchen and front-of-house staff, \
        prioritizing tickets and managing allergy and special-request orders during high-volume service.",
        "Trained multiple new employees and stepped in across roles as needed, including food running, bussing, hosting, and \
        dessert and salad prep, to keep service running smoothly on peak nights.",
      ],
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
      icon: "",
      name: "Soccer",
      description:
        "Whenever I find myself with even a little bit of free time, I usually \
      spend it playing soccer with my friends. My family is originally from Ecuador, so \
      I grew up playing and following soccer. It's always been a big part of my life. My \
      favorite team is, unfortunately, Manchester United. GGMU!",
      image: {
        src: "/images/hobbies/soccer.jpg",
        alt: "Me at Metlife Stadium",
        position: "50% 35%",
      },
    },
    {
      icon: "",
      name: "Jiu-Jitsu",
      description:
        "For the past couple of months, I've been training Brazilian Jiu-Jitsu twice \
      a week after my good friend Olex convinced me to join the Rutgers BJJ Club. After \
      my first session, I immediately fell in love with the sport. Since then, I've looked \
      forward to every chance to step onto the mats, challenge myself, and keep improving.",
      image: {
        src: "/images/hobbies/jiujitsu.jpeg",
        alt: "One of my favorite UFC fighters: Chito Vera",
        position: "50% 0%",
      },
    },
    {
      icon: "",
      name: "Music",
      description: "",
      image: {
        src: "/images/hobbies/music.jpeg",
        alt: "Me at Govball 2024",
        position: "50% 100%",
      },
    },
    {
      icon: "",
      name: "My cat",
      description:
        "This is my childhood cat Lucas. He was my birthday present for when I turned 11. I'm 21 years old now \
      I love this little guy so much.",
      image: {
        src: "/images/hobbies/lucas.jpeg",
        alt: "Lucas",
        position: "50% 70%",
      },
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

/** Drops empty or whitespace-only strings, so a cleared-out line just disappears. */
export function nonBlank(items: readonly string[]): string[] {
  return items.filter((s) => s.trim() !== "");
}

export function getProject(slug: string): Project | undefined {
  return (profile.projects as Project[]).find((p) => p.slug === slug);
}
