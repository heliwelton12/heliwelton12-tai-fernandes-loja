# Performance e Lighthouse

## Baseline antes da V47

| Métrica | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 78 | 98 |
| FCP | 3,0 s | 0,8 s |
| LCP | 4,5 s | 1,0 s |
| TBT | 0 ms | 0 ms |
| CLS | 0 | 0,031 |
| Speed Index | 3,1 s | 1,0 s |

Desktop também apresentou 96 em Acessibilidade, 92 em Práticas recomendadas e 100 em SEO.

## Hipótese principal

O problema não é JavaScript bloqueando a thread: TBT ficou em 0 ms. O foco da V47 é rede e mídia, especialmente no mobile.

## Otimizações V47

- logo 480×164 WebP, ~17 KB;
- hero 1280×720 WebP, ~70 KB;
- preload responsivo para evitar competição desnecessária entre logo e hero;
- remoção de assets legados não referenciados;
- cache longo para assets do build e novos uploads com nome único;
- imagens de painel convertidas/compactadas para WebP quando possível;
- dimensões intrínsecas nas imagens críticas;
- contraste e nomes acessíveis revisados.

## Critério de reteste

Após deploy da V47:

1. rodar PageSpeed mobile três vezes e registrar a melhor, a pior e a mediana;
2. rodar desktop ao menos uma vez;
3. verificar console e Network;
4. confirmar que não há 400 em `categories`;
5. comparar LCP e Performance com o baseline.

Não será feita alteração visual relevante apenas para perseguir nota 100. O critério principal é experiência real, estabilidade e acessibilidade.

## Reteste publicado após V47.3

| Métrica | Baseline mobile | V47.3 mobile | Baseline desktop | V47.3 desktop |
| --- | ---: | ---: | ---: | ---: |
| Performance | 78 | 83 | 98 | 99 |
| Acessibilidade | 89 | 100 | 96 | 100 |
| Práticas recomendadas | 100* | 92 | 92 | 92 |
| SEO | 92 | 100 | 100 | 100 |
| FCP | 3,0 s | 3,0 s | 0,8 s | 0,7 s |
| LCP | 4,5 s | 3,7 s | 1,0 s | 0,9 s |
| TBT | 0 ms | 0 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0,031 | 0 |
| Speed Index | 3,1 s | 3,0 s | 1,0 s | 1,0 s |

\* O primeiro baseline mobile foi medido antes da introdução do CSP usado na V47. A comparação de “Práticas recomendadas” deve ser interpretada com essa mudança de contexto.

### Leitura do resultado

A V47 melhorou o LCP mobile em cerca de 0,8 s e elevou acessibilidade/SEO para 100. O desktop chegou a 99 de Performance. O mobile, porém, ainda ficou em 83 e por isso o gate de publicação permanece aberto.

O relatório V47.3 mostrou:
- hero como novo elemento LCP;
- `fetchpriority=high` ausente no hero;
- script de preload bloqueado pela CSP por hash desatualizado;
- Google Fonts ainda participando do caminho de renderização inicial;
- `ai-catalog.json` sem `specVersion`;
- mídia antiga do Supabase ainda com arquivos muito grandes e TTL de 1 hora;
- script/iframe do Netlify Drawer gerando ocorrência CSP específica do ambiente temporário.

## Otimizações V47.4

- prioridade alta transferida do logo para o hero;
- hero marcado como eager;
- preload da home direcionado ao hero;
- hash CSP sincronizado com o script de preload;
- Google Fonts ativado de forma não bloqueante por script externo same-origin;
- `ai-catalog.json` compatível com o schema de catálogo 1.0;
- reenviar capas antigas do Supabase passa a ser etapa obrigatória antes do próximo PageSpeed;
- Netlify Drawer deve ser desativado durante a auditoria para não contaminar Console/Best Practices.

## Critério do próximo reteste

O próximo PageSpeed deve ser executado somente depois de:
1. publicar V47.4;
2. desativar Netlify Drawer;
3. reenviar as três capas antigas pesadas;
4. confirmar ausência de erro vermelho no Console;
5. aguardar o deploy ficar `Published`.

A meta não é manipular a pontuação, e sim remover gargalos reais. Performance mobile abaixo de 90 será novamente investigada antes de encerrar o gate.

## Ciclo final de otimização antes da migração — V47.8 a V47.12

O reteste com Performance mobile em 83 confirmou que ainda existiam gargalos técnicos objetivos e corrigíveis. Por isso, o gate não foi encerrado naquele momento.

### V47.8 — descoberta do LCP

O `hero-modelo.webp` foi confirmado como o LCP da página.

O preload anterior era criado por JavaScript inline, introduzindo dependência desnecessária de execução de script e interação com a Content Security Policy.

A estratégia foi substituída por preload declarativo diretamente no HTML:

```html
<link
  rel="preload"
  href="/hero-modelo.webp"
  as="image"
  type="image/webp"
  fetchpriority="high"
/>

## V47.14 — ajuste após PageSpeed Mobile 89

Após o conjunto V47.8–V47.13, o novo PageSpeed Mobile apresentou:

| Métrica | Resultado |
| --- | ---: |
| Performance | 89 |
| Acessibilidade | 100 |
| Práticas recomendadas | 100 |
| SEO | 100 |
| Navegação agêntica | 4/4 |
| FCP | 2,7 s |
| LCP | 3,2 s |
| TBT | 0 ms |
| CLS | 0 |
| Speed Index | 2,7 s |

Comparado ao baseline anterior, houve melhora de Performance de 83 para 89, FCP de 3,0 s para 2,7 s e LCP de 3,7 s para 3,2 s.

O novo diagnóstico identificou `logo-header.webp` como elemento LCP no mobile.

O Lighthouse apontou:

- `loading="lazy"` não era utilizado no LCP — aprovado;
- `fetchpriority="high"` ainda precisava ser aplicado;
- a imagem LCP precisava ser descoberta mais cedo no documento inicial.

### Estratégia adotada

A prioridade deixou de ser igual para todos os viewports.

Mobile:

```html
<link
  rel="preload"
  href="/logo-header.webp"
  as="image"
  type="image/webp"
  fetchpriority="high"
  media="(max-width: 980px)"
/>