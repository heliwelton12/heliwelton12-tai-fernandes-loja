# Changelog

## V47.2 — estabilidade da sessão administrativa

- corrigida condição em que `/admin` podia ficar preso em **“Verificando acesso administrativo…”** após trocar de aba e retornar;
- eventos de renovação de token do Supabase deixam de ativar indevidamente a tela de verificação;
- verificação `is_admin()` passa a controlar sozinha o estado `adminChecking`;
- respostas assíncronas antigas de sessão/permissão passam a ser ignoradas após desmontagem ou troca de usuário;
- preload de logo/hero passa a existir somente na vitrine `/`, removendo downloads/avisos desnecessários no painel e na página de privacidade;
- adicionado teste de regressão específico para troca de abas no painel administrativo.

**Status:** correção preparada em 22/09/2026; aguardando teste manual local antes de build/audit.

## V47 — auditoria pré-publicação, performance e acessibilidade

- baseline Lighthouse mobile/desktop documentado;
- logo e hero otimizados;
- preload responsivo de imagens críticas;
- dimensões intrínsecas em logo/hero;
- contraste e nomes acessíveis revisados;
- upload de imagens passa a otimizar para WebP quando suportado;
- cache de novos uploads aumentado para 1 ano em caminhos únicos;
- assets antigos não utilizados removidos;
- manifestos ARD/ai-catalog válidos adicionados;
- `llms.txt` ajustado;
- headers de cache/CORS atualizados;
- migração de reconciliação do schema adicionada;
- documentação de auditoria, histórico de falhas, Lighthouse e gate da v1.0.0 criada.

 — Tai Fernandes Moda Íntima

## V46 — Acabamento final de experiência

- rodapé simplificado para remover navegação, pagamentos e avisos repetidos;
- rodapé passa a concentrar apenas identidade, atendimento, links úteis e formas de pagamento;
- adicionado acesso direto a **Meus dados** no rodapé;
- adicionar um produto à sacola deixa de fechar automaticamente o modal **Espiar** e a compra rápida;
- após adicionar, quantidade do modal volta para 1, mantendo tamanho/cor selecionados para facilitar um novo item/variação;
- botões de compra exibem feedback temporário `✓ Adicionado`, mantendo a ação **Ver sacola** no toast;
- categorias ganham `subtitle` persistido no banco, usado como descrição curta editável;
- criação de categoria passa a aceitar nome + descrição curta;
- cada categoria passa a ter ação **Editar categoria** para alterar nome e descrição;
- exclusão de categoria é permitida somente quando não existem produtos vinculados e nunca permite remover a última categoria da loja;
- regras especiais de **Sex Shop** e **Pijamas** passam a usar o `slug` estável, evitando perda do 18+ ou das regras de tamanho/público quando o nome visível for editado;
- criada migração `supabase/v46_category_editing.sql`;
- `seed.sql` atualizado para preservar as descrições padrão em instalações novas;
- documentação atualizada junto com a versão.

**Status:** implementada localmente em 22/09/2026; aguardando migração e testes manuais antes da aprovação.

Este arquivo registra as mudanças relevantes do projeto. As versões antigas foram reconstruídas a partir do histórico preservado no projeto e dos pacotes de desenvolvimento existentes. Quando uma versão intermediária não possui registro confiável individual, ela é indicada como tal em vez de ter alterações inventadas.

## V45 — Pré-lançamento, privacidade e acabamento

