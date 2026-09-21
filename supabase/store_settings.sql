-- V29 — Configurações editáveis da loja
-- Execute no SQL Editor com Role: Postgres.

create table if not exists public.store_settings (
  id smallint primary key default 1 check (id = 1),
  store_name text not null default 'Tai Fernandes Moda Íntima',
  whatsapp text not null default '5575981537356',
  instagram_url text not null default 'https://www.instagram.com/tf.modaintima2',
  instagram_handle text not null default '@tf.modaintima2',
  address text,
  service_hours text,
  pickup_enabled boolean not null default true,
  pickup_note text not null default 'O local e o horário da retirada são combinados pelo WhatsApp.',
  delivery_enabled boolean not null default true,
  delivery_note text not null default 'A disponibilidade da entrega é confirmada pelo WhatsApp.',
  delivery_fee_note text not null default 'A taxa de entrega é confirmada pelo WhatsApp.',
  accept_pix boolean not null default true,
  accept_card boolean not null default true,
  accept_cash boolean not null default true,
  footer_about text not null default 'Moda íntima escolhida para valorizar conforto, confiança e beleza em cada detalhe.',
  footer_tagline text not null default 'Mais que moda íntima, é sobre você.',
  updated_at timestamptz not null default now()
);

insert into public.store_settings (id)
values (1)
on conflict (id) do nothing;

alter table public.store_settings enable row level security;

revoke all on table public.store_settings from anon, authenticated;
grant select on table public.store_settings to anon, authenticated;
grant insert, update on table public.store_settings to authenticated;

drop policy if exists store_settings_public_read on public.store_settings;
create policy store_settings_public_read
on public.store_settings for select
to anon, authenticated
using (true);

drop policy if exists store_settings_admin_insert on public.store_settings;
create policy store_settings_admin_insert
on public.store_settings for insert
to authenticated
with check (public.is_admin());

drop policy if exists store_settings_admin_update on public.store_settings;
create policy store_settings_admin_update
on public.store_settings for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create or replace function public.touch_store_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists store_settings_updated_at on public.store_settings;
create trigger store_settings_updated_at
before update on public.store_settings
for each row execute function public.touch_store_settings_updated_at();
