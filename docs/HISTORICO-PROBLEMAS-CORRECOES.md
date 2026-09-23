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

## V47.1 — Transparência do logotipo perdida durante otimização

**Sintoma:** após a primeira otimização da V47, o logotipo passou a aparecer com um retângulo preto no cabeçalho e no rodapé.

**Causa:** o arquivo original do logotipo possuía canal alfa (transparência), mas a conversão otimizada inicial foi salva em RGB, removendo o canal alfa e preenchendo as áreas transparentes com preto.

**Correção:** o logotipo foi regenerado a partir do arquivo WebP original, redimensionado para 480 × 164 px com reamostragem de alta qualidade e salvo novamente em WebP preservando RGBA/transparência.

**Resultado esperado:** fundo totalmente transparente no cabeçalho e no rodapé, mantendo a identidade visual e ainda reduzindo o peso em relação ao arquivo original.

**Lição registrada:** otimização de imagens com transparência deve validar explicitamente o canal alfa após a conversão; redução de tamanho não pode alterar a composição visual do ativo.

## V47.2 — painel preso em “Verificando acesso administrativo…” ao voltar para a aba

**Sintoma:** o painel `/admin` funcionava normalmente, mas em alguns momentos, depois de trocar de aba/janela e retornar, permanecia indefinidamente em **“Verificando acesso administrativo…”**. Um `F5` liberava a tela.

**Diagnóstico:** o Console não mostrava erro de autenticação. O problema era de estado interno do React/Supabase.

**Causa:** `onAuthStateChange` marcava `adminChecking=true` em qualquer evento de autenticação, inclusive renovação automática do token. Como o usuário continuava com o mesmo `user.id`, o `useEffect` responsável por chamar `is_admin()` não executava novamente. Assim, a flag de verificação podia ficar presa em `true`.

**Correção:** a restauração da sessão e os eventos de autenticação passaram a atualizar somente `session`. A flag `adminChecking` agora é controlada exclusivamente pela verificação real de permissão quando o usuário autenticado muda. Também foi adicionada proteção contra respostas assíncronas antigas após desmontagem/troca de sessão.

**Correção adicional:** os preloads de logo/hero foram restringidos à rota pública `/`, evitando avisos de recurso pré-carregado e não utilizado em `/admin` e `/privacidade`.

**Teste de regressão obrigatório:** abrir `/admin`, confirmar acesso, trocar de aba por alguns segundos/minutos e retornar repetidas vezes. O painel deve continuar aberto sem exigir `F5` e sem ficar preso na tela de verificação.

## V47.4 — PageSpeed final ainda não fechou o gate

**Sintoma:** após V47.3, o desktop chegou a 99 de Performance e o mobile subiu para 83, mas Práticas recomendadas permaneceu em 92 e o LCP mobile ainda ficou em 3,7 s.

**Diagnóstico 1 — LCP mudou de elemento:** depois de reduzir o logo, o `hero-modelo.webp` passou a ser o LCP real. O relatório mostrou o hero sem `fetchpriority=high`.

**Correção:** prioridade alta removida do logo e aplicada ao hero, com `loading="eager"`. O preload da home também passou a antecipar o hero.

**Diagnóstico 2 — preload bloqueado por CSP:** o script inline de preload havia mudado, mas o hash CSP continuava permitindo apenas o JSON-LD. O navegador bloqueava o script antes de ele criar o preload.

**Correção:** hash SHA-256 do script atual sincronizado em `public/_headers`.

**Diagnóstico 3 — recurso de fonte bloqueando renderização:** Google Fonts continuava no caminho crítico mobile.

**Correção:** folha do Google Fonts passa a iniciar com `media="print"` e é ativada por `public/font-loader.js` após o parse. O fallback de `<noscript>` preserva acessibilidade sem JavaScript.

**Diagnóstico 4 — ai-catalog incompleto:** o arquivo existia, mas o validador exigia `specVersion`.

**Correção:** `ai-catalog.json` e a cópia `/.well-known/ai-catalog.json` agora usam `specVersion: "1.0"`, host mínimo e `entries: []`.

**Diagnóstico 5 — mídia antiga do Supabase:** a otimização V47 só afeta uploads feitos depois da mudança. Capas antigas continuaram pesadas e com TTL de 1 hora.

