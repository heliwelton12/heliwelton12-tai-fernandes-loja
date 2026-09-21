import { useEffect, useMemo, useState } from 'react'
import { useCatalogProducts } from './lib/catalogBackend'
import { supabase, supabaseConfigured } from './lib/supabaseClient'
import { DEFAULT_STORE_SETTINGS, normalizeWhatsapp, useStoreSettings } from './lib/storeSettings'

const SHOW_DEMO_PRODUCTS =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_DEMO_PRODUCTS === 'true'

const menuItems = [
  { label: 'Lingeries', id: 'categorias' },
  { label: 'Conjuntos', id: 'categorias' },
  { label: 'Camisolas', id: 'categorias' },
  { label: 'Pijamas', id: 'categorias' },
  { label: 'Sex Shop', id: 'categorias' },
]

const demoProducts = [
  {
    id: 'demo-conjunto-01',
    name: 'Conjunto Rosé',
    category: 'Conjuntos',
    price: 59.9,
    badge: 'Demonstração',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosé', 'Preto'],
    tone: 'rose',
    demo: true,
  },
  {
    id: 'demo-conjunto-02',
    name: 'Conjunto Delicata',
    category: 'Conjuntos',
    price: 64.9,
    badge: 'Demonstração',
    sizes: ['M', 'G', 'GG'],
    colors: ['Vinho', 'Preto'],
    tone: 'wine',
    demo: true,
  },
  {
    id: 'demo-conjunto-03',
    name: 'Conjunto Belle',
    category: 'Conjuntos',
    price: 54.9,
    badge: 'Demonstração',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Branco'],
    tone: 'blush',
    demo: true,
  },
  {
    id: 'demo-conjunto-04',
    name: 'Conjunto Essenza',
    category: 'Conjuntos',
    price: 69.9,
    badge: 'Demonstração',
    sizes: ['M', 'G'],
    colors: ['Marsala', 'Preto'],
    tone: 'dust',
    demo: true,
  },

  {
    id: 'demo-camisola-01',
    name: 'Camisola Luna',
    category: 'Camisolas',
    price: 74.9,
    badge: 'Demonstração',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosé', 'Preto'],
    tone: 'blush',
    demo: true,
  },
  {
    id: 'demo-camisola-02',
    name: 'Camisola Serena',
    category: 'Camisolas',
    price: 79.9,
    badge: 'Demonstração',
    sizes: ['M', 'G', 'GG'],
    colors: ['Vinho', 'Preto'],
    tone: 'wine',
    demo: true,
  },
  {
    id: 'demo-camisola-03',
    name: 'Camisola Aurora',
    category: 'Camisolas',
    price: 69.9,
    badge: 'Demonstração',
    sizes: ['P', 'M', 'G'],
    colors: ['Rosa', 'Branco'],
    tone: 'soft',
    demo: true,
  },
  {
    id: 'demo-camisola-04',
    name: 'Camisola Encanto',
    category: 'Camisolas',
    price: 84.9,
    badge: 'Demonstração',
    sizes: ['M', 'G'],
    colors: ['Nude', 'Preto'],
    tone: 'pearl',
    demo: true,
  },

  {
    id: 'demo-pijama-fem-01',
    name: 'Pijama Feminino Confort',
    category: 'Pijamas',
    audience: 'Feminino',
    price: 89.9,
    badge: 'Demonstração',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Rosé', 'Azul'],
    tone: 'rose',
    demo: true,
  },
  {
    id: 'demo-pijama-fem-02',
    name: 'Pijama Feminino Soft',
    category: 'Pijamas',
    audience: 'Feminino',
    price: 94.9,
    badge: 'Demonstração',
    sizes: ['M', 'G', 'GG'],
    colors: ['Rosa', 'Lilás'],
    tone: 'soft',
    demo: true,
  },
  {
    id: 'demo-pijama-masc-01',
    name: 'Pijama Masculino Classic',
    category: 'Pijamas',
    audience: 'Masculino',
    price: 99.9,
    badge: 'Demonstração',
    sizes: ['M', 'G', 'GG'],
    colors: ['Azul-marinho', 'Cinza'],
    tone: 'dust',
    demo: true,
  },
  {
    id: 'demo-pijama-inf-01',
    name: 'Pijama Infantil Soninho',
    category: 'Pijamas',
    audience: 'Infantil',
    price: 69.9,
    badge: 'Demonstração',
    sizes: ['2', '4', '6', '8'],
    colors: ['Rosa', 'Azul'],
    tone: 'blush',
    demo: true,
  },
]

// Quando sua irmã enviar os produtos reais, vamos substituir este array
// ou conectá-lo diretamente ao Supabase.
const realProducts = [
  {
    id: 'lingerie-01',
    name: 'Lingerie 01',
    category: 'Lingeries',
    price: 40,
    image: '/products/lingerie-01.webp',
    sizes: [],
  },
  {
    id: 'lingerie-02',
    name: 'Lingerie 02',
    category: 'Lingeries',
    price: 40,
    image: '/products/lingerie-02.webp',
    sizes: [],
  },
  {
    id: 'lingerie-03',
    name: 'Lingerie 03',
    category: 'Lingeries',
    price: 26,
    image: '/products/lingerie-03.webp',
    sizes: [],
  },
  {
    id: 'lingerie-04',
    name: 'Lingerie 04',
    category: 'Lingeries',
    price: 40,
    image: '/products/lingerie-04.webp',
    sizes: [],
  },
  {
    id: 'sexshop-01',
    name: 'Produto Sex Shop 01',
    category: 'Sex Shop',
    price: 55,
    image: '/products/sexshop-01.webp',
    sizes: [],
  },
  {
    id: 'sexshop-02',
    name: 'Produto Sex Shop 02',
    category: 'Sex Shop',
    price: 90,
    image: '/products/sexshop-02.webp',
    sizes: [],
  },
  {
    id: 'sexshop-03',
    name: 'Produto Sex Shop 03',
    category: 'Sex Shop',
    price: 35,
    image: '/products/sexshop-03.webp',
    sizes: [],
  },
  {
    id: 'sexshop-04',
    name: 'Produto Sex Shop 04',
    category: 'Sex Shop',
    price: 60,
    image: '/products/sexshop-04.webp',
    sizes: [],
  },
]

const staticCatalogProducts = [...realProducts, ...demoProducts]


const categories = [
  { name: 'Lingeries', subtitle: 'Delicadeza para todos os dias', tone: 'rose', image: '/products/lingerie-01.webp' },
  { name: 'Conjuntos', subtitle: 'Combinações que encantam', tone: 'wine' },
  { name: 'Camisolas', subtitle: 'Leveza e feminilidade', tone: 'blush' },
  { name: 'Pijamas', subtitle: 'Feminino, masculino e infantil', tone: 'dust' },
  { name: 'Sex Shop', subtitle: 'Autocuidado com discrição', tone: 'soft', adult: true, image: '/products/sexshop-01.webp' },
]

