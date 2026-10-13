# PLAN.md: Johan Chuqui's Personal Website

> Full-stack personal site: blog, job hunting, and a creative portfolio.
> Owner: Johan Chuqui, CS & Data Science @ Rutgers, class of '27.
> Branch: `claude/pensive-hawking-gkzw2r`. One commit per milestone, pushed after each.

---

## 1. Overview & key decisions

| Decision             | Choice                                                                               | Why                                                                                                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework            | **Next.js (App Router) + TypeScript**, latest stable (15/16+)                        | Server components keep secrets on the server. Server actions remove most API boilerplate. Vercel runs it with no config.                                                                                |
| Styling              | **Tailwind CSS v4** (CSS-first `@theme` tokens)                                      | Fast to build, and design tokens live in one CSS file.                                                                                                                                                  |
| Data/Auth/Files      | **Supabase** (Postgres + Auth + Storage)                                             | One free service covers the database, login and image hosting. Row Level Security (RLS) enforces the rules inside the database.                                                                         |
| Auth library         | **`@supabase/ssr`** (cookie-based sessions)                                          | The officially supported way to use Supabase Auth with server components.                                                                                                                               |
| Schema in git        | **Supabase CLI migrations** in `supabase/migrations/`                                | Every table and policy is reviewable, versioned and reproducible.                                                                                                                                       |
| Markdown             | **react-markdown + remark-gfm + rehype-sanitize + rehype-highlight**                 | Raw HTML is never rendered, so it's XSS-safe. GFM gives tables and checklists. The same component runs in the public pages and the admin live preview.                                                  |
| Tags                 | **`text[]` column + GIN index** on posts and projects                                | It's a personal site with a handful of tags. An array is one column, needs no join tables, and filtering is just `tags @> '{python}'`. Join tables only pay off with tag metadata, which we don't need. |
| Enumerations         | `text` + `CHECK` constraints (not Postgres enums)                                    | Easier to change later in a migration.                                                                                                                                                                  |
| Résumé               | Static **`/public/resume.pdf`**                                                      | Simplest option and cached by the CDN. To update it, replace the file and push.                                                                                                                         |
| Theme                | **next-themes** (`class` strategy, system default)                                   | Light/dark mode with no flash on load.                                                                                                                                                                  |
| Contact              | Server action + **Turnstile + honeypot + DB rate limit + zod**, email via **Resend** | Blocks spam without paid services. Visitors can never read messages.                                                                                                                                    |
| Public data fetching | Cookie-less Supabase client + `revalidatePath()` after admin edits                   | Public pages can be static and fast. Edits show up right away.                                                                                                                                          |
| Hosting              | **Vercel**, custom domain bought at **Cloudflare Registrar** (or Porkbun)            | At-cost pricing and simple DNS.                                                                                                                                                                         |

---

## 2. Accounts & services, introduced only when needed

| Service                | Needed at                      | What for                                                                                                                   | Cost         |
| ---------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------ |
| GitHub                 | Already have it                | Code hosting; Vercel deploys from it                                                                                       | Free         |
| Node.js 20+ (LTS)      | M0                             | Runs the app locally                                                                                                       | Free         |
| **Supabase**           | **M2**                         | Database, auth, image storage                                                                                              | Free tier    |
| Cloudflare (Turnstile) | M8 _optional_; required by M11 | Spam check. M8 can use Cloudflare's **test keys**, so no account yet.                                                      | Free         |
| **Resend**             | **M8**                         | Sends contact emails. Sign up with `johanchuqui05@gmail.com` so the sandbox sender can email you before the domain exists. | Free tier    |
| **Vercel**             | **M11**                        | Hosting; sign up with GitHub                                                                                               | Hobby (free) |
| Domain registrar       | **M11**                        | Custom domain (`.com` ~$10–12/yr)                                                                                          | Paid         |

M0–M1 need **no accounts at all**.

> Note: free Supabase projects **pause after ~7 days with no activity**. Normal visitor traffic keeps the project awake. If it pauses, you can resume it from the dashboard.

---

## 3. Folder structure

