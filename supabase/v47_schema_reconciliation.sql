-- V47 — reconciliação do schema antes da publicação
-- Motivo: a auditoria Lighthouse detectou uma resposta 400 na primeira leitura de categories.
-- A única coluna presente na leitura principal e ausente no fallback é subtitle.
-- Esta migração é idempotente e alinha o banco de produção ao schema versionado do projeto.

begin;

alter table public.categories
  add column if not exists subtitle text;

update public.categories
set subtitle = case name
  when 'Lingeries' then 'Delicadeza para todos os dias'
  when 'Conjuntos' then 'Combinações que encantam'
  when 'Camisolas' then 'Leveza e feminilidade'
  when 'Pijamas' then 'Feminino, masculino e infantil'
  when 'Sex Shop' then 'Autocuidado com discrição'
  else 'Confira nossos produtos'
end
where subtitle is null or btrim(subtitle) = '';

alter table public.categories
  alter column subtitle set default 'Confira nossos produtos';

alter table public.categories
  alter column subtitle set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'categories_subtitle_length'
      and conrelid = 'public.categories'::regclass
  ) then
    alter table public.categories
      add constraint categories_subtitle_length
      check (char_length(subtitle) <= 120);
  end if;
end
$$;

commit;

-- Validação: deve retornar subtitle sem erro e sem valores nulos/vazios.
select id, name, slug, subtitle, sort_order, is_visible
from public.categories
order by sort_order, name;