- criada rota `/privacidade` com Política de Privacidade em linguagem simples;
- `Meus dados` ganha ação **Limpar nome e WhatsApp** para apagar os dados locais de contato;
- `tf-profile` deixa de permanecer gravado quando nome e telefone estão vazios;
- adicionados limites de tamanho aos principais campos de checkout e perfil;
- criada rota de erro 404 para endereços inexistentes da SPA;
- criado `public/llms.txt`;
- adicionados dados estruturados JSON-LD do tipo `Store`;
- sitemap passa a incluir a página de privacidade;
- revisados textos alternativos: imagens informativas mantêm `alt` descritivo e miniaturas/capas redundantes continuam decorativas quando o botão já possui nome acessível;
- consultas públicas de `store_settings` passam a selecionar somente os campos necessários em vez de `select('*')`;
- adicionados headers de segurança preparados para Cloudflare Pages em `public/_headers`, incluindo CSP, proteção contra framing, `nosniff` e política de referência;
- adicionadas animações sutis sem biblioteca externa, preservando o layout aprovado;
- incluído suporte completo a `prefers-reduced-motion`;
- auditoria do histórico remoto atual do Git revisou os 8 commits existentes e não encontrou `.env`/`.env.local` commitidos nem valores de `service_role`, senha do banco ou chave privada; a ocorrência textual de `service_role` no primeiro commit era apenas documentação de aviso;
- documentação de pré-lançamento atualizada.

**Status:** aprovada localmente em 22/09/2026. Home/admin e recursos da V45 foram conferidos; `npm audit`, `npm run build` e `npm run preview -- --host` passaram. A validação de headers/CSP, Lighthouse e URLs definitivas permanece como etapa global de publicação.

## V44 — Auditoria e endurecimento de segurança

- auditoria real de RLS nas seis tabelas principais;
- policies públicas e administrativas revisadas;
- grants de `anon` e `authenticated` conferidos;
- `public.is_admin()` auditada quanto a `SECURITY DEFINER`, `search_path`, proprietário e lógica baseada em `auth.uid()`;
- permissões diretas de execução de `is_admin()` endurecidas, removendo `PUBLIC`/`anon`;
- bucket `product-media` auditado;
- upload limitado a 25 MB por arquivo e aos formatos JPEG, PNG, WebP, MP4 e WebM;
- seletor de mídia do painel passa a rejeitar formato/tamanho incompatível antes do upload;
- seletor de capa passa a aceitar explicitamente JPG, PNG e WebP;
- login/logout e credenciais inválidas revisados;
- persistência local e exposição de segredos revisadas;
- corrigido o flash temporário de `Usuário sem permissão` após credenciais administrativas válidas;
- criada a migração `supabase/v44_security_hardening.sql`;
- documentação de segurança consolidada.

**Status:** aprovada em 22/09/2026. A migração de hardening foi aplicada e foram aprovados o login administrativo sem flash indevido, logout, bloqueio do `/admin`, upload de mídia e edição de produto após o endurecimento.

## V43 — SEO e preparação pública

- título e meta description revisados para a loja pública;
- metadados Open Graph e Twitter Card adicionados;
- nova imagem social `og-image.jpg` em 1200 × 630;
- favicon, Apple Touch Icon e ícones 192/512 adicionados;
- `site.webmanifest` criado;
- `robots.txt` criado com bloqueio de `/admin`;
- `sitemap.xml` criado para a home;
- rota `/admin` aplica `noindex, nofollow, noarchive` em runtime;
- fontes do Google deixam de usar `@import` no CSS e passam a usar `preconnect` + `link` no HTML;
- hero WebP recebe preload para melhorar carregamento inicial;
- logo do cabeçalho passa de PNG pesado para WebP otimizado sem mudança visual planejada;
- formatos antigos e não utilizados de hero/produtos são marcados para remoção;
- conjunto de arquivos públicos cai de aproximadamente 5,1 MB para 1,2 MB após a limpeza indicada;
- criada documentação específica de SEO e checklist de pré-lançamento.

**Status:** instalada localmente e reportada como funcionando pelo usuário em 22/09/2026. A validação detalhada de compartilhamento, domínio final e PageSpeed permanece na regressão da V45.

## V42 — Funções finais do painel

- categorias passam a ter controle de visibilidade por `is_visible`;
- a administradora pode ocultar/exibir uma categoria sem apagar produtos, capas ou ordem;
- categorias ocultas deixam de aparecer na loja pública e seus produtos também deixam de ser entregues pelas leituras públicas do catálogo;
- painel continua enxergando categorias e produtos ocultos por políticas administrativas específicas;
- catálogo administrativo ganha ação **Duplicar**;
- a duplicação copia dados do produto, variantes e mídias;
- arquivos do Supabase Storage são copiados para uma pasta própria do novo produto, evitando dependência entre original e cópia;
- a cópia nasce com status **Oculto** para permitir revisão antes da publicação;
- mensagens de duplicação/exclusão passam a aparecer na própria área Catálogo;
- `schema.sql` atualizado e adicionada a migração `v42_category_visibility.sql`;
- documentação e testes atualizados junto com a versão.

