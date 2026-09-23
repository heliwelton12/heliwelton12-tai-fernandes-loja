# Desenvolvimento, build e deploy

## Situação atual

A loja foi migrada com sucesso do Netlify para o Cloudflare Pages em 23/09/2026.

Origem oficial atual:

```text
https://taifernandes-modaintima.pages.dev/


## Fluxo durante a fase de revisão

### Trabalhar localmente

```bash
npm run dev -- --host
```

### Testar no celular

O Vite exibe um endereço `Network`.

O computador e o celular devem estar na mesma rede local. Abrir esse endereço no navegador do telefone permite testar sem publicar uma nova build.

### Commit local

Quando uma etapa estiver aprovada:

```bash
git add .
git commit -m "V40 - revisa sacola e fluxo de compra mobile"
```

Durante a fase atual, não é necessário executar `git push` em cada versão.

## Build de produção local

Antes de publicar:

```bash
npm run build
npm run preview -- --host
```

Diretório gerado:

```text
dist
```

O preview de produção deve passar pelo mesmo checklist funcional da aplicação em desenvolvimento.

## Variáveis necessárias

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Opcional para staging/teste:

```text
VITE_SHOW_DEMO_PRODUCTS=true
```

Nunca usar no frontend:

- `service_role`;
- senha do banco;
- senha de usuário;
- token privado.

## Netlify — ambiente anterior

O Netlify foi utilizado como hospedagem durante o desenvolvimento e as auditorias anteriores.

A partir de 23/09/2026, ele deixou de ser a origem oficial do projeto.

Arquivos como `netlify.toml` e `DEPLOY_NETLIFY.md` são mantidos apenas como histórico e referência de rollback enquanto a migração é consolidada.

Não utilizar o endereço do Netlify como canonical, Open Graph, sitemap ou origem pública oficial.

## Cloudflare Pages — hospedagem oficial

Configuração de produção:

```text
Production branch: main
Framework preset: React (Vite)
Build command: npm run build
Output directory: dist
Root directory: raiz do repositório

### SPA

Antes do lançamento, testar obrigatoriamente:

```text
/admin
```

acessado diretamente em uma nova aba, além das rotas públicas. A hospedagem deve devolver a aplicação SPA para rotas do frontend.

## Checklist antes do primeiro deploy definitivo

1. documentação atualizada;
2. V41 admin mobile concluída;
3. funções finais concluídas;
4. SEO técnico básico;
5. favicon;
6. Open Graph;
7. `robots.txt`;
8. `sitemap.xml`;
9. 404/rota inválida tratada;
10. imagens revisadas/otimizadas;
11. headers de segurança;
12. todos os links revisados;
13. regressão de compra completa;
14. regressão administrativa;
15. `npm run build` aprovado;
16. `npm run preview -- --host` aprovado;
17. PageSpeed/Lighthouse;
18. commit final;
19. tag `v1.0.0` quando a primeira versão estável estiver pronta;
20. publicação e teste final no domínio de produção.

## Depois da publicação

Alterações de conteúdo feitas pelo painel — produtos, categorias, capas e configurações — devem continuar sendo salvas no Supabase e não precisam de novo build do frontend.

Novo deploy deve ser reservado principalmente para mudanças de código, layout ou infraestrutura.

## V45 — arquivos específicos do Cloudflare Pages

A pasta `public/` contém `_headers`. O Vite copia esse arquivo para o `dist/` durante o build e o Cloudflare Pages o utiliza para aplicar headers de segurança.

Antes da v1.0.0:

```bash
npm audit
npm run build
npm run preview -- --host
```

No build final, confirme que existem em `dist/`:

```text
_headers
robots.txt
sitemap.xml
llms.txt
og-image.jpg
site.webmanifest
```

Os headers devem ser validados somente no endereço publicado, pois o servidor de desenvolvimento do Vite não interpreta `_headers`.

### Atenção ao JSON-LD e CSP

A CSP da V45 autoriza o bloco JSON-LD inline por hash SHA-256. Quando as URLs do JSON-LD forem trocadas do endereço temporário para o domínio definitivo, o conteúdo do bloco muda e o hash em `public/_headers` também precisa ser recalculado. Essa atualização faz parte da etapa final de publicação.