```
personal-website/
├── PLAN.md                      # this document
├── README.md                    # how to run, edit, deploy (kept current)
├── .env.example                 # every env var, no real values (committed)
├── .env.local                   # real secrets (git-ignored, never committed)
├── next.config.ts               # images.remotePatterns for Supabase Storage
├── eslint.config.mjs            # ESLint flat config
├── proxy.ts                     # (or middleware.ts on Next 15) session refresh + /admin redirect
├── public/
│   ├── resume.pdf               # résumé download
│   └── images/                  # static images (headshot, favicon source)
├── scripts/
│   └── check-rls.ts             # tiny script proving anon can't see drafts/messages
├── supabase/
│   ├── config.toml              # created by `supabase init`
│   ├── migrations/              # timestamped SQL: tables, RLS, storage, triggers
│   └── seed.sql                 # sample posts/projects for development
└── src/
    ├── app/
    │   ├── layout.tsx           # <html>, fonts, ThemeProvider, skip link
    │   ├── globals.css          # Tailwind import + @theme design tokens
    │   ├── not-found.tsx        # custom 404 (terminal style)
    │   ├── sitemap.ts           # /sitemap.xml
    │   ├── robots.ts            # /robots.txt
    │   ├── opengraph-image.tsx  # default OG image
    │   ├── rss.xml/route.ts     # blog RSS feed
    │   ├── (site)/              # public pages share header/footer layout
    │   │   ├── layout.tsx
    │   │   ├── page.tsx         # Home
    │   │   ├── about/page.tsx
    │   │   ├── projects/page.tsx, [slug]/page.tsx
    │   │   ├── blog/page.tsx, [slug]/page.tsx
    │   │   ├── contact/page.tsx, actions.ts
    │   │   └── login/page.tsx, actions.ts
    │   └── admin/               # protected area with its own layout
    │       ├── layout.tsx       # calls requireAdmin(); admin nav + logout
    │       ├── page.tsx         # dashboard
    │       ├── posts/page.tsx, new/page.tsx, [id]/page.tsx, actions.ts
    │       ├── projects/page.tsx, new/page.tsx, [id]/page.tsx, actions.ts
    │       └── messages/page.tsx, actions.ts
    ├── components/
    │   ├── site/                # Header, Footer, ThemeToggle, TerminalHero, TagFilter, Cards
    │   ├── markdown/Markdown.tsx  # the single safe Markdown renderer
    │   └── admin/               # PostForm, ProjectForm, MarkdownEditor, ImageUpload, ConfirmDelete
    └── lib/
        ├── supabase/
        │   ├── server.ts        # cookie-aware server client (admin/auth)
        │   ├── browser.ts       # browser client (admin image uploads)
        │   ├── public.ts        # cookie-less read client (public pages)
        │   ├── admin.ts         # SECRET-key client, `import 'server-only'`
        │   ├── proxy.ts         # updateSession() helper used by proxy.ts
        │   └── database.types.ts  # generated by `supabase gen types`
        ├── auth.ts              # requireAdmin() helper
        ├── validation.ts        # zod schemas (post, project, contact)
        ├── queries.ts           # getPublishedPosts(), getProjects(filters)...
        ├── site.ts              # name, links (GitHub, LinkedIn, email), nav
        └── utils.ts             # slugify, formatDate, readingTime
```

---

## 4. Database schema

All of this goes in migrations (`supabase migration new <name>`), never by clicking around in the dashboard.

### 4.1 Tables

**`admins`**: the list of users allowed to administer the site.

| column     | type        | notes                                         |
| ---------- | ----------- | --------------------------------------------- |
| user_id    | uuid PK     | `references auth.users(id) on delete cascade` |
| created_at | timestamptz | `not null default now()`                      |

**`posts`**

| column                  | type        | notes                                                                                                                   |
| ----------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| id                      | uuid PK     | `default gen_random_uuid()`                                                                                             |
| slug                    | text        | `unique not null`, `check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')`                                                          |
| title                   | text        | `not null`, `check (char_length(title) between 1 and 200)`                                                              |
| excerpt                 | text        | `check (char_length(excerpt) <= 300)`                                                                                   |
| content_md              | text        | `not null default ''`                                                                                                   |
| cover_image_url         | text        | nullable                                                                                                                |
| cover_image_alt         | text        | `check (cover_image_url is null or char_length(cover_image_alt) > 0)`, so alt text is **required** when an image exists |
| tags                    | text[]      | `not null default '{}'` (lowercase, set in the app)                                                                     |
| status                  | text        | `not null default 'draft' check (status in ('draft','published'))`                                                      |
| published_at            | timestamptz | set automatically on first publish (trigger)                                                                            |
| created_at / updated_at | timestamptz | `not null default now()`                                                                                                |

**`projects`**

