# Registro de testes — Tai Fernandes Moda Íntima

Este arquivo diferencia o que já foi validado do que ainda precisa passar pela regressão final.

## Legenda

- ✅ **Aprovado** — testado e sem problema pendente conhecido.
- 🔄 **Em revisão** — funcional, mas ainda será incluído na regressão final.
- ⏳ **Pendente** — ainda precisa de teste formal antes da versão 1.0.0.
- ❌ **Falhou** — problema encontrado e ainda não corrigido.

## Testes já realizados

| Área | Cenário | Ambiente | Status | Observação |
|---|---|---|---|---|
| Admin | Login com e-mail e senha | Produção / navegador | ✅ | Acesso administrativo validado. |
| Admin | Reconhecimento da sessão na loja | Produção / navegador | ✅ | Cabeçalho exibe acesso ao Painel quando admin está autenticado. |
| Admin | Cadastro/visualização de catálogo agrupado | Produção / navegador | ✅ | Produtos aparecem separados por categoria. |
| Admin | Categorias fechadas ao abrir o painel | Produção/local | ✅ | Alteração da V35. |
| Categorias | Criar categoria pelo painel | Produção / navegador | ✅ | Categoria Baby Doll criada e exibida na loja. |
| Categorias | Trocar capa pelo painel | Produção / navegador | ✅ | Capa gravada no Supabase e lida pela vitrine. |
| Categorias | Ordem por `sort_order` | Produção/local | ✅ | Ordem atualizada na navegação e carrossel. |
| Categorias | Carrossel desktop | Produção / desktop | ✅ | Layout horizontal aprovado após refinamentos V34–V39. |
| Categorias | Carrossel mobile | Celular | ✅ | Cards verticais dentro do carrossel; revisão concluída na V39. |
| Produto | Modal/Espiar | Desktop e celular | 🔄 | Funcional; será repetido na regressão final. |
| Produto | Produto sem tamanho/cor | Desktop e celular | ✅ | Não mostra seletores vazios. |
| Produto | Sex Shop sem tamanho | Desktop e celular | ✅ | Regra aplicada na vitrine e no admin. |
| Sacola | Adicionar item sem abrir sacola automaticamente | Desktop/celular | ✅ | Comportamento adotado a partir da V35. |
| Sacola | Persistência após atualização | Navegador | ✅ | `tf-cart` em localStorage. |
| Sacola | Quantidade e subtotal | Celular | ✅ | Revisado na V40. |
| Checkout | Campos e layout mobile | Celular | ✅ | V40 testada manualmente em 22/09/2026. |
| Checkout | Validação dentro da sacola | Celular | ✅ | V40 testada manualmente; nenhum erro novo relatado. |
| Checkout | Safe area / viewport móvel | Celular | ✅ | Ajustes V40. |
| Favoritos | Salvar favoritos localmente | Navegador | 🔄 | Funcional; incluir na regressão final. |
| Sex Shop | Confirmação 18+ | Navegador | 🔄 | Persistência implementada; repetir antes da versão 1.0.0. |
| Configurações | Loja lê `store_settings` | Produção | ✅ | Alterações do painel aparecem sem deploy. |
| Admin mobile | Cabeçalho e navegação Cadastrar/Catálogo/Loja | iPhone / localhost | ✅ | Auditoria visual em 22/09/2026; sem estouro lateral. |
| Admin mobile | Formulário de cadastro | iPhone / localhost | ✅ | V41 conferida após as alterações em 22/09/2026. |
| Admin mobile | Catálogo com grupos fechados | iPhone / localhost | ✅ | Grupos fechados e cards legíveis; V41 compacta e limita a uma categoria aberta por vez. |
| Admin mobile | Configurações da loja | iPhone / localhost | ✅ | Campos, recebimento, pagamentos, rodapé e categorias visualmente utilizáveis. |
| Admin mobile | Capas e ordem das categorias | iPhone / localhost | ✅ | Cards, setas e seleção de imagem cabem na tela. |
| Admin mobile | V41 após alterações | iPhone / localhost | ✅ | Usuário conferiu a versão e confirmou que estava tudo certo em 22/09/2026. |

