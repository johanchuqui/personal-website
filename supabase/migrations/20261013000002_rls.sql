-- 002: Access rules (Row Level Security).
--
-- Supabase exposes tables over an HTTP API using two roles:
--   anon          = any visitor (uses the public "publishable" key)
--   authenticated = a logged-in user
-- With RLS enabled, a role can only touch rows a policy allows. No matching
-- policy = no access. We also set table-level GRANTs explicitly so the
-- permissions are spelled out here rather than relying on defaults.

-- is_admin(): true only if the current logged-in user is in public.admins.
-- "security definer" lets it read admins even though normal users can't.
-- The empty search_path prevents schema-hijacking tricks.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

-- Start from zero, then grant exactly what's needed.
revoke all on public.admins, public.posts, public.projects, public.contact_messages
  from anon, authenticated;

-- Enable RLS on every table.
alter table public.admins enable row level security;
alter table public.posts enable row level security;
alter table public.projects enable row level security;
alter table public.contact_messages enable row level security;

-- admins: no policies and no grants for anon/authenticated, so it can't be
-- read or changed through the API at all.

-- posts: everyone can read published posts; the admin can read and write all.
grant select on public.posts to anon, authenticated;
grant insert, update, delete on public.posts to authenticated;

create policy "Published posts are public; admin sees all"
  on public.posts for select to anon, authenticated
  using (status = 'published' or (select public.is_admin()));

create policy "Admin can create posts"
  on public.posts for insert to authenticated
  with check ((select public.is_admin()));

create policy "Admin can update posts"
  on public.posts for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admin can delete posts"
  on public.posts for delete to authenticated
  using ((select public.is_admin()));

-- projects: same rules as posts.
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

create policy "Published projects are public; admin sees all"
  on public.projects for select to anon, authenticated
  using (status = 'published' or (select public.is_admin()));

create policy "Admin can create projects"
  on public.projects for insert to authenticated
  with check ((select public.is_admin()));

create policy "Admin can update projects"
  on public.projects for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admin can delete projects"
  on public.projects for delete to authenticated
  using ((select public.is_admin()));

-- contact_messages: visitors get NO access, not even insert. New messages
-- are inserted only by the server (secret key) after spam checks pass.
-- The admin can read them, mark read/unread (only that column), and delete.
grant select, delete on public.contact_messages to authenticated;
grant update (is_read) on public.contact_messages to authenticated;

create policy "Admin can read messages"
  on public.contact_messages for select to authenticated
  using ((select public.is_admin()));

create policy "Admin can mark messages read"
  on public.contact_messages for update to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

create policy "Admin can delete messages"
  on public.contact_messages for delete to authenticated
  using ((select public.is_admin()));

-- The server-side secret key uses the service_role, which bypasses RLS.
grant all on public.admins, public.posts, public.projects, public.contact_messages
  to service_role;