**Status:** aprovada manualmente em localhost com Supabase em 22/09/2026. Foram validados ocultar/exibir categoria, duplicação de produto, variantes, mídias, edição da cópia e exclusão da cópia sem afetar o original.

## V41 — Revisão mobile do painel administrativo

- auditoria das três áreas do painel em iPhone: Cadastrar, Catálogo e Loja;
- botão móvel de salvar/cadastrar reduzido e reposicionado para respeitar a `safe-area`;
- espaço extra no fim do formulário para impedir que a ação fixa esconda campos e mídias;
- seletor de mídia reformulado para um alvo de toque limpo, sem o controle nativo apertado do navegador;
- descrição do produto mais compacta no mobile;
- catálogo com grupos um pouco mais compactos;
- apenas uma categoria do catálogo fica aberta por vez;
- ao editar um produto, a categoria correspondente é preservada para facilitar o retorno ao catálogo;
- botões Editar/Excluir refinados para telas pequenas;
- troca entre Cadastrar, Catálogo e Loja retorna ao topo da seção no mobile;
- área Loja ganhou espaçamento inferior seguro para Safari/iPhone;
- texto administrativo deixou de citar Netlify e passa a usar o termo genérico “deploy”;
- desktop preservado visualmente.

**Status:** aprovada manualmente no celular em 22/09/2026.

## V40 — Revisão mobile da sacola e fluxo de compra

- sacola adaptada à viewport móvel com `100dvh`;
- suporte às áreas seguras do iPhone;
- bloqueio da rolagem da página por trás da sacola e do modal;
- quantidade de itens e subtotal no cabeçalho da sacola;
- controles de quantidade com áreas de toque maiores;
- campos do checkout com 16 px no mobile para evitar zoom automático do Safari;
- layout mais compacto para pagamento e recebimento;
- mensagens de validação exibidas dentro da sacola;
- foco/rolagem para o campo que precisa ser corrigido;
- melhorias de teclado e `autocomplete` nos campos do checkout;
- botão do WhatsApp respeitando `safe-area`;
- modal de produto mais compacto no celular;
- confirmação de item adicionado reposicionada;
- desktop preservado visualmente.

**Status:** testada manualmente no celular em 22/09/2026, sem problema novo relatado após o teste.

## V39 — Categorias finalizadas no desktop e celular

- carrossel horizontal mantido em todas as telas;
- cards horizontais no desktop com maior área para a imagem;
- cards verticais no celular para preservar as capas;
- scroll lateral com snap;
- remoção de fundos e sombras com aparência acinzentada;
- imagens sem filtros ou zoom artificial;
- enquadramento priorizando produto e modelo.

## V38 — Imagens das categorias

- aumento da área reservada às imagens dos cards;
- cards levemente maiores;
- redução do efeito de imagem “espremida”;
- ajustes equivalentes no mobile.

## V37 — Nitidez e fundo das categorias

- remoção dos efeitos que davam sensação de imagem suavizada;
- redução das sombras;
- fundo da seção alinhado à base visual do site;
- remoção de faixa visual acinzentada sob os cards.

## V36 — Refinamento visual das categorias

- revisão do fundo da seção;
- enquadramento das capas;
- bordas e espaçamentos refinados;
- ajustes específicos para telas menores.

## V35 — Painel, ordenação das categorias e sacola

- grupos de categoria do catálogo administrativo passam a iniciar fechados;
- produtos aparecem somente após abrir a categoria;
- ordenação das categorias por Antes/Depois;
- ordem persistida em `sort_order`;
- a mesma ordem passa a ser usada na vitrine;
- adicionar produto não abre mais a sacola automaticamente;
- confirmação discreta com opção “Ver sacola”.

