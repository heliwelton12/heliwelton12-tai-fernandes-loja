# Gate de release — v1.0.0

A v1.0.0 só pode ser marcada quando todos os itens bloqueadores estiverem aprovados.

## Banco e segurança
- [ ] `v47_schema_reconciliation.sql` executado;
- [ ] nenhuma resposta 400/401/403 inesperada na vitrine;
- [ ] RLS conferido;
- [ ] `is_admin()` restrita a `authenticated`/service role;
- [ ] `.env.local` fora do Git;
- [ ] nenhuma chave service role no frontend.

## Loja pública
- [ ] home;
- [ ] categorias;
- [ ] busca;
- [ ] favoritos;
- [ ] modal de produto;
- [ ] compra rápida;
- [ ] sacola;
- [ ] checkout;
- [ ] WhatsApp;
- [ ] Pix/cartão/dinheiro;
- [ ] retirada/entrega;
- [ ] Sex Shop 18+;
- [ ] 404;
- [ ] privacidade.

## Painel
- [ ] login/logout;
- [ ] criar/editar/excluir produto;
- [ ] imagens otimizadas após upload;
- [ ] vídeo;
- [ ] capa;
- [ ] categorias: criar, editar, reordenar, ocultar e excluir com proteção;
- [ ] configurações da loja.

## Qualidade
- [ ] `npm audit`;
- [ ] `npm run build`;
- [ ] `npm run preview -- --host`;
- [ ] Chrome/Edge desktop;
- [ ] iPhone/Safari;
- [ ] Android/Chrome quando disponível;
- [ ] Lighthouse mobile/desktop registrado;
- [ ] console limpo no fluxo principal.

## Publicação
- [ ] URL definitiva escolhida;
- [ ] canonical atualizado;
- [ ] OG URLs atualizadas;
- [ ] JSON-LD atualizado;
- [ ] `robots.txt`;
- [ ] `sitemap.xml`;
- [ ] `llms.txt`;
- [ ] `ard.json`;
- [ ] Cloudflare Pages configurado;
- [ ] HTTPS;
- [ ] headers de segurança validados;
- [ ] teste final no domínio definitivo.
