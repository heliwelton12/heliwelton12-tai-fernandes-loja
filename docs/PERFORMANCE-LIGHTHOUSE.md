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
