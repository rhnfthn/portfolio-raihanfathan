import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export const useSupabase = () => {
  if (!_client) {
    const config = useRuntimeConfig()
    _client = createClient(config.public.supabaseUrl as string, config.public.supabaseAnonKey as string)
  }
  return { supabase: _client }
}
