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

## Editing content

_Coming in later milestones:_ blog posts and projects are managed from the
admin area at `/admin`.

## Deploying

_Coming in milestone M11:_ step-by-step Vercel + custom domain guide.
