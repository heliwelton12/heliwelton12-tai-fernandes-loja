-- V46 — edição segura das categorias
-- Execute uma única vez no SQL Editor com Role: Postgres.

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
