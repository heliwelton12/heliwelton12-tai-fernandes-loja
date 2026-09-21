# Publicação no Netlify — Tai Fernandes

O projeto já está preparado para Vite + Supabase + rota `/admin`.

## Antes de publicar

Não envie o arquivo `.env.local` para GitHub ou Netlify.
Ele já está protegido pelo `.gitignore`.

No Netlify, crie estas variáveis de ambiente:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Não adicione `VITE_SHOW_DEMO_PRODUCTS` na produção.
Sem essa variável, produtos marcados como `Demonstração` ficam ocultos da loja pública.

## Build

- Build command: `npm run build`
- Publish directory: `dist`

O arquivo `netlify.toml` já contém essas configurações e o redirect SPA necessário para:

- `/`
- `/admin`

## Depois da publicação

Teste nesta ordem:

1. Página inicial.
2. Categorias.
3. Busca.
4. Produto e galeria.
5. Sacola.
6. Pix, Cartão e Dinheiro.
7. Retirada e Entrega.
8. Mensagem enviada ao WhatsApp.
9. `/admin`.
10. Login de Taís Fernandes.
11. Cadastro de uma foto.
12. Cadastro de um vídeo.
13. Produto Esgotado.
14. Produto Oculto.
15. Produto Demonstração (deve aparecer no admin e não na loja pública).

## Importante

A Publishable Key do Supabase é própria para uso no frontend.
Nunca coloque uma chave `service_role` ou secret key no Vite/Netlify.
