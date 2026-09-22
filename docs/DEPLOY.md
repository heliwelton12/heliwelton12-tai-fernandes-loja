# Desenvolvimento, build e deploy

## Situação atual

A loja está publicada no Netlify durante o desenvolvimento, mas o plano atual é concluir as melhorias localmente e fazer a publicação definitiva no Cloudflare Pages somente depois da revisão final.

O repositório GitHub continua sendo a fonte do código. Não é necessário criar um repositório novo somente para trocar de hospedagem.

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

## Netlify — hospedagem atual

O projeto possui `netlify.toml` com fallback SPA.

Enquanto o repositório estiver conectado ao Netlify, um `git push` na branch de produção pode iniciar novo deploy automaticamente. Por isso, durante os refinamentos locais, o push deve ser evitado até a etapa combinada de publicação.

## Cloudflare Pages — destino planejado

Configuração esperada para o projeto Vite:

```text
Build command: npm run build
Output directory: dist
```

Também será necessário configurar as variáveis públicas do Supabase no ambiente de produção.

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
