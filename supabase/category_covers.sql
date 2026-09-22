-- V32 — capas editáveis das categorias
-- Execute uma única vez no SQL Editor com Role: Postgres.

alter table public.categories
  add column if not exists cover_url text,
  add column if not exists cover_storage_path text;

-- As permissões/RLS de UPDATE da tabela categories já protegem esta alteração:
-- somente usuários autenticados que passam por public.is_admin() podem editar.
