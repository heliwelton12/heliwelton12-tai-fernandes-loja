-- Categorias
insert into public.categories (name, slug, sort_order) values
  ('Lingeries', 'lingeries', 1),
  ('Conjuntos', 'conjuntos', 2),
  ('Camisolas', 'camisolas', 3),
  ('Pijamas', 'pijamas', 4),
  ('Sex Shop', 'sex-shop', 5)
on conflict (slug) do update
set name = excluded.name, sort_order = excluded.sort_order;

-- Produtos reais já cadastrados no frontend
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Lingerie 01', 'lingerie-01', 40.00, 'available', false, false from public.categories where slug='lingeries'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_demo=false;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Lingerie 02', 'lingerie-02', 40.00, 'available', false, false from public.categories where slug='lingeries'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_demo=false;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Lingerie 03', 'lingerie-03', 26.00, 'available', false, false from public.categories where slug='lingeries'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_demo=false;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Lingerie 04', 'lingerie-04', 40.00, 'available', false, false from public.categories where slug='lingeries'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_demo=false;

insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Produto Sex Shop 01', 'sexshop-01', 55.00, 'available', true, false from public.categories where slug='sex-shop'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_new=true, is_demo=false;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Produto Sex Shop 02', 'sexshop-02', 90.00, 'available', true, false from public.categories where slug='sex-shop'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_new=true, is_demo=false;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Produto Sex Shop 03', 'sexshop-03', 35.00, 'available', true, false from public.categories where slug='sex-shop'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_new=true, is_demo=false;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Produto Sex Shop 04', 'sexshop-04', 60.00, 'available', true, false from public.categories where slug='sex-shop'
on conflict (slug) do update set price=excluded.price, status=excluded.status, is_new=true, is_demo=false;

-- Fotos locais atuais. Depois o painel pode substituí-las por arquivos no Supabase Storage.
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/lingerie-01.webp', true, 0 from public.products where slug='lingerie-01'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/lingerie-02.webp', true, 0 from public.products where slug='lingerie-02'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/lingerie-03.webp', true, 0 from public.products where slug='lingerie-03'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/lingerie-04.webp', true, 0 from public.products where slug='lingerie-04'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/sexshop-01.webp', true, 0 from public.products where slug='sexshop-01'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/sexshop-02.webp', true, 0 from public.products where slug='sexshop-02'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/sexshop-03.webp', true, 0 from public.products where slug='sexshop-03'
on conflict (product_id, url) do nothing;
insert into public.product_media (product_id, media_type, url, is_cover, sort_order)
select id, 'image', '/products/sexshop-04.webp', true, 0 from public.products where slug='sexshop-04'
on conflict (product_id, url) do nothing;

-- Produtos demonstrativos: Conjuntos
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Conjunto Rosé', 'demo-conjunto-01', 59.90, 'available', false, true from public.categories where slug='conjuntos'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Conjunto Delicata', 'demo-conjunto-02', 64.90, 'available', false, true from public.categories where slug='conjuntos'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Conjunto Belle', 'demo-conjunto-03', 54.90, 'available', false, true from public.categories where slug='conjuntos'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Conjunto Essenza', 'demo-conjunto-04', 69.90, 'available', false, true from public.categories where slug='conjuntos'
on conflict (slug) do nothing;

-- Camisolas
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Camisola Luna', 'demo-camisola-01', 74.90, 'available', false, true from public.categories where slug='camisolas'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Camisola Serena', 'demo-camisola-02', 79.90, 'available', false, true from public.categories where slug='camisolas'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Camisola Aurora', 'demo-camisola-03', 69.90, 'available', false, true from public.categories where slug='camisolas'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo)
select id, 'Camisola Encanto', 'demo-camisola-04', 84.90, 'available', false, true from public.categories where slug='camisolas'
on conflict (slug) do nothing;

-- Pijamas
insert into public.products (category_id, name, slug, price, status, is_new, is_demo, audience)
select id, 'Pijama Feminino Confort', 'demo-pijama-fem-01', 89.90, 'available', false, true, 'Feminino' from public.categories where slug='pijamas'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo, audience)
select id, 'Pijama Feminino Soft', 'demo-pijama-fem-02', 94.90, 'available', false, true, 'Feminino' from public.categories where slug='pijamas'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo, audience)
select id, 'Pijama Masculino Classic', 'demo-pijama-masc-01', 99.90, 'available', false, true, 'Masculino' from public.categories where slug='pijamas'
on conflict (slug) do nothing;
insert into public.products (category_id, name, slug, price, status, is_new, is_demo, audience)
select id, 'Pijama Infantil Soninho', 'demo-pijama-inf-01', 69.90, 'available', false, true, 'Infantil' from public.categories where slug='pijamas'
on conflict (slug) do nothing;

-- Variações dos produtos demonstrativos.
-- O painel substitui/recria estas linhas quando tamanhos/cores forem editados.
insert into public.product_variants (product_id, size, color, stock_quantity, active)
select p.id, s.size, c.color, null, true
from public.products p
cross join (values ('P'),('M'),('G')) as s(size)
cross join (values ('Rosé'),('Preto')) as c(color)
where p.slug='demo-conjunto-01'
  and not exists (select 1 from public.product_variants v where v.product_id=p.id);

insert into public.product_variants (product_id, size, color, stock_quantity, active)
select p.id, s.size, c.color, null, true
from public.products p
cross join (values ('M'),('G'),('GG')) as s(size)
cross join (values ('Vinho'),('Preto')) as c(color)
where p.slug='demo-camisola-02'
  and not exists (select 1 from public.product_variants v where v.product_id=p.id);

insert into public.product_variants (product_id, size, color, stock_quantity, active)
select p.id, s.size, c.color, null, true
from public.products p
cross join (values ('P'),('M'),('G'),('GG')) as s(size)
cross join (values ('Rosé'),('Azul')) as c(color)
where p.slug='demo-pijama-fem-01'
  and not exists (select 1 from public.product_variants v where v.product_id=p.id);