## Testes da V42

| Área | Cenário | Ambiente | Status | Observação |
|---|---|---|---|---|
| Categorias | Ocultar categoria sem apagar dados | Localhost + Supabase | ✅ | Categoria ocultada e removida da loja pública sem apagar os dados. |
| Categorias | Exibir categoria novamente | Localhost + Supabase | ✅ | Categoria voltou à loja com capa, ordem e produtos preservados. |
| Catálogo | Duplicar produto | Localhost + Supabase | ✅ | Cópia criada corretamente e mantida fora da vitrine até revisão. |
| Catálogo | Duplicar variantes | Localhost + Supabase | ✅ | Tamanhos e cores preservados na cópia. |
| Catálogo | Duplicar mídia local | Localhost + Supabase | ✅ | Mídias vinculadas à cópia corretamente. |
| Catálogo | Duplicar mídia do Storage | Localhost + Supabase | ✅ | Mídias do Storage preservadas na cópia sem afetar o original. |
| Catálogo | Excluir cópia sem quebrar original | Localhost + Supabase | ✅ | Cópia excluída e produto original continuou intacto. |
| RLS | Público não lê categoria oculta | Supabase | ✅ | Validado funcionalmente pela vitrine; repetir tecnicamente na auditoria V44. |
| RLS | Admin continua lendo itens ocultos | Supabase | ✅ | Painel continuou gerenciando categorias e produtos ocultos; repetir tecnicamente na auditoria V44. |


### Resultado da V42

- ✅ Ocultar categoria testado.
- ✅ Exibir categoria testado.
- ✅ Duplicar produto testado.
- ✅ Variantes preservadas.
- ✅ Mídias preservadas.
- ✅ Edição da cópia não alterou o original.
- ✅ Exclusão da cópia não afetou o original.
- ✅ V42 aprovada pelo usuário em 22/09/2026.

## V43 — SEO e preparação pública

### Implementado

- ✅ favicon e ícones de aplicativo gerados;
- ✅ Open Graph 1200 × 630 gerado;
- ✅ meta title e meta description revisados;
- ✅ tags Open Graph/Twitter adicionadas;
- ✅ `robots.txt` criado;
- ✅ `sitemap.xml` criado;
- ✅ `/admin` marcado com `noindex` em runtime e bloqueado no `robots.txt`;
- ✅ fontes migradas de `@import` para `preconnect` + `link`;
- ✅ logo do header convertida para WebP otimizado;
- ✅ inventário de arquivos antigos a remover criado;
- ✅ `site.webmanifest` validado como JSON;
- ✅ `sitemap.xml` validado como XML.

### Validação manual ainda necessária

- ⏳ abrir a home e confirmar que a logo continua idêntica visualmente;
- ⏳ confirmar favicon na aba do navegador;
- ⏳ abrir `/og-image.jpg` e conferir a arte;
- ⏳ abrir `/robots.txt`;
- ⏳ abrir `/sitemap.xml`;
- ⏳ confirmar que `/admin` continua funcionando normalmente;
- ⏳ executar `npm run build`;
- ⏳ executar `npm run preview -- --host`;
- ⏳ trocar as URLs absolutas para o domínio definitivo antes do lançamento.

## V44 — Auditoria de segurança

