# Banco de dados e Supabase

## Serviços utilizados

O projeto usa três partes do Supabase:

1. **PostgreSQL** — catálogo e configurações;
2. **Auth** — sessão administrativa;
3. **Storage** — fotos e vídeos.

## Relacionamentos

```text
categories
    │ 1
    │
    └──── N products
              │
              ├──── N product_media
              │
              └──── N product_variants

auth.users
    │ 1
    └──── 0..1 admins

store_settings
    └──── linha única: id = 1
```

## `categories`

| Campo | Função |
|---|---|
| `id` | UUID da categoria |
| `name` | nome único |
| `slug` | slug único |
| `sort_order` | ordem na loja |
| `is_visible` | controla se a categoria aparece ao público |
| `cover_url` | URL pública da capa |
| `cover_storage_path` | caminho da capa no Storage |
| `created_at` | data de criação |

## `products`

| Campo | Função |
|---|---|
| `id` | UUID |
| `category_id` | referência para `categories` |
| `name` | nome do produto |
| `slug` | slug único |
| `description` | descrição |
| `price` | preço >= 0 |
| `status` | `available`, `sold_out` ou `hidden` |
| `is_new` | controla indicação de novidade |
| `is_demo` | produto demonstrativo |
| `audience` | Feminino, Masculino ou Infantil para casos aplicáveis |
| `created_at` | criação |
| `updated_at` | atualização automática por trigger |

A exclusão da categoria é `restrict`: uma categoria com produtos relacionados não deve desaparecer silenciosamente.

## `product_media`

| Campo | Função |
|---|---|
| `product_id` | produto relacionado |
| `media_type` | `image` ou `video` |
| `url` | URL da mídia |
| `storage_path` | caminho no Storage |
| `is_cover` | indica capa do produto |
| `sort_order` | ordem da galeria |

A exclusão do produto remove a mídia relacionada no banco por `ON DELETE CASCADE`.

## `product_variants`

| Campo | Função |
|---|---|
| `product_id` | produto relacionado |
| `size` | tamanho |
| `color` | cor |
| `stock_quantity` | estoque opcional, nunca negativo |
| `active` | variante ativa/inativa |

## `admins`

A tabela atual é propositalmente simples:

| Campo | Função |
|---|---|
| `user_id` | UUID que referencia `auth.users(id)` |
| `created_at` | data de autorização |

A presença do UID nessa tabela significa que o usuário autenticado tem papel administrativo.

O arquivo histórico `v25_admin_display_name.sql` não é requisito do painel atual.

## `store_settings`

Existe somente uma linha (`id = 1`).

Campos principais:

- nome da loja;
- WhatsApp;
- Instagram;
- endereço;
- horário;
- retirada;
- entrega;
- observações de entrega/taxa;
- Pix;
- cartão;
- dinheiro;
- textos do rodapé;
- `updated_at`.

## Funções e triggers

### `public.set_updated_at()`

Atualiza `products.updated_at` antes de UPDATE.

### `public.touch_store_settings_updated_at()`

Atualiza `store_settings.updated_at`.

### `public.is_admin()`

Função `SECURITY DEFINER` que verifica se `auth.uid()` existe em `public.admins`.

É a fonte de autorização usada pelo painel e pelas políticas de escrita.

## RLS

RLS está habilitado nas tabelas principais.

### Leitura pública

- categorias: o público lê apenas categorias com `is_visible = true`;
- produtos: o público lê `available`/`sold_out` somente quando a categoria também está visível;
- mídia/variantes: acompanham a visibilidade do produto e da categoria;
- administradores autorizados possuem políticas de leitura para gerenciar também categorias e produtos ocultos;
- configurações da loja: leitura pública;
- admins: o usuário autenticado pode ler somente a própria linha.

### Escrita

INSERT/UPDATE/DELETE nas tabelas administráveis exigem:

```text
public.is_admin() = true
```

Isso impede que um usuário simplesmente autenticado altere o catálogo.

## Storage

Bucket público:

```text
product-media
```

Uso:

- fotos de produtos;
- vídeos de produtos;
- capas personalizadas das categorias.

Leitura é pública para permitir a vitrine.
Escrita/alteração/exclusão exige usuário administrativo.

## Arquivos SQL

### `supabase/schema.sql`

Estrutura principal, RLS, função administrativa e bucket.

### `supabase/seed.sql`

Carga inicial do catálogo de desenvolvimento.

### `supabase/store_settings.sql`

Cria configurações dinâmicas da loja.

### `supabase/category_covers.sql`

Adiciona campos das capas nas categorias.

### `supabase/v42_category_visibility.sql`

Adiciona `categories.is_visible` e ajusta as políticas de leitura para esconder categorias/produtos do público sem impedir a administração dos registros ocultos.

### `supabase/v25_admin_display_name.sql`

Arquivo histórico de uma abordagem posteriormente abandonada. Não usar como requisito para o estado atual sem uma necessidade explícita.

## Regra de segurança

Nunca colocar no frontend:

- `service_role`;
- senha do PostgreSQL;
- senha da administradora;
- tokens privados.

As variáveis `VITE_*` usadas pelo navegador devem ser apenas as chaves públicas previstas para aplicações frontend e protegidas por RLS.
