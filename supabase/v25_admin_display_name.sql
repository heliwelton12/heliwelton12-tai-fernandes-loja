-- V25 — nome público da administradora sem alterar auth.users
alter table public.admins
add column if not exists display_name text;

-- Autoriza a Taís e salva o nome exibido no painel.
insert into public.admins (user_id, display_name)
values ('e5161c23-b942-4d12-a1de-f5166700f737', 'Taís Fernandes')
on conflict (user_id)
do update set display_name = excluded.display_name;

-- Conferência
select user_id, display_name, created_at
from public.admins
order by created_at;
