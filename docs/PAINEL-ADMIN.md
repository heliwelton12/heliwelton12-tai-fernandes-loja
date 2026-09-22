# Painel administrativo

## Acesso

Rota:

```text
/admin
```

O painel exige:

1. sessão válida do Supabase Auth;
2. retorno positivo de `public.is_admin()`.

## Identificação da administradora

O cabeçalho exibe um nome amigável. A autorização real, porém, não depende do nome mostrado: depende do UID presente em `public.admins`.

## Seções

O painel possui três áreas principais:

```text
Cadastrar | Catálogo | Loja
```

No celular, essas áreas são tratadas como navegação própria para reduzir a quantidade de conteúdo exibida de uma só vez.

## Cadastrar produto

Campos disponíveis incluem:

- nome;
- categoria;
- preço;
- status;
- tamanhos quando aplicável;
- cores;
- público para Pijamas;
- descrição;
- Novidade;
- Demonstração;
- mídias.

### Regras específicas

- Sex Shop não pede tamanhos;
- Público de Pijamas aparece somente para Pijamas;
- tamanho/cor não são obrigatórios quando o produto não utiliza essas opções.

## Fotos e vídeos

O painel permite selecionar várias mídias.

Antes de salvar:

- arquivos novos têm prévia local;
- podem ser removidos da seleção;
- ficam diferenciados das mídias já salvas.

Ao salvar:

1. arquivos são enviados ao Storage;
2. URLs e metadados são registrados em `product_media`;
3. uma imagem pode ser marcada como capa;
4. a vitrine passa a consumir a mídia cadastrada.

## Catálogo

Os produtos são agrupados por categoria.

Comportamento atual:

- grupos iniciam fechados;
- clique no cabeçalho abre/fecha;
- quantidade de produtos por grupo;
- busca por nome;
- filtros de status/demonstração;
- editar;
- duplicar;
- excluir.

## Duplicar produto

A ação **Duplicar** cria um novo cadastro usando o produto escolhido como base.

A cópia preserva:

- categoria;
- descrição;
- preço;
- marcações de Novidade/Demonstração;
- público do Pijama, quando aplicável;
- tamanhos e cores;
- fotos e vídeos.

Quando uma mídia está no Supabase Storage, o arquivo é copiado para uma pasta própria do novo produto. Assim, apagar ou trocar a mídia da cópia não deve quebrar o original.

Por segurança operacional, a cópia nasce com status **Oculto**. A administradora revisa o cadastro e altera para **Disponível** somente quando estiver pronta para publicar.

## Status do produto

### Disponível

Aparece na loja e pode ser comprado.

### Esgotado

Aparece na loja com indicação de esgotado, mas não pode ser adicionado à sacola.

### Oculto

Não aparece para o público.

## Configurações da loja

A seção Loja controla dados que não deveriam exigir alteração de código:

- nome da loja;
- WhatsApp;
- Instagram;
- endereço;
- horário;
- retirada habilitada/desabilitada;
- entrega habilitada/desabilitada;
- observações;
- taxa de entrega;
- Pix;
- Cartão;
- Dinheiro;
- textos do rodapé.

Esses dados são salvos em `store_settings` e carregados diretamente pela vitrine.

## Categorias

### Criar

Uma categoria nova pode ser adicionada pelo painel.

Depois de salva, ela passa a participar automaticamente de:

- navegação;
- seção de categorias;
- busca;
- rodapé;
- seletor de categoria no cadastro de produtos.

### Visibilidade

Cada categoria pode ficar **Visível na loja** ou **Oculta da loja**.

Ocultar não exclui:

- a categoria;
- seus produtos;
- a capa;
- a posição;
- os relacionamentos no banco.

Ao ocultar, a categoria deixa de aparecer para o público e pode ser reativada pelo mesmo card no painel.

### Capas

A administradora pode:

- selecionar uma capa;
- visualizar antes de salvar;
- substituir uma capa;
- remover a capa personalizada.

### Ordem

Os botões Antes/Depois alteram `sort_order`.

A vitrine consulta as categorias ordenadas pelo mesmo campo.

## Revisão mobile — V41

A V41 foi preparada a partir de uma auditoria real no iPhone, usando o projeto em localhost. O objetivo foi melhorar ergonomia sem redesenhar o painel nem alterar o desktop aprovado.

### Cadastrar

- o botão móvel de cadastrar/salvar continua acessível, mas ocupa menos da tela;
- a barra respeita a `safe-area` inferior do iPhone;
- o formulário recebe espaço extra no final para que nenhuma mídia ou campo fique escondido;
- o seletor nativo de arquivos fica oculto e todo o card “Selecionar fotos e vídeos” funciona como alvo de toque;
- a área de descrição fica um pouco mais compacta no celular.

### Catálogo

- categorias continuam fechadas ao abrir;
- apenas uma categoria pode ficar aberta por vez;
- ao entrar em Editar, a categoria do produto é preservada para facilitar o retorno;
- grupos e ações ficam ligeiramente mais compactos no celular, sem reduzir excessivamente as áreas de toque;
- exclusão continua exigindo confirmação.

### Loja

- configurações, recebimento, pagamentos, rodapé e capas foram auditados no iPhone;
- foi adicionado respiro inferior para a interface do Safari;
- a mensagem administrativa usa “deploy” em vez de citar um provedor específico de hospedagem.

### Navegação móvel

Ao trocar entre `Cadastrar`, `Catálogo` e `Loja`, o painel volta ao topo da seção em telas menores, evitando cair no meio de um formulário após uma troca de aba.

**Status:** V41 aprovada no iPhone em 22/09/2026.
