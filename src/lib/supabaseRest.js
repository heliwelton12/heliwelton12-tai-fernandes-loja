const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(
  supabaseUrl && supabaseKey
)

export async function supabaseRest(path, options = {}) {
  if (!supabaseConfigured) {
    return null
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${path}`,
    {
      ...options,
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: 'application/json',
        ...(options.headers || {}),
      },
    }
  )

  if (!response.ok) {
    let message = ''

    try {
      message = await response.text()
    } catch {
      message = ''
    }

    throw new Error(
      `Supabase REST ${response.status}: ${message || response.statusText}`
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}