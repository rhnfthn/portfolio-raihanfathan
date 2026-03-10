<template>
  <a :href="link.url" target="_blank" rel="noopener noreferrer"
    class="group relative flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500">
    <div :class="`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${link.gradient}`" />
    <div class="relative flex items-center gap-4">
      <div class="relative flex items-center justify-center">
        <div class="absolute inset-0 opacity-20 rounded-lg transition-all duration-500 group-hover:scale-125 group-hover:opacity-30" :style="{ backgroundColor: link.color }" />
        <div class="relative p-2 rounded-lg">
          <component :is="iconComponent" class="w-5 h-5 transition-all duration-500 group-hover:scale-110" :style="{ color: link.color }" />
        </div>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-300">{{ link.displayName }}</span>
        <span class="text-xs text-gray-400 truncate group-hover:text-gray-300 transition-colors duration-300">{{ link.subText }}</span>
      </div>
    </div>
    <ExternalLink class="relative w-4 h-4 text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-2" />
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </div>
  </a>
</template>

<script setup>
import { Linkedin, Instagram, Youtube, Github, ExternalLink } from 'lucide-vue-next'

const props = defineProps({ link: { type: Object, required: true } })

const iconMap = { linkedin: Linkedin, instagram: Instagram, youtube: Youtube, github: Github }
const iconComponent = computed(() => iconMap[props.link.iconName] || ExternalLink)
</script>