| Área | Cenário | Ambiente | Status | Observação |
|---|---|---|---|---|
| Banco | RLS nas 6 tabelas principais | Supabase / produção | ✅ | Todas retornaram `rls_enabled = true`. |
| Banco | Policies públicas e administrativas | Supabase / produção | ✅ | Leitura pública limitada; escrita administrativa usa `is_admin()`. |
| Banco | Grants `anon` / `authenticated` | Supabase / produção | ✅ | `anon` somente com SELECT necessário; escrita depende de RLS. |
| Auth | Estrutura de `admins` | Supabase / produção | ✅ | Apenas `user_id` e `created_at`; nenhuma senha própria. |
| Auth | Função `is_admin()` | Supabase / produção | ✅ | `STABLE`, `SECURITY DEFINER`, `search_path=''`, `auth.uid()`. |
| Storage | Policies do bucket `product-media` | Supabase / produção | ✅ | Leitura pública; INSERT/UPDATE/DELETE exigem admin. |
| Auth | Logout e bloqueio do `/admin` | Navegador | ✅ | Painel volta a exigir login. |
| Auth | E-mail/senha inválidos | Navegador | ✅ | Mensagem genérica, sem revelar existência da conta. |
| Frontend | Dados persistidos localmente | Código / navegador | ✅ | Sem senha e sem dados de cartão. |
| Frontend | Segredos no cliente | Código | ✅ | Sem `service_role` ou senha do banco; `.env.local` ignorado. |
| Admin | Flash `Usuário sem permissão` | Localhost + Supabase | ✅ | Correção aprovada; login válido não exibe mais o aviso temporário. |
| Storage | Limite de 25 MB e MIME types | Supabase + localhost | ✅ | Hardening aplicado e upload normal aprovado após a migração. |

### Resultado da V44

- ✅ `v44_security_hardening.sql` aplicado.
- ✅ `PUBLIC` e `anon` removidos do `EXECUTE` direto de `is_admin()`.
- ✅ login administrativo válido aprovado sem flash de permissão.
- ✅ logout e bloqueio do painel aprovados.
- ✅ upload de mídia aprovado após o hardening.
- ✅ edição de produto aprovada após o hardening.
- ✅ V44 aprovada pelo usuário em 22/09/2026.

## V45 — Pré-lançamento, privacidade e acabamento

### Implementado

- ✅ rota `/privacidade`;
- ✅ ação `Limpar nome e WhatsApp` em Meus dados;
- ✅ remoção de `tf-profile` quando vazio;
- ✅ limites de tamanho nos campos principais do checkout;
- ✅ rota 404 interna para caminhos desconhecidos;
- ✅ `llms.txt`;
- ✅ JSON-LD `Store`;
- ✅ sitemap com página de privacidade;
- ✅ `store_settings` sem `select('*')` no frontend;
- ✅ headers preparados em `public/_headers`;
- ✅ animações leves sem dependência adicional;
- ✅ `prefers-reduced-motion`;
- ✅ código atual varrido por padrões de segredo;
- ✅ histórico remoto atual do Git (8 commits) revisado sem `.env.local` commitido nem segredo administrativo encontrado.

### Validação local concluída

- ✅ `/privacidade`, 404, home e admin funcionando no ambiente local;
- ✅ ação `Limpar nome e WhatsApp` implementada e fluxo local conferido;
- ✅ `npm audit` executado sem bloqueio reportado;
- ✅ `npm run build` concluído;
- ✅ `npm run preview -- --host` concluído e home/admin conferidos no build de produção.

### Ainda pendente para publicação

- ⏳ validar CSP/headers no deploy do Cloudflare;
- ⏳ executar Lighthouse/PageSpeed;
- ⏳ atualizar URLs temporárias quando o domínio final for definido.


## V46 — Acabamento final de experiência

### Implementado

- ✅ rodapé simplificado;
- ✅ modal e compra rápida permanecem abertos após adicionar à sacola;
- ✅ feedback `✓ Adicionado`;
- ✅ criação/edição de descrição curta de categoria;
- ✅ edição de nome da categoria;
- ✅ exclusão protegida de categorias com produtos;
- ✅ última categoria não pode ser apagada;
- ✅ regras especiais de Pijamas/Sex Shop desacopladas do nome visível e ligadas ao `slug`.

### Pendente de validação

