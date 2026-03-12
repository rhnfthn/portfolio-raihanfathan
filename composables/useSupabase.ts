import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export const useSupabase = () => {
  if (!_client) {
    const config = useRuntimeConfig()
    const supabaseUrl = (config.public.supabaseUrl as string) || ''
    const supabaseAnonKey = (config.public.supabaseAnonKey as string) || ''

    const looksLikeLocalhost = /^(https?:\/\/)?localhost(?=[:/]|$)/i.test(supabaseUrl)
    const missing = !supabaseUrl || !supabaseAnonKey

    if (missing || (!import.meta.dev && looksLikeLocalhost)) {
      const hint =
        'Supabase belum terkonfigurasi. Set env var NUXT_PUBLIC_SUPABASE_URL dan NUXT_PUBLIC_SUPABASE_ANON_KEY (di Vercel: Project Settings → Environment Variables), lalu redeploy.'
      console.error('[Supabase] Invalid public runtimeConfig.', {
        supabaseUrl,
        hasAnonKey: Boolean(supabaseAnonKey),
        dev: import.meta.dev,
      })
      console.error(hint)
    }

    _client = createClient(
      supabaseUrl || 'http://localhost:54321',
      supabaseAnonKey || 'public-anon-key',
    )
  }
  const config = useRuntimeConfig()
  const supabaseUrl = (config.public.supabaseUrl as string) || ''
  const supabaseAnonKey = (config.public.supabaseAnonKey as string) || ''
  const looksLikeLocalhost = /^(https?:\/\/)?localhost(?=[:/]|$)/i.test(supabaseUrl)
  const configured = Boolean(supabaseUrl && supabaseAnonKey) && (import.meta.dev || !looksLikeLocalhost)

  return { supabase: _client, configured }
}