| column                                       | type        | notes                                                         |
| -------------------------------------------- | ----------- | ------------------------------------------------------------- |
| id, slug, title                              | as in posts |                                                               |
| summary                                      | text        | `not null`, ≤ 300 chars                                       |
| description_md                               | text        | `not null default ''`                                         |
| category                                     | text        | `not null check (category in ('data','software','creative'))` |
| tech                                         | text[]      | `not null default '{}'` (e.g. `{Python,pandas,SQL}`)          |
| tags                                         | text[]      | `not null default '{}'`                                       |
| github_url, demo_url                         | text        | nullable, `check (x ~ '^https://')`                           |
| cover_image_url / cover_image_alt            | text        | same alt-required check as posts                              |
| featured                                     | boolean     | `not null default false` (shown on Home)                      |
| sort_order                                   | int         | `not null default 0` (lower shows first)                      |
| status, published_at, created_at, updated_at | as in posts |                                                               |

**`contact_messages`**

| column     | type        | notes                                                                |
| ---------- | ----------- | -------------------------------------------------------------------- |
| id         | uuid PK     |                                                                      |
| name       | text        | `not null`, 1–100 chars                                              |
| email      | text        | `not null`, ≤ 254 chars                                              |
| message    | text        | `not null`, 10–5000 chars                                            |
| ip_hash    | text        | SHA-256 of IP + salt, used for rate limiting without storing raw IPs |
| is_read    | boolean     | `not null default false`                                             |
| created_at | timestamptz | `not null default now()`                                             |

The length checks repeat the zod rules on purpose. The database is the last line of defense.

### 4.2 Indexes

- `posts (status, published_at desc)` for the blog list. `projects (status, category, sort_order)` for the projects list.
- `gin (tags)` on posts and projects so tag filtering stays fast.
- `projects (featured) where featured and status = 'published'` for the Home page.
- `contact_messages (ip_hash, created_at desc)` for the rate-limit count. `contact_messages (created_at desc)` for the inbox.
- `unique` on `slug` already creates an index.

### 4.3 `is_admin()` function

```sql
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;
```

_Why security definer?_ The function has to read `admins`, and `admins` has no RLS policies, so normal users can't read it. Running as the function owner lets it check the table safely. The empty `search_path` blocks schema-hijacking tricks. `anon` needs execute because public read policies call the function.

### 4.4 RLS policies

RLS is **enabled on every table**. With no matching policy, access is denied.

| Table            | Who                         | Can do                   | Rule                                                                                                   |
| ---------------- | --------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| admins           | nobody (via API)            | none                     | No policies. `revoke all ... from anon, authenticated`. Rows are inserted only through the SQL editor. |
| posts            | anon + authenticated        | SELECT                   | `status = 'published' or is_admin()`                                                                   |
| posts            | authenticated               | INSERT / UPDATE / DELETE | `is_admin()`                                                                                           |
| projects         | same four policies as posts |                          |                                                                                                        |
| contact_messages | anon                        | nothing                  | No policies, and `revoke all ... from anon`                                                            |
| contact_messages | authenticated               | SELECT / UPDATE / DELETE | `is_admin()` (read, mark as read, delete)                                                              |
| contact_messages | INSERT                      | **no policy**            | Only the server inserts, using the secret key (which bypasses RLS) after spam checks pass.             |

SQL sketch (posts; projects is the same):

```sql
alter table public.posts enable row level security;
create policy "read published or admin" on public.posts for select
  to anon, authenticated using (status = 'published' or (select public.is_admin()));
create policy "admin insert" on public.posts for insert
  to authenticated with check ((select public.is_admin()));
create policy "admin update" on public.posts for update
  to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admin delete" on public.posts for delete
  to authenticated using ((select public.is_admin()));
```

(Wrapping the call as `(select ...)` lets Postgres evaluate it once per query instead of once per row.)

### 4.5 Storage

- Bucket **`media`**: `public = true` (anyone can read files by URL), `file_size_limit = 5 MB`, `allowed_mime_types = {image/png, image/jpeg, image/webp, image/gif, image/avif}`. **No SVG**, because an SVG can carry scripts.
- Paths: `posts/<uuid>-<safe-name>.webp`, `projects/<uuid>-<safe-name>.png`.
- Policies on `storage.objects` (only the admin can write; public reads go through the public URL, so no public SELECT policy is needed, which also stops strangers from listing files):

```sql
create policy "admin upload media" on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (select public.is_admin()));
create policy "admin list media"   on storage.objects for select to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
create policy "admin update media" on storage.objects for update to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
create policy "admin delete media" on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (select public.is_admin()));
```

### 4.6 Triggers

```sql
create or replace function public.handle_row_update() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end $$;
create trigger posts_touch before insert or update on public.posts
  for each row execute function public.handle_row_update();
-- same trigger for projects
```

---

## 5. Pages & routes

**Public** (anyone):

