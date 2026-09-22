-- Tai Fernandes Moda Íntima — V44
-- AUDITORIA DE SEGURANÇA SOMENTE LEITURA
-- Execute no Supabase SQL Editor com Role: Postgres.
-- Este arquivo NÃO cria, altera ou remove tabelas, policies, grants ou dados.

-- 1) RLS habilitado/forçado nas tabelas relevantes
select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as rls_forced
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relkind = 'r'
  and c.relname in (
    'admins',
    'categories',
    'products',
    'product_media',
    'product_variants',
    'store_settings'
  )
order by c.relname;

-- 2) Policies das tabelas públicas
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
    'admins',
    'categories',
    'products',
    'product_media',
    'product_variants',
    'store_settings'
  )
order by tablename, cmd, policyname;

-- 3) Grants efetivos para anon/authenticated
select
  grantee,
  table_schema,
  table_name,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in (
    'admins',
    'categories',
    'products',
    'product_media',
    'product_variants',
    'store_settings'
  )
  and grantee in ('anon', 'authenticated')
order by table_name, grantee, privilege_type;

-- 4) Propriedades da função de autorização administrativa
select
  n.nspname as schema_name,
  p.proname as function_name,
  p.prosecdef as security_definer,
  p.provolatile as volatility,
  pg_get_function_identity_arguments(p.oid) as arguments,
  pg_get_userbyid(p.proowner) as owner
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'is_admin';

-- 5) Quem pode executar public.is_admin()
select
  routine_schema,
  routine_name,
  grantee,
  privilege_type
from information_schema.routine_privileges
where routine_schema = 'public'
  and routine_name = 'is_admin'
order by grantee;

-- 6) Bucket usado pelo catálogo
select
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
from storage.buckets
where id = 'product-media';

-- 7) Policies do Storage
select
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'storage'
  and tablename = 'objects'
order by cmd, policyname;

-- 8) Confirmação de que a tabela admins não expõe colunas de senha
select
  table_schema,
  table_name,
  column_name,
  data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'admins'
order by ordinal_position;

-- Fim da auditoria de inventário.
-- Não execute migrações corretivas até revisar estes resultados.
