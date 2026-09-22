# Privacidade e dados locais — Tai Fernandes Moda Íntima

## Objetivo

A V45 formaliza como a loja utiliza dados da cliente sem criar um cadastro obrigatório.

## Dados salvos no navegador

A loja usa `localStorage` para conveniência:

- `tf-cart`: sacola;
- `tf-favorites`: favoritos;
- `tf-profile`: nome e WhatsApp opcionais;
- `tf-adult-confirmed`: confirmação 18+.

Senha, CPF, número de cartão, CVV e dados bancários não são solicitados nem armazenados pela loja.

## Limpar dados de contato

Em **Meus dados**, a cliente pode usar **Limpar nome e WhatsApp**. A ação remove o conteúdo de `tf-profile` e limpa os mesmos campos em memória/checkout.

Sacola, favoritos e confirmação 18+ não são apagados por esse botão porque representam preferências/estado de navegação diferentes dos dados de contato.

## WhatsApp

O pedido é montado localmente no navegador. As informações somente são encaminhadas ao WhatsApp quando a cliente solicita a finalização. A partir da abertura do WhatsApp, o serviço também passa a tratar essas informações conforme seus próprios termos e políticas.

## Página pública

A política está disponível em:

```text
/privacidade
```

A versão pública deve permanecer acessível pelo rodapé.

## Cookies e analytics

A versão atual não instala Google Analytics nem outro rastreador de marketing. Se uma ferramenta desse tipo for adicionada no futuro, a política e o mecanismo de consentimento devem ser revistos antes da publicação.