## V34 — Carrossel de categorias

- categorias em faixa horizontal;
- novas categorias entram automaticamente sem criar uma segunda linha;
- setas no desktop;
- swipe/scroll no celular;
- scroll snap;
- indicação visual de que existem mais cards;
- card inteiro clicável.

## V33 — Categorias dinâmicas e opções de produto

- criação de nova categoria pelo painel;
- novas categorias passam a alimentar home, menu, busca, rodapé e formulário do produto;
- remoção de textos técnicos da vitrine;
- seletores de tamanho/cor aparecem somente quando existem dados;
- Sex Shop não exibe tamanho;
- campo de tamanhos também é ocultado no admin para Sex Shop;
- “Público do pijama” aparece somente em Pijamas.

## V32 — Capas editáveis das categorias

- gerenciamento de capas em `Admin → Loja`;
- prévia antes de salvar;
- upload no Supabase Storage;
- URL e caminho salvos em `categories`;
- loja pública lê a capa do Supabase sem novo deploy;
- migração `supabase/category_covers.sql`.

## V31 — Ajustes pós-login e elementos flutuantes

- refinamentos no fluxo administrativo após autenticação;
- posição do WhatsApp flutuante e do botão de voltar ao topo revista para evitar sobreposição com elementos da hospedagem atual.

## V30 — Login administrativo

- mensagens de autenticação traduzidas para português;
- erro de credenciais tratado como “E-mail ou senha incorretos.”;
- botão para mostrar/ocultar senha;
- melhorias de acessibilidade no campo de senha.

## V29 — Configurações editáveis da loja

- nova aba `Loja` no painel;
- WhatsApp, Instagram, endereço e horário editáveis;
- retirada e entrega configuráveis;
- observações e taxa de entrega configuráveis;
- Pix, Cartão e Dinheiro configuráveis;
- textos do rodapé editáveis;
- dados públicos carregados do Supabase;
- migração `supabase/store_settings.sql`.

## V28 — Preparação para produção

- produtos demonstrativos visíveis em desenvolvimento e ocultos em produção;
- `VITE_SHOW_DEMO_PRODUCTS=true` como override opcional;
- checkout revisado;
- reaproveitamento local de dados da cliente;
- navegação mobile do painel;
- botão de salvar mais acessível no celular;
- ajustes de toque no admin;
- `.gitignore` protegendo variáveis locais;
- documentação inicial de deploy.

## V27 — Verificação segura de administrador

- autorização do painel passa a usar `public.is_admin()` via RPC;
- correção de conflitos com RLS na verificação de permissão;
- loja pública usa a mesma verificação para identificar sessão administrativa.

## V26 — Cadastro da administradora sem dependência de `display_name`

- remoção da dependência da coluna `display_name` em `public.admins`;
- nome de exibição tratado no painel para a conta administrativa conhecida;
- tabela `admins` mantida simples;
- nenhuma permissão insegura de INSERT concedida ao papel `authenticated`.

## V25 — Experimento histórico de `display_name`

- foi criado um script para adicionar `display_name` em `admins`;
- a abordagem foi posteriormente substituída na V26;
- o arquivo permanece no projeto apenas como histórico e não é dependência do estado atual.

## V24 — Nome da administradora no painel

- cabeçalho passa a priorizar nome em vez de e-mail;
- fallback para dados disponíveis na sessão.

## V23 — Catálogo administrativo agrupado

- produtos agrupados por categoria;
- contagem por grupo;
- grupos expansíveis;
- busca por nome;
- filtro por status/demonstração;
- busca e filtro combinados.

## V22 — Sessão administrativa reconhecida na loja

- loja identifica sessão do admin;
- cabeçalho mostra “Painel” para administradora autenticada;
- clientes não precisam de login;
- “Minha conta” passa a ser “Meus dados”;
- dados do cliente ficam somente no navegador.

## V21 — Acesso ao painel e “Ver loja”

- “Ver loja” abre a vitrine sem encerrar a sessão administrativa;
- `/admin` preparado para roteamento SPA em produção.