| Route                                     | What it does                                                                                                                                   |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                       | Terminal-style hero (`$ whoami` → name, role, "open to Data Analyst & SWE roles"), featured projects, 3 latest posts, résumé + contact buttons |
| `/about`                                  | Bio, photo, skills grouped as Data / Software / Creative, education, résumé download                                                           |
| `/projects`                               | Grid of published projects. Filter with `?category=data&tag=python` (links, so filters work without JS and URLs can be shared).                |
| `/projects/[slug]`                        | Cover, summary, tech chips, GitHub/demo links, rendered Markdown. 404 if it's a draft.                                                         |
| `/blog`                                   | Published posts, newest first. `?tag=sql` filter.                                                                                              |
| `/blog/[slug]`                            | Post with reading time, tags, highlighted code. 404 if it's a draft.                                                                           |
| `/contact`                                | Contact form (section 7) plus direct email/LinkedIn links                                                                                      |
| `/resume.pdf`                             | Static file                                                                                                                                    |
| `/sitemap.xml`, `/robots.txt`, `/rss.xml` | SEO (M9). `robots` disallows `/admin` and `/login`.                                                                                            |
| `/login`                                  | Email + password form. Already logged-in admins are sent to `/admin`.                                                                          |

**Admin** (requires a logged-in user who is listed in `admins`):

| Route                                   | What it does                                                                                                                                                                                 |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin`                                | Dashboard: counts of posts/projects (drafts vs published), unread messages, quick links                                                                                                      |
| `/admin/posts`                          | Table of all posts, including drafts, with status badges                                                                                                                                     |
| `/admin/posts/new`, `/admin/posts/[id]` | Editor: title, auto slug (editable), excerpt, tags, cover upload + alt, Markdown textarea with **side-by-side live preview** (tabs on mobile), "insert image" button, publish toggle, delete |
| `/admin/projects`, `/new`, `/[id]`      | Same pattern plus category, tech, URLs, featured, sort order                                                                                                                                 |
| `/admin/messages`                       | Inbox, newest first, unread in bold. Mark read/unread, delete, "reply" `mailto:` link.                                                                                                       |

**Server actions** (all are POST endpoints that anyone could call directly, so each one re-checks):

- `login`, `logout` (`(site)/login/actions.ts`)
- `createPost`, `updatePost`, `deletePost`, `setPostStatus`, and the same set for projects. Each one runs `requireAdmin()`, then zod validation, then a Supabase write, then `revalidatePath()` on the affected public pages.
- `markMessageRead`, `deleteMessage`
- `sendContactMessage` (public; protected by the checks in section 7)

**Route handlers:** only `rss.xml/route.ts`. Image uploads go **directly from the browser to Supabase Storage** using the admin's session, and storage RLS enforces admin-only. This avoids server-action body size limits.

---

## 6. How login/auth works

**Creating the admin (one time, M5):**

1. Supabase dashboard → Authentication → Sign In / Providers: keep **Email** on and turn **"Allow new users to sign up" OFF**.
2. Authentication → Users → **Add user**: enter your email and a strong password, with "Auto confirm" checked.
3. SQL editor:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'johanchuqui05@gmail.com';
   ```
   This step is what makes the account an admin. Any other account, even a logged-in one, gets nothing.

**Logging in:**

1. The admin submits `/login`. The `login` server action calls `supabase.auth.signInWithPassword()`.
2. On success, `@supabase/ssr` stores the session in **httpOnly, secure cookies**, and the action redirects to `/admin`. On failure it shows one generic message ("Invalid email or password"), so the form never reveals which emails exist.
3. Supabase Auth applies built-in rate limits to sign-in attempts.

**Every request to `/admin/*`, with defense in depth:**

1. **Proxy layer** (`proxy.ts` on Next 16+, `middleware.ts` on Next 15; **use whichever the installed version expects**). Matcher: `['/admin/:path*', '/login']`. It creates a server client, calls `supabase.auth.getUser()`, which also refreshes expired tokens and writes new cookies, and redirects to `/login` when there is no user. Public pages skip this step so they stay fast.
2. **Page layer**: `app/admin/layout.tsx` and every admin page call `requireAdmin()`. That helper calls `getUser()` (which **verifies the token with Supabase**; never trust `getSession()` alone, because it only reads the cookie) and then `supabase.rpc('is_admin')`. If either check fails, it redirects to `/login`.
3. **Action layer**: every admin server action calls `requireAdmin()` again, because actions can be called without visiting the page.
4. **Database layer**: RLS with `is_admin()`. Even if all the code above had a bug, the database refuses non-admin writes and hides drafts and messages.