- ⏳ executar `v46_category_editing.sql`;
- ⏳ editar nome de uma categoria e confirmar atualização na vitrine;
- ⏳ editar descrição curta e confirmar atualização no card;
- ⏳ confirmar que renomear Pijamas/Sex Shop não remove as regras especiais;
- ⏳ tentar excluir categoria com produto e confirmar bloqueio;
- ⏳ criar uma categoria vazia de teste, excluir e confirmar remoção;
- ⏳ abrir Espiar, adicionar quantidade > 1 e confirmar que o produto permanece aberto;
- ⏳ adicionar novamente o mesmo produto/variação e conferir quantidade na sacola;
- ⏳ testar compra rápida sem fechamento automático;
- ⏳ conferir rodapé no desktop e celular;
- ⏳ repetir `npm run build` após aprovação.

## Regressão final obrigatória antes da v1.0.0

### Loja pública

- ⏳ carregar home sem erros no console;
- ⏳ conferir header normal e compacto;
- ⏳ testar menu/categorias no desktop;
- ⏳ testar menu/categorias no celular;
- ⏳ testar busca por produto;
- ⏳ testar busca por categoria;
- ⏳ testar Enter/Esc na busca;
- ⏳ abrir produto pela home;
- ⏳ abrir produto pela categoria;
- ⏳ alternar fotos;
- ⏳ reproduzir vídeo de produto;
- ⏳ selecionar tamanho;
- ⏳ selecionar cor;
- ⏳ alterar quantidade;
- ⏳ favoritar/desfavoritar;
- ⏳ testar produto esgotado;
- ⏳ testar categoria vazia;
- ⏳ testar filtro de Pijamas;
- ⏳ testar 18+ em primeira visita;
- ⏳ testar 18+ após confirmação já salva.

### Sacola e pedido

- ⏳ adicionar vários produtos;
- ⏳ adicionar o mesmo produto com variações diferentes;
- ⏳ aumentar/diminuir quantidade;
- ⏳ remover item;
- ⏳ esvaziar sacola;
- ⏳ atualizar a página e confirmar persistência;
- ⏳ preencher nome e telefone;
- ⏳ Pix;
- ⏳ Cartão;
- ⏳ Dinheiro sem troco;
- ⏳ Dinheiro com troco;
- ⏳ Retirada;
- ⏳ Entrega com endereço completo;
- ⏳ validação dos campos obrigatórios;
- ⏳ observações;
- ⏳ abrir WhatsApp e revisar mensagem completa;
- ⏳ confirmar total do site versus total da mensagem.

### Painel administrativo

- ⏳ login/logout no celular;
- ⏳ cadastro de produto no celular;
- ⏳ edição de produto no celular;
- ⏳ exclusão com confirmação;
- ⏳ upload de uma foto;
- ⏳ upload de várias fotos;
- ⏳ upload de vídeo;
- ⏳ escolha da capa;
- ⏳ produto Disponível;
- ⏳ produto Esgotado;
- ⏳ produto Oculto;
- ⏳ Novidade;
- ⏳ Demonstração;
- ⏳ busca do catálogo;
- ⏳ filtros do catálogo;
- ⏳ criar categoria;
- ⏳ trocar capa de categoria;
- ⏳ remover capa personalizada;
- ⏳ reordenar categoria;
- ⏳ salvar configurações da loja;
- ⏳ conferir as alterações na vitrine.

### Produção e qualidade

- ⏳ `npm run build` sem erro;
- ⏳ `npm run preview -- --host`;
- ⏳ desktop Chrome/Edge;
- ⏳ Safari/iPhone;
- ⏳ Android/Chrome quando disponível;
- ⏳ links de Instagram e WhatsApp;
- ⏳ rota `/admin` aberta diretamente;
- ⏳ rota inexistente/404;
- ⏳ rota `/privacidade`;
- ⏳ botão Limpar nome e WhatsApp;
- ⏳ `llms.txt`;
- ⏳ JSON-LD;
- ⏳ favicon;
- ⏳ Open Graph;
- ⏳ `robots.txt`;
- ⏳ `sitemap.xml`;
- ⏳ PageSpeed/Lighthouse;
- ⏳ headers de segurança/CSP no ambiente publicado;
- ⏳ `npm audit`;
- ⏳ deploy no Cloudflare Pages;
- ⏳ teste final no domínio de produção.

