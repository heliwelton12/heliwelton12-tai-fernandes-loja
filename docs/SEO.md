# SEO e compartilhamento — Tai Fernandes Moda Íntima

## Objetivo

Esta documentação registra os elementos de SEO técnico e compartilhamento social preparados na V43.

## Metadados principais

O `index.html` possui:

- `title` descritivo;
- `meta description`;
- `robots` público com `index, follow`;
- canonical;
- Open Graph;
- Twitter Card;
- `theme-color`;
- favicon e Apple Touch Icon;
- manifest;
- preload da imagem principal;
- preconnect das fontes.

## Open Graph

Arquivo:

```text
public/og-image.jpg
```

Dimensão:

```text
1200 × 630 px
```

A arte utiliza a identidade visual da loja e a imagem principal já usada no site.

## Favicon e ícones

Arquivos:

```text
public/favicon.ico
public/apple-touch-icon.png
public/icon-192.png
public/icon-512.png
public/site.webmanifest
```

## robots.txt

Arquivo:

```text
public/robots.txt
```

Regras atuais:

- home e loja pública podem ser rastreadas;
- `/admin` é bloqueado para robôs;
- sitemap é informado.

Além disso, a rota `/admin` aplica `noindex, nofollow, noarchive` em runtime.

## sitemap.xml

O site atual utiliza navegação de categorias dentro da mesma SPA, sem URLs públicas individuais para cada categoria. O sitemap registra a página inicial e a Política de Privacidade.

Arquivo:

```text
public/sitemap.xml
```

## Domínio

A hospedagem oficial atual do projeto é o Cloudflare Pages:

```text
https://taifernandes-modaintima.pages.dev/

## Otimização de imagens

A V43 mantém o hero em WebP e troca a logo pesada do cabeçalho por:

```text
public/logo-header.webp
```

Os arquivos antigos indicados em `REMOVER-ARQUIVOS-V43.txt` não são mais referenciados pelo código e podem ser removidos.

Após a limpeza, o conjunto local de arquivos em `public/` cai de aproximadamente 5,1 MB para 1,2 MB.

## Validação antes da v1.0.0

- conferir favicon no navegador;
- conferir Open Graph em produção;
- confirmar canonical no domínio final;
- validar robots e sitemap no domínio final;
- executar PageSpeed/Lighthouse;
- revisar indexação do `/admin`;
- verificar se nenhuma URL antiga de hospedagem permaneceu nos metadados.


## V45 — dados estruturados e llms.txt

A V45 acrescenta:

- `public/llms.txt` com uma descrição curta da loja e das áreas públicas;
- JSON-LD `Store` no `index.html`;
- revisão de textos alternativos e nomes acessíveis das imagens.

As URLs do JSON-LD e do `llms.txt` ainda usam temporariamente a origem do Netlify e devem ser trocadas junto com canonical/OG/sitemap quando o endereço definitivo do Cloudflare estiver definido.