**Logout:** the `logout` server action calls `supabase.auth.signOut()` and redirects to `/`.

_Optional hardening (M10):_ turn on Supabase Auth's built-in CAPTCHA using Turnstile for the login form.

---

## 7. Contact form flow

1. The visitor fills in **name, email, message**. The form also contains:
   - a **honeypot** field `website`, visually hidden, with `tabIndex={-1}`, `autoComplete="off"` and `aria-hidden`. Humans never fill it in; bots usually do.
   - the **Turnstile widget** (`@marsidev/react-turnstile`), which adds a token to the form.
2. Submitting calls the server action `sendContactMessage` through `useActionState`, which shows pending, success and error states and works on mobile.
3. The server runs these checks in order:
   1. **zod** parses the form data: name 1–100 chars, valid email ≤ 254, message 10–5000, all trimmed. Failures return field errors.
   2. **Honeypot** filled in: return a _fake success_ and save nothing, so bots learn nothing.
   3. **Turnstile**: POST the token, `TURNSTILE_SECRET_KEY` and the visitor IP to `https://challenges.cloudflare.com/turnstile/v0/siteverify`. Reject unless `success === true`.
   4. **Rate limit**: read the IP from `x-forwarded-for` (first entry) or `x-real-ip`, then hash it with `sha256(ip + IP_HASH_SALT)`. Using the **secret-key admin client**, count rows with the same `ip_hash` in the last hour. **Reject if there are 3 or more.** Also apply a global cap of 50 messages in 24 hours as a flood fuse. This works on serverless because the count lives in Postgres.
   5. **Insert** the row with the secret-key client.
   6. **Email** via Resend: `to: CONTACT_TO_EMAIL`, `from: CONTACT_FROM_EMAIL`, `replyTo: <visitor email>`, subject `New message from <name>`, **plain-text** body so no HTML gets injected. If sending fails, log it and still return success, since the message is already saved and visible in the inbox.
4. The visitor sees "Thanks! I'll get back to you soon."

**Why the secret key instead of an anon insert policy?** An insert policy would let anyone skip Turnstile and post straight to the Supabase API. With no anon policy, the only way in is through the server's checks. The secret key lives in `src/lib/supabase/admin.ts`, which starts with `import 'server-only'` so it can never be bundled into browser code, and it is never prefixed `NEXT_PUBLIC_`.

