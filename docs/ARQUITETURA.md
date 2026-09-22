# Arquitetura do sistema

## Visão geral

A aplicação é uma SPA em React/Vite. A mesma build atende a vitrine e o painel administrativo. A escolha da interface é feita no frontend pela URL:

```text
/         → App.jsx      → loja pública
/admin    → AdminApp.jsx → painel administrativo
```

`src/main.jsx` verifica `window.location.pathname.startsWith('/admin')` e renderiza a aplicação correspondente.

## Diagrama simplificado

```text
Cliente / Administradora
          │
          ▼
   React + Vite (SPA)
          │
   ┌──────┴─────────┐
   │                │
   ▼                ▼
Loja pública      /admin
   │                │
   │                ├─ Supabase Auth
   │                └─ RPC public.is_admin()
   │
   ├──────────────┐
   ▼              ▼
Supabase DB    localStorage
   │              │
   ├─ categories  ├─ tf-cart
   ├─ products    ├─ tf-favorites
   ├─ media       ├─ tf-profile
   ├─ variants    └─ tf-adult-confirmed
   └─ settings
   │
   ▼
Supabase Storage
(product-media)
   │
   ▼
Fotos e vídeos

Checkout da loja
      │
      ▼
Mensagem montada no navegador
      │
      ▼
WhatsApp (wa.me)
```

## Frontend

### `App.jsx`

Responsável por:

- home;
- categorias;
- busca;
- novidades;
- cards de produtos;
- modal “Espiar”;
- favoritos;
- “Meus dados”;
- gate 18+;
- sacola;
- checkout;
- geração da mensagem do WhatsApp;
- leitura das configurações públicas da loja;
- identificação de sessão administrativa para exibir “Painel”.

### `AdminApp.jsx`

Responsável por:

- login/logout;
- autorização administrativa;
- formulário de produto;
- upload de mídias;
- catálogo agrupado;
- filtros e busca;
- configurações da loja;
- criação e ordenação de categorias;
- gerenciamento de capas das categorias.

### `catalogBackend.js`

Lê produtos, categoria, mídia e variantes do Supabase e converte o formato do banco para o formato consumido pela interface.

Se o Supabase não estiver configurado, a aplicação pode usar o catálogo local como fallback de desenvolvimento.

### `storeSettings.js`

Centraliza:

- valores padrão da loja;
- normalização do WhatsApp;
- leitura da linha única de `store_settings`;
- hook usado pela vitrine.

### `supabaseClient.js`

Cria o cliente somente quando as variáveis públicas estão disponíveis.

A sessão do Supabase Auth utiliza:

- persistência de sessão;
- refresh automático de token;
- detecção de sessão na URL.

## Estado e persistência

### Estado remoto

O conteúdo administrável vive no Supabase:

- produtos;
- categorias;
- mídia;
- variantes;
- configurações da loja;
- administradores autorizados.

### Estado local

Informações do cliente que não exigem conta são guardadas em `localStorage`.

Isso permite um checkout simples, sem cadastro obrigatório.

## Autenticação e autorização

O login usa Supabase Auth, mas autenticar não basta para entrar no painel.

Após a sessão existir, o frontend chama:

```text
public.is_admin()
```

A função consulta `public.admins` usando `auth.uid()`.

As operações protegidas no banco também usam RLS e `public.is_admin()`. Portanto, esconder botões no frontend não é a única barreira de segurança.

## Catálogo demonstrativo

Produtos marcados como demonstração podem existir no banco para desenvolvimento.

Em produção, a vitrine os oculta por padrão. A variável opcional `VITE_SHOW_DEMO_PRODUCTS=true` pode sobrescrever esse comportamento em um build específico de teste.

## Checkout

Não existe backend próprio para criação de pedido no estado atual.

A aplicação:

1. valida os campos;
2. calcula o total;
3. monta uma mensagem estruturada;
4. codifica o texto;
5. abre `wa.me/<numero>?text=<mensagem>`.

Isso reduz a infraestrutura necessária e mantém o atendimento dentro do WhatsApp da loja.

## Hospedagem

A aplicação é um frontend estático gerado por:

```bash
npm run build
```

Resultado:

```text
dist/
```

A hospedagem precisa ter fallback de SPA para que `/admin` abra diretamente sem retornar 404.