## Modelo para registrar um novo teste

```text
Data:
Versão:
Ambiente/dispositivo:
Cenário:
Resultado esperado:
Resultado obtido:
Status: ✅ / 🔄 / ⏳ / ❌
Observação:
```

## Regra

Uma nova versão só deve ser marcada como concluída quando:

1. a alteração estiver descrita no `CHANGELOG.md`;
2. o cenário principal tiver sido testado;
3. o resultado estiver registrado neste arquivo;
4. não houver regressão conhecida bloqueando o fluxo principal.

## V47 — auditoria pré-publicação

### Diagnóstico concluído
- ✅ baseline mobile: Performance 78, FCP 3,0 s, LCP 4,5 s, TBT 0 ms, CLS 0, SI 3,1 s;
- ✅ baseline desktop: Performance 98, Acessibilidade 96, Práticas recomendadas 92, SEO 100;
- ✅ LCP mobile identificado como logo;
- ✅ erro 400 de `categories` relacionado ao caminho de compatibilidade identificado;
- ✅ imagens grandes/cache curto do Supabase identificados;
- ✅ contraste e nomes acessíveis identificados;
- ✅ problema de fallback HTML em `ai-catalog.json` identificado.

### Alterações preparadas
- ✅ assets críticos otimizados;
- ✅ preload responsivo;
- ✅ upload de imagens otimizado;
- ✅ cache atualizado;
- ✅ acessibilidade revisada;
- ✅ ARD/ai-catalog adicionados;
- ✅ documentação criada.

### Validação obrigatória após instalar a V47
- ⏳ executar `supabase/v47_schema_reconciliation.sql`;
- ⏳ `npm install`/`npm ci`;
- ⏳ `npm run build`;
- ⏳ `npm run preview -- --host`;
- ⏳ testar upload de foto JPG/PNG e confirmar que a mídia publicada é WebP quando suportado;
- ⏳ testar capa de categoria;
- ⏳ conferir home no PC e celular;
- ⏳ conferir `/admin`;
- ⏳ confirmar ausência de 400 em `categories`;
- ⏳ publicar no ambiente temporário;
- ⏳ repetir Lighthouse mobile/desktop e registrar resultados.


## V47.2 — regressão de sessão do painel

- 🔄 abrir `/admin` com sessão administrativa válida;
- 🔄 alternar para outra aba/janela e retornar ao painel diversas vezes;
- 🔄 deixar a aba em segundo plano por alguns minutos e retornar;
- 🔄 confirmar que **“Verificando acesso administrativo…”** desaparece normalmente e não fica presa;
- 🔄 confirmar que não é necessário usar `F5` para recuperar o painel;
- 🔄 confirmar ausência de erros vermelhos de autenticação no Console;
- 🔄 confirmar ausência dos avisos de preload de `logo-header.webp`/`hero-modelo.webp` em `/admin` após recarregar a rota;
- ⏳ após aprovação manual, executar `npm run build` e `npm audit`.

### V47.3 — seção Novidades
- [ ] Confirmar que a seção mantém “ACABOU DE CHEGAR” e “Novidades da loja”.
- [ ] Confirmar que a frase explicativa sobre produtos adicionados automaticamente não aparece mais.
- [ ] Conferir alinhamento da seção em desktop e mobile após a remoção.

## V47.4 — reteste Lighthouse após V47.3

### Resultado V47.3 publicado
- ✅ Mobile: Performance 83, Acessibilidade 100, Práticas recomendadas 92, SEO 100.
- ✅ Mobile: FCP 3,0 s, LCP 3,7 s, TBT 0 ms, CLS 0, Speed Index 3,0 s.
- ✅ Desktop: Performance 99, Acessibilidade 100, Práticas recomendadas 92, SEO 100.
- ✅ Desktop: FCP 0,7 s, LCP 0,9 s, TBT 0 ms, CLS 0, Speed Index 1,0 s.
- ✅ Houve melhora mensurável em relação ao baseline, mas o gate de publicação não foi fechado.

