# Tai Fernandes — Moda Íntima (v3)

Versão atualizada seguindo mais de perto a referência escolhida.

## Alterações desta versão

- hero com modelo em foto, no estilo aprovado;
- retirada dos emojis da interface;
- ícones vetoriais em SVG;
- cabeçalho e navegação mais próximos da referência;
- produtos fictícios elegantes para apresentação;
- busca funcional nos produtos demonstrativos;
- seção já preparada para substituir os itens fictícios pelos produtos reais;
- botão de cada produto abre o WhatsApp mencionando o item escolhido;
- estrutura mobile mantida.

## Produtos reais

No arquivo `src/App.jsx`, existe o array:

`const realProducts = []`

Enquanto ele estiver vazio, o site usa `mockProducts`.

Quando os produtos reais chegarem, podemos:
1. cadastrar manualmente;
2. ou conectar esse conteúdo ao Supabase e painel administrativo.


## v4 — identidade no cabeçalho

- removido o bloco quadrado rosa da logomarca;
- criada versão transparente rosé da identidade;
- busca à esquerda, marca centralizada e ações à direita, seguindo a referência aprovada;
- rodapé também atualizado para a identidade limpa.


## v5 — logomarca oficial

- a imagem enviada pela usuária foi aplicada exatamente como recebida;
- nenhuma alteração foi feita no desenho, texto, cor ou composição da logomarca;
- apenas o tamanho de exibição no cabeçalho e rodapé é controlado pelo CSS, preservando a proporção original.


## v7 — categoria Lingeries

Foram cadastrados os 4 primeiros produtos reais:

- Lingerie 01 — R$ 40,00
- Lingerie 02 — R$ 40,00
- Lingerie 03 — R$ 26,00
- Lingerie 04 — R$ 40,00

As fotos reais agora aparecem nos cards de produto. A categoria Lingeries também utiliza uma das fotos reais como destaque. Tamanhos e cores continuam em aberto até serem informados.


## v10 — sacola e finalização

- removidas informações repetidas do hero e da faixa abaixo;
- topo simplificado;
- sacola abre em painel lateral;
- alterar quantidade e remover produto;
- escolha de Pix, cartão ou dinheiro;
- opção de troco para pagamento em dinheiro;
- retirada ou entrega;
- endereço e referência para entrega;
- observações do pedido;
- mensagem completa montada automaticamente para o WhatsApp;
- carrinho salvo no navegador para não desaparecer ao atualizar a página.


## v11 — categorias independentes e cabeçalho compacto

- cada categoria agora abre em um espaço próprio;
- a home não joga mais todos os produtos para baixo;
- Lingeries e Sex Shop mostram apenas seus respectivos produtos;
- categorias sem produtos exibem um aviso próprio;
- Pijamas já mostra as futuras divisões Feminino, Masculino e Infantil;
- o cabeçalho continua visível durante a rolagem;
- depois de rolar a página, ele fica menor para ocupar menos espaço.


## v12 — novidades, rodapé premium e header fixo

- seção "Novidades da loja" na página inicial;
- os últimos 4 produtos cadastrados aparecem automaticamente como novidades;
- rodapé premium com navegação, atendimento, informações, pagamentos e aviso 18+;
- cabeçalho continua visível durante a rolagem e reduz de tamanho;
- corrigido o `overflow` do contêiner principal para não quebrar o comportamento sticky do cabeçalho.


## v13 — busca global funcional e pequenos refinamentos

- busca do cabeçalho funciona em toda a loja;
- busca por nome do produto, categoria e preço;
- sugestões aparecem enquanto a cliente digita;
- cada resultado mostra foto, categoria, nome e preço;
- clicar no produto abre o modal de detalhes;
- clicar em uma categoria abre diretamente o espaço daquela categoria;
- tecla Enter abre o primeiro produto encontrado;
- tecla Esc fecha os resultados;
- botão para limpar a busca;
- botão principal "Ver produtos" agora leva para as categorias;
- "Ofertas" foi substituído por "Novidades", pois ainda não há promoções reais cadastradas.


## v14 — correção visual da busca

