import { useEffect, useMemo, useState } from 'react'
import { supabase, supabaseConfigured } from './lib/supabaseClient'
import { DEFAULT_STORE_SETTINGS } from './lib/storeSettings'
import './admin.css'

const EMPTY_FORM = {
  id: '',
  name: '',
  categoryId: '',
  description: '',
  price: '',
  status: 'available',
  isNew: true,
  isDemo: false,
  audience: '',
  sizes: '',
  colors: '',
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function money(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0))
}

function getAdminDisplayName(user) {
  if (!user) return 'Administradora'

  const knownAdmins = {
    'tfmodaintima2k26@gmail.com': 'Taís Fernandes',
  }

  return (
    knownAdmins[user.email?.toLowerCase()] ||
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Administradora'
  )
}

function getLoginErrorMessage(error) {
  const code = error?.code || ''
  const message = String(error?.message || '').toLowerCase()

  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos.'
  }

  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'Confirme o e-mail antes de entrar no painel.'
  }

  if (code === 'over_request_rate_limit' || message.includes('rate limit')) {
    return 'Muitas tentativas em pouco tempo. Aguarde um instante e tente novamente.'
  }

  if (message.includes('network') || message.includes('fetch')) {
    return 'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.'
  }

  return 'Não foi possível entrar. Confira seus dados e tente novamente.'
}

function uniqueList(value) {
  return [...new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  )]
}

function fileNameSafe(name) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
}

