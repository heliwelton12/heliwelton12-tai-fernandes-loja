-- V44 — endurecimento de segurança
-- Execute uma única vez no SQL Editor do Supabase com Role: Postgres.
-- Esta migração não altera produtos, categorias, pedidos ou contas.

begin;

-- A função é usada pelas policies administrativas.
-- O visitante anônimo não precisa chamá-la diretamente.
revoke execute on function public.is_admin() from public;
revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to service_role;

-- Limita uploads do catálogo a 25 MB por arquivo e aos formatos usados pelo painel.
update storage.buckets
set
  file_size_limit = 26214400,
  allowed_mime_types = array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'video/mp4',
    'video/webm'
  ]::text[]
where id = 'product-media';

commit;

-- Verificação pós-migração (somente leitura)
select
  id,
  public,
  file_size_limit,
  allowed_mime_types
from storage.buckets
where id = 'product-media';

select
  routine_schema,
  routine_name,
  grantee,
  privilege_type
from information_schema.routine_privileges
where routine_schema = 'public'
  and routine_name = 'is_admin'
order by grantee;
