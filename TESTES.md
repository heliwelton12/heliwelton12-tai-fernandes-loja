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
- ⏳ favicon;
- ⏳ Open Graph;
- ⏳ `robots.txt`;
- ⏳ `sitemap.xml`;
- ⏳ PageSpeed/Lighthouse;
- ⏳ headers de segurança;
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
