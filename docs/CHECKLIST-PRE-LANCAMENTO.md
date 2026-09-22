# Checklist de pré-lançamento — Tai Fernandes Moda Íntima

Este checklist consolida as revisões planejadas a partir dos vídeos analisados e das decisões do projeto.

## Experiência e fluxo

- [x] revisão da loja no celular;
- [x] revisão da sacola e checkout no celular;
- [x] revisão do painel administrativo no celular;
- [x] categorias administrativas fechadas por padrão;
- [x] ocultar/exibir categoria;
- [x] duplicar produto;
- [ ] testar todos os links;
- [ ] testar WhatsApp do começo ao fim;
- [ ] testar formulários e validações;
- [x] criar/tratar rota inexistente/404;
- [ ] revisão final desktop + iPhone + Android.

## SEO e compartilhamento

- [x] title e meta description;
- [x] favicon;
- [x] Apple Touch Icon;
- [x] Open Graph;
- [x] Twitter Card;
- [x] `robots.txt`;
- [x] `sitemap.xml`;
- [x] manifest;
- [x] otimização inicial de imagens;
- [x] `llms.txt` criado;
- [x] JSON-LD `Store` adicionado;
- [x] revisão de `alt`/nomes acessíveis das imagens;
- [ ] trocar URLs absolutas para o domínio final;
- [ ] validar compartilhamento após publicação;
- [ ] PageSpeed/Lighthouse.

## Segurança

- [x] Supabase Auth no admin;
- [x] sem `service_role` no frontend;
- [x] `.env.local` fora do Git;
- [x] RLS habilitado no projeto;
- [x] executar auditoria V44 de RLS/policies/grants no Supabase ativo;
- [x] auditar bucket e policies do Storage;
- [x] testar leitura pública e bloquear escrita sem login;
- [x] testar sessão e logout;
- [x] testar tentativas de login inválidas sem vazamento de informação;
- [x] revisar `localStorage`/sessão e dados persistidos no navegador;
- [x] procurar chaves/segredos expostos no repositório;
- [x] preparar headers de segurança/CSP para Cloudflare (`public/_headers`);
- [x] revisar histórico remoto atual do Git por segredos;
- [ ] validar headers/CSP após deploy;
- [ ] executar `npm audit`.

## Privacidade e acessibilidade

- [x] Política de Privacidade criada em `/privacidade`;
- [x] botão para limpar nome/WhatsApp salvo localmente;
- [x] nenhum dado de cartão/CPF/senha de cliente é armazenado;
- [x] animações respeitam `prefers-reduced-motion`;
- [ ] testar privacidade e limpeza de dados em iPhone/Android.

## Produção

- [ ] `npm run build` sem erro;
- [ ] `npm run preview -- --host`;
- [ ] testar `/admin` diretamente no build de produção;
- [ ] Cloudflare Pages configurado;
- [ ] variáveis do Supabase configuradas no Cloudflare;
- [ ] HTTPS confirmado;
- [ ] domínio final definido;
- [ ] canonical/OG/sitemap atualizados para o domínio final;
- [ ] teste final do pedido real;
- [ ] marcar `v1.0.0`.


## Segurança — V44

- [x] RLS habilitado nas tabelas do catálogo/admin
- [x] policies públicas e administrativas auditadas
- [x] grants de `anon` e `authenticated` auditados
- [x] `is_admin()` revisada
- [x] Storage auditado
- [x] logout e proteção de `/admin` testados
- [x] credenciais inválidas testadas
- [x] persistência local revisada
- [x] ausência de `service_role`/senha do banco no frontend revisada
- [x] executar `v44_security_hardening.sql`
- [x] confirmar fim do flash `Usuário sem permissão`
- [x] confirmar upload de mídia permitido após o hardening
- [ ] confirmar rejeição de arquivo acima de 25 MB na regressão final V45



## V46 — validação antes da v1.0.0

- [ ] executar `supabase/v46_category_editing.sql`;
- [ ] editar nome e descrição de categoria;
- [ ] conferir descrição atualizada na home;
- [ ] testar proteção de exclusão de categoria com produtos;
- [ ] testar exclusão de categoria vazia;
- [ ] adicionar várias unidades sem fechar o modal;
- [ ] repetir adição pela compra rápida;
- [ ] conferir rodapé simplificado no desktop;
- [ ] conferir rodapé simplificado no celular;
- [ ] repetir build de produção.
