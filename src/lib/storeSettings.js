import { useEffect, useState } from 'react'
import { supabase, supabaseConfigured } from './supabaseClient'

export const DEFAULT_STORE_SETTINGS = {
  id: 1,
  store_name: 'Tai Fernandes Moda Íntima',
  whatsapp: '5575981537356',
  instagram_url: 'https://www.instagram.com/tf.modaintima2',
  instagram_handle: '@tf.modaintima2',
  address: '',
  service_hours: '',
  pickup_enabled: true,
  pickup_note: 'O local e o horário da retirada são combinados pelo WhatsApp.',
  delivery_enabled: true,
  delivery_note: 'A disponibilidade da entrega é confirmada pelo WhatsApp.',
  delivery_fee_note: 'A taxa de entrega é confirmada pelo WhatsApp.',
  accept_pix: true,
  accept_card: true,
  accept_cash: true,
  footer_about: 'Moda íntima escolhida para valorizar conforto, confiança e beleza em cada detalhe.',
  footer_tagline: 'Mais que moda íntima, é sobre você.',
}


export const STORE_SETTINGS_FIELDS = [
  'id',
  'store_name',
  'whatsapp',
  'instagram_url',
  'instagram_handle',
  'address',
  'service_hours',
  'pickup_enabled',
  'pickup_note',
  'delivery_enabled',
  'delivery_note',
  'delivery_fee_note',
  'accept_pix',
  'accept_card',
  'accept_cash',
  'footer_about',
  'footer_tagline',
].join(', ')

export function normalizeWhatsapp(value) {
  return String(value || '').replace(/\D/g, '')
}

export async function fetchStoreSettings() {
  if (!supabaseConfigured || !supabase) return null

  const { data, error } = await supabase
    .from('store_settings')
    .select(STORE_SETTINGS_FIELDS)
    .eq('id', 1)
    .maybeSingle()

  if (error) throw error
  return data
}

export function useStoreSettings() {
  const [settings, setSettings] = useState(DEFAULT_STORE_SETTINGS)
  const [loading, setLoading] = useState(supabaseConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true

    async function load() {
      if (!supabaseConfigured || !supabase) {
        setLoading(false)
        return
      }

      try {
        const remote = await fetchStoreSettings()
        if (!alive) return

        if (remote) {
          setSettings((current) => ({ ...current, ...remote }))
        }

        setError(null)
      } catch (loadError) {
        console.error('Falha ao carregar configurações da loja:', loadError)
        if (alive) setError(loadError)
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()

    return () => {
      alive = false
    }
  }, [])

  return { settings, loading, error, setSettings }
}
