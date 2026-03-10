<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="$emit('close')" />
    <div class="relative z-10 w-full max-w-2xl flex flex-col" style="max-height: calc(100vh - 24px)">
      <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-20 pointer-events-none" />
      <div class="relative bg-[#0a0a1a] border border-white/[0.12] rounded-2xl flex flex-col overflow-hidden">
        <div class="flex items-center justify-between px-5 py-4 border-b border-white/[0.08] shrink-0">
          <h2 class="text-base font-semibold text-white">{{ title }}</h2>
          <button type="button" @click="$emit('close')" class="p-1 text-gray-500 hover:text-white transition-colors">
            <X class="w-5 h-5" />
          </button>
        </div>
        <div class="overflow-y-auto flex-1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { X } from 'lucide-vue-next'
defineProps({ title: String })
defineEmits(['close'])
</script>
