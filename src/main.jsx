import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

const AdminApp = lazy(() => import('./AdminApp.jsx'))
const PrivacyPage = lazy(() => import('./PrivacyPage.jsx'))
const NotFoundPage = lazy(() => import('./NotFoundPage.jsx'))

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isAdminRoute = normalizedPath === '/admin'
const isPrivacyRoute = normalizedPath === '/privacidade'
const isStoreRoute = normalizedPath === '/'

function setMeta(name, content, attribute = 'name') {
  let element = document.querySelector(`meta[${attribute}="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function setCanonical(href) {
  let canonical = document.querySelector('link[rel="canonical"]')

  if (!href) {
    canonical?.remove()
    return
  }

  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }

  canonical.setAttribute('href', href)
}

if (isAdminRoute) {
  document.title = 'Painel administrativo | Tai Fernandes'
  setMeta('robots', 'noindex, nofollow, noarchive')
  setCanonical('')
}

if (isPrivacyRoute) {
  const privacyUrl =
    'https://taifernandes-modaintima.netlify.app/privacidade'

  document.title =
    'Política de Privacidade | Tai Fernandes Moda Íntima'

  setMeta('robots', 'index, follow')

  setMeta(
    'description',
    'Saiba quais dados a Tai Fernandes Moda Íntima utiliza no navegador e na finalização de pedidos pelo WhatsApp.'
  )

  setMeta('og:url', privacyUrl, 'property')

  setMeta(
    'og:title',
    'Política de Privacidade | Tai Fernandes Moda Íntima',
    'property'
  )

  setMeta(
    'og:description',
    'Informações sobre dados locais, pedidos pelo WhatsApp e privacidade na Tai Fernandes Moda Íntima.',
    'property'
  )

  setCanonical(privacyUrl)
}

if (!isStoreRoute && !isAdminRoute && !isPrivacyRoute) {
  document.title = 'Página não encontrada | Tai Fernandes Moda Íntima'
  setMeta('robots', 'noindex, nofollow')
  setCanonical('')
}

let page = <NotFoundPage />

if (isStoreRoute) {
  page = <App />
}

if (isAdminRoute) {
  page = <AdminApp />
}

if (isPrivacyRoute) {
  page = <PrivacyPage />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      {page}
    </Suspense>
  </StrictMode>,
)