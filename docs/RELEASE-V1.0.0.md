# Gate de release — v1.0.0

A v1.0.0 foi aprovada após a conclusão de todos os gates bloqueadores em 23/09/2026.

## Banco e segurança
- [x] `v47_schema_reconciliation.sql` executado;
- [x] nenhuma resposta 400/401/403 inesperada na vitrine;
- [x] RLS conferido;
- [x] `is_admin()` restrita a `authenticated`/service role;
- [x] `.env.local` fora do Git;
- [x] nenhuma chave service role no frontend.

## Loja pública
- [x] home;
- [x] categorias;
- [x] busca;
- [x] favoritos;
- [x] modal de produto;
- [x] compra rápida;
- [x] sacola;
- [x] checkout;
- [x] WhatsApp;
- [x] Pix/cartão/dinheiro;
- [x] retirada/entrega;
- [x] Sex Shop 18+;
- [x] 404;
- [x] privacidade.

## Painel
- [x] login/logout;
- [x] criar/editar/excluir produto;
- [x] imagens otimizadas após upload;
- [x] vídeo;
- [x] capa;
- [x] categorias: criar, editar, reordenar, ocultar e excluir com proteção;
- [x] configurações da loja.

## Qualidade
- [x] `npm audit` — 0 vulnerabilidades;
- [x] `npm run build`;
- [x] `npm run preview -- --host`;
- [x] Chrome/Edge desktop;
- [x] iPhone/Safari;
- [x] Android/Chrome;
- [x] Lighthouse mobile/desktop registrado;
- [x] console limpo no fluxo principal.

## Performance final

### Mobile
- Performance: 91;
- Acessibilidade: 100;
- Práticas recomendadas: 100;
- SEO: 100;
- Navegação agêntica: 4/4;
- FCP: 2,7 s;
- LCP: 3,3 s;
- TBT: 0 ms;
- CLS: 0.

### Desktop
- Performance: 99;
- Acessibilidade: 100;
- Práticas recomendadas: 100;
- SEO: 100;
- Navegação agêntica: 4/4.

As oportunidades restantes de performance foram registradas como melhorias futuras e não são bloqueadoras da v1.0.0.

## Publicação
- [x] URL definitiva escolhida;
- [x] canonical atualizado;
- [x] OG URLs atualizadas;
- [x] JSON-LD atualizado;
- [x] `robots.txt`;
- [x] `sitemap.xml`;
- [x] `llms.txt`;
- [x] `ard.json`;
- [x] Cloudflare Pages configurado;
- [x] HTTPS;
- [x] headers de segurança validados;
- [x] cache de assets validado;
- [x] teste final no domínio definitivo.

## Resultado

**Status: APROVADA PARA RELEASE.**

Versão:

`1.0.0`

Origem oficial:

`https://taifernandes-modaintima.pages.dev/`

Data da aprovação:

`23/09/2026`