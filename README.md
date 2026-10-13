# Johan Chuqui — Personal Website

My personal site: blog, projects portfolio, and contact form, with a private
admin area for managing content.

Built with **Next.js 16** (App Router, TypeScript), **Tailwind CSS v4**,
**Supabase** (database, login, image storage) and deployed on **Vercel**.
See [`PLAN.md`](./PLAN.md) for the full design and build order.

## Prerequisites

- [Node.js](https://nodejs.org) 20 or newer (`node -v` to check)
- npm (comes with Node)

## Run it locally

```bash
npm install          # first time only: downloads dependencies
cp .env.example .env.local   # then fill in values (see "Environment variables")
npm run dev          # starts the dev server
```

Open http://localhost:3000. The page reloads automatically when you save a file.
Stop the server with `Ctrl + C`.

## Useful commands

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Start the local dev server                                    |
| `npm run build`     | Build the production version (catches errors)                 |
| `npm run start`     | Run the production build locally                              |
| `npm run lint`      | Check code for common mistakes (ESLint)                       |
| `npm run typecheck` | Check TypeScript types                                        |
| `npm run format`    | Auto-format all files (Prettier)                              |
| `npm run check`     | Lint + typecheck + build, all at once. Run before committing. |

## Environment variables

Secrets live in `.env.local`, which is **git-ignored** and must never be
committed. [`.env.example`](./.env.example) lists every variable the site needs
and where to find each one. Variables starting with `NEXT_PUBLIC_` are visible in
the browser; all others stay on the server.

## Project structure

```
src/app/        pages and routes (each folder = a URL)
src/components/ reusable UI pieces
src/lib/        helpers: database clients, validation, site config
public/         static files served as-is (résumé, images)
supabase/       database migrations and seed data
```

## Database (Supabase)

The database structure lives in [`supabase/migrations/`](./supabase/migrations)
as plain SQL files. They create the tables, the security rules (row-level
security), the image storage bucket, and automatic timestamps. Sample content
is in [`supabase/seed.sql`](./supabase/seed.sql).

### First-time setup

1. **Connect your keys.** In the Supabase dashboard go to **Project Settings →
   API Keys** (and **Data API** for the URL). Copy `.env.example` to
   `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`: looks like `https://abcd1234.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: starts with `sb_publishable_`
   - `SUPABASE_SECRET_KEY`: starts with `sb_secret_`. **Never share this or
     commit it.** It bypasses all security rules.
2. **Link this folder to your project** (one time; opens your browser to log in):
   ```bash
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   ```
   The project ref is the `abcd1234` part of your project URL. It will ask for
   the database password you chose when creating the project.
3. **Create the tables and load the sample content:**
   ```bash
   npm run db:seed
   ```
4. **Prove the security rules work:**
   ```bash
   npm run db:check
   ```
   Every line should say `PASS`.

> No terminal? You can instead open **SQL Editor** in the Supabase dashboard
> and run each file in `supabase/migrations/` in order, then `supabase/seed.sql`.

### Changing the database later

1. Create a new migration: `npx supabase migration new <short-name>` and write
   SQL in the file it creates. Never edit a migration that's already applied.
2. Apply it: `npm run db:push`
3. Update the TypeScript types: `npm run db:types`
4. Re-run `npm run db:check`

### Database commands

| Command            | What it does                                    |
| ------------------ | ----------------------------------------------- |
| `npm run db:push`  | Apply new migrations to your Supabase project   |
| `npm run db:seed`  | Apply migrations and load the sample content    |
| `npm run db:types` | Regenerate `src/lib/supabase/database.types.ts` |
| `npm run db:check` | Security self-test using only the public key    |

## Editing content

- **Name, tagline, email, GitHub/LinkedIn links, nav menu:** edit
  [`src/lib/site.ts`](./src/lib/site.ts). Every page reads from it.
- **About page text and skills:** edit
  [`src/app/(site)/about/page.tsx`](<./src/app/(site)/about/page.tsx>).
- **Résumé:** replace `public/resume.pdf` with your file (keep the same name),
  then commit and push.
- **Colors:** all colors are tokens at the top of
  [`src/app/globals.css`](./src/app/globals.css) (`--accent` is the main one;
  light values in `:root`, dark values in `.dark`).
- _Coming later:_ blog posts and projects are managed from the admin area at
  `/admin`.

## Deploying

_Coming in milestone M11:_ step-by-step Vercel + custom domain guide.
