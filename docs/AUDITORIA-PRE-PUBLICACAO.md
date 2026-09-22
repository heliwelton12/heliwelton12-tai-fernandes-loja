# Auditoria pré-publicação

## Objetivo

Esta auditoria registra o que foi verificado antes da versão 1.0.0 da Tai Fernandes Moda Íntima. O objetivo é impedir que a publicação definitiva dependa apenas de uma inspeção visual.

## Baseline Lighthouse / PageSpeed — 22/09/2026

### Mobile

- Performance: 78
- FCP: 3,0 s
- LCP: 4,5 s
- TBT: 0 ms
- CLS: 0
- Speed Index: 3,1 s

Principais achados:

- o logo do cabeçalho foi identificado como LCP;
- logo maior do que o necessário para a área em que é exibido;
- imagens remotas do Supabase com arquivos muito grandes;
- cache de mídia do Storage configurado para apenas 1 hora;
- fontes externas participando do caminho crítico;
- contraste insuficiente no botão flutuante do WhatsApp e em pequenos textos;
- falta de nome acessível explícito em alguns botões de ícone;
- resposta 400 na primeira leitura de `categories`, seguida por fallback;
- `ai-catalog.json` inexistente caindo no fallback SPA e retornando HTML.

### Desktop

- Performance: 98
- Acessibilidade: 96
- Práticas recomendadas: 92
- SEO: 100
- FCP: 0,8 s
- LCP: 1,0 s
- TBT: 0 ms
- CLS: 0,031
- Speed Index: 1,0 s

## V47 — correções preparadas

- logo otimizado de ~116 KB para ~17 KB e redimensionado para 480×164;
- hero otimizado para 1280×720 e ~70 KB;
- remoção de cópias PNG/JPEG antigas não utilizadas;
- preload responsivo: logo no mobile e hero no desktop;
- dimensões intrínsecas adicionadas a logo e hero;
- `fetchPriority=high` mantido no logo, que é o LCP mobile;
- contraste do botão flutuante do WhatsApp corrigido;
- pequenos textos críticos escurecidos;
- `aria-label` em Favoritos e Sacola;
- cache de novos uploads do Supabase alterado para 1 ano, usando caminhos únicos;
- imagens enviadas pelo painel passam por otimização automática para WebP quando o navegador suporta;
- criação de `/.well-known/ard.json` e compatibilidade com `ai-catalog.json`;
- `llms.txt` ajustado para links Markdown;
- cache de assets estáticos configurado no Netlify;
- Node mínimo documentado para Vite 7;
- migração de reconciliação criada para alinhar `categories.subtitle` em produção.

## Bloqueadores antes da v1.0.0

1. Executar `supabase/v47_schema_reconciliation.sql` uma única vez no SQL Editor com Role Postgres.
2. Testar V47 localmente e rodar `npm run build`.
3. Publicar V47 em ambiente temporário.
4. Repetir PageSpeed mobile e desktop.
5. Confirmar ausência de erro 400 no console/rede.
6. Revalidar fluxos de compra e painel.
7. Definir domínio final e atualizar URLs canônicas, sitemap, robots, JSON-LD e documentos públicos.
8. Só então marcar `v1.0.0`.