- corrigida a seta das categorias nos resultados da busca;
- a seta agora fica alinhada à direita e não sobrepõe o nome;
- removido o botão X nativo do navegador para não aparecer duplicado;
- foco do campo de busca ficou mais visível e refinado;
- ajuste mantido também para celular.


## v15 — galeria, vídeo, quantidade, favoritos e minha conta

- modal Espiar preparado para várias fotos;
- suporte a vídeo do produto com player dentro do modal;
- miniaturas para alternar entre fotos e vídeo;
- quantidade ajustável no modal;
- total do produto atualizado de acordo com a quantidade;
- adicionar à sacola respeita a quantidade escolhida;
- Favoritos agora funcionam e ficam salvos no navegador;
- painel de Favoritos com acesso rápido ao produto;
- Minha conta agora permite salvar nome e telefone neste aparelho;
- nome salvo é reutilizado para agilizar a finalização do pedido;
- estrutura de mídia aceita `media`, `images` e `video`, pronta para o futuro painel administrativo.


## v16 — mobile, 18+, imagens e acabamento de loja

- revisão completa para celular: cabeçalho, hero, categorias, cards, busca, modal, favoritos, conta, sacola e checkout;
- confirmação 18+ antes do primeiro acesso ao Sex Shop, salva no navegador;
- categorias vazias ganharam estado premium com atalhos;
- imagens do hero e produtos foram convertidas para WebP otimizado, mantendo os originais no projeto;
- lazy loading e decoding assíncrono em imagens não críticas;
- feedback visual ao adicionar/remover produtos;
- animação no contador da sacola;
- confirmação antes de remover item ou esvaziar a sacola;
- botão Continuar comprando e Esvaziar sacola;
- botão Voltar ao topo no celular;
- botão de finalizar pedido fica mais acessível no checkout mobile.


## v17 — seta voltar ao topo

- o botão circular “voltar ao topo” agora aparece também no computador;
- continua aparecendo somente depois que a pessoa rola a página;
- fica acima do botão do WhatsApp, sem sobreposição;
- usa o mesmo estilo de ícones do restante da loja;
- possui animação suave no hover e rolagem suave até o início.


## v18 — produtos fictícios nas categorias pendentes

- Conjuntos recebeu 4 produtos demonstrativos;
- Camisolas recebeu 4 produtos demonstrativos;
- Pijamas recebeu 4 produtos demonstrativos;
- produtos fictícios são identificados com a etiqueta “Demonstração”;
- aviso claro nas categorias informa que os itens serão substituídos depois;
- Pijamas agora possui filtro funcional: Todos, Feminino, Masculino e Infantil;
- produtos reais de Lingeries e Sex Shop continuam separados e sem alteração;
- seção Novidades continua mostrando apenas produtos reais;
- busca global também encontra os produtos demonstrativos, permitindo testar o fluxo completo.


## v19 — início do backend com Supabase

- a loja agora pode carregar o catálogo diretamente do Supabase;
- sem `.env.local`, continua usando o catálogo local atual;
- painel administrativo em `/admin`;
- autenticação por e-mail/senha para administradora;
- cadastro, edição e exclusão de produtos;
- fotos múltiplas e vídeo;
- foto de capa;
- tamanhos e cores;
- status Disponível / Esgotado / Oculto;
- Novidade;
- Produto demonstrativo;
- RLS e permissões de administrador;
- Storage `product-media`;
- seed com o catálogo atual para começar sem perder o trabalho feito;
- produtos marcados como Esgotado ficam visíveis na loja, mas não podem ser adicionados à sacola.

Leia `SETUP_SUPABASE.md` para conectar o projeto.


## v20 — prévia imediata de fotos e vídeos no painel

- ao escolher uma foto, ela aparece imediatamente na mesma galeria das mídias já salvas;
- vídeos selecionados também ganham pré-visualização;
- nova mídia recebe etiqueta “Nova foto” ou “Novo vídeo”;
- antes de salvar, o painel informa que a mídia ainda será enviada;
- é possível remover um arquivo da seleção antes do upload;
- selecionar mais arquivos acrescenta à seleção em vez de apagar os anteriores;
- depois de “Salvar alterações”, a mídia é enviada ao Supabase Storage e passa a ser uma mídia normal do produto.
