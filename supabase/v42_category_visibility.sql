-- V42 — visibilidade de categorias + leitura administrativa completa
-- Execute uma única vez no SQL Editor com Role: Postgres.

alter table public.categories
  add column if not exists is_visible boolean not null default true;

update public.categories
set is_visible = true
where is_visible is null;

-- Categorias públicas: o público vê apenas categorias visíveis.
drop policy if exists categories_public_read on public.categories;
drop policy if exists categories_public_read_visible on public.categories;
create policy categories_public_read_visible
on public.categories for select
to anon, authenticated
using (is_visible = true);

-- A administradora precisa continuar vendo categorias ocultas no painel.
drop policy if exists categories_admin_read_all on public.categories;
create policy categories_admin_read_all
on public.categories for select
to authenticated
using (public.is_admin());

-- Produtos públicos só aparecem quando o próprio produto está público
-- e a categoria relacionada também está visível.
drop policy if exists products_public_read on public.products;
create policy products_public_read
on public.products for select
to anon, authenticated
using (
  status in ('available', 'sold_out')
  and exists (
    select 1
    from public.categories
    where categories.id = products.category_id
      and categories.is_visible = true
  )
);

-- O painel precisa ler também produtos com status Oculto.
drop policy if exists products_admin_read_all on public.products;
create policy products_admin_read_all
on public.products for select
to authenticated
using (public.is_admin());

-- Mídias públicas acompanham a visibilidade do produto e da categoria.
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

-- Variações seguem a mesma regra.
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
