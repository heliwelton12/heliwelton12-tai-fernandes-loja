# Fluxo de compra

## Objetivo

A loja funciona como catálogo com montagem do pedido no site e atendimento/finalização no WhatsApp.

Não é necessário criar conta de cliente.

## Jornada principal

```text
Home
  ↓
Categoria / Busca / Novidades
  ↓
Produto
  ↓
Escolher opções quando existirem
  ↓
Quantidade
  ↓
Adicionar à sacola
  ↓
Continuar comprando OU abrir sacola
  ↓
Revisar itens
  ↓
Dados + pagamento + retirada/entrega
  ↓
Validação
  ↓
WhatsApp com mensagem pronta
```

## Produto

A cliente pode abrir o produto pelo botão de compra/visualização.

Quando houver dados cadastrados:

- tamanho é selecionável;
- cor é selecionável;
- quantidade pode ser alterada;
- total acompanha a quantidade.

Quando não houver tamanho/cor, o seletor não é mostrado.

Sex Shop não exibe tamanho.

## Sex Shop

Na primeira tentativa de acesso, a aplicação verifica:

```text
tf-adult-confirmed
```

Sem confirmação, abre o gate 18+.

Depois da confirmação, a escolha é persistida no navegador.

## Adicionar à sacola

A chave lógica do item combina:

```text
produto + tamanho + cor
```

Assim, o mesmo produto com variações diferentes pode existir como linhas distintas.

Se a mesma combinação já estiver na sacola, a quantidade é somada.

### Regra de UX

Adicionar produto **não abre a sacola automaticamente**.

A cliente recebe uma confirmação discreta e continua comprando. A sacola abre somente por ação da própria cliente.

## Persistência

A sacola é gravada em:

```text
tf-cart
```

Isso evita perder itens ao atualizar a página ou sair temporariamente do site.

## Dados da cliente

“Meus dados” utiliza:

```text
tf-profile
```

Nome e telefone podem ser reutilizados no checkout.

Não existe conta obrigatória nem cadastro remoto do cliente.

## Checkout

### Dados pessoais

- nome;
- telefone/WhatsApp.

### Pagamento

As opções são lidas de `store_settings`:

- Pix;
- Cartão;
- Dinheiro.

Quando Dinheiro estiver selecionado, pode haver:

- sem troco;
- troco para determinado valor.

### Recebimento

As opções também são dinâmicas:

- Retirada;
- Entrega.

Quando Entrega é escolhida, o formulário solicita dados do endereço.

Estrutura local:

- rua;
- número;
- bairro;
- complemento;
- referência.

### Observações

Campo livre para instruções adicionais do pedido.

## Validação mobile — V40

A V40 alterou a experiência de erro.

Em vez de depender de alerts soltos:

1. a mensagem aparece dentro da sacola;
2. a aplicação identifica o campo necessário;
3. rola até ele;
4. coloca o foco quando possível.

Campos usam configurações de teclado/autocomplete compatíveis com celular.

## Mensagem do WhatsApp

Ao finalizar, a aplicação monta uma mensagem com:

- nome da cliente;
- telefone quando informado;
- produtos;
- tamanho/cor quando existirem;
- quantidades;
- subtotais;
- valor total;
- pagamento;
- troco quando aplicável;
- retirada ou entrega;
- endereço quando aplicável;
- observações;
- textos configurados pela loja.

Depois, abre:

```text
https://wa.me/<numero>?text=<mensagem-codificada>
```

## Pontos da regressão final

Antes da v1.0.0, validar novamente:

- múltiplos produtos;
- mesma peça com variações diferentes;
- Pix;
- Cartão;
- Dinheiro;
- troco;
- Retirada;
- Entrega;
- endereço incompleto;
- persistência da sacola;
- total do site versus mensagem;
- abertura correta do WhatsApp em celular.

## Privacidade na V45

A cliente pode salvar nome e WhatsApp no próprio navegador para agilizar pedidos. Em **Meus dados**, a ação **Limpar nome e WhatsApp** remove essas informações do armazenamento local e limpa os campos correspondentes do checkout.

A sacola e os favoritos não são apagados por essa ação.


## Adição contínua à sacola — V46

Adicionar um produto não encerra mais o contexto de compra.

No modal `Espiar`:

1. cliente escolhe tamanho/cor quando houver;
2. define a quantidade;
3. toca em `Adicionar à sacola`;
4. o modal permanece aberto;
5. o botão mostra `✓ Adicionado` temporariamente;
6. a quantidade volta para 1, mas tamanho/cor permanecem selecionados;
7. a cliente pode adicionar outra unidade/variação, abrir a sacola pelo toast ou fechar o produto manualmente.

A compra rápida nos cards segue a mesma regra: permanece aberta até a cliente fechar.