function Icon({ name, size = 22 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.8-3.8" />
      </svg>
    ),
    user: (
      <svg {...common}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21c.7-4 3.3-6 7.5-6s6.8 2 7.5 6" />
      </svg>
    ),
    heart: (
      <svg {...common}>
        <path d="M20.8 4.8c-1.9-1.9-5.1-1.8-6.9.1L12 6.8l-1.9-1.9a4.9 4.9 0 0 0-6.9-.1c-2 2-2 5.2 0 7.2L12 21l8.8-9c2-2 2-5.2 0-7.2Z" />
      </svg>
    ),
    bag: (
      <svg {...common}>
        <path d="M5 8h14l-1 12H6L5 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    ),
    truck: (
      <svg {...common}>
        <path d="M3 6h11v10H3z" />
        <path d="M14 10h4l3 3v3h-7z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="18" cy="18" r="2" />
      </svg>
    ),
    card: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
    shield: (
      <svg {...common}>
        <path d="M12 3 4.5 6v5.2c0 4.6 2.8 7.9 7.5 9.8 4.7-1.9 7.5-5.2 7.5-9.8V6L12 3Z" />
        <path d="m9.3 12.2 1.8 1.8 3.8-4" />
      </svg>
    ),
    chat: (
      <svg {...common}>
        <path d="M4 5h16v11H9l-5 4V5Z" />
      </svg>
    ),
    instagram: (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
      </svg>
    ),
    menu: (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </svg>
    ),
    play: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m10 8 6 4-6 4V8Z" />
      </svg>
    ),
    up: (
      <svg {...common}>
        <path d="m6 15 6-6 6 6" />
      </svg>
    ),
  }

  return icons[name] || null
}

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [headerSearch, setHeaderSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [quickBuyId, setQuickBuyId] = useState(null)
  const [previewProduct, setPreviewProduct] = useState(null)
  const [previewMediaIndex, setPreviewMediaIndex] = useState(0)
  const [previewQuantity, setPreviewQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [storeAdmin, setStoreAdmin] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tf-favorites') || '[]')
    } catch {
      return []
    }
  })
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tf-profile') || '{"name":"","phone":""}')
    } catch {
      return { name: '', phone: '' }
    }
  })
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tf-cart') || '[]')
    } catch {
      return []
    }
  })
  const [cartOpen, setCartOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Pix')
  const [fulfillment, setFulfillment] = useState('Retirada')
  const [address, setAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
    reference: '',
  })
  const [needsChange, setNeedsChange] = useState(false)
  const [changeFor, setChangeFor] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [headerCompact, setHeaderCompact] = useState(false)
  const [adultGateOpen, setAdultGateOpen] = useState(false)
  const [pendingAdultCategory, setPendingAdultCategory] = useState(null)
  const [pendingAdultProduct, setPendingAdultProduct] = useState(null)
  const [toast, setToast] = useState('')
  const [cartPulse, setCartPulse] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [pajamaAudience, setPajamaAudience] = useState('Todos')

  const {
    products: catalogProducts,
    loading: catalogLoading,
    connected: backendConnected,
  } = useCatalogProducts(staticCatalogProducts)

  const { settings: storeSettings } = useStoreSettings()

  const whatsappNumber = normalizeWhatsapp(storeSettings.whatsapp || DEFAULT_STORE_SETTINGS.whatsapp)
  const instagramUrl = storeSettings.instagram_url || DEFAULT_STORE_SETTINGS.instagram_url
  const instagramHandle = storeSettings.instagram_handle || DEFAULT_STORE_SETTINGS.instagram_handle

  const paymentOptions = useMemo(() => {
    const methods = []
    if (storeSettings.accept_pix) methods.push('Pix')
    if (storeSettings.accept_card) methods.push('Cartão')
    if (storeSettings.accept_cash) methods.push('Dinheiro')
    return methods.length ? methods : ['Pix']
  }, [storeSettings.accept_pix, storeSettings.accept_card, storeSettings.accept_cash])

  const fulfillmentOptions = useMemo(() => {
    const options = []
    if (storeSettings.pickup_enabled) options.push('Retirada')
    if (storeSettings.delivery_enabled) options.push('Entrega')
    return options.length ? options : ['Retirada']
  }, [storeSettings.pickup_enabled, storeSettings.delivery_enabled])

  const customerCatalogProducts = useMemo(
    () =>
      SHOW_DEMO_PRODUCTS
        ? catalogProducts
        : catalogProducts.filter((product) => !product.demo),
    [catalogProducts]
  )

  useEffect(() => {
    localStorage.setItem('tf-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('tf-favorites', JSON.stringify(favorites))
  }, [favorites, catalogProducts])

  useEffect(() => {
    localStorage.setItem('tf-profile', JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    if (!customerName && profile.name) {
      setCustomerName(profile.name)
    }

    if (!customerPhone && profile.phone) {
      setCustomerPhone(profile.phone)
    }
  }, [profile.name, profile.phone, customerName, customerPhone])

  useEffect(() => {
    if (!paymentOptions.includes(paymentMethod)) {
      setPaymentMethod(paymentOptions[0])
      setNeedsChange(false)
    }
  }, [paymentOptions, paymentMethod])

  useEffect(() => {
    if (!fulfillmentOptions.includes(fulfillment)) {
      setFulfillment(fulfillmentOptions[0])
    }
  }, [fulfillmentOptions, fulfillment])


  useEffect(() => {
    if (!supabaseConfigured || !supabase) {
      setStoreAdmin(null)
      return
    }

    let alive = true

    async function syncStoreAdmin(session) {
      if (!session?.user?.id) {
        if (alive) setStoreAdmin(null)
        return
      }

      const { data, error } = await supabase.rpc('is_admin')

      if (!alive) return

      if (!error && data === true) {
        setStoreAdmin({
          id: session.user.id,
          email: session.user.email || '',
          displayName: session.user.email?.toLowerCase() === 'tfmodaintima2k26@gmail.com' ? 'Taís Fernandes' : '',
        })
      } else {
        if (error) {
          console.error('Falha ao verificar sessão administrativa na loja:', error)
        }
        setStoreAdmin(null)
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      syncStoreAdmin(data.session || null)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => syncStoreAdmin(session), 0)
    })

    return () => {
      alive = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setHeaderCompact(window.scrollY > 90)
      setShowBackToTop(window.scrollY > 520)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const whatsappMessage = encodeURIComponent(
    'Olá! Vim pelo site da Tai Fernandes e gostaria de saber mais sobre os produtos.'
  )

  const productList = useMemo(() => {
    let filtered = customerCatalogProducts

    if (activeCategory) {
      filtered = filtered.filter((product) => product.category === activeCategory)
    }

    if (activeCategory === 'Pijamas' && pajamaAudience !== 'Todos') {
      filtered = filtered.filter((product) => product.audience === pajamaAudience)
    }

    if (!search.trim()) return filtered

    const query = search.toLowerCase()
    return filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    )
  }, [search, activeCategory, pajamaAudience, customerCatalogProducts])

  const newestProducts = useMemo(() => {
    const markedNew = customerCatalogProducts.filter((product) => product.isNew)
    const source = markedNew.length ? markedNew : customerCatalogProducts
    return [...source].slice(-4).reverse()
  }, [customerCatalogProducts])

  const globalSearchResults = useMemo(() => {
    const source = customerCatalogProducts
    const query = headerSearch.trim().toLowerCase()

    if (!query) return []

    return source
      .filter((product) => {
        const searchable = [
          product.name,
          product.category,
          String(product.price).replace('.', ','),
          formatBRL(product.price),
        ]
          .join(' ')
          .toLowerCase()

        return searchable.includes(query)
      })
      .slice(0, 6)
  }, [headerSearch, customerCatalogProducts])

  const matchingCategories = useMemo(() => {
    const query = headerSearch.trim().toLowerCase()
    if (!query) return []

    return categories
      .filter((category) => category.name.toLowerCase().includes(query))
      .slice(0, 3)
  }, [headerSearch])

  const favoriteProducts = useMemo(() => {
    return customerCatalogProducts.filter((product) => favorites.includes(product.id))
  }, [favorites, customerCatalogProducts])

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  function navigateToCategory(categoryName) {
    setActiveCategory(categoryName)
    setSearch('')
    setPajamaAudience('Todos')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function openCategory(categoryName) {
    if (categoryName === 'Sex Shop' && localStorage.getItem('tf-adult-confirmed') !== 'true') {
      setPendingAdultCategory(categoryName)
      setAdultGateOpen(true)
      setMenuOpen(false)
      return
    }

    navigateToCategory(categoryName)
  }

  function confirmAdultAccess() {
    localStorage.setItem('tf-adult-confirmed', 'true')
    const product = pendingAdultProduct
    const categoryName = pendingAdultCategory || 'Sex Shop'

    setAdultGateOpen(false)
    setPendingAdultCategory(null)
    setPendingAdultProduct(null)

    if (product) {
      openPreview(product)
      return
    }

    navigateToCategory(categoryName)
  }

  function cancelAdultAccess() {
    setAdultGateOpen(false)
    setPendingAdultCategory(null)
    setPendingAdultProduct(null)
    goHome()
  }

  function goHome() {
    setActiveCategory(null)
    setSearch('')
    setPajamaAudience('Todos')
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function selectSearchProduct(product) {
    setHeaderSearch('')
    setSearchOpen(false)

    if (product.category === 'Sex Shop' && localStorage.getItem('tf-adult-confirmed') !== 'true') {
      setPendingAdultProduct(product)
      setAdultGateOpen(true)
      return
    }

    openPreview(product)
  }

  function selectSearchCategory(categoryName) {
    setHeaderSearch('')
    setSearchOpen(false)
    openCategory(categoryName)
  }

  function handleHeaderSearchKeyDown(event) {
    if (event.key === 'Escape') {
      setSearchOpen(false)
      return
    }

    if (event.key === 'Enter' && globalSearchResults.length) {
      event.preventDefault()
      selectSearchProduct(globalSearchResults[0])
    }
  }

  function getSizeOptions(product) {
    if (product.sizes?.length) return product.sizes
    if (product.category === 'Sex Shop') return ['Não se aplica']
    return ['A definir']
  }

  function getColorOptions(product) {
    if (product.colors?.length) return product.colors
    return ['A definir']
  }

  function isProductSoldOut(product) {
    return product?.status === 'sold_out' || product?.soldOut === true
  }

  function getProductMedia(product) {
    if (Array.isArray(product.media) && product.media.length) {
      return product.media
    }

    const media = []

    if (Array.isArray(product.images)) {
      product.images.forEach((src) => media.push({ type: 'image', src }))
    } else if (product.image) {
      media.push({ type: 'image', src: product.image })
    }

    if (product.video) {
      media.push({ type: 'video', src: product.video })
    }

    return media
  }

  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    )
  }

  function saveProfile() {
    localStorage.setItem('tf-profile', JSON.stringify(profile))

    if (profile.name.trim()) {
      setCustomerName(profile.name.trim())
    }

    if (profile.phone.trim()) {
      setCustomerPhone(profile.phone.trim())
    }

    setAccountOpen(false)
    setToast('Dados salvos neste aparelho')
  }

  function openQuickBuy(product) {
    if (isProductSoldOut(product)) {
      setToast('Este produto está esgotado no momento.')
      return
    }

    setQuickBuyId((current) => (current === product.id ? null : product.id))
    setSelectedSize(getSizeOptions(product)[0])
    setSelectedColor(getColorOptions(product)[0])
  }

  function openPreview(product) {
    setPreviewProduct(product)
    setPreviewMediaIndex(0)
    setPreviewQuantity(1)
    setSelectedSize(getSizeOptions(product)[0])
    setSelectedColor(getColorOptions(product)[0])
  }

  function addToCart(product, quantity = 1) {
    if (isProductSoldOut(product)) {
      setToast('Este produto está esgotado no momento.')
      return
    }

    const size = selectedSize || getSizeOptions(product)[0]
    const color = selectedColor || getColorOptions(product)[0]
    const safeQuantity = Math.max(1, Number(quantity) || 1)
    const cartKey = `${product.id}-${size}-${color}`

    setCart((current) => {
      const existing = current.find((item) => item.cartKey === cartKey)

      if (existing) {
        return current.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + safeQuantity }
            : item
        )
      }

      return [
        ...current,
        {
          ...product,
          cartKey,
          selectedSize: size,
          selectedColor: color,
          quantity: safeQuantity,
        },
      ]
    })

    setQuickBuyId(null)
    setPreviewProduct(null)
    setPreviewQuantity(1)
    setToast(`${safeQuantity > 1 ? `${safeQuantity} itens adicionados` : 'Produto adicionado'} à sacola`)
    setCartPulse(true)
    window.setTimeout(() => setCartPulse(false), 520)
    setCartOpen(true)
  }

  function changeQuantity(cartKey, delta) {
    setCart((current) =>
      current
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(cartKey) {
    const item = cart.find((product) => product.cartKey === cartKey)
    if (!item) return

    const confirmed = window.confirm(`Remover ${item.name} da sacola?`)
    if (!confirmed) return

    setCart((current) => current.filter((product) => product.cartKey !== cartKey))
    setToast('Produto removido da sacola')
  }

  function clearCart() {
    if (!cart.length) return
    const confirmed = window.confirm('Esvaziar toda a sacola?')
    if (!confirmed) return
    setCart([])
    setToast('Sacola esvaziada')
  }

  function updateAddress(field, value) {
    setAddress((current) => ({ ...current, [field]: value }))
  }

  function finishOrder() {
    if (!cart.length) {
      window.alert('Sua sacola está vazia.')
      return
    }

    if (!customerName.trim()) {
      window.alert('Informe seu nome para finalizar o pedido.')
      return
    }

    if (
      fulfillment === 'Entrega' &&
      (!address.street.trim() || !address.number.trim() || !address.neighborhood.trim())
    ) {
      window.alert('Preencha endereço, número e bairro para a entrega.')
      return
    }

    if (paymentMethod === 'Dinheiro' && needsChange && !changeFor.trim()) {
      window.alert('Informe o valor para o troco.')
      return
    }

    const productLines = cart.map((item, index) => {
      const details = []

      if (item.selectedSize && !['A definir', 'Não se aplica'].includes(item.selectedSize)) {
        details.push(`Tamanho: ${item.selectedSize}`)
      }

      if (item.selectedColor && item.selectedColor !== 'A definir') {
        details.push(`Cor: ${item.selectedColor}`)
      }

      const unitText = item.quantity > 1 ? ` · ${formatBRL(item.price)} cada` : ''
      const detailsText = details.length ? `\n   ${details.join(' · ')}` : ''

      return `${index + 1}. ${item.quantity}x ${item.name} — ${formatBRL(item.price * item.quantity)}${unitText}${detailsText}`
    })

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const deliveryLines =
      fulfillment === 'Entrega'
        ? [
            '*Recebimento:* Entrega',
            `Endereço: ${address.street}, ${address.number}`,
            `Bairro: ${address.neighborhood}`,
            address.complement.trim() ? `Complemento: ${address.complement.trim()}` : '',
            address.reference.trim() ? `Referência: ${address.reference.trim()}` : '',
            storeSettings.delivery_fee_note ? `Taxa de entrega: ${storeSettings.delivery_fee_note}` : '',
          ].filter(Boolean)
        : [
            '*Recebimento:* Retirada',
            storeSettings.pickup_note ? `Retirada: ${storeSettings.pickup_note}` : '',
          ]

    const paymentLines = [
      `*Pagamento:* ${paymentMethod}`,
      paymentMethod === 'Dinheiro'
        ? needsChange
          ? `Troco para: ${changeFor.trim()}`
          : 'Troco: não precisa'
        : '',
    ].filter(Boolean)

    const message = [
      '*PEDIDO — TAI FERNANDES*',
      '',
      `*Cliente:* ${customerName.trim()}`,
      customerPhone.trim() ? `*Telefone:* ${customerPhone.trim()}` : '',
      '',
      '*Produtos:*',
      ...productLines,
      '',
      `*Subtotal:* ${formatBRL(total)}`,
      '',
      ...paymentLines,
      ...deliveryLines,
      orderNotes.trim() ? `*Observações:* ${orderNotes.trim()}` : '',
      '',
      'Pedido enviado pelo site. Aguardo a confirmação da disponibilidade e do valor final.',
    ]
      .filter(Boolean)
      .join('\n')

    setProfile((current) => ({
      ...current,
      name: customerName.trim(),
      phone: customerPhone.trim(),
    }))

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <div className="site">
      <div className="topbar">
        <div className="topbar-item">
          <Icon name="chat" size={18} />
          <span>Pedidos pelo WhatsApp</span>
        </div>
        <div className="topbar-item">
          <Icon name="truck" size={18} />
          <span>Retirada ou entrega</span>
        </div>
        <a className="topbar-item" href={instagramUrl} target="_blank" rel="noreferrer">
          <Icon name="instagram" size={18} />
          <span>{instagramHandle}</span>
        </a>
      </div>

      <header className={`header ${headerCompact ? 'compact' : ''}`}>
        <div className="header-main">
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Abrir menu"
          >
            <Icon name="menu" size={26} />
          </button>

          <div className="search-wrap desktop-only global-search">
            <Icon name="search" size={20} />
            <input
              type="search"
              value={headerSearch}
              onChange={(event) => {
                setHeaderSearch(event.target.value)
                setSearchOpen(true)
              }}
              onFocus={() => setSearchOpen(true)}
              onKeyDown={handleHeaderSearchKeyDown}
              placeholder="O que você está buscando?"
              autoComplete="off"
              aria-label="Buscar produtos e categorias"
            />

            {headerSearch && (
              <button
                type="button"
                className="search-clear"
                onClick={() => {
                  setHeaderSearch('')
                  setSearchOpen(false)
                }}
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}

            {searchOpen && headerSearch.trim() && (
              <div className="search-results-panel">
                {matchingCategories.length > 0 && (
                  <div className="search-result-section">
                    <span className="search-section-title">Categorias</span>
                    {matchingCategories.map((category) => (
                      <button
                        type="button"
                        className="search-category-result"
                        key={`search-category-${category.name}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectSearchCategory(category.name)}
                      >
                        <span>{category.name}</span>
                        <Icon name="arrow" size={15} />
                      </button>
                    ))}
                  </div>
                )}

                <div className="search-result-section">
                  <span className="search-section-title">Produtos</span>

                  {globalSearchResults.length > 0 ? (
                    globalSearchResults.map((product) => (
                      <button
                        type="button"
                        className="search-product-result"
                        key={`search-product-${product.id}`}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => selectSearchProduct(product)}
                      >
                        <span className="search-result-thumb">
                          {product.image ? (
                            <img src={product.image} alt="" />
                          ) : (
                            <span className={`tone-${product.tone}`} />
                          )}
                        </span>

                        <span className="search-result-copy">
                          <small>{product.category}</small>
                          <strong>{product.name}</strong>
                          <em>{formatBRL(product.price)}</em>
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="search-no-results">
                      Nenhum produto encontrado para “{headerSearch}”.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="brand" onClick={goHome}>
            <img src="/logo-header.png" alt="Tai Fernandes Moda Íntima" />
          </button>

          <nav className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>
            <button onClick={goHome}>Início</button>
            {storeAdmin ? (
              <button
                onClick={() => {
                  setMenuOpen(false)
                  window.open('/admin', '_blank', 'noopener,noreferrer')
                }}
              >
                Painel administrativo
              </button>
            ) : (
              <button onClick={() => { setAccountOpen(true); setMenuOpen(false) }}>
                Meus dados
              </button>
            )}
            <button onClick={() => { setFavoritesOpen(true); setMenuOpen(false) }}>
              Favoritos {favorites.length ? `(${favorites.length})` : ''}
            </button>
            {menuItems.map((item) => (
              <button key={item.label} onClick={() => openCategory(item.label)}>
                {item.label}
              </button>
            ))}
            <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </nav>

          <div className="header-actions">
            {storeAdmin ? (
              <button
                className="header-action desktop-only admin-store-action"
                type="button"
                onClick={() => window.open('/admin', '_blank', 'noopener,noreferrer')}
                title={storeAdmin.email ? `Administrador: ${storeAdmin.email}` : 'Abrir painel administrativo'}
              >
                <Icon name="user" size={22} />
                <small>Painel</small>
              </button>
            ) : (
              <button
                className="header-action desktop-only"
                type="button"
                onClick={() => setAccountOpen(true)}
              >
                <Icon name="user" size={22} />
                <small>Meus dados</small>
              </button>
            )}

            <button
              className="header-action favorites-action"
              type="button"
              onClick={() => setFavoritesOpen(true)}
            >
              <Icon name="heart" size={22} />
              <small>Favoritos</small>
              {favorites.length > 0 && <b>{favorites.length}</b>}
            </button>

            <button className={`header-action bag-action ${cartPulse ? 'pulse' : ''}`} onClick={() => setCartOpen(true)}>
              <Icon name="bag" size={23} />
              <small>Sacola</small>
              <b>{cartCount}</b>
            </button>
          </div>
        </div>

        <div className="search-wrap mobile-only global-search mobile-global-search">
          <Icon name="search" size={20} />
          <input
            type="search"
            value={headerSearch}
            onChange={(event) => {
              setHeaderSearch(event.target.value)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            onKeyDown={handleHeaderSearchKeyDown}
            placeholder="O que você está buscando?"
            autoComplete="off"
            aria-label="Buscar produtos e categorias"
          />

          {headerSearch && (
            <button
              type="button"
              className="search-clear"
              onClick={() => {
                setHeaderSearch('')
                setSearchOpen(false)
              }}
              aria-label="Limpar busca"
            >
              ×
            </button>
          )}

          {searchOpen && headerSearch.trim() && (
            <div className="search-results-panel mobile-search-results">
              {matchingCategories.length > 0 && (
                <div className="search-result-section">
                  <span className="search-section-title">Categorias</span>
                  {matchingCategories.map((category) => (
                    <button
                      type="button"
                      className="search-category-result"
                      key={`mobile-search-category-${category.name}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectSearchCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <Icon name="arrow" size={15} />
                    </button>
                  ))}
                </div>
              )}

              <div className="search-result-section">
                <span className="search-section-title">Produtos</span>
                {globalSearchResults.length > 0 ? (
                  globalSearchResults.map((product) => (
                    <button
                      type="button"
                      className="search-product-result"
                      key={`mobile-search-product-${product.id}`}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => selectSearchProduct(product)}
                    >
                      <span className="search-result-thumb">
                        {product.image ? (
                          <img src={product.image} alt="" />
                        ) : (
                          <span className={`tone-${product.tone}`} />
                        )}
                      </span>

                      <span className="search-result-copy">
                        <small>{product.category}</small>
                        <strong>{product.name}</strong>
                        <em>{formatBRL(product.price)}</em>
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="search-no-results">
                    Nenhum produto encontrado para “{headerSearch}”.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="nav-row desktop-only">
          <div className="nav-links">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={activeCategory === item.label ? 'active' : ''}
                onClick={() => openCategory(item.label)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="offers-button" onClick={() => {
            if (activeCategory) {
              goHome()
              setTimeout(() => scrollToSection('novidades'), 180)
            } else {
              scrollToSection('novidades')
            }
          }}>
            Novidades
          </button>
        </div>
      </header>

      {catalogLoading && (
        <div className="catalog-sync-indicator">Atualizando catálogo…</div>
      )}

      <main>
        {!activeCategory ? (
          <>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow">TAI FERNANDES · MODA ÍNTIMA</p>

            <h1>
              Vista-se
              <br />
              para <span>você.</span>
            </h1>

            <p className="hero-text">
              Moda íntima escolhida para unir delicadeza, conforto e confiança em cada detalhe.
            </p>

            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollToSection('categorias')}>
                Ver produtos
                <Icon name="arrow" size={18} />
              </button>

              <a
                className="button secondary"
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                Falar no WhatsApp
              </a>
            </div>

          </div>

          <div className="hero-visual">
            <img src="/hero-modelo.webp" alt="Modelo usando lingerie em tons rosé" decoding="async" fetchPriority="high" />
            <div className="hero-image-shade" />
            <p className="hero-quote">
              Beleza
              <br />
              em cada
              <br />
              detalhe
            </p>
          </div>
        </section>

        <section className="categories-section" id="categorias">
          <aside className="categories-intro">
            <p className="eyebrow">NOSSAS CATEGORIAS</p>
            <h2>Tudo para o seu bem-estar, em um só lugar.</h2>
          </aside>

          <div className="categories-grid">
            {categories.map((category) => (
              <article className={`category-card tone-${category.tone}`} key={category.name}>
                <div className={`category-visual ${category.image ? 'has-image' : ''}`}>
                  {category.image ? (
                    <img src={category.image} alt={category.name} loading="lazy" decoding="async" />
                  ) : (
                    <span className="category-monogram">{category.name.slice(0, 2).toUpperCase()}</span>
                  )}
                </div>
                <div className="category-card-content">
                  <div className="category-title-row">
                    <h3>{category.name}</h3>
                    {category.adult && <span className="adult-badge">18+</span>}
                  </div>
                  <p>{category.subtitle}</p>
                  <button onClick={() => openCategory(category.name)}>
                    Explorar <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>


        <section className="new-arrivals-section" id="novidades">
          <div className="new-arrivals-heading">
            <div>
              <p className="eyebrow">ACABOU DE CHEGAR</p>
              <h2>Novidades da loja</h2>
            </div>
            <p>
              Os últimos produtos adicionados ao catálogo aparecem aqui automaticamente.
            </p>
          </div>

          <div className="new-arrivals-grid">
            {newestProducts.map((product) => (
              <article className="new-arrival-card" key={`new-${product.id}`}>
                <div className={`new-arrival-media ${product.image ? 'has-photo' : `tone-${product.tone}`}`}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
                  ) : (
                    <span>{product.category}</span>
                  )}
                  <span className="new-badge">Novidade</span>
                </div>

                <div className="new-arrival-info">
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <strong>{formatBRL(product.price)}</strong>

                  <div className="new-arrival-actions">
                    <button
                      onClick={() => openQuickBuy(product)}
                      disabled={isProductSoldOut(product)}
                    >
                      {isProductSoldOut(product) ? 'Esgotado' : 'Comprar'}
                    </button>
                    <button onClick={() => openPreview(product)}>Espiar</button>
                  </div>

                  {quickBuyId === product.id && (
                    <div className="home-quick-buy">
                      <button
                        className="home-quick-buy-close"
                        onClick={() => setQuickBuyId(null)}
                        aria-label="Fechar compra rápida"
                      >
                        ×
                      </button>

                      <label>
                        <span>Tamanho</span>
                        <select
                          value={selectedSize}
                          onChange={(event) => setSelectedSize(event.target.value)}
                        >
                          {getSizeOptions(product).map((size) => (
                            <option value={size} key={size}>{size}</option>
                          ))}
                        </select>
                      </label>

                      <label>
                        <span>Cor</span>
                        <select
                          value={selectedColor}
                          onChange={(event) => setSelectedColor(event.target.value)}
                        >
                          {getColorOptions(product).map((color) => (
                            <option value={color} key={color}>{color}</option>
                          ))}
                        </select>
                      </label>

                      <button className="home-quick-buy-add" onClick={() => addToCart(product)}>
                        Adicionar à sacola
                      </button>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story-band">
          <span className="story-line" />
          <p>{storeSettings.footer_tagline}</p>
          <span className="story-line" />
        </section>
          </>
        ) : (

        <section className="category-page">
          <div className="category-page-top">
            <button className="back-home" onClick={goHome}>
              ← Voltar para a página inicial
            </button>

            <div className="category-page-heading">
              <p className="eyebrow">CATEGORIA</p>
              <h1>{activeCategory}</h1>
              <p>
                {activeCategory === 'Pijamas'
                  ? 'Escolha entre modelos femininos, masculinos e infantis.'
                  : activeCategory === 'Sex Shop'
                    ? 'Produtos selecionados com discrição e atendimento pelo WhatsApp.'
                    : 'Confira os produtos disponíveis nesta categoria.'}
              </p>
            </div>
          </div>

          {SHOW_DEMO_PRODUCTS && ['Conjuntos', 'Camisolas', 'Pijamas'].includes(activeCategory) && (
            <div className="demo-category-notice">
              <strong>Produtos demonstrativos</strong>
              <span>
                Estes itens servem apenas para visualizar e testar a loja. Depois, serão substituídos pelos produtos reais no painel administrativo.
              </span>
            </div>
          )}

          <div className="category-page-toolbar">
            <label className="category-search">
              <Icon name="search" size={19} />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Buscar em ${activeCategory}`}
              />
            </label>

            <span className="category-count">
              {productList.length} {productList.length === 1 ? 'produto' : 'produtos'}
            </span>
          </div>

          {activeCategory === 'Pijamas' && (
            <div className="pajama-subcategories">
              {['Todos', 'Feminino', 'Masculino', 'Infantil'].map((audience) => (
                <button
                  type="button"
                  key={audience}
                  className={pajamaAudience === audience ? 'active' : ''}
                  onClick={() => setPajamaAudience(audience)}
                >
                  {audience}
                </button>
              ))}
            </div>
          )}

          {productList.length ? (
            <div className="products-grid category-products-grid">
              {productList.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className={`product-media ${product.image ? 'has-photo' : `tone-${product.tone}`}`}>
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-photo"
                        loading="lazy"
                        decoding="async"
                      />
                    )}

                    {isProductSoldOut(product) ? (
                      <span className="product-badge sold-out-badge">Esgotado</span>
                    ) : product.badge ? (
                      <span className="product-badge">{product.badge}</span>
                    ) : null}

                    <button
                      className={`favorite-button ${favorites.includes(product.id) ? 'active' : ''}`}
                      aria-label={favorites.includes(product.id) ? 'Remover dos favoritos' : 'Favoritar produto'}
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Icon name="heart" size={20} />
                    </button>

                    {!product.image && (
                      <div className="product-silhouette">
                        <span>{product.category}</span>
                      </div>
                    )}
                  </div>

                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>

                    <div className="price-row">
                      <strong>{formatBRL(product.price)}</strong>
                      {product.oldPrice && <del>{formatBRL(product.oldPrice)}</del>}
                    </div>
                    {product.demo && (
                      <small className="demo-product-label">Item fictício para demonstração</small>
                    )}

                    <div className="product-actions">
                      <button
                        className="buy-button"
                        onClick={() => openQuickBuy(product)}
                        aria-expanded={quickBuyId === product.id}
                        disabled={isProductSoldOut(product)}
                      >
                        {isProductSoldOut(product) ? 'Esgotado' : 'Comprar'}
                      </button>

                      <button
                        className="peek-button"
                        onClick={() => openPreview(product)}
                      >
                        Espiar
                      </button>
                    </div>

                    {quickBuyId === product.id && (
                      <div className="quick-buy-panel">
                        <button
                          className="quick-buy-close"
                          onClick={() => setQuickBuyId(null)}
                          aria-label="Fechar compra rápida"
                        >
                          ×
                        </button>

                        <label>
                          <span>Tamanho</span>
                          <select
                            value={selectedSize}
                            onChange={(event) => setSelectedSize(event.target.value)}
                          >
                            {getSizeOptions(product).map((size) => (
                              <option value={size} key={size}>{size}</option>
                            ))}
                          </select>
                        </label>

                        <label>
                          <span>Cor</span>
                          <select
                            value={selectedColor}
                            onChange={(event) => setSelectedColor(event.target.value)}
                          >
                            {getColorOptions(product).map((color) => (
                              <option value={color} key={color}>{color}</option>
                            ))}
                          </select>
                        </label>

                        <button className="quick-buy-add" onClick={() => addToCart(product)}>
                          Adicionar à sacola
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="category-empty empty-premium">
              <span className="empty-mark">TF</span>
              <p className="eyebrow">EM BREVE</p>
              <h2>Novidades chegando em breve</h2>
              <p>Estamos preparando novos produtos para esta categoria.</p>
              <div className="empty-actions">
                <button onClick={goHome}>Ver outras categorias</button>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Olá! Vim pelo site da Tai Fernandes e gostaria de saber quando chegam novidades em ${activeCategory}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Perguntar no WhatsApp
                </a>
              </div>
            </div>
          )}
        </section>

        )}
      </main>




      {adultGateOpen && (
        <div className="adult-gate-backdrop" onClick={cancelAdultAccess}>
          <div className="adult-gate" onClick={(event) => event.stopPropagation()}>
            <span className="adult-gate-badge">18+</span>
            <p className="eyebrow">ACESSO RESTRITO</p>
            <h2>Esta seção é destinada a maiores de 18 anos.</h2>
            <p>
              Confirme sua idade para acessar os produtos da categoria Sex Shop.
            </p>
            <div className="adult-gate-actions">
              <button className="adult-confirm" onClick={confirmAdultAccess}>
                Tenho 18 anos ou mais
              </button>
              <button className="adult-cancel" onClick={cancelAdultAccess}>
                Voltar
              </button>
            </div>
            <small>A confirmação fica salva neste navegador.</small>
          </div>
        </div>
      )}

      {toast && (
        <div className="store-toast" role="status" aria-live="polite">
          <Icon name="bag" size={18} />
          <span>{toast}</span>
        </div>
      )}

      {showBackToTop && (
        <button
          className="back-to-top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Voltar ao topo"
        >
          <Icon name="up" size={22} />
        </button>
      )}

      {favoritesOpen && (
        <div className="utility-backdrop" onClick={() => setFavoritesOpen(false)}>
          <aside className="utility-panel" onClick={(event) => event.stopPropagation()}>
            <div className="utility-header">
              <div>
                <p className="eyebrow">SALVOS PARA DEPOIS</p>
                <h2>Favoritos</h2>
              </div>
              <button onClick={() => setFavoritesOpen(false)} aria-label="Fechar favoritos">×</button>
            </div>

            {favoriteProducts.length ? (
              <div className="favorites-list">
                {favoriteProducts.map((product) => (
                  <article className="favorite-item" key={`favorite-${product.id}`}>
                    <div className="favorite-item-media">
                      {product.image ? (
                        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
                      ) : (
                        <div className={`tone-${product.tone}`} />
                      )}
                    </div>

                    <div className="favorite-item-copy">
                      <small>{product.category}</small>
                      <h3>{product.name}</h3>
                      <strong>{formatBRL(product.price)}</strong>

                      <div>
                        <button onClick={() => {
                          setFavoritesOpen(false)
                          openPreview(product)
                        }}>
                          Espiar
                        </button>
                        <button className="favorite-remove" onClick={() => toggleFavorite(product.id)}>
                          Remover
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="utility-empty">
                <Icon name="heart" size={34} />
                <h3>Nenhum favorito ainda</h3>
                <p>Toque no coração de um produto para salvá-lo aqui.</p>
              </div>
            )}
          </aside>
        </div>
      )}

      {accountOpen && (
        <div className="utility-backdrop" onClick={() => setAccountOpen(false)}>
          <div className="account-panel" onClick={(event) => event.stopPropagation()}>
            <div className="utility-header">
              <div>
                <p className="eyebrow">SEUS DADOS</p>
                <h2>Meus dados</h2>
              </div>
              <button onClick={() => setAccountOpen(false)} aria-label="Fechar minha conta">×</button>
            </div>

            <div className="account-content">
              <div className="account-intro">
                <Icon name="user" size={32} />
                <div>
                  <h3>Deixe o pedido mais rápido</h3>
                  <p>
                    Salve seu nome e WhatsApp neste aparelho para preencher seus pedidos mais rápido.
                  </p>
                </div>
              </div>

              <label className="account-field">
                <span>Nome</span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Seu nome"
                />
              </label>

              <label className="account-field">
                <span>Telefone / WhatsApp</span>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(event) => setProfile((current) => ({ ...current, phone: event.target.value }))}
                  placeholder="(75) 99999-9999"
                />
              </label>

              <button className="account-save" onClick={saveProfile}>
                Salvar meus dados
              </button>

              <small className="account-note">
                Não é necessário criar conta para comprar. Esses dados ficam salvos somente neste navegador.
              </small>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="cart-header">
              <div>
                <p className="eyebrow">SEU PEDIDO</p>
                <h2>Sacola</h2>
              </div>
              <button
                className="cart-close"
                onClick={() => setCartOpen(false)}
                aria-label="Fechar sacola"
              >
                ×
              </button>
            </div>

            {!cart.length ? (
              <div className="cart-empty">
                <Icon name="bag" size={34} />
                <h3>Sua sacola está vazia</h3>
                <p>Adicione produtos para montar seu pedido.</p>
                <button onClick={() => setCartOpen(false)}>Continuar comprando</button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.cartKey}>
                      <div className="cart-item-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} loading="lazy" decoding="async" />
                        ) : (
                          <div className={`tone-${item.tone}`} />
                        )}
                      </div>

                      <div className="cart-item-info">
                        <div className="cart-item-title">
                          <div>
                            <p>{item.category}</p>
                            <h3>{item.name}</h3>
                          </div>

                          <button
                            className="cart-remove"
                            onClick={() => removeFromCart(item.cartKey)}
                          >
                            Remover
                          </button>
                        </div>

                        <div className="cart-variants">
                          {item.selectedSize &&
                            !['A definir', 'Não se aplica'].includes(item.selectedSize) && (
                              <span>Tamanho: {item.selectedSize}</span>
                            )}
                          {item.selectedColor && item.selectedColor !== 'A definir' && (
                            <span>Cor: {item.selectedColor}</span>
                          )}
                        </div>

                        <div className="cart-item-bottom">
                          <div className="quantity-control">
                            <button onClick={() => changeQuantity(item.cartKey, -1)}>−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => changeQuantity(item.cartKey, 1)}>+</button>
                          </div>
                          <strong>{formatBRL(item.price * item.quantity)}</strong>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="cart-secondary-actions">
                  <button type="button" onClick={() => setCartOpen(false)}>Continuar comprando</button>
                  <button type="button" className="clear-cart-button" onClick={clearCart}>Esvaziar sacola</button>
                </div>

                <div className="checkout-box">
                  <div className="checkout-total">
                    <span>Subtotal</span>
                    <strong>{formatBRL(cartTotal)}</strong>
                  </div>

                  <div className="checkout-info-box">
                    <strong>Antes de enviar</strong>
                    <span>{storeSettings.delivery_note}</span>
                    <span>{storeSettings.pickup_note}</span>
                  </div>

                  <label className="checkout-field">
                    <span>Seu nome</span>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Nome da cliente"
                    />
                  </label>

                  <label className="checkout-field">
                    <span>Telefone / WhatsApp</span>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(event) => setCustomerPhone(event.target.value)}
                      placeholder="(75) 99999-9999"
                    />
                  </label>

                  <div className="checkout-group">
                    <span className="checkout-label">Forma de pagamento</span>
                    <div className="choice-grid">
                      {paymentOptions.map((method) => (
                        <button
                          key={method}
                          type="button"
                          className={paymentMethod === method ? 'active' : ''}
                          onClick={() => {
                            setPaymentMethod(method)
                            if (method !== 'Dinheiro') setNeedsChange(false)
                          }}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {paymentMethod === 'Dinheiro' && (
                    <div className="cash-options">
                      <label className="toggle-row">
                        <input
                          type="checkbox"
                          checked={needsChange}
                          onChange={(event) => setNeedsChange(event.target.checked)}
                        />
                        <span>Precisa de troco?</span>
                      </label>

                      {needsChange && (
                        <label className="checkout-field">
                          <span>Troco para quanto?</span>
                          <input
                            type="text"
                            value={changeFor}
                            onChange={(event) => setChangeFor(event.target.value)}
                            placeholder="Ex.: R$ 100,00"
                          />
                        </label>
                      )}
                    </div>
                  )}

                  <div className="checkout-group">
                    <span className="checkout-label">Como deseja receber?</span>
                    <div className="choice-grid two">
                      {fulfillmentOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={fulfillment === option ? 'active' : ''}
                          onClick={() => setFulfillment(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {fulfillment === 'Entrega' && (
                    <div className="delivery-fields">
                      <label className="checkout-field full">
                        <span>Endereço</span>
                        <input
                          type="text"
                          value={address.street}
                          onChange={(event) => updateAddress('street', event.target.value)}
                          placeholder="Rua / Avenida"
                        />
                      </label>

                      <label className="checkout-field">
                        <span>Número</span>
                        <input
                          type="text"
                          value={address.number}
                          onChange={(event) => updateAddress('number', event.target.value)}
                          placeholder="Nº"
                        />
                      </label>

                      <label className="checkout-field">
                        <span>Bairro</span>
                        <input
                          type="text"
                          value={address.neighborhood}
                          onChange={(event) => updateAddress('neighborhood', event.target.value)}
                          placeholder="Bairro"
                        />
                      </label>

                      <label className="checkout-field">
                        <span>Complemento</span>
                        <input
                          type="text"
                          value={address.complement}
                          onChange={(event) => updateAddress('complement', event.target.value)}
                          placeholder="Opcional"
                        />
                      </label>

                      <label className="checkout-field">
                        <span>Referência</span>
                        <input
                          type="text"
                          value={address.reference}
                          onChange={(event) => updateAddress('reference', event.target.value)}
                          placeholder="Opcional"
                        />
                      </label>
                    </div>
                  )}

                  <label className="checkout-field">
                    <span>Observações</span>
                    <textarea
                      value={orderNotes}
                      onChange={(event) => setOrderNotes(event.target.value)}
                      placeholder="Alguma observação sobre o pedido?"
                      rows="3"
                    />
                  </label>

                  <div className="checkout-review">
                    <div>
                      <span>Itens</span>
                      <strong>{cartCount}</strong>
                    </div>
                    <div>
                      <span>Pagamento</span>
                      <strong>{paymentMethod}</strong>
                    </div>
                    <div>
                      <span>Recebimento</span>
                      <strong>{fulfillment}</strong>
                    </div>
                  </div>

                  <button className="finish-order-button" onClick={finishOrder}>
                    Finalizar pelo WhatsApp
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}


      {previewProduct && (
        <div className="product-modal-backdrop" onClick={() => setPreviewProduct(null)}>
          <div className="product-modal product-modal-gallery" onClick={(event) => event.stopPropagation()}>
            <button
              className="product-modal-close"
              onClick={() => setPreviewProduct(null)}
              aria-label="Fechar detalhes"
            >
              ×
            </button>

            <div className="product-gallery">
              <div className="product-gallery-main">
                {getProductMedia(previewProduct).length ? (
                  getProductMedia(previewProduct)[previewMediaIndex]?.type === 'video' ? (
                    <video
                      src={getProductMedia(previewProduct)[previewMediaIndex].src}
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={getProductMedia(previewProduct)[previewMediaIndex]?.src}
                      alt={previewProduct.name}
                    />
                  )
                ) : (
                  <div className={`product-modal-placeholder tone-${previewProduct.tone}`}>
                    {previewProduct.category}
                  </div>
                )}
              </div>

              {getProductMedia(previewProduct).length > 0 && (
                <div className="product-gallery-thumbs">
                  {getProductMedia(previewProduct).map((media, index) => (
                    <button
                      type="button"
                      key={`${previewProduct.id}-media-${index}`}
                      className={previewMediaIndex === index ? 'active' : ''}
                      onClick={() => setPreviewMediaIndex(index)}
                      aria-label={media.type === 'video' ? 'Ver vídeo' : `Ver foto ${index + 1}`}
                    >
                      {media.type === 'video' ? (
                        <span className="video-thumb">
                          <Icon name="play" size={24} />
                          <small>Vídeo</small>
                        </span>
                      ) : (
                        <img src={media.src} alt="" loading="lazy" decoding="async" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-modal-content">
              <div className="product-modal-topline">
                <p className="product-category">{previewProduct.category}</p>
                <button
                  className={`modal-favorite ${favorites.includes(previewProduct.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(previewProduct.id)}
                >
                  <Icon name="heart" size={19} />
                  {favorites.includes(previewProduct.id) ? 'Favoritado' : 'Favoritar'}
                </button>
              </div>

              <h2>{previewProduct.name}</h2>
              <strong className="product-modal-price">{formatBRL(previewProduct.price)}</strong>
              {isProductSoldOut(previewProduct) && (
                <span className="modal-stock-status">Esgotado no momento</span>
              )}
              {previewProduct.demo && (
                <div className="modal-demo-warning">
                  Produto fictício usado apenas para testar a loja.
                </div>
              )}

              <p className="product-modal-description">
                Escolha as opções disponíveis, defina a quantidade e adicione à sacola.
              </p>

              <div className="product-modal-options">
                <label>
                  <span>Tamanho</span>
                  <select
                    value={selectedSize}
                    onChange={(event) => setSelectedSize(event.target.value)}
                  >
                    {getSizeOptions(previewProduct).map((size) => (
                      <option value={size} key={size}>{size}</option>
                    ))}
                  </select>
                </label>

                <label>
                  <span>Cor</span>
                  <select
                    value={selectedColor}
                    onChange={(event) => setSelectedColor(event.target.value)}
                  >
                    {getColorOptions(previewProduct).map((color) => (
                      <option value={color} key={color}>{color}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="modal-purchase-row">
                <div className="modal-quantity">
                  <span>Quantidade</span>
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => setPreviewQuantity((current) => Math.max(1, current - 1))}
                    >
                      −
                    </button>
                    <strong>{previewQuantity}</strong>
                    <button
                      type="button"
                      onClick={() => setPreviewQuantity((current) => current + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="modal-total-preview">
                  <span>Total</span>
                  <strong>{formatBRL(previewProduct.price * previewQuantity)}</strong>
                </div>
              </div>

              <button
                className="modal-add-button"
                onClick={() => addToCart(previewProduct, previewQuantity)}
                disabled={isProductSoldOut(previewProduct)}
              >
                {isProductSoldOut(previewProduct) ? 'Produto esgotado' : 'Adicionar à sacola'}
              </button>

              {(selectedSize === 'A definir' || selectedColor === 'A definir') && (
                <small className="quick-buy-note">
                  Essas opções serão preenchidas quando a loja cadastrar tamanhos e cores.
                </small>
              )}

              <div className="media-ready-note">
                <Icon name="play" size={18} />
                <span>
                  Este produto já está preparado para receber várias fotos e vídeo no cadastro.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="premium-footer">
        <div className="premium-footer-main">
          <div className="footer-about">
            <img src="/logo-header.png" alt="Tai Fernandes Moda Íntima" />
            <p>{storeSettings.footer_about}</p>
            <div className="footer-social">
              <a href={instagramUrl} target="_blank" rel="noreferrer">
                <Icon name="instagram" size={20} />
                <span>Instagram</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="chat" size={20} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Navegação</h3>
            <button onClick={goHome}>Início</button>
            {menuItems.map((item) => (
              <button key={`footer-${item.label}`} onClick={() => openCategory(item.label)}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="footer-column">
            <h3>Atendimento</h3>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">
              {instagramHandle}
            </a>
            <span>Pedidos pelo WhatsApp</span>
            {storeSettings.address && <span>{storeSettings.address}</span>}
            {storeSettings.service_hours && <span>{storeSettings.service_hours}</span>}
            {storeSettings.pickup_enabled && <span>{storeSettings.pickup_note}</span>}
            {storeSettings.delivery_enabled && <span>{storeSettings.delivery_note}</span>}
          </div>

          <div className="footer-column">
            <h3>Informações</h3>
            {storeSettings.accept_pix && <span>Pagamento por Pix</span>}
            {storeSettings.accept_card && <span>Pagamento em cartão</span>}
            {storeSettings.accept_cash && <span>Pagamento em dinheiro</span>}
            <span>Sex Shop: conteúdo 18+</span>
          </div>
        </div>

        <div className="footer-payment-row">
          <div>
            <span className="footer-small-title">Formas de pagamento</span>
            <div className="payment-pills">
              {paymentOptions.map((method) => <span key={method}>{method}</span>)}
            </div>
          </div>

          <p>Mais que moda íntima, é sobre você.</p>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Tai Fernandes — Moda Íntima. Todos os direitos reservados.</span>
          <span>Categoria Sex Shop destinada a maiores de 18 anos.</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
      >
        <Icon name="chat" size={20} />
        <span>WhatsApp</span>
      </a>
    </div>
  )
}

export default App