## V20 — Prévia de fotos e vídeos no painel

- prévia imediata de mídia selecionada;
- marcação de mídia ainda não enviada;
- remoção antes do upload;
- seleção incremental de arquivos;
- envio ao Storage após salvar.

## V19 — Backend com Supabase

- catálogo remoto;
- fallback para catálogo local sem configuração do Supabase;
- painel em `/admin`;
- Supabase Auth;
- CRUD de produtos;
- fotos múltiplas e vídeo;
- tamanhos, cores e status;
- RLS;
- bucket público `product-media`;
- seed inicial.

## V18 — Produtos demonstrativos

- produtos fictícios em Conjuntos, Camisolas e Pijamas;
- identificação visual de demonstração;
- filtro de público em Pijamas;
- produtos reais mantidos separados;
- novidades limitadas aos produtos reais.

## V17 — Voltar ao topo

- botão também disponível no desktop;
- aparece após rolagem;
- posição acima do WhatsApp;
- rolagem suave.

## V16 — Revisão mobile, 18+ e otimização de imagens

- revisão ampla de responsividade;
- confirmação 18+ persistida para Sex Shop;
- estado de categoria vazia;
- conversão de imagens para WebP;
- lazy loading e decoding assíncrono;
- feedbacks de sacola;
- confirmação antes de remover/esvaziar;
- botão continuar comprando;
- voltar ao topo no celular.

## V15 — Galeria, vídeo, quantidade, favoritos e dados do cliente

- várias fotos e vídeo no modal;
- miniaturas;
- quantidade e total no produto;
- favoritos com persistência local;
- “Meus dados”/conta local;
- estrutura de mídia preparada para painel.

## V14 — Busca: correção visual

- alinhamento de resultados;
- remoção do X nativo duplicado;
- refinamento de foco;
- ajustes mobile.

## V13 — Busca global

- busca por nome, categoria e preço;
- sugestões;
- abertura do produto/categoria pelo resultado;
- Enter e Esc;
- limpar busca;
- atalhos da home revisados.

## V12 — Novidades, rodapé e header

- seção de novidades;
- últimos produtos reais exibidos automaticamente;
- rodapé premium;
- cabeçalho sticky/compacto;
- correção de overflow.

## V11 — Categorias independentes

- páginas/seções por categoria;
- categorias vazias com estado próprio;
- divisão futura de Pijamas;
- cabeçalho compacto na rolagem.

## V10 — Sacola e finalização

- painel lateral da sacola;
- alterar quantidade/remover;
- Pix, cartão e dinheiro;
- troco;
- retirada/entrega;
- endereço, referência e observações;
- mensagem de WhatsApp gerada automaticamente;
- persistência da sacola.

## V7 — Primeiros produtos reais

- quatro produtos reais cadastrados em Lingeries;
- imagens reais nos cards;
- categoria Lingeries com destaque real.

## V4–V5 — Identidade visual

- cabeçalho aproximado da referência aprovada;
- logo sem bloco quadrado;
- aplicação da logomarca oficial sem alterar a arte;
- dimensionamento controlado apenas por CSS.

## V1–V3 — Fundação visual

- estrutura inicial React/Vite;
- hero, navegação, categorias e cards;
- identidade rosa/rosé;
- responsividade inicial;
- preparação para catálogo real e contato pelo WhatsApp.

## Versões sem registro individual confiável

As versões **V6, V8 e V9** existiram como iterações intermediárias, mas não há descrição individual preservada suficiente para registrar alterações específicas sem risco de inventar informações. Suas mudanças estão consolidadas nas versões documentadas seguintes.

### V47.1 — correção visual do logotipo
- Corrigida perda de transparência de `public/logo-header.webp` causada pela primeira etapa de otimização da V47.
- Logotipo reprocessado em WebP RGBA, 480 × 164 px, preservando o fundo transparente.
- Ocorrência registrada em `docs/HISTORICO-PROBLEMAS-CORRECOES.md` como parte da auditoria pré-publicação.

