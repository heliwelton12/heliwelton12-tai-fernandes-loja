-- Tai Fernandes — estrutura do catálogo / painel administrativo
create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  subtitle text not null default 'Confira nossos produtos' check (char_length(subtitle) <= 120),
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  cover_url text,
  cover_storage_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories(id) on delete restrict,
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null check (price >= 0),
  status text not null default 'available'
    check (status in ('available', 'sold_out', 'hidden')),
  is_new boolean not null default true,
  is_demo boolean not null default false,
  audience text check (audience is null or audience in ('Feminino', 'Masculino', 'Infantil')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  media_type text not null check (media_type in ('image', 'video')),
  url text not null,
  storage_path text,
  is_cover boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (product_id, url)
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  size text,
  color text,
  stock_quantity integer check (stock_quantity is null or stock_quantity >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admins
    where user_id = auth.uid()
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;

-- RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_media enable row level security;
alter table public.product_variants enable row level security;
alter table public.admins enable row level security;

revoke all on table public.categories from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.product_media from anon, authenticated;
revoke all on table public.product_variants from anon, authenticated;
revoke all on table public.admins from anon, authenticated;

grant select on table public.categories to anon, authenticated;
grant select on table public.products to anon, authenticated;
grant select on table public.product_media to anon, authenticated;
grant select on table public.product_variants to anon, authenticated;

grant insert, update, delete on table public.categories to authenticated;
grant insert, update, delete on table public.products to authenticated;
grant insert, update, delete on table public.product_media to authenticated;
grant insert, update, delete on table public.product_variants to authenticated;
grant select on table public.admins to authenticated;

drop policy if exists categories_public_read on public.categories;
drop policy if exists categories_public_read_visible on public.categories;
create policy categories_public_read_visible
on public.categories for select
to anon, authenticated
using (is_visible = true);

drop policy if exists categories_admin_read_all on public.categories;
create policy categories_admin_read_all
on public.categories for select
to authenticated
using (public.is_admin());

drop policy if exists products_public_read on public.products;
create policy products_public_read
on public.products for select
to anon, authenticated
using (
  status in ('available', 'sold_out')
  and exists (
    select 1 from public.categories
    where categories.id = products.category_id
      and categories.is_visible = true
  )
);

drop policy if exists products_admin_read_all on public.products;
create policy products_admin_read_all
on public.products for select
to authenticated
using (public.is_admin());

drop policy if exists media_public_read on public.product_media;
create policy media_public_read
on public.product_media for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products
    join public.categories on categories.id = products.category_id
    where products.id = product_media.product_id
      and products.status in ('available', 'sold_out')
      and categories.is_visible = true
  )
);

drop policy if exists media_admin_read_all on public.product_media;
create policy media_admin_read_all
on public.product_media for select
to authenticated
using (public.is_admin());

drop policy if exists variants_public_read on public.product_variants;
create policy variants_public_read
on public.product_variants for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products
    join public.categories on categories.id = products.category_id
    where products.id = product_variants.product_id
      and products.status in ('available', 'sold_out')
      and categories.is_visible = true
  )
);

drop policy if exists variants_admin_read_all on public.product_variants;
create policy variants_admin_read_all
on public.product_variants for select
to authenticated
using (public.is_admin());

drop policy if exists admins_read_self on public.admins;
create policy admins_read_self
on public.admins for select
to authenticated
using (user_id = auth.uid());

drop policy if exists categories_admin_insert on public.categories;
create policy categories_admin_insert on public.categories
for insert to authenticated with check (public.is_admin());
drop policy if exists categories_admin_update on public.categories;
create policy categories_admin_update on public.categories
for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists categories_admin_delete on public.categories;
create policy categories_admin_delete on public.categories
for delete to authenticated using (public.is_admin());

drop policy if exists products_admin_insert on public.products;
create policy products_admin_insert on public.products
for insert to authenticated with check (public.is_admin());
drop policy if exists products_admin_update on public.products;
create policy products_admin_update on public.products
for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists products_admin_delete on public.products;
create policy products_admin_delete on public.products
for delete to authenticated using (public.is_admin());

drop policy if exists media_admin_insert on public.product_media;
create policy media_admin_insert on public.product_media
for insert to authenticated with check (public.is_admin());
drop policy if exists media_admin_update on public.product_media;
create policy media_admin_update on public.product_media
for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists media_admin_delete on public.product_media;
create policy media_admin_delete on public.product_media
for delete to authenticated using (public.is_admin());

drop policy if exists variants_admin_insert on public.product_variants;
create policy variants_admin_insert on public.product_variants
for insert to authenticated with check (public.is_admin());
drop policy if exists variants_admin_update on public.product_variants;
create policy variants_admin_update on public.product_variants
for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists variants_admin_delete on public.product_variants;
create policy variants_admin_delete on public.product_variants
for delete to authenticated using (public.is_admin());

-- Storage público para fotos e vídeos de produtos.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-media',
  'product-media',
  true,
  26214400,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists product_media_public_storage_read on storage.objects;
create policy product_media_public_storage_read
on storage.objects for select
to public
using (bucket_id = 'product-media');

drop policy if exists product_media_admin_storage_insert on storage.objects;
create policy product_media_admin_storage_insert
on storage.objects for insert
to authenticated
with check (bucket_id = 'product-media' and public.is_admin());

drop policy if exists product_media_admin_storage_update on storage.objects;
create policy product_media_admin_storage_update
on storage.objects for update
to authenticated
using (bucket_id = 'product-media' and public.is_admin())
with check (bucket_id = 'product-media' and public.is_admin());

drop policy if exists product_media_admin_storage_delete on storage.objects;
create policy product_media_admin_storage_delete
on storage.objects for delete
to authenticated
using (bucket_id = 'product-media' and public.is_admin());
