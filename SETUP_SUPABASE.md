# Conectar a Tai Fernandes ao Supabase

A V19 já tem o frontend da loja e o painel administrativo preparados para o Supabase.
Sem as variáveis de ambiente, a loja continua funcionando com o catálogo local de demonstração.

## 1. Criar o projeto

Crie um projeto novo no Supabase.

## 2. Criar tabelas, segurança e Storage

No painel do Supabase, abra **SQL Editor** e execute o arquivo:

`supabase/schema.sql`

Ele cria:

- categorias;
- produtos;
- fotos e vídeos;
- variações de tamanho/cor;
- administradores;
- regras RLS;
- bucket público `product-media`.

## 3. Colocar o catálogo atual no banco

No SQL Editor, execute:

`supabase/seed.sql`

Isso leva para o banco:

- 4 lingeries reais;
- 4 produtos reais de Sex Shop;
- Conjuntos, Camisolas e Pijamas demonstrativos.

A irmã pode depois excluir os demonstrativos no painel e cadastrar os reais.

## 4. Criar o login da administradora

No Supabase, crie um usuário em **Authentication > Users** com o e-mail da administradora.

Depois descubra o UUID desse usuário com:

```sql
select id, email
from auth.users
order by created_at desc;
```

Copie o `id` e execute:

```sql
insert into public.admins (user_id)
values ('COLE-O-UUID-AQUI');
```

## 5. Colocar as chaves no projeto

Copie `.env.example` para `.env.local`.

Preencha:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SUA-CHAVE-PUBLICAVEL
```

Nunca coloque uma `service_role` no frontend.

## 6. Instalar e rodar

```powershell
npm install
npm run dev -- --host
```

Loja:

`http://localhost:5173/`

Painel:

`http://localhost:5173/admin`

## 7. O que o painel já faz

- login da administradora;
- cadastrar produto;
- editar produto;
- excluir produto;
- preço;
- categoria;
- descrição;
- status: Disponível / Esgotado / Oculto;
- marcar como Novidade;
- marcar/desmarcar Demonstração;
- tamanhos;
- cores;
- público de Pijamas;
- várias fotos;
- vídeo MP4/WebM;
- escolher foto de capa;
- remover mídia.

## 8. Netlify

Quando publicar, cadastre as mesmas variáveis no painel do Netlify:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

O `netlify.toml` inclui redirecionamento SPA para permitir abrir `/admin` diretamente.
