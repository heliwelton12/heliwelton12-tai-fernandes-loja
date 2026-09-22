import './styles.css'

function PrivacyPage() {
  return (
    <main className="legal-page">
      <div className="legal-shell">
        <a className="legal-back" href="/">← Voltar para a loja</a>

        <header className="legal-header">
          <p className="eyebrow">PRIVACIDADE</p>
          <h1>Política de Privacidade</h1>
          <p>
            Esta página explica, de forma simples, quais dados são usados pela Tai Fernandes Moda Íntima
            durante a navegação e a finalização de pedidos.
          </p>
        </header>

        <section className="legal-card">
          <h2>1. Dados salvos neste aparelho</h2>
          <p>
            A loja pode guardar no navegador, por meio do armazenamento local, informações usadas para
            facilitar a experiência: nome, telefone/WhatsApp, itens da sacola, favoritos e a confirmação
            de maioridade para acesso à categoria Sex Shop.
          </p>
          <p>
            O nome e o telefone são opcionais e podem ser apagados a qualquer momento em <strong>Meus dados</strong>.
          </p>
        </section>

        <section className="legal-card">
          <h2>2. Pedidos pelo WhatsApp</h2>
          <p>
            A Tai Fernandes não exige criação de conta para comprar. Ao finalizar um pedido, as informações
            preenchidas pela cliente são organizadas em uma mensagem e enviadas ao WhatsApp somente após a
            própria cliente tocar no botão de finalização.
          </p>
          <p>
            Depois que o WhatsApp é aberto, o tratamento das informações também passa a seguir os termos e
            políticas do serviço WhatsApp/Meta.
          </p>
        </section>

        <section className="legal-card">
          <h2>3. O que não armazenamos</h2>
          <p>
            O site não solicita nem armazena senha de cliente, número de cartão, código de segurança do cartão,
            CPF ou dados bancários. As formas de pagamento exibidas servem apenas para combinar o pagamento do
            pedido com a loja.
          </p>
        </section>

        <section className="legal-card">
          <h2>4. Catálogo e infraestrutura</h2>
          <p>
            Produtos, categorias, imagens e configurações públicas da loja são fornecidos pela infraestrutura
            do Supabase. A área administrativa possui autenticação própria e não é necessária para clientes.
          </p>
        </section>

        <section className="legal-card">
          <h2>5. Como apagar seus dados locais</h2>
          <p>
            Na loja, abra <strong>Meus dados</strong> e use o botão <strong>Limpar nome e WhatsApp</strong>.
            A cliente também pode limpar os dados do site diretamente nas configurações do navegador.
          </p>
        </section>

        <section className="legal-card">
          <h2>6. Contato</h2>
          <p>
            Para dúvidas sobre privacidade ou sobre um pedido, utilize os canais oficiais de atendimento
            informados no rodapé da loja.
          </p>
        </section>

        <p className="legal-updated">Última atualização: 22 de setembro de 2026.</p>
      </div>
    </main>
  )
}

export default PrivacyPage
