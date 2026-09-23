(() => {
  const link = document.getElementById('store-fonts')
  if (!link) return

  const activate = () => {
    link.media = 'all'
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', activate, { once: true })
  } else {
    activate()
  }
})()
