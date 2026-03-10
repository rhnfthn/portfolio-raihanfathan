<template>
  <div class="flex text-white" style="height: 100dvh">
    <!-- Mobile overlay -->
    <div v-if="sidebarOpen" class="fixed inset-0 z-20 bg-black/60 lg:hidden" @click="sidebarOpen = false" />

    <!-- Sidebar desktop -->
    <aside class="hidden lg:flex w-60 shrink-0 flex-col border-r border-white/[0.08] bg-white/[0.03] backdrop-blur-xl"
      style="height: 100dvh; position: sticky; top: 0">
      <SidebarContent :active-path="route.path" @navigate="sidebarOpen = false" @logout="handleLogout" />
    </aside>

    <!-- Sidebar mobile -->
    <aside :class="['fixed inset-y-0 left-0 z-30 w-60 flex flex-col border-r border-white/[0.08] bg-[#0a0a1a] backdrop-blur-xl transition-transform duration-300 lg:hidden', sidebarOpen ? 'translate-x-0' : '-translate-x-full']">
      <SidebarContent :active-path="route.path" @navigate="sidebarOpen = false" @logout="handleLogout" />
    </aside>

    <!-- Main area -->
    <div class="flex-1 flex flex-col min-w-0 min-h-0">
      <!-- Mobile topbar -->
      <div class="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shrink-0">
        <button @click="sidebarOpen = true" class="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
          <Menu class="w-4 h-4" />
        </button>
        <span class="text-sm font-medium text-white">Dashboard</span>
      </div>

      <main class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Menu } from 'lucide-vue-next'

definePageMeta({ layout: false, middleware: 'auth' })

const { supabase } = useSupabase()
const route = useRoute()
const sidebarOpen = ref(false)

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>
