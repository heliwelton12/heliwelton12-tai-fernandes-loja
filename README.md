# Tai Fernandes — Moda Íntima

Loja virtual responsiva para **Tai Fernandes Moda Íntima**, com catálogo administrável, favoritos, sacola, checkout e finalização de pedido pelo WhatsApp.

> **Estado atual:** V47 — projeto migrado com sucesso do Netlify para Cloudflare Pages em 23/09/2026. Home, painel administrativo, Política de Privacidade, rota 404, catálogo e integração com Supabase validados no novo ambiente.

## Tecnologias

- React 19
- Vite 7
- JavaScript / JSX
- CSS responsivo
- Supabase Database
- Supabase Auth
- Supabase Storage
- WhatsApp para finalização dos pedidos
- Git / GitHub para versionamento
- Cloudflare Pages como hospedagem oficial
- integração contínua GitHub → Cloudflare Pages

## Funcionalidades principais

### Loja pública

- página inicial responsiva;
- categorias dinâmicas;
- carrossel horizontal de categorias;
- busca global de produtos e categorias;
- página individual de cada categoria;
- seção de novidades;
- galeria de fotos e vídeos no modal de produto;
- seleção de tamanho e cor quando cadastrados;
- controle de quantidade;
- favoritos persistidos no navegador;
- dados do cliente persistidos localmente, com opção de apagar nome/WhatsApp;
- sacola persistida no navegador;
- checkout com Pix, Cartão e Dinheiro;
- retirada ou entrega conforme configuração da loja;
- troco para pagamentos em dinheiro;
- finalização do pedido pelo WhatsApp;
- confirmação 18+ para a categoria Sex Shop;
- indicação de produto esgotado;
- produtos demonstrativos ocultos automaticamente em produção;
- acesso rápido ao painel quando uma administradora já está autenticada;
- Política de Privacidade em `/privacidade`;
- página 404 própria para rotas inexistentes;
- animações sutis com respeito a `prefers-reduced-motion`.

### Painel administrativo

Disponível em `/admin`.

- autenticação com Supabase Auth;
- verificação de permissão administrativa por `public.is_admin()`;
- cadastro, edição e exclusão de produtos;
- status Disponível, Esgotado e Oculto;
- marcação de Novidade e Demonstração;
- múltiplas fotos e vídeo;
- escolha da foto de capa;
- tamanhos e cores;
- público de Pijamas;
- catálogo agrupado por categoria;
- categorias do catálogo fechadas por padrão;
- no mobile, apenas uma categoria do catálogo fica aberta por vez;
- formulário e upload de mídia refinados para iPhone/Android;
- busca e filtro de produtos;
- criação de categorias com descrição curta;
- edição de nome e descrição das categorias;
- exclusão segura apenas de categorias vazias;
- capa personalizada das categorias;
- ordenação das categorias;
- ocultar/exibir categorias sem apagar seus produtos;
- duplicação segura de produtos, incluindo variantes e mídias;
- configurações da loja, atendimento, pagamentos, retirada, entrega e rodapé.

## Estrutura principal

```text
src/
├── App.jsx                  # Loja pública
├── AdminApp.jsx             # Painel administrativo
├── main.jsx                 # Entrada e seleção das rotas públicas/admin
├── PrivacyPage.jsx          # Política de Privacidade
├── NotFoundPage.jsx         # Página 404
├── styles.css               # Estilos da loja
├── admin.css                # Estilos do painel
└── lib/
    ├── catalogBackend.js    # Leitura do catálogo no Supabase
    ├── storeSettings.js     # Configurações dinâmicas da loja
    └── supabaseClient.js    # Cliente Supabase

supabase/
├── schema.sql
├── seed.sql
├── store_settings.sql
├── category_covers.sql
├── v42_category_visibility.sql
├── v44_security_audit.sql
├── v44_security_hardening.sql
├── v46_category_editing.sql
└── v25_admin_display_name.sql  # histórico; não é dependência do painel atual

docs/
├── ARQUITETURA.md
├── BANCO-DE-DADOS.md
├── PAINEL-ADMIN.md
├── FLUXO-DE-COMPRA.md
├── PRIVACIDADE.md
├── SEO.md
├── SEGURANCA.md
├── CHECKLIST-PRE-LANCAMENTO.md
└── DEPLOY.md
```

## Executar localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar `.env.local`

Use `.env.example` como referência e informe somente as chaves públicas do frontend:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

Nunca coloque `service_role`, senha do banco ou qualquer segredo administrativo no frontend.

### 3. Iniciar o desenvolvimento

```bash
npm run dev -- --host
```

O `--host` permite testar o projeto em um celular conectado à mesma rede do computador.

### 4. Testar o build de produção localmente

```bash
npm run build
npm run preview -- --host
```

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `VITE_SUPABASE_URL` | URL pública do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | chave pública usada pelo frontend |
| `VITE_SHOW_DEMO_PRODUCTS` | opcional; quando `true`, permite exibir produtos demonstrativos em build de produção |

## Persistência local do cliente

O navegador utiliza `localStorage` para dados que não precisam de conta:

| Chave | Conteúdo |
|---|---|
| `tf-cart` | produtos da sacola |
| `tf-favorites` | IDs dos favoritos |
| `tf-profile` | nome e WhatsApp salvos em “Meus dados” |
| `tf-adult-confirmed` | confirmação 18+ para Sex Shop |

## Documentação

- [CHANGELOG.md](CHANGELOG.md) — histórico das versões.
- [TESTES.md](TESTES.md) — testes executados, pendências e regressão final.
- [docs/ARQUITETURA.md](docs/ARQUITETURA.md) — visão técnica do sistema.
- [docs/BANCO-DE-DADOS.md](docs/BANCO-DE-DADOS.md) — Supabase, tabelas, RLS e Storage.
- [docs/PAINEL-ADMIN.md](docs/PAINEL-ADMIN.md) — funcionamento do painel.
- [docs/FLUXO-DE-COMPRA.md](docs/FLUXO-DE-COMPRA.md) — jornada da cliente até o WhatsApp.
- [docs/DEPLOY.md](docs/DEPLOY.md) — desenvolvimento local e publicação.
- [docs/PRIVACIDADE.md](docs/PRIVACIDADE.md) — dados locais, WhatsApp e direitos da cliente.
- [docs/SEO.md](docs/SEO.md) — metadados, favicon, Open Graph, sitemap e robots.
- [docs/CHECKLIST-PRE-LANCAMENTO.md](docs/CHECKLIST-PRE-LANCAMENTO.md) — checklist consolidado dos vídeos e da revisão final.

## Regra de desenvolvimento atual

Enquanto a revisão final estiver em andamento:

1. alterar o código localmente;
2. testar no computador e no celular;
3. registrar a mudança no `CHANGELOG.md`;
4. registrar o teste no `TESTES.md`;
5. fazer commit local quando a etapa estiver aprovada;
6. **não fazer `git push` a cada ajuste**;
7. publicar somente depois da revisão geral e do build de produção aprovado.

## Próximas etapas

1. concluir auditoria pós-migração no Cloudflare Pages;
2. executar PageSpeed Mobile e Desktop na origem oficial;
3. registrar eventuais pendências reais de performance;
4. concluir regressão final da v1.0.0;
5. criar a tag estável quando todos os gates forem aprovados.