### V47.3 — limpeza da seção Novidades
- Removida da vitrine a frase “Os últimos produtos adicionados ao catálogo aparecem aqui automaticamente.” por ser uma explicação interna desnecessária para o cliente final.
- Ajustado o cabeçalho da seção para uma única coluna, evitando reservar espaço vazio após a remoção do texto.

### V47.4 — segundo ciclo de otimização Lighthouse
- Repriorizado o LCP da vitrine: a imagem `hero-modelo.webp` passou a usar `loading="eager"` e `fetchPriority="high"`, enquanto o logo deixou de competir com prioridade alta.
- O preload da home foi ajustado para antecipar o hero, que passou a ser o LCP real após a otimização do logo.
- Corrigido o hash CSP do script de preload da home, que estava sendo bloqueado no ambiente publicado.
- O Google Fonts deixou de bloquear a primeira renderização da vitrine: a folha é ativada após o parse por `public/font-loader.js`, com fallback em `<noscript>`.
- `ai-catalog.json` e `/.well-known/ai-catalog.json` passaram a declarar `specVersion: "1.0"` e metadados mínimos do host.
- Registrado que as capas antigas do Supabase precisam ser reenviadas pelo painel para receber a otimização WebP/cache longo introduzida na V47.
- Registrado passo externo para desativar o Netlify Drawer no ambiente de auditoria, pois o script/iframe injetado pelo Netlify estava gerando ocorrência CSP no Lighthouse.

### V47.8 — correção definitiva do preload do LCP e CSP

- Confirmado pelo Lighthouse que `hero-modelo.webp` é o elemento LCP atual da home.
- Removido o preload de `logo-header.webp`, evitando competição desnecessária de prioridade com o hero.
- Removido o script inline que criava dinamicamente o preload do hero.
- O preload de `hero-modelo.webp` passou a ser declarado diretamente no `<head>` com `fetchpriority="high"`.
- A política CSP de `public/_headers` foi simplificada, removendo hashes antigos de scripts inline que deixaram de existir.
- Objetivo: tornar o hero detectável imediatamente no HTML inicial e eliminar ocorrências CSP causadas pelo preload dinâmico.

### V47.9 — code splitting das rotas secundárias

- `AdminApp`, `PrivacyPage` e `NotFoundPage` deixaram de ser imports estáticos do bundle inicial.
- As três páginas passaram a utilizar `React.lazy()` e `Suspense`.
- A home deixa de carregar antecipadamente código exclusivo de `/admin`, `/privacidade` e da página 404.
- As rotas continuam acessíveis diretamente e foram validadas no preview de produção.

### V47.10 — revisão das prioridades e dimensões do logotipo

- Logo do cabeçalho atualizada para as dimensões reais do arquivo otimizado: 438 × 149 px.
- Removido `fetchPriority="high"` do logotipo do cabeçalho, pois o hero é o LCP real.
- Logo do rodapé recebeu `width` e `height` explícitos.
- Logo do rodapé passou a usar `loading="lazy"` e `decoding="async"`.
- Correção elimina o diagnóstico do Lighthouse sobre imagem do rodapé sem dimensões intrínsecas.

### V47.11 — Supabase removido do bundle crítico da vitrine

- Criado `src/lib/supabaseRest.js` para consultas públicas de leitura usando `fetch` e a API REST do Supabase.
- Catálogo público deixou de depender do SDK `@supabase/supabase-js` para carregar produtos.
- Configurações públicas da loja deixaram de depender do SDK para leitura.
- Categorias da vitrine passaram a ser carregadas pela API REST.
- O SDK completo do Supabase permanece disponível para autenticação e painel administrativo.
- O bundle principal caiu de 503,22 kB para aproximadamente 279 kB.
- O tamanho gzip do bundle principal caiu de 142,95 kB para aproximadamente 84,5 kB.
- O SDK do Supabase passou a ser gerado em chunk separado de aproximadamente 223,96 kB / 58,62 kB gzip.

### V47.12 — Supabase Auth sob demanda na home

