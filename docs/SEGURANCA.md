# Segurança — Tai Fernandes Moda Íntima

Este documento registra a auditoria de segurança da V44 antes da versão `v1.0.0`.

## Resultado da auditoria

A auditoria confirmou no ambiente real do Supabase que a proteção administrativa não depende apenas do frontend.

### Banco de dados

- RLS habilitado em `admins`, `categories`, `products`, `product_media`, `product_variants` e `store_settings`;
- visitante anônimo possui somente as leituras necessárias à vitrine;
- operações administrativas dependem de autenticação e de `public.is_admin()`;
- categorias ocultas deixam de ser entregues pela leitura pública e seus produtos, variantes e registros de mídia também deixam de ser retornados pelas policies públicas;
- `admins` contém apenas `user_id` e `created_at`, sem senha própria.

### Função `public.is_admin()`

A função:

- é `STABLE`;
- usa `SECURITY DEFINER`;
- possui `search_path` vazio;
- referencia explicitamente `public.admins`;
- identifica a sessão por `auth.uid()`;
- não recebe um `user_id` fornecido pelo navegador.

Na V44, o privilégio de execução direta é removido de `PUBLIC` e `anon`, permanecendo para `authenticated` e `service_role`.

### Storage

O bucket `product-media` permanece público porque contém imagens e vídeos destinados à vitrine. A leitura pública de uma URL conhecida não é tratada como armazenamento secreto. Upload, alteração e exclusão continuam protegidos por `is_admin()`.

A V44 acrescenta:

- limite de 25 MB por arquivo;
- formatos permitidos: JPEG, PNG, WebP, MP4 e WebM;
- validação equivalente no seletor de mídia do painel.

Capas de categoria continuam limitadas pelo frontend a 8 MB e passam a aceitar explicitamente JPG, PNG e WebP.

## Autenticação e sessão

Foram testados:

- login administrativo válido;
- logout;
- bloqueio do painel após logout;
- senha incorreta;
- e-mail inexistente;
- mensagens genéricas de credenciais inválidas.

A V44 também corrige um estado visual em que `Usuário sem permissão` podia aparecer por alguns instantes após um login válido. Agora o painel exibe `Verificando acesso administrativo…` enquanto a RPC `is_admin()` ainda está sendo concluída.

## Dados no navegador

A revisão do frontend encontrou persistência local apenas para recursos de conveniência da loja, como sacola, favoritos, confirmação 18+ e dados de contato usados no pedido. Não são armazenados no `localStorage` senhas, dados de cartão ou a chave `service_role`.

## Segredos

O frontend utiliza somente as variáveis públicas necessárias ao cliente Supabase (`VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`). `.env` e `.env.local` permanecem excluídos do Git. Não deve existir `service_role`, senha do banco ou outro segredo no código do navegador.

## Migrações da V44

- `v44_security_audit.sql`: somente leitura; usado para inventariar o estado real.
- `v44_security_hardening.sql`: aplica apenas os endurecimentos aprovados após a auditoria.

## Estado

✅ V44 aprovada em 22/09/2026. A migração `v44_security_hardening.sql` foi aplicada e os testes finais de autorização, logout, upload e edição foram aprovados.


## V45 — proteção do navegador e exposição mínima

A V45 acrescenta uma configuração `public/_headers` preparada para Cloudflare Pages com CSP e headers defensivos. A política permite apenas os recursos necessários da própria aplicação, Google Fonts e Supabase. A validação final deve ocorrer depois do deploy porque o servidor de desenvolvimento do Vite não aplica `_headers`.

As consultas públicas de `store_settings` passaram de `select('*')` para uma lista explícita de campos. Os principais campos de checkout também ganharam limites de tamanho no frontend.

Foi revisado o histórico remoto atual do repositório (8 commits existentes antes da retomada dos pushes). Não foi encontrado `.env`/`.env.local` commitido nem valor de `service_role`, senha do banco ou chave privada. A palavra `service_role` aparecia somente em documentação orientando a não utilizá-la no frontend.

Ainda é obrigatório executar `npm audit` no projeto local antes da `v1.0.0`.
