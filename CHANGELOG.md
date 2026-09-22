# Changelog — Tai Fernandes Moda Íntima

Este arquivo registra as mudanças relevantes do projeto. As versões antigas foram reconstruídas a partir do histórico preservado no projeto e dos pacotes de desenvolvimento existentes. Quando uma versão intermediária não possui registro confiável individual, ela é indicada como tal em vez de ter alterações inventadas.

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