- Removido o carregamento automático do SDK de autenticação após 5 segundos.
- A home agora verifica primeiro se existe uma sessão Supabase armazenada no navegador.
- Visitantes comuns não baixam `supabaseClient` durante o carregamento da vitrine.
- Usuários com sessão administrativa existente continuam tendo a sessão reconhecida.
- `/admin` continua utilizando normalmente o cliente completo do Supabase.
- Teste em janela anônima confirmou que o chunk `supabaseClient` não é solicitado pela home pública.

### V47.13 — documentação e gate pré-deploy

- Registradas as otimizações V47.8 a V47.12.
- Build de produção aprovado após as alterações.
- `git diff --check` sem erros de whitespace; apenas avisos normais LF/CRLF do Windows.
- Preview de produção validado localmente.
- Home, `/admin`, `/privacidade` e rota 404 testadas.
- Consultas REST de `products`, `categories` e `store_settings` confirmadas com resposta HTTP 200.
- Console validado sem erro vermelho relacionado às alterações.
- Deploy permanece bloqueado até a revisão final dos arquivos modificados e commit único.

### V47.14 — prioridade responsiva do LCP

- PageSpeed Mobile após a V47.13 atingiu Performance 89, Acessibilidade 100, Práticas recomendadas 100, SEO 100 e Navegação agêntica 4/4.
- O Lighthouse passou a identificar `logo-header.webp` como elemento LCP no viewport mobile.
- O diagnóstico indicou duas pendências diretas no LCP:
  - ausência de `fetchpriority="high"` na logo;
  - logo não descoberta cedo o suficiente no documento inicial.
- O preload passou a ser responsivo por viewport:
  - até 980 px: `logo-header.webp` recebe preload e prioridade alta;
  - a partir de 981 px: `hero-modelo.webp` permanece como preload prioritário.
- A logo do cabeçalho passou a usar `fetchPriority="high"` somente no mobile.
- A logo do rodapé permanece com `loading="lazy"`.
- Nenhuma alteração foi feita nas áreas já aprovadas em 100%.

### V47.15 — migração oficial para Cloudflare Pages

- Projeto migrado com sucesso do Netlify para Cloudflare Pages em 23/09/2026.
- Repositório GitHub existente foi mantido como fonte do projeto.
- Branch `main` conectada ao deploy automático do Cloudflare Pages.
- Framework configurado como React (Vite).
- Build de produção configurado com `npm run build`.
- Diretório publicado configurado como `dist`.
- Variáveis públicas `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` configuradas no Cloudflare.
- Nova origem oficial:
  `https://taifernandes-modaintima.pages.dev/`
- Home, Supabase, catálogo, painel administrativo, login, Política de Privacidade e rota 404 testados com sucesso no Cloudflare.
- canonical, Open Graph, Twitter Card, JSON-LD, ai-catalog e rota de privacidade atualizados para a nova origem.
- robots.txt, sitemap.xml e llms.txt atualizados para remover referências à origem anterior do Netlify.
- Netlify passa a ser tratado apenas como ambiente anterior/histórico durante a consolidação da migração.

## v1.0.0 — primeira versão estável

**Data:** 23/09/2026

Primeira versão estável oficial da Tai Fernandes Moda Íntima.

- catálogo online responsivo;
- categorias e produtos administráveis pelo Supabase;
- busca, favoritos, compra rápida e sacola persistente;
- checkout com Pix, Cartão e Dinheiro;
- retirada e entrega configuráveis;
- finalização de pedidos pelo WhatsApp;
- painel administrativo protegido por Supabase Auth e RLS;
- gerenciamento de produtos, categorias, mídias e configurações da loja;
- Política de Privacidade e página 404;
- SEO técnico, Open Graph, JSON-LD, sitemap, robots e llms.txt;
- headers de segurança e CSP em produção;
- otimizações de carregamento, code splitting e Supabase REST na vitrine;
- migração oficial do Netlify para Cloudflare Pages;
- auditoria final com 0 vulnerabilidades no `npm audit`;
- Lighthouse final: Mobile 88/100 de Performance e Desktop 99/100, com Acessibilidade, Práticas recomendadas e SEO em 100.

**Status:** todos os gates da v1.0.0 aprovados.