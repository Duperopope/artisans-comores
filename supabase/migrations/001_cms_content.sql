-- CMS content store for Hero / Services / Contact sections.
-- Single-row table keyed by `id = 'singleton'`. Public read access (anon key),
-- write access restricted to the admin emails defined in src/lib/supabase.ts.

create table if not exists public.cms_content (
  id text primary key default 'singleton',
  content jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

alter table public.cms_content enable row level security;

drop policy if exists "cms_content_public_read" on public.cms_content;
create policy "cms_content_public_read"
  on public.cms_content
  for select
  using (true);

drop policy if exists "cms_content_admin_write" on public.cms_content;
create policy "cms_content_admin_write"
  on public.cms_content
  for all
  to authenticated
  using (
    lower(coalesce(auth.jwt() ->> 'email', '')) in (
      's.medjaher@gmail.com',
      's.medjajher@gmail.com'
    )
  )
  with check (
    lower(coalesce(auth.jwt() ->> 'email', '')) in (
      's.medjaher@gmail.com',
      's.medjajher@gmail.com'
    )
  );

create or replace function public.cms_content_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists cms_content_touch_updated_at on public.cms_content;
create trigger cms_content_touch_updated_at
  before update on public.cms_content
  for each row execute function public.cms_content_touch_updated_at();
