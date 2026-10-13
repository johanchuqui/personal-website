-- 004: Automatic timestamps.
-- Before every insert/update on posts and projects:
--   - updated_at is set to now()
--   - published_at is set the first time status becomes 'published'
--     (it's kept if you later unpublish and republish, so the date stays put)

create or replace function public.handle_content_timestamps()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

create trigger posts_timestamps
  before insert or update on public.posts
  for each row execute function public.handle_content_timestamps();

create trigger projects_timestamps
  before insert or update on public.projects
  for each row execute function public.handle_content_timestamps();
