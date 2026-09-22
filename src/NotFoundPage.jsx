import './styles.css'

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="eyebrow">ERRO 404</p>
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1>Essa página não foi encontrada.</h1>
        <p>
          O endereço pode ter mudado ou não existir. Volte para a loja e continue navegando pelo catálogo.
        </p>
        <a className="not-found-action" href="/">Voltar para a loja</a>
      </div>
    </main>
  )
}

export default NotFoundPage