export default function AdminApp() {
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [adminAllowed, setAdminAllowed] = useState(false)
  const [adminProfile, setAdminProfile] = useState(null)
  const [login, setLogin] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [media, setMedia] = useState([])
  const [files, setFiles] = useState([])
  const [filePreviews, setFilePreviews] = useState([])
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [catalogSearch, setCatalogSearch] = useState('')
  const [expandedCategories, setExpandedCategories] = useState({})
  const [mobileSection, setMobileSection] = useState('editor')
  const [storeSettings, setStoreSettings] = useState(DEFAULT_STORE_SETTINGS)
  const [settingsSaving, setSettingsSaving] = useState(false)
  const [settingsMessage, setSettingsMessage] = useState('')

  const editing = Boolean(form.id)

  useEffect(() => {
    if (!supabaseConfigured || !supabase) {
      setAuthLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session || null)
      setAuthLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user?.id) {
      setAdminAllowed(false)
      return
    }

    checkAdmin()
  }, [session?.user?.id])

  useEffect(() => {
    if (adminAllowed) {
      loadCategories()
      loadProducts()
      loadStoreSettings()
    }
  }, [adminAllowed])

  useEffect(() => {
    const previews = files.map((file, index) => ({
      id: `${file.name}-${file.size}-${file.lastModified}-${index}`,
      file,
      url: URL.createObjectURL(file),
      mediaType: file.type.startsWith('video/') ? 'video' : 'image',
    }))

    setFilePreviews(previews)

    return () => {
      previews.forEach((item) => URL.revokeObjectURL(item.url))
    }
  }, [files])

  const filteredProducts = useMemo(() => {
    let result = products

    if (filter === 'Demonstração') {
      result = result.filter((item) => item.is_demo)
    } else if (filter !== 'Todos') {
      result = result.filter((item) => item.status === filter)
    }

    const query = catalogSearch.trim().toLowerCase()
    if (query) {
      result = result.filter((item) =>
        [
          item.name,
          item.category?.name,
          item.description,
          String(item.price ?? ''),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(query)
      )
    }

    return result
  }, [products, filter, catalogSearch])

  const groupedProducts = useMemo(() => {
    const categoryOrder = new Map(
      categories.map((category, index) => [category.name, category.sort_order ?? index])
    )

    const groups = filteredProducts.reduce((accumulator, product) => {
      const categoryName = product.category?.name || 'Sem categoria'
      if (!accumulator[categoryName]) accumulator[categoryName] = []
      accumulator[categoryName].push(product)
      return accumulator
    }, {})

    return Object.entries(groups)
      .map(([name, items]) => ({
        name,
        items,
        order: categoryOrder.get(name) ?? 999,
      }))
      .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
  }, [filteredProducts, categories])

  function toggleCatalogCategory(categoryName) {
    setExpandedCategories((current) => ({
      ...current,
      [categoryName]: current[categoryName] === false,
    }))
  }

  async function checkAdmin() {
    const { data, error } = await supabase.rpc('is_admin')

    if (error) {
      console.error('Falha ao verificar permissão administrativa:', error)
      setAdminAllowed(false)
      setAdminProfile(null)
      return
    }

    setAdminAllowed(data === true)
    setAdminProfile(data === true ? { user_id: session.user.id } : null)
  }

  async function signIn(event) {
    event.preventDefault()
    setLoginError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: login.email.trim(),
      password: login.password,
    })

    if (error) setLoginError(getLoginErrorMessage(error))
  }

  async function signOut() {
    await supabase.auth.signOut()
    setAdminAllowed(false)
    setAdminProfile(null)
  }

  async function loadCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug, sort_order')
      .order('sort_order')

    if (!error) {
      setCategories(data || [])
      setForm((current) => ({
        ...current,
        categoryId: current.categoryId || data?.[0]?.id || '',
      }))
    }
  }

  async function loadProducts() {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        slug,
        name,
        description,
        price,
        status,
        is_new,
        is_demo,
        audience,
        created_at,
        category:categories!products_category_id_fkey (
          id,
          name
        ),
        media:product_media (
          id,
          media_type,
          url,
          storage_path,
          is_cover,
          sort_order
        ),
        variants:product_variants (
          id,
          size,
          color,
          stock_quantity,
          active
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      setMessage(`Erro ao carregar produtos: ${error.message}`)
      return
    }

    setProducts(data || [])
  }

  async function loadStoreSettings() {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle()

    if (error) {
      console.error('Erro ao carregar configurações da loja:', error)
      setSettingsMessage('Não foi possível carregar as configurações da loja.')
      return
    }

    if (data) {
      setStoreSettings((current) => ({ ...current, ...data }))
    }
  }

  async function saveStoreSettings(event) {
    event.preventDefault()
    setSettingsSaving(true)
    setSettingsMessage('')

    try {
      const payload = {
        id: 1,
        store_name: storeSettings.store_name.trim() || 'Tai Fernandes Moda Íntima',
        whatsapp: storeSettings.whatsapp.trim(),
        instagram_url: storeSettings.instagram_url.trim(),
        instagram_handle: storeSettings.instagram_handle.trim(),
        address: storeSettings.address.trim() || null,
        service_hours: storeSettings.service_hours.trim() || null,
        pickup_enabled: Boolean(storeSettings.pickup_enabled),
        pickup_note: storeSettings.pickup_note.trim(),
        delivery_enabled: Boolean(storeSettings.delivery_enabled),
        delivery_note: storeSettings.delivery_note.trim(),
        delivery_fee_note: storeSettings.delivery_fee_note.trim(),
        accept_pix: Boolean(storeSettings.accept_pix),
        accept_card: Boolean(storeSettings.accept_card),
        accept_cash: Boolean(storeSettings.accept_cash),
        footer_about: storeSettings.footer_about.trim(),
        footer_tagline: storeSettings.footer_tagline.trim(),
      }

      if (!payload.whatsapp) {
        throw new Error('Informe o WhatsApp da loja.')
      }

      if (!payload.accept_pix && !payload.accept_card && !payload.accept_cash) {
        throw new Error('Selecione pelo menos uma forma de pagamento.')
      }

      if (!payload.pickup_enabled && !payload.delivery_enabled) {
        throw new Error('Ative Retirada ou Entrega.')
      }

      const { data, error } = await supabase
        .from('store_settings')
        .upsert(payload, { onConflict: 'id' })
        .select()
        .single()

      if (error) throw error

      setStoreSettings((current) => ({ ...current, ...data }))
      setSettingsMessage('Configurações salvas. A loja usará esses dados sem precisar republicar.')
    } catch (error) {
      setSettingsMessage(error.message || 'Não foi possível salvar.')
    } finally {
      setSettingsSaving(false)
    }
  }

  function updateStoreSetting(field, value) {
    setStoreSettings((current) => ({ ...current, [field]: value }))
  }

  function resetForm() {
    setMobileSection('editor')
    setForm({
      ...EMPTY_FORM,
      categoryId: categories[0]?.id || '',
    })
    setMedia([])
    setFiles([])
    setMessage('')
  }

  function editProduct(product) {
    setMobileSection('editor')
    const sizes = [...new Set((product.variants || []).map((item) => item.size).filter(Boolean))]
    const colors = [...new Set((product.variants || []).map((item) => item.color).filter(Boolean))]

    setForm({
      id: product.id,
      name: product.name,
      categoryId: product.category?.id || '',
      description: product.description || '',
      price: String(product.price ?? ''),
      status: product.status,
      isNew: Boolean(product.is_new),
      isDemo: Boolean(product.is_demo),
      audience: product.audience || '',
      sizes: sizes.join(', '),
      colors: colors.join(', '),
    })

    setMedia(
      [...(product.media || [])].sort(
        (a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order
      )
    )
    setFiles([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function syncVariants(productId) {
    const sizes = uniqueList(form.sizes)
    const colors = uniqueList(form.colors)

    const { error: deleteError } = await supabase
      .from('product_variants')
      .delete()
      .eq('product_id', productId)

    if (deleteError) throw deleteError

    if (!sizes.length && !colors.length) return

    const normalizedSizes = sizes.length ? sizes : [null]
    const normalizedColors = colors.length ? colors : [null]
    const rows = []

    for (const size of normalizedSizes) {
      for (const color of normalizedColors) {
        rows.push({
          product_id: productId,
          size,
          color,
          stock_quantity: null,
          active: true,
        })
      }
    }

    const { error } = await supabase.from('product_variants').insert(rows)
    if (error) throw error
  }

  async function uploadFiles(productId) {
    if (!files.length) return

    const currentImageCount = media.filter((item) => item.media_type === 'image').length

    for (let index = 0; index < files.length; index += 1) {
      const file = files[index]
      const mediaType = file.type.startsWith('video/') ? 'video' : 'image'
      const path = `products/${productId}/${Date.now()}-${index}-${fileNameSafe(file.name)}`

      if (file.size > 6 * 1024 * 1024) {
        setMessage(
          'Enviando arquivo acima de 6 MB. Pode demorar mais; depois podemos ativar upload resumível para vídeos maiores.'
        )
      }

      const { error: uploadError } = await supabase.storage
        .from('product-media')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
        })

      if (uploadError) throw uploadError

      const { data: publicUrlData } = supabase.storage
        .from('product-media')
        .getPublicUrl(path)

      const isCover =
        mediaType === 'image' &&
        currentImageCount === 0 &&
        !files.slice(0, index).some((item) => item.type.startsWith('image/'))

      const { error: mediaError } = await supabase.from('product_media').insert({
        product_id: productId,
        media_type: mediaType,
        url: publicUrlData.publicUrl,
        storage_path: path,
        is_cover: isCover,
        sort_order: media.length + index,
      })

      if (mediaError) throw mediaError
    }
  }

  async function saveProduct(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.categoryId || !form.price) {
      setMessage('Preencha nome, categoria e preço.')
      return
    }

    setSaving(true)
    setMessage('')

    try {
      const payload = {
        name: form.name.trim(),
        slug: editing
          ? products.find((item) => item.id === form.id)?.slug || slugify(form.name)
          : `${slugify(form.name)}-${Date.now().toString().slice(-6)}`,
        category_id: form.categoryId,
        description: form.description.trim() || null,
        price: Number(String(form.price).replace(',', '.')),
        status: form.status,
        is_new: form.isNew,
        is_demo: form.isDemo,
        audience: form.audience || null,
      }

      let productId = form.id

      if (editing) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', form.id)

        if (error) throw error
      } else {
        const { data, error } = await supabase
          .from('products')
          .insert(payload)
          .select('id')
          .single()

        if (error) throw error
        productId = data.id
      }

      await syncVariants(productId)
      await uploadFiles(productId)
      await loadProducts()
      resetForm()
      setMobileSection('catalog')
      setMessage('Produto salvo com sucesso.')
    } catch (error) {
      console.error(error)
      setMessage(`Não foi possível salvar: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  function removeSelectedFile(targetFile) {
    setFiles((current) => current.filter((file) => file !== targetFile))
  }

  async function removeMedia(item) {
    if (!window.confirm('Remover esta mídia do produto?')) return

    try {
      if (item.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('product-media')
          .remove([item.storage_path])
        if (storageError) throw storageError
      }

      const { error } = await supabase
        .from('product_media')
        .delete()
        .eq('id', item.id)

      if (error) throw error

      setMedia((current) => current.filter((mediaItem) => mediaItem.id !== item.id))
      await loadProducts()
    } catch (error) {
      setMessage(`Não foi possível remover a mídia: ${error.message}`)
    }
  }

  async function setCover(item) {
    try {
      await supabase
        .from('product_media')
        .update({ is_cover: false })
        .eq('product_id', form.id)

      const { error } = await supabase
        .from('product_media')
        .update({ is_cover: true })
        .eq('id', item.id)

      if (error) throw error

      setMedia((current) =>
        current.map((mediaItem) => ({
          ...mediaItem,
          is_cover: mediaItem.id === item.id,
        }))
      )
      await loadProducts()
    } catch (error) {
      setMessage(`Não foi possível definir a capa: ${error.message}`)
    }
  }

  async function deleteProduct(product) {
    if (!window.confirm(`Excluir “${product.name}” definitivamente?`)) return

    try {
      const storagePaths = (product.media || [])
        .map((item) => item.storage_path)
        .filter(Boolean)

      if (storagePaths.length) {
        const { error: storageError } = await supabase.storage
          .from('product-media')
          .remove(storagePaths)
        if (storageError) throw storageError
      }

      const { error } = await supabase.from('products').delete().eq('id', product.id)
      if (error) throw error

      if (form.id === product.id) resetForm()
      await loadProducts()
      setMessage('Produto excluído.')
    } catch (error) {
      setMessage(`Não foi possível excluir: ${error.message}`)
    }
  }

  if (!supabaseConfigured) {
    return (
      <main className="admin-setup-screen">
        <div className="admin-setup-card">
          <p className="admin-kicker">BACKEND AINDA NÃO CONECTADO</p>
          <h1>Painel Tai Fernandes</h1>
          <p>
            O painel já está pronto no código. Agora crie o projeto no Supabase e preencha o arquivo
            <code>.env.local</code>.
          </p>
          <div className="admin-code">
            VITE_SUPABASE_URL=...<br />
            VITE_SUPABASE_PUBLISHABLE_KEY=...
          </div>
          <p>Depois reinicie <code>npm run dev</code> e acesse <strong>/admin</strong>.</p>
          <a href="/">Voltar para a loja</a>
        </div>
      </main>
    )
  }

  if (authLoading) {
    return <main className="admin-loading">Carregando painel…</main>
  }

  if (!session) {
    return (
      <main className="admin-login-page">
        <form className="admin-login-card" onSubmit={signIn}>
          <p className="admin-kicker">TAI FERNANDES · ADMIN</p>
          <h1>Entrar no painel</h1>
          <p>Use o e-mail e a senha cadastrados para a administradora da loja.</p>

          <label>
            <span>E-mail</span>
            <input
              type="email"
              required
              value={login.email}
              onChange={(event) => setLogin((current) => ({ ...current, email: event.target.value }))}
            />
          </label>

          <label>
            <span>Senha</span>
            <div className="admin-password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={login.password}
                onChange={(event) => setLogin((current) => ({ ...current, password: event.target.value }))}
              />
              <button
                className="admin-password-toggle"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.8 10.8 0 0112 4c5.4 0 9 5.2 9 5.2a16.7 16.7 0 01-3 3.6M6.3 6.3C4.2 7.8 3 9.2 3 9.2S6.6 16 12 16c1.2 0 2.3-.3 3.3-.7" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6z" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {loginError && <div className="admin-error">{loginError}</div>}

          <button type="submit">Entrar</button>
          <a href="/">Voltar para a loja</a>
        </form>
      </main>
    )
  }

  if (!adminAllowed) {
    return (
      <main className="admin-login-page">
        <div className="admin-login-card">
          <p className="admin-kicker">ACESSO RESTRITO</p>
          <h1>Usuário sem permissão</h1>
          <p>
            O login foi reconhecido, mas este usuário ainda não possui permissão administrativa.
          </p>
          <button type="button" onClick={signOut}>Sair</button>
        </div>
      </main>
    )
  }

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <a className="admin-brand" href="/">
          Tai Fernandes <span>Moda Íntima</span>
        </a>

        <div className="admin-topbar-actions">
          <span title={session.user.email}>
            {getAdminDisplayName(session.user)}
          </span>
          <button
            type="button"
            onClick={() => window.open('/', '_blank', 'noopener,noreferrer')}
          >
            Ver loja
          </button>
          <button onClick={signOut}>Sair</button>
        </div>
      </header>

      <nav className="admin-mobile-tabs" aria-label="Seções do painel">
        <button
          type="button"
          className={mobileSection === 'editor' ? 'active' : ''}
          onClick={() => setMobileSection('editor')}
        >
          {editing ? 'Editar produto' : 'Cadastrar'}
        </button>
        <button
          type="button"
          className={mobileSection === 'catalog' ? 'active' : ''}
          onClick={() => setMobileSection('catalog')}
        >
          Catálogo
          <span>{products.length}</span>
        </button>
        <button
          type="button"
          className={mobileSection === 'settings' ? 'active' : ''}
          onClick={() => setMobileSection('settings')}
        >
          Loja
        </button>
      </nav>

      <main className="admin-layout">
        <section className={`admin-editor ${mobileSection !== 'editor' ? 'admin-mobile-section-hidden' : ''}`}>
          <div className="admin-section-heading">
            <div>
              <p className="admin-kicker">{editing ? 'EDITANDO PRODUTO' : 'NOVO PRODUTO'}</p>
              <h1>{editing ? form.name : 'Cadastrar produto'}</h1>
            </div>

            {editing && (
              <button className="admin-secondary" type="button" onClick={resetForm}>
                Novo produto
              </button>
            )}
          </div>

          {message && <div className="admin-message">{message}</div>}

          <form id="product-admin-form" className="product-admin-form" onSubmit={saveProduct}>
            <div className="admin-form-grid">
              <label className="admin-field admin-field-wide">
                <span>Nome do produto</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Ex.: Conjunto Serena"
                  required
                />
              </label>

              <label className="admin-field">
                <span>Categoria</span>
                <select
                  value={form.categoryId}
                  onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>

              <label className="admin-field">
                <span>Preço</span>
                <input
                  inputMode="decimal"
                  value={form.price}
                  onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                  placeholder="59,90"
                  required
                />
              </label>

              <label className="admin-field">
                <span>Status</span>
                <select
                  value={form.status}
                  onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                >
                  <option value="available">Disponível</option>
                  <option value="sold_out">Esgotado</option>
                  <option value="hidden">Oculto</option>
                </select>
              </label>

              <label className="admin-field">
                <span>Público do pijama</span>
                <select
                  value={form.audience}
                  onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))}
                >
                  <option value="">Não se aplica</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Infantil">Infantil</option>
                </select>
              </label>

              <label className="admin-field admin-field-wide">
                <span>Tamanhos</span>
                <input
                  value={form.sizes}
                  onChange={(event) => setForm((current) => ({ ...current, sizes: event.target.value }))}
                  placeholder="P, M, G, GG"
                />
                <small>Separe por vírgulas.</small>
              </label>

              <label className="admin-field admin-field-wide">
                <span>Cores</span>
                <input
                  value={form.colors}
                  onChange={(event) => setForm((current) => ({ ...current, colors: event.target.value }))}
                  placeholder="Preto, Rosé, Branco"
                />
                <small>Separe por vírgulas.</small>
              </label>

              <label className="admin-field admin-field-full">
                <span>Descrição</span>
                <textarea
                  rows="4"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  placeholder="Informações do produto"
                />
              </label>
            </div>

            <div className="admin-checks">
              <label>
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(event) => setForm((current) => ({ ...current, isNew: event.target.checked }))}
                />
                <span>Mostrar em Novidades</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.isDemo}
                  onChange={(event) => setForm((current) => ({ ...current, isDemo: event.target.checked }))}
                />
                <span>Produto demonstrativo</span>
              </label>
            </div>

            <section className="admin-media-section">
              <div>
                <h2>Fotos e vídeo</h2>
                <p>Você pode selecionar várias fotos e também vídeos MP4/WebM.</p>
              </div>

              {(media.length > 0 || filePreviews.length > 0) && (
                <div className="admin-media-grid">
                  {media.map((item) => (
                    <article className="admin-media-item" key={item.id}>
                      <div className="admin-media-preview">
                        {item.media_type === 'video' ? (
                          <video src={item.url} controls preload="metadata" />
                        ) : (
                          <img src={item.url} alt="" />
                        )}
                        {item.is_cover && <span className="admin-cover-badge">Capa</span>}
                      </div>

                      <div className="admin-media-actions">
                        {item.media_type === 'image' && (
                          <button
                            type="button"
                            className={item.is_cover ? 'active' : ''}
                            onClick={() => setCover(item)}
                          >
                            {item.is_cover ? 'Capa atual' : 'Definir capa'}
                          </button>
                        )}
                        <button type="button" onClick={() => removeMedia(item)}>Remover</button>
                      </div>
                    </article>
                  ))}

                  {filePreviews.map((item) => (
                    <article className="admin-media-item admin-media-item-pending" key={item.id}>
                      <div className="admin-media-preview">
                        {item.mediaType === 'video' ? (
                          <video src={item.url} controls preload="metadata" />
                        ) : (
                          <img src={item.url} alt="" />
                        )}
                        <span className="admin-pending-badge">
                          {item.mediaType === 'video' ? 'Novo vídeo' : 'Nova foto'}
                        </span>
                      </div>

                      <div className="admin-media-actions">
                        <button
                          type="button"
                          className="pending-info"
                          disabled
                        >
                          Será enviada ao salvar
                        </button>
                        <button type="button" onClick={() => removeSelectedFile(item.file)}>
                          Remover da seleção
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              <label className="admin-upload">
                <strong>Adicionar mídia</strong>
                <span>Fotos: JPG, PNG, WebP · Vídeos: MP4, WebM</span>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                  onChange={(event) => {
                    const incoming = [...event.target.files]
                    setFiles((current) => {
                      const signatures = new Set(
                        current.map((file) => `${file.name}-${file.size}-${file.lastModified}`)
                      )
                      const additions = incoming.filter(
                        (file) => !signatures.has(`${file.name}-${file.size}-${file.lastModified}`)
                      )
                      return [...current, ...additions]
                    })
                    event.target.value = ''
                  }}
                />
              </label>

              {files.length > 0 && (
                <div className="admin-selected-files">
                  <strong>{files.length} {files.length === 1 ? 'arquivo selecionado' : 'arquivos selecionados'}</strong>
                  <span>As prévias acima ainda não foram enviadas. Clique em “Salvar alterações” para concluir.</span>
                </div>
              )}
            </section>

            <button className="admin-save admin-save-desktop" type="submit" disabled={saving}>
              {saving ? 'Salvando…' : editing ? 'Salvar alterações' : 'Cadastrar produto'}
            </button>
          </form>
        </section>

        <section className={`admin-products ${mobileSection !== 'catalog' ? 'admin-mobile-section-hidden' : ''}`}>
          <div className="admin-section-heading admin-catalog-heading">
            <div>
              <p className="admin-kicker">CATÁLOGO</p>
              <h2>Produtos cadastrados</h2>
              <span className="admin-catalog-total">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'produto' : 'produtos'}
              </span>
            </div>

            <div className="admin-catalog-controls">
              <label className="admin-catalog-search">
                <span>Buscar</span>
                <input
                  type="search"
                  value={catalogSearch}
                  onChange={(event) => setCatalogSearch(event.target.value)}
                  placeholder="Nome do produto..."
                />
              </label>

              <label className="admin-catalog-filter">
                <span>Mostrar</span>
                <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                  <option>Todos</option>
                  <option value="available">Disponível</option>
                  <option value="sold_out">Esgotado</option>
                  <option value="hidden">Oculto</option>
                  <option>Demonstração</option>
                </select>
              </label>
            </div>
          </div>

          {groupedProducts.length ? (
            <div className="admin-category-groups">
              {groupedProducts.map((group) => {
                const expanded = expandedCategories[group.name] !== false

                return (
                  <section className="admin-category-group" key={group.name}>
                    <button
                      type="button"
                      className="admin-category-header"
                      onClick={() => toggleCatalogCategory(group.name)}
                      aria-expanded={expanded}
                    >
                      <span className="admin-category-title">
                        <strong>{group.name}</strong>
                        <small>
                          {group.items.length} {group.items.length === 1 ? 'produto' : 'produtos'}
                        </small>
                      </span>

                      <span className={`admin-category-chevron ${expanded ? 'open' : ''}`}>
                        ⌄
                      </span>
                    </button>

                    {expanded && (
                      <div className="admin-product-list">
                        {group.items.map((product) => {
                          const cover =
                            [...(product.media || [])]
                              .sort((a, b) => Number(b.is_cover) - Number(a.is_cover))
                              .find((item) => item.media_type === 'image')?.url || ''

                          return (
                            <article className="admin-product-card" key={product.id}>
                              <div className="admin-product-cover">
                                {cover ? <img src={cover} alt="" /> : <span>Sem foto</span>}
                              </div>

                              <div className="admin-product-copy">
                                <div className="admin-product-badges">
                                  <span className={`status-${product.status}`}>
                                    {product.status === 'available'
                                      ? 'Disponível'
                                      : product.status === 'sold_out'
                                        ? 'Esgotado'
                                        : 'Oculto'}
                                  </span>
                                  {product.is_new && <span>Novidade</span>}
                                  {product.is_demo && <span>Demonstração</span>}
                                </div>

                                <h3>{product.name}</h3>
                                <strong>{money(product.price)}</strong>

                                <div className="admin-product-actions">
                                  <button onClick={() => editProduct(product)}>Editar</button>
                                  <button className="danger" onClick={() => deleteProduct(product)}>Excluir</button>
                                </div>
                              </div>
                            </article>
                          )
                        })}
                      </div>
                    )}
                  </section>
                )
              })}
            </div>
          ) : (
            <div className="admin-catalog-empty">
              <strong>Nenhum produto encontrado.</strong>
              <span>Tente limpar a busca ou alterar o filtro.</span>
            </div>
          )}
        </section>

        <section className={`admin-settings ${mobileSection !== 'settings' ? 'admin-mobile-section-hidden' : ''}`}>
          <div className="admin-section-heading">
            <div>
              <p className="admin-kicker">CONFIGURAÇÕES DA LOJA</p>
              <h2>Dados públicos</h2>
              <p className="admin-settings-intro">
                O que for salvo aqui aparece na loja sem precisar alterar código ou republicar no Netlify.
              </p>
            </div>
          </div>

          {settingsMessage && <div className="admin-message">{settingsMessage}</div>}

          <form className="admin-settings-form" onSubmit={saveStoreSettings}>
            <div className="admin-settings-grid">
              <label className="admin-field">
                <span>Nome da loja</span>
                <input
                  value={storeSettings.store_name}
                  onChange={(event) => updateStoreSetting('store_name', event.target.value)}
                />
              </label>

              <label className="admin-field">
                <span>WhatsApp</span>
                <input
                  type="tel"
                  value={storeSettings.whatsapp}
                  onChange={(event) => updateStoreSetting('whatsapp', event.target.value)}
                  placeholder="5575981537356"
                />
                <small>Pode usar com ou sem espaços; o site remove a formatação no link.</small>
              </label>

              <label className="admin-field">
                <span>Instagram — usuário</span>
                <input
                  value={storeSettings.instagram_handle}
                  onChange={(event) => updateStoreSetting('instagram_handle', event.target.value)}
                  placeholder="@tf.modaintima2"
                />
              </label>

              <label className="admin-field">
                <span>Instagram — link</span>
                <input
                  type="url"
                  value={storeSettings.instagram_url}
                  onChange={(event) => updateStoreSetting('instagram_url', event.target.value)}
                  placeholder="https://instagram.com/..."
                />
              </label>

              <label className="admin-field admin-field-full">
                <span>Endereço</span>
                <input
                  value={storeSettings.address || ''}
                  onChange={(event) => updateStoreSetting('address', event.target.value)}
                  placeholder="Quando souber, escreva o endereço completo"
                />
                <small>Se deixar vazio, nenhum endereço será exibido.</small>
              </label>

              <label className="admin-field admin-field-full">
                <span>Horário de atendimento</span>
                <input
                  value={storeSettings.service_hours || ''}
                  onChange={(event) => updateStoreSetting('service_hours', event.target.value)}
                  placeholder="Ex.: Segunda a sábado, das 9h às 18h"
                />
                <small>Se deixar vazio, o horário não aparece na loja.</small>
              </label>
            </div>

            <div className="admin-settings-block">
              <div className="admin-settings-block-title">
                <div>
                  <h3>Recebimento do pedido</h3>
                  <p>Ative apenas as opções realmente disponíveis.</p>
                </div>
              </div>

              <div className="admin-switch-grid">
                <label className="admin-switch-card">
                  <input
                    type="checkbox"
                    checked={storeSettings.pickup_enabled}
                    onChange={(event) => updateStoreSetting('pickup_enabled', event.target.checked)}
                  />
                  <span>
                    <strong>Retirada</strong>
                    <small>Permitir que a cliente escolha retirada.</small>
                  </span>
                </label>

                <label className="admin-switch-card">
                  <input
                    type="checkbox"
                    checked={storeSettings.delivery_enabled}
                    onChange={(event) => updateStoreSetting('delivery_enabled', event.target.checked)}
                  />
                  <span>
                    <strong>Entrega</strong>
                    <small>Permitir preenchimento do endereço de entrega.</small>
                  </span>
                </label>
              </div>

              <label className="admin-field">
                <span>Texto da retirada</span>
                <textarea
                  rows="2"
                  value={storeSettings.pickup_note}
                  onChange={(event) => updateStoreSetting('pickup_note', event.target.value)}
                />
              </label>

              <label className="admin-field">
                <span>Texto da entrega</span>
                <textarea
                  rows="2"
                  value={storeSettings.delivery_note}
                  onChange={(event) => updateStoreSetting('delivery_note', event.target.value)}
                />
              </label>

              <label className="admin-field">
                <span>Taxa de entrega</span>
                <input
                  value={storeSettings.delivery_fee_note}
                  onChange={(event) => updateStoreSetting('delivery_fee_note', event.target.value)}
                  placeholder="Ex.: R$ 5,00 no centro / consultar outros bairros"
                />
              </label>
            </div>

            <div className="admin-settings-block">
              <div className="admin-settings-block-title">
                <div>
                  <h3>Formas de pagamento</h3>
                  <p>As opções desmarcadas deixam de aparecer no checkout.</p>
                </div>
              </div>

              <div className="admin-switch-grid admin-payment-switches">
                {[
                  ['accept_pix', 'Pix'],
                  ['accept_card', 'Cartão'],
                  ['accept_cash', 'Dinheiro'],
                ].map(([field, label]) => (
                  <label className="admin-switch-card" key={field}>
                    <input
                      type="checkbox"
                      checked={storeSettings[field]}
                      onChange={(event) => updateStoreSetting(field, event.target.checked)}
                    />
                    <span><strong>{label}</strong></span>
                  </label>
                ))}
              </div>
            </div>

            <div className="admin-settings-block">
              <div className="admin-settings-block-title">
                <div>
                  <h3>Rodapé</h3>
                  <p>Textos institucionais exibidos no final da loja.</p>
                </div>
              </div>

              <label className="admin-field">
                <span>Sobre a loja</span>
                <textarea
                  rows="3"
                  value={storeSettings.footer_about}
                  onChange={(event) => updateStoreSetting('footer_about', event.target.value)}
                />
              </label>

              <label className="admin-field">
                <span>Frase final</span>
                <input
                  value={storeSettings.footer_tagline}
                  onChange={(event) => updateStoreSetting('footer_tagline', event.target.value)}
                />
              </label>
            </div>

            <button className="admin-save" type="submit" disabled={settingsSaving}>
              {settingsSaving ? 'Salvando configurações…' : 'Salvar configurações da loja'}
            </button>
          </form>
        </section>
      </main>

      {mobileSection === 'editor' && (
        <div className="admin-mobile-savebar">
          <button
            type="submit"
            form="product-admin-form"
            disabled={saving}
          >
            {saving ? 'Salvando…' : editing ? 'Salvar alterações' : 'Cadastrar produto'}
          </button>
        </div>
      )}
    </div>
  )
}