**Before Resend and Cloudflare are fully set up:** use Turnstile **test keys** (site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`) and Resend's sandbox sender `onboarding@resend.dev`. The sandbox sender can only email the address you signed up to Resend with, which is why that account should use `johanchuqui05@gmail.com`.

---

## 8. Environment variables

| Name                                   | Where to get it                                                                  | Public?                              |
| -------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                 | `http://localhost:3000` locally, `https://yourdomain.com` in production          | Public                               |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase → Project Settings → API                                                | Public                               |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase → API Keys (`sb_publishable_...`; the legacy **anon** key works too)    | Public (safe; RLS protects the data) |
| `SUPABASE_SECRET_KEY`                  | Supabase → API Keys (`sb_secret_...`; the legacy **service_role** key works too) | **SECRET**, bypasses RLS             |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`       | Cloudflare → Turnstile → widget (test key early on)                              | Public                               |
| `TURNSTILE_SECRET_KEY`                 | Same widget                                                                      | **SECRET**                           |
| `RESEND_API_KEY`                       | Resend → API Keys (sending access only)                                          | **SECRET**                           |
| `CONTACT_TO_EMAIL`                     | `johanchuqui05@gmail.com`                                                        | Server only                          |
| `CONTACT_FROM_EMAIL`                   | `onboarding@resend.dev`, later `Johan's Site <contact@yourdomain.com>`           | Server only                          |
| `IP_HASH_SALT`                         | Any long random string (`openssl rand -hex 32`)                                  | **SECRET**                           |

`.env.local` is git-ignored (`.env*` ignored, `!.env.example` allowed). `.env.example` lists every name with empty values. The same variables go into Vercel → Settings → Environment Variables at M11.

---

## 9. Design system & accessibility

**Tokens** (defined once in `globals.css` as CSS variables, exposed to Tailwind via `@theme`; dark values switch on `.dark` through `@custom-variant dark (&:where(.dark, .dark *))`):

| Token                             | Light                                                    | Dark                          |
| --------------------------------- | -------------------------------------------------------- | ----------------------------- |
| `--bg`                            | `#fafafa`                                                | `#0b0f14`                     |
| `--surface` (cards)               | `#ffffff`                                                | `#121821`                     |
| `--fg` (text)                     | `#111827`                                                | `#e5e7eb`                     |
| `--muted`                         | `#4b5563`                                                | `#9ca3af`                     |
| `--border`                        | `#e5e7eb`                                                | `#1f2937`                     |
| `--accent` (links, prompt, focus) | `#047857` (emerald-700)                                  | `#34d399` (emerald-400)       |
| Category hues                     | data `#2563eb` / software `#047857` / creative `#c026d3` | lighter 400-level equivalents |

All text/background pairs must reach **4.5:1 contrast**. Check them with a contrast checker in M9.

**Fonts** (via `next/font/google`, self-hosted, no layout shift): **Geist** for body and headings, **Geist Mono** for code, tags, dates, nav prefixes and the hero.

**Terminal touches (subtle; still a clean, minimal site):**

- Hero: `johan@rutgers:~$ whoami` with a typed effect and a blinking block cursor. Shows instantly when the user prefers reduced motion.
- Section headings prefixed with a mono `~/projects` or `#`. Tags rendered like `[python]`.
- Code blocks: dark panel with three "window dots", a language label and a copy button.
- Custom 404: `bash: /page: No such file or directory`.

**Dark mode:** `next-themes` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and `suppressHydrationWarning` on `<html>`. Its inline script sets the class before paint, so the page never flashes. The toggle button has `aria-label` and switches the sun/moon icon.

**Accessibility checklist:**

- [ ] "Skip to content" link as the first focusable element, targeting `<main id="main">`
- [ ] Semantic landmarks (`header`, `nav`, `main`, `footer`, `article`) and one `h1` per page
- [ ] Every input has a `<label>`; errors linked with `aria-describedby`; success/error announced through `aria-live`
- [ ] Visible `:focus-visible` ring (accent color, 2px) on all interactive elements
- [ ] Alt text **required** for every image: enforced in forms, zod and the DB check. Markdown images without alt fail validation.
- [ ] Contrast ≥ 4.5:1 in both themes; color is never the only signal (badges include text)
- [ ] Fully usable by keyboard (mobile nav menu, theme toggle, filters, admin editor)
- [ ] Respect `prefers-reduced-motion`
- [ ] Responsive from 360px up: nav collapses to a menu button; editor preview becomes a tab

---

## 10. Milestones

Every milestone ends with: `npm run lint && npm run typecheck && npm run build`, fix any errors, tell the owner how to view the result, update the README if needed, then **commit and push** to `claude/pensive-hawking-gkzw2r`.

### M0: Scaffold, tooling, README _(no accounts)_

- **Tasks:** `npx create-next-app@latest` (TypeScript, App Router, Tailwind, ESLint, `src/`, import alias `@/*`). Add scripts `typecheck` (`tsc --noEmit`) and `lint` (`eslint .`; Next 16 removed `next lint`). Add Prettier. Write the `.gitignore` env rules, an empty `.env.example`, the README skeleton (prerequisites, `npm install`, `npm run dev`), and add PLAN.md.
- **See it:** `npm run dev` → http://localhost:3000
- **Done when:** the default page loads and lint, typecheck and build all pass.

### M1: Layout, theme, static Home & About, résumé _(no accounts)_

- **Tasks:** design tokens + fonts; `ThemeProvider` and `ThemeToggle`; Header (nav: Home, Projects, Blog, About, Contact) and Footer (GitHub, LinkedIn, email icons, all with labels) driven by `lib/site.ts`; skip link; terminal hero; About page with placeholder bio; `public/resume.pdf` placeholder plus download button; placeholder Projects/Blog pages saying "coming soon".
- **See it:** `/` and `/about`; toggle the theme; resize to phone width.
- **Done when:** no theme flash on reload, keyboard navigation works, mobile menu works.

### M2: Supabase project, schema, RLS, seed _(create Supabase account here)_

- **Tasks:** owner creates a Supabase account and a project (save the DB password) and copies the URL + keys into `.env.local`. Install `supabase` as a dev dependency, then `npx supabase init`, `npx supabase login`, `npx supabase link`. Write migrations `001_tables`, `002_rls`, `003_storage`, `004_triggers` (section 4). `npx supabase db push`. Write `seed.sql` with 2 posts (1 draft) and 4 projects (1 draft, mixed categories), loaded with `npx supabase db push --include-seed` or pasted into the SQL editor. Add a `db:types` script (`supabase gen types typescript --linked > src/lib/supabase/database.types.ts`). Create the four Supabase client files. Write `scripts/check-rls.ts`.
- **See it:** Supabase Table Editor shows the rows; `npx tsx scripts/check-rls.ts` prints all PASS.
- **Done when:** migrations apply cleanly and an anon client cannot see drafts or messages, or write anything.
- _(Docker plus `supabase start` for a local DB is optional; the plan works against the hosted project.)_

### M3: Public Projects from DB

- **Tasks:** `lib/queries.ts`; `/projects` grid with category tabs and tag chips (URL search params); `/projects/[slug]` with `notFound()` for missing or draft projects; `generateMetadata`; featured projects on Home; `next.config.ts` `images.remotePatterns` for `<ref>.supabase.co/storage/v1/object/public/**`.
- **See it:** `/projects?category=data`; click into a project; try the draft's slug (should 404).
- **Done when:** filters combine correctly and drafts never appear.

### M4: Public Blog + Markdown rendering

- **Tasks:** `components/markdown/Markdown.tsx` (react-markdown with remark-gfm, then `rehype-sanitize`, **then** `rehype-highlight` so highlighting runs after sanitizing; no `rehype-raw`; links to other sites get `rel="noopener noreferrer"`; images render with alt); highlight.js theme CSS that follows light/dark; `/blog` list with tag filter; `/blog/[slug]` with reading time and dates; latest posts on Home.
- **See it:** a seeded post containing a table, a code block, and a `<script>` line (the script must show as text or be stripped).
- **Done when:** code is highlighted in both themes and raw HTML never executes.

### M5: Auth: login, logout, protected admin shell

- **Tasks:** turn off sign-ups and create the admin user + `admins` row (section 6); `lib/supabase/proxy.ts` + root `proxy.ts`/`middleware.ts`; `/login` page + action; `requireAdmin()`; `admin/layout.tsx` with sidebar nav and logout; placeholder dashboard.
- **See it:** `/admin` while logged out redirects to `/login`; log in to reach the dashboard; log out.
- **Done when:** a second test user (created and then deleted in the dashboard) cannot reach `/admin`.

### M6: Admin CRUD for posts

- **Tasks:** zod `postSchema`; `PostForm` (title → auto slug, excerpt, comma-separated tags normalized to lowercase, cover `ImageUpload` with required alt, `MarkdownEditor` with live preview reusing `Markdown.tsx`, "insert image" that uploads and inserts `![alt](url)`, draft/published toggle); posts table page; create/update/delete/toggle actions with `revalidatePath('/blog')`, `/blog/[slug]` and `/`; delete confirmation dialog; friendly "slug already taken" error.
- **See it:** `/admin/posts/new` → write, upload an image, save as draft (hidden on `/blog`), publish (visible).
- **Done when:** the full post lifecycle works and uploads are rejected for non-images and files over 5 MB.

### M7: Admin CRUD for projects

- **Tasks:** the same pattern as M6, plus category select, tech list, GitHub/demo URLs (https only), featured checkbox, sort order. Reuse the form components.
- **See it:** create a featured Creative project and check that it appears on Home and under `/projects?category=creative`.
- **Done when:** all fields round-trip and sort order is respected.

### M8: Contact form + Turnstile + Resend + inbox _(create Resend account here; Turnstile test keys are fine)_

- **Tasks:** owner creates a Resend account with `johanchuqui05@gmail.com` and an API key. Build the contact page + `sendContactMessage` (section 7), `lib/supabase/admin.ts` (server-only), the inbox with read/unread and delete, and the unread count on the dashboard.
- **See it:** submit `/contact`; an email arrives; the message appears at `/admin/messages`. Submit 4 times quickly and the 4th is rejected.
- **Done when:** the honeypot, rate limit and validation errors all behave as designed.

### M9: SEO, polish, accessibility pass

- **Tasks:** root `metadata` (title template `%s · Johan Chuqui`, description, `metadataBase`); per-page OG data; `opengraph-image.tsx`; `sitemap.ts` (static pages plus published slugs); `robots.ts`; `/rss.xml`; favicon; `not-found.tsx`; `loading.tsx` skeletons; empty states; Lighthouse run (aim for 90+ in accessibility, SEO and best practices); run through the a11y checklist.
- **See it:** `/sitemap.xml`, `/rss.xml`, `/robots.txt`, a bad URL (404), and Lighthouse in Chrome DevTools.
- **Done when:** the checklist is ticked and Lighthouse targets are met.

### M10: Security review + fixes

- **Tasks:** a **separate security-review subagent** audits: auth flow (`getUser` everywhere, no `getSession` trust), every admin action calls `requireAdmin()`, RLS on every table (re-run `check-rls.ts`), storage policies, secret key only imported in server-only modules (`grep -r SUPABASE_SECRET_KEY src`), no secrets in client bundles (search the `.next/static` output), contact defenses, Markdown XSS, open redirects on login, security headers in `next.config.ts` (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`), and `npm audit`. Fix findings and optionally enable Supabase Auth CAPTCHA.
- **Done when:** no high or medium findings remain open; findings and fixes are summarized in the commit message.

### M11: Deploy to Vercel + custom domain + Resend domain _(create Vercel account, buy domain, Cloudflare Turnstile keys)_

1. **PR:** open a PR from `claude/pensive-hawking-gkzw2r` into `main`, review it, merge.
2. **Vercel:** sign up with GitHub → Add New Project → import the repo (framework auto-detected) → add every env var from section 8 (production values) → Deploy. You get a `*.vercel.app` URL.
3. **Domain:** buy it (Cloudflare Registrar or Porkbun). Vercel → Project → Settings → Domains → add `yourdomain.com` and `www.yourdomain.com` (redirect www → apex). At the DNS provider, add **exactly the records Vercel shows** (an A record for the apex and a CNAME for `www`). On Cloudflare, set them to **DNS only (grey cloud)**. Wait for "Valid Configuration" and the automatic HTTPS certificate.
4. **Turnstile:** Cloudflare → Turnstile → add a widget with hostnames `yourdomain.com` and `localhost` → put the real keys in Vercel.
5. **Resend domain:** Resend → Domains → add `yourdomain.com` → add the DNS records it lists (SPF `TXT` and `MX` on the `send` subdomain, DKIM `TXT` at `resend._domainkey`) plus a DMARC record `_dmarc` TXT `v=DMARC1; p=none;` → Verify. Set `CONTACT_FROM_EMAIL=Johan Chuqui <contact@yourdomain.com>`.
6. **Supabase:** Authentication → URL Configuration: **Site URL** = `https://yourdomain.com`; Redirect URLs = `https://yourdomain.com/**`, `http://localhost:3000/**`.
7. Set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in Vercel → Redeploy.
8. **Smoke test in production:** home, a project, a post, the theme toggle, the résumé, contact (email arrives), login → admin → edit → logout, and a draft is invisible.

- **Done when:** the site is live on the custom domain over HTTPS and the README has a "Deploy" section.

---

## 11. Testing & verification (lightweight)

| When                               | Check                                                                                                                                                                                                                                                                  |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every milestone                    | `npm run lint`, `npm run typecheck`, `npm run build` all pass; open the changed pages in both themes at phone and desktop widths                                                                                                                                       |
| M2 onward, and after any migration | `npx tsx scripts/check-rls.ts`. It uses the **publishable key only** and asserts: drafts are not returned; inserting/updating/deleting posts and projects fails; `contact_messages` select returns nothing or errors; `admins` is unreadable; upload to `media` fails. |
| M5                                 | Manual: logged out → redirect; non-admin user → denied; admin → allowed                                                                                                                                                                                                |
| M6–M8                              | Manual: try invalid inputs (empty title, bad slug, missing alt, 6 MB file, `.svg`) and confirm friendly errors                                                                                                                                                         |
| M8                                 | Manual: honeypot filled (fake success, no row), rate limit (4th message rejected), Turnstile test "always fails" key `2x0000000000000000000000000000000AA` → rejected                                                                                                  |
| M9                                 | Lighthouse + keyboard-only walkthrough                                                                                                                                                                                                                                 |
| M10                                | Security review subagent                                                                                                                                                                                                                                               |
| M11                                | Production smoke test (M11, step 8)                                                                                                                                                                                                                                    |

Optional, if time allows: **Vitest** unit tests for `slugify`, `readingTime` and the zod schemas.

---

## 12. Open questions / what the owner provides later

- [ ] Bio text for About (2–3 short paragraphs) and a one-line hero tagline
- [ ] Headshot photo (square, ≥ 600px) and its alt text
- [ ] Résumé PDF (replace `public/resume.pdf`, commit, push)
- [ ] LinkedIn URL and GitHub username for the header/footer
- [ ] Public email to show on the site (`johanchuqui05@gmail.com`, or `hi@yourdomain.com` later?)
- [ ] Real project content: titles, summaries, write-ups, screenshots, repo/demo links
- [ ] First 1–2 real blog posts
- [ ] Domain name choice (e.g. `johanchuqui.com` / `.dev`) and which registrar
- [ ] Preferred accent color, if not emerald
- [ ] Whether to add analytics later (e.g. Vercel Web Analytics, privacy-friendly and free tier)
