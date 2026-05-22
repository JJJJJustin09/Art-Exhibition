create extension if not exists pgcrypto;

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  mood text not null check (mood in ('landscape', 'still-life', 'city', 'figure', 'abstract')),
  story text,
  image_url text not null,
  image_path text,
  likes integer not null default 0,
  comments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.artworks enable row level security;

drop policy if exists "Public can read artworks" on public.artworks;
create policy "Public can read artworks"
on public.artworks
for select
using (true);

drop policy if exists "Public can add artworks" on public.artworks;
create policy "Public can add artworks"
on public.artworks
for insert
with check (true);

drop policy if exists "Public can read artwork images" on storage.objects;
create policy "Public can read artwork images"
on storage.objects
for select
using (bucket_id = 'artworks');

drop policy if exists "Public can upload artwork images" on storage.objects;
create policy "Public can upload artwork images"
on storage.objects
for insert
with check (bucket_id = 'artworks');

create or replace function public.increment_artwork_likes(artwork_id uuid, delta integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_likes integer;
begin
  if delta not in (-1, 1) then
    raise exception 'delta must be -1 or 1';
  end if;

  update public.artworks
  set likes = greatest(0, likes + delta)
  where id = artwork_id
  returning likes into new_likes;

  return coalesce(new_likes, 0);
end;
$$;

create or replace function public.add_artwork_comment(artwork_id uuid, body text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  new_comment jsonb;
  updated_comments jsonb;
begin
  new_comment := jsonb_build_object(
    'text', left(trim(body), 90),
    'at', 'Just now'
  );

  update public.artworks
  set comments = jsonb_insert(coalesce(comments, '[]'::jsonb), '{0}', new_comment)
  where id = artwork_id
  returning comments into updated_comments;

  return coalesce(updated_comments, '[]'::jsonb);
end;
$$;

grant execute on function public.increment_artwork_likes(uuid, integer) to anon, authenticated;
grant execute on function public.add_artwork_comment(uuid, text) to anon, authenticated;
