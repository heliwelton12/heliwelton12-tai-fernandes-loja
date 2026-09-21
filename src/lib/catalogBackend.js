import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from './supabaseClient'

function unique(values) {
  return [...new Set(values.filter(Boolean))]
}

function mapProduct(row) {
  const mediaRows = [...(row.media || [])].sort(
    (a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order
  )

  const media = mediaRows.map((item) => ({
    id: item.id,
    type: item.media_type,
    src: item.url,
    storagePath: item.storage_path,
    isCover: item.is_cover,
  }))

  const images = media.filter((item) => item.type === 'image').map((item) => item.src)
  const videos = media.filter((item) => item.type === 'video').map((item) => item.src)
  const variants = (row.variants || []).filter((variant) => variant.active !== false)

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description || '',
    category: row.category?.name || 'Outros',
    categorySlug: row.category?.slug || '',
    price: Number(row.price || 0),
    status: row.status,
    soldOut: row.status === 'sold_out',
    isNew: Boolean(row.is_new),
    demo: Boolean(row.is_demo),
    audience: row.audience || '',
    media,
    images,
    image: images[0] || '',
    video: videos[0] || '',
    sizes: unique(variants.map((variant) => variant.size)),
    colors: unique(variants.map((variant) => variant.color)),
    variants,
    createdAt: row.created_at,
  }
}

export async function fetchCatalogProducts() {
  if (!supabaseConfigured || !supabase) return null

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
        name,
        slug
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
    .order('created_at', { ascending: true })

  if (error) throw error
  return (data || []).map(mapProduct)
}

export function useCatalogProducts(fallbackProducts) {
  const [products, setProducts] = useState(fallbackProducts)
  const [loading, setLoading] = useState(supabaseConfigured)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true

    async function load() {
      if (!supabaseConfigured) {
        setProducts(fallbackProducts)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const remoteProducts = await fetchCatalogProducts()
        if (!alive) return
        setProducts(remoteProducts || [])
        setConnected(true)
        setError(null)
      } catch (loadError) {
        console.error('Falha ao carregar catálogo do Supabase:', loadError)
        if (!alive) return
        setProducts(fallbackProducts)
        setConnected(false)
        setError(loadError)
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [fallbackProducts])

  return { products, loading, connected, error }
}
