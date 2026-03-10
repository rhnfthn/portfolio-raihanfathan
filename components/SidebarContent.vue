<template>
  <div class="flex flex-col h-full p-5 gap-6">
    <!-- Logo -->
    <div class="flex items-center gap-3 px-1 shrink-0">
      <div class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
        <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
          <LayoutDashboard class="w-4 h-4 text-indigo-400" />
        </div>
      </div>
      <div>
        <p class="text-sm font-semibold text-white">Dashboard</p>
        <p class="text-xs text-gray-500">Admin Panel</p>
      </div>
    </div>

    <!-- Badge -->
    <div class="shrink-0 px-3 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
      <span class="text-indigo-300 text-xs font-medium">Portfolio Manager</span>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col gap-1 flex-1 min-h-0">
      <p class="text-[10px] text-gray-600 uppercase tracking-widest px-3 mb-2 shrink-0">Menu</p>
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        @click="$emit('navigate')"
        :class="[
          'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium shrink-0',
          activePath.includes(item.to.split('/').pop())
            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/15 border border-indigo-500/30 text-white'
            : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
        ]"
      >
        <component :is="item.icon" :class="['w-4 h-4 shrink-0', activePath.includes(item.to.split('/').pop()) ? 'text-indigo-400' : '']" />
        {{ item.label }}
        <span v-if="activePath.includes(item.to.split('/').pop())" class="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
      </NuxtLink>
    </nav>

    <!-- Logout -->
    <button @click="$emit('logout')" class="shrink-0 flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/15 transition-all duration-200 text-sm">
      <LogOut class="w-4 h-4 shrink-0" /> Sign Out
    </button>
  </div>
</template>

<script setup>
import { FolderGit2, Award, MessageSquare, LogOut, LayoutDashboard, Home, UserCircle, Boxes } from 'lucide-vue-next'

defineProps({
  activePath: { type: String, default: '' }
})
defineEmits(['navigate', 'logout'])

const navItems = [
  { to: '/dashboard/home', label: 'Home Content', icon: Home },
  { to: '/dashboard/about', label: 'About Content', icon: UserCircle },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/dashboard/certificates', label: 'Certificates', icon: Award },
  { to: '/dashboard/techstacks', label: 'Tech Stacks', icon: Boxes },
  { to: '/dashboard/comments', label: 'Comments', icon: MessageSquare },
]
</script>
