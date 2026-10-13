-- Sample content for development. Safe to run more than once (it skips rows
-- whose slug already exists). Replace with your real content from /admin later.

insert into public.posts (slug, title, excerpt, content_md, tags, status)
values
(
  'hello-world',
  'Hello, world',
  'Why I built this site, and what I plan to write about.',
  $md$
Welcome to my site! I'm a CS & Data Science student at Rutgers, and this is
where I'll share projects and things I'm learning.

## What to expect

- Data analysis walkthroughs
- Notes on building software
- The occasional creative project

## A bit of code

```python
import pandas as pd

df = pd.read_csv("grades.csv")
print(df.groupby("course")["score"].mean().round(1))
```

## A table

| Tool    | Use it for          |
| ------- | ------------------- |
| pandas  | cleaning data       |
| SQL     | asking questions    |
| Next.js | building this site  |

This line contains raw HTML that must be shown as text, never run:
<script>alert("xss")</script>
$md$,
  array['meta', 'python'],
  'published'
),
(
  'draft-sql-window-functions',
  'Draft: SQL window functions',
  'A draft that should never be visible to the public.',
  $md$
This post is a **draft**. If you can see it while logged out, something is wrong.
$md$,
  array['sql'],
  'draft'
)
on conflict (slug) do nothing;

insert into public.projects
  (slug, title, summary, description_md, category, tech, tags, github_url, featured, sort_order, status)
values
(
  'nj-transit-delays',
  'NJ Transit Delay Analysis',
  'Which lines run late, and when? An exploratory analysis of a year of train data.',
  $md$
## Question
Which NJ Transit lines have the worst delays, and do they depend on time of day?

## Approach
Cleaned ~1M rows with pandas, aggregated in SQL, and visualized the results.

## Findings
_Placeholder: replace with real results._
$md$,
  'data',
  array['Python', 'pandas', 'SQL', 'Matplotlib'],
  array['python', 'sql', 'visualization'],
  'https://github.com/johanchuqui',
  true,
  1,
  'published'
),
(
  'personal-website',
  'This Website',
  'A full-stack portfolio and blog with an admin area, built with Next.js and Supabase.',
  $md$
Built with Next.js, TypeScript, Tailwind CSS and Supabase, with row-level
security protecting every table.
$md$,
  'software',
  array['TypeScript', 'Next.js', 'Supabase', 'Tailwind CSS'],
  array['typescript', 'web'],
  'https://github.com/johanchuqui/personal-website',
  true,
  2,
  'published'
),
(
  'campus-photo-series',
  'Campus Photo Series',
  'A small photography project documenting Rutgers through the seasons.',
  $md$
_Placeholder for a creative project._
$md$,
  'creative',
  array['Photography', 'Lightroom'],
  array['photography'],
  null,
  false,
  3,
  'published'
),
(
  'secret-draft-project',
  'Secret Draft Project',
  'A draft project that should never be visible to the public.',
  '',
  'software',
  array['Java'],
  array['java'],
  null,
  true,
  4,
  'draft'
)
on conflict (slug) do nothing;