### Pendências detectadas no relatório
- 🔄 CSP: confirmar que o script de preload da home não é mais bloqueado.
- 🔄 Netlify Drawer: desativar em Collaboration tools e confirmar que o `about:srcdoc`/HUD não aparece no relatório.
- 🔄 LCP mobile: confirmar hero com `fetchPriority=high` e queda de FCP/LCP.
- 🔄 Fonts: confirmar que Google Fonts saiu da lista de recursos que bloqueiam renderização.
- 🔄 Agentic browsing: confirmar `ai-catalog.json` válido com `specVersion: "1.0"`.
- 🔄 Supabase: reenviar as capas antigas de Conjuntos, Camisolas e Lingeries pelo painel para aplicar WebP e cache de 1 ano.
- ⏳ publicar V47.4 no Netlify temporário.
- ⏳ executar PageSpeed mobile/desktop novamente.
- ⏳ só liberar o gate quando não houver regressão funcional nem erro relevante de Console/Lighthouse.

## V47.8 a V47.13 — validação pré-deploy final

### Build e integridade

- ✅ `npm run build` concluído sem erro.
- ✅ 81 módulos transformados no build final local.
- ✅ `git diff --check` sem erro de whitespace.
- ℹ️ avisos LF → CRLF observados no Windows são apenas normalização de quebra de linha e não falha de código.

### Code splitting

- ✅ `AdminApp` gerado em chunk JavaScript separado.
- ✅ `PrivacyPage` gerada em chunk JavaScript separado.
- ✅ `NotFoundPage` gerada em chunk JavaScript separado.
- ✅ SDK do Supabase gerado em chunk separado.
- ✅ bundle principal reduzido de 503,22 kB para 279,08 kB.
- ✅ bundle principal gzip reduzido de 142,95 kB para 84,54 kB.

### Teste local em produção

- ✅ `npm run preview -- --host`.
- ✅ `/` abre normalmente.
- ✅ `/admin` abre normalmente.
- ✅ `/privacidade` abre normalmente.
- ✅ rota inexistente exibe a página 404.
- ✅ painel administrativo continua funcional.

### Supabase público

- ✅ produtos carregados pela API REST.
- ✅ categorias carregadas pela API REST.
- ✅ configurações da loja carregadas pela API REST.
- ✅ requisição `products` retorna HTTP 200.
- ✅ requisição `categories` retorna HTTP 200.
- ✅ requisição `store_settings` retorna HTTP 200.

### Carregamento do SDK do Supabase

- ✅ em janela anônima, a home pública não solicita o chunk `supabaseClient`.
- ✅ referência textual ao nome do chunk dentro do bundle não significa download do arquivo.
- ✅ SDK completo permanece disponível sob demanda para sessão administrativa e `/admin`.

### LCP e imagens

- ✅ `hero-modelo.webp` permanece com `loading="eager"`.
- ✅ hero permanece com `fetchPriority="high"`.
- ✅ preload do hero declarado diretamente no HTML.
- ✅ preload de logo removido.
- ✅ logo do cabeçalho sem prioridade alta.
- ✅ logo do rodapé com dimensões explícitas.
- ✅ logo do rodapé com lazy loading.

### CSP e Console

- ✅ script inline de preload removido.
- ✅ hashes CSP antigos relacionados ao preload removidos.
- ✅ preview local sem erro vermelho relacionado às alterações.

### Gate do deploy

- ✅ validação funcional local aprovada.
- ✅ validação de build aprovada.
- ✅ otimização estrutural do bundle aprovada.
- ⏳ revisar `git status` final.
- ⏳ revisar documentação.
- ⏳ criar commit único.
- ⏳ executar push único para o Netlify.
- ⏳ aguardar estado `Published`.
- ⏳ executar PageSpeed Mobile.
- ⏳ executar PageSpeed Desktop.
- ⏳ comparar resultados com o baseline anterior.
- ⏳ somente depois liberar migração para Cloudflare Pages.