**Ação obrigatória:** reenviar pelo painel as capas de Conjuntos, Camisolas e Lingeries para que o pipeline atual gere WebP e aplique `cacheControl=31536000`.

**Diagnóstico 6 — Netlify Drawer:** o relatório registrou CSP em `about:srcdoc` e carregamento do HUD do Netlify. Isso é injeção do ambiente temporário, não código da loja.

**Ação:** desativar Netlify Drawer durante a auditoria do ambiente temporário; o Cloudflare Pages não deve introduzir esse componente.

```md
## V47.8–V47.12 — bundle inicial excessivo e recursos competindo com o LCP

**Sintoma:** mesmo com TBT 0 ms e CLS 0, o PageSpeed mobile permanecia em 83, com FCP de 3,0 s e LCP de 3,7 s.

**Diagnóstico 1 — preload do hero:** o hero era o LCP, mas o preload era criado por um script inline. Além de atrasar a descoberta declarativa do recurso, o script havia apresentado conflito com a CSP.

**Correção V47.8:** preload passou a existir diretamente no HTML. O preload da logo foi removido e os hashes CSP antigos deixaram de ser necessários.

**Diagnóstico 2 — rotas secundárias no carregamento inicial:** `AdminApp`, `PrivacyPage` e `NotFoundPage` eram imports estáticos de `main.jsx`.

**Correção V47.9:** rotas secundárias passaram a usar `React.lazy()` e chunks separados.

**Diagnóstico 3 — prioridades da logo:** a logo ainda recebia prioridade alta mesmo após o hero se tornar o LCP. A logo do rodapé também não possuía dimensões intrínsecas.

**Correção V47.10:** prioridade alta removida da logo; dimensões ajustadas para 438 × 149 px; logo do rodapé configurada com lazy loading e decoding assíncrono.

**Diagnóstico 4 — SDK do Supabase no bundle público:** mesmo após separar `/admin`, o bundle principal continuava com aproximadamente 503,22 kB porque a home importava `@supabase/supabase-js`.

**Correção V47.11:** leituras públicas de produtos, categorias e configurações passaram a usar a API REST via `fetch`. O SDK completo foi separado em chunk próprio.

**Resultado do build:** bundle principal caiu para aproximadamente 279,08 kB, enquanto o Supabase passou para chunk separado de 223,96 kB.

**Diagnóstico 5 — importação tardia ainda desnecessária:** a primeira versão carregava `supabaseClient` automaticamente após cinco segundos, mesmo para visitantes comuns.

**Correção V47.12:** o SDK de autenticação da home só é importado quando existe uma sessão Supabase armazenada no navegador.

**Validação:** em janela anônima, a home carregou normalmente sem solicitar `supabaseClient`. Produtos, categorias e configurações responderam HTTP 200 pela API REST. `/admin`, `/privacidade` e 404 permaneceram funcionais no preview de produção.

**Lição registrada:** code splitting só é efetivo quando dependências grandes deixam de fazer parte do caminho crítico. Mover componentes de rota para chunks separados não era suficiente enquanto o SDK do backend continuava importado diretamente pela home.

```md
## V47.14 — LCP mobile mudou do hero para a logo

**Sintoma:** após as otimizações anteriores, a Performance mobile subiu de 83 para 89, porém o LCP permaneceu em 3,2 s.

**Diagnóstico:** o Lighthouse passou a identificar `logo-header.webp` como o elemento LCP no mobile.

O preload existente priorizava `hero-modelo.webp` em todos os viewports, embora o hero já não fosse o LCP no teste mobile.

O relatório também indicou que a logo precisava de `fetchpriority="high"` e descoberta antecipada.

**Correção:** foram criados preloads condicionais por media query.

- mobile até 980 px: prioridade para `logo-header.webp`;
- desktop a partir de 981 px: prioridade mantida para `hero-modelo.webp`.

A logo do cabeçalho também passou a receber `fetchPriority="high"` somente em viewport mobile.

**Proteção contra regressão:** a logo do rodapé permaneceu com lazy loading e nenhuma configuração relacionada a SEO, acessibilidade, CSP ou navegação agêntica foi alterada.

**Validação local:** build e preview concluídos sem erro; home mobile e desktop, painel administrativo, privacidade e 404 permaneceram funcionais.