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
- excluir.

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

### Capas

A administradora pode:

- selecionar uma capa;
- visualizar antes de salvar;
- substituir uma capa;
- remover a capa personalizada.

### Ordem

Os botões Antes/Depois alteram `sort_order`.

A vitrine consulta as categorias ordenadas pelo mesmo campo.

## Próxima revisão — V41

A V41 será dedicada ao uso do painel pelo celular. O objetivo não é redesenhar o painel, e sim revisar ergonomia:

- tamanhos de toque;
- campos longos;
- teclado mobile;
- upload de foto/vídeo;
- navegação entre Cadastrar/Catálogo/Loja;
- cards do catálogo;
- edição;
- botões fixos;
- confirmação de ações;
- capas e ordenação de categorias.

Qualquer ajuste da V41 deverá preservar o visual desktop já aprovado.
