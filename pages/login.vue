<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-700" />
        <div class="relative bg-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-8 space-y-7">
          <!-- Header -->
          <div class="text-center space-y-3">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/25">
              <Sparkles class="w-3.5 h-3.5 text-indigo-400" />
              <span class="text-indigo-300 text-xs font-medium">Admin Portal</span>
            </div>
            <h1 class="text-3xl font-bold text-white">Welcome Back</h1>
            <p class="text-gray-400 text-sm">Sign in to manage your portfolio</p>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <div class="space-y-1.5">
              <label class="text-xs text-gray-400 uppercase tracking-wider">Email</label>
              <div class="flex items-center bg-white/[0.08] border border-white/15 rounded-xl overflow-hidden focus-within:border-indigo-500/60 transition-colors">
                <Mail class="w-4 h-4 text-gray-500 ml-4 shrink-0" />
                <input type="email" v-model="email" placeholder="admin@example.com" required
                  class="w-full bg-transparent px-3 py-3 text-gray-100 placeholder-gray-500 text-sm outline-none" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs text-gray-400 uppercase tracking-wider">Password</label>
              <div class="flex items-center bg-white/[0.08] border border-white/15 rounded-xl overflow-hidden focus-within:border-indigo-500/60 transition-colors">
                <Lock class="w-4 h-4 text-gray-500 ml-4 shrink-0" />
                <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="••••••••" required
                  class="w-full bg-transparent px-3 py-3 text-gray-100 placeholder-gray-500 text-sm outline-none" />
                <button type="button" @click="showPassword = !showPassword" class="mr-4 shrink-0 text-gray-500 hover:text-gray-300 transition-colors">
                  <EyeOff v-if="showPassword" class="w-4 h-4" />
                  <Eye v-else class="w-4 h-4" />
                </button>
              </div>
            </div>

            <button type="submit" :disabled="loading" class="relative group/btn w-full mt-1">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-70 blur group-hover/btn:opacity-100 transition duration-300" />
              <div class="relative h-11 bg-[#030014] rounded-xl border border-white/10 flex items-center justify-center gap-2 overflow-hidden">
                <div class="absolute inset-0 scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20" />
                <template v-if="loading">
                  <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                </template>
                <template v-else>
                  <span class="relative text-sm font-medium text-white">Sign In</span>
                  <LogIn class="relative w-4 h-4 text-white group-hover/btn:translate-x-1 transition-transform duration-300" />
                </template>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Mail, Lock, LogIn, Sparkles, Eye, EyeOff } from 'lucide-vue-next'

definePageMeta({ layout: false })

const { supabase } = useSupabase()

const email = ref('')
const password = ref('')
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  loading.value = true
  let data
  try {
    const res = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    data = res.data
    if (res.error) {
      alert(res.error.message)
      loading.value = false
      return
    }
  } catch (e) {
    const message =
      e instanceof Error
        ? e.message
        : 'Failed to fetch (network/config).'
    alert(
      `Login gagal: ${message}\n\nKalau deploy di Vercel, pastikan env NUXT_PUBLIC_SUPABASE_URL & NUXT_PUBLIC_SUPABASE_ANON_KEY sudah diset (Production/Preview) lalu redeploy.`
    )
    loading.value = false
    return
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles').select('role').eq('id', data.user.id).single()

  if (profileError) {
    alert('Profil admin belum siap. Pastikan tabel profiles punya row untuk user ini dan policy profiles sudah dibuat.')
    await supabase.auth.signOut()
    loading.value = false
    return
  }

  if (profile?.role !== 'admin') {
    alert('Access denied')
    await supabase.auth.signOut()
    loading.value = false
    return
  }
  navigateTo('/dashboard')
}
</script>
