# Histórico de problemas e correções

Este documento registra falhas reais encontradas durante o desenvolvimento. Ele existe para mostrar que qualidade não é ausência de erro: é detectar, entender, corrigir e retestar.

## Tela branca na loja pública — V46

**Sintoma:** `/` abriu uma página branca enquanto `/admin` continuou funcionando.

**Diagnóstico:** Console do navegador mostrou `ReferenceError: instagramHandle is not defined`.

**Causa:** o cabeçalho usava `instagramHandle`, mas apenas `instagramUrl` estava declarado.

**Correção:** declaração de `instagramHandle` com origem em `storeSettings.instagram_handle` e fallback seguro.

**Resultado:** home voltou a abrir e `npm run build` foi aprovado pelo usuário.

## Primeira execução do Lighthouse com NO_LCP

**Sintoma:** relatório mobile não calculou Performance/LCP corretamente.

**Ação:** repetir o teste após deploy atualizado.

**Resultado:** teste válido obtido com Performance 78 e LCP 4,5 s.

## LCP mobile alto

**Diagnóstico:** o elemento LCP foi o logo do cabeçalho, não a imagem do hero.

**Causa:** arquivo maior que o necessário e descoberto somente após o React iniciar.

**Correção V47:** redimensionamento/compressão do logo, preload mobile, dimensões intrínsecas e prioridade alta.

## Imagens remotas muito pesadas

**Sintoma:** PageSpeed encontrou mídia do Supabase na faixa de megabytes.

**Causa:** o painel enviava o arquivo original e usava cache de 3600 segundos.

**Correção V47:** otimização automática de imagens para WebP no navegador e `cacheControl` de 31536000 segundos para novos arquivos com caminhos únicos.

## Consulta de categorias retornando 400

**Sintoma:** Lighthouse/console registrou 400 na primeira consulta de `categories`; depois o fallback carregava a loja.

**Diagnóstico:** a consulta principal inclui `subtitle`, enquanto o fallback não inclui essa coluna.

**Causa provável:** schema de produção não alinhado com a V46.

**Correção V47:** `v47_schema_reconciliation.sql`, idempotente, garantindo `categories.subtitle`, valores padrão e constraint de comprimento.

## Contraste de acessibilidade

**Sintoma:** Lighthouse reprovou contraste em elementos pequenos e no botão flutuante do WhatsApp.

**Correção V47:** textos críticos usam tom rosé mais escuro e o botão do WhatsApp usa verde mais escuro com contraste AA para texto branco.

## Descoberta para agentes

**Sintoma:** `ai-catalog.json` retornava `<!doctype html>` por causa do fallback da SPA.

**Causa:** arquivo estático inexistente.

**Correção V47:** manifestos JSON válidos com `entries: []` em `/.well-known/ard.json` e caminhos de compatibilidade. A loja não expõe recursos agentivos chamáveis, portanto o catálogo fica vazio.
