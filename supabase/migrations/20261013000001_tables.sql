-- 001: Tables and indexes.
-- Each table's rules (who can read/write) live in the next migration (RLS).
-- CHECK constraints repeat the app's validation on purpose: the database is
-- the last line of defense if a bug ever lets bad data through.

-- Accounts allowed to manage the site. Only rows added by hand in the SQL
-- editor make someone an admin; logging in alone grants nothing.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 100),
  title text not null check (char_length(title) between 1 and 200),
  excerpt text check (char_length(excerpt) <= 300),
  content_md text not null default '' check (char_length(content_md) <= 100000),
  cover_image_url text check (cover_image_url ~ '^https://'),
  cover_image_alt text check (char_length(cover_image_alt) <= 300),
  tags text[] not null default '{}' check (cardinality(tags) <= 20),
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Alt text is required whenever there is a cover image (accessibility).
  constraint posts_cover_alt_required
    check (cover_image_url is null or char_length(coalesce(cover_image_alt, '')) > 0)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 100),
  title text not null check (char_length(title) between 1 and 200),
  summary text not null check (char_length(summary) between 1 and 300),
  description_md text not null default '' check (char_length(description_md) <= 100000),
  category text not null check (category in ('data', 'software', 'creative')),
  tech text[] not null default '{}' check (cardinality(tech) <= 30),
  tags text[] not null default '{}' check (cardinality(tags) <= 20),
  github_url text check (github_url ~ '^https://'),
  demo_url text check (demo_url ~ '^https://'),
  cover_image_url text check (cover_image_url ~ '^https://'),
  cover_image_alt text check (char_length(cover_image_alt) <= 300),
  featured boolean not null default false,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_cover_alt_required
    check (cover_image_url is null or char_length(coalesce(cover_image_alt, '')) > 0)
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 254),
  message text not null check (char_length(message) between 10 and 5000),
  -- SHA-256 of the visitor's IP + a secret salt. Used only for rate limiting;
  -- the raw IP is never stored.
  ip_hash text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Indexes: make the common queries fast.
create index posts_status_published_at_idx on public.posts (status, published_at desc);
create index posts_tags_idx on public.posts using gin (tags);
create index projects_status_category_sort_idx on public.projects (status, category, sort_order);
create index projects_tags_idx on public.projects using gin (tags);
create index projects_featured_idx on public.projects (sort_order)
  where featured and status = 'published';
create index contact_messages_ip_created_idx on public.contact_messages (ip_hash, created_at desc);
create index contact_messages_created_idx on public.contact_messages (created_at desc);
