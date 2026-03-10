<template>
  <div class="group relative w-full">
    <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
      <div class="relative p-5 z-10">
        <div class="relative overflow-hidden rounded-lg">
          <img :src="img" :alt="title" class="w-full h-full object-cover aspect-[16/8] transform group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="mt-4 space-y-3">
          <h3 class="text-xl font-semibold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">{{ title }}</h3>
          <p class="text-gray-300/80 text-sm leading-relaxed line-clamp-2">{{ description }}</p>
          <div class="pt-4 flex items-center justify-between">
            <a v-if="link" :href="link" target="_blank" rel="noopener noreferrer" class="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
              <span class="text-sm font-medium">Live Demo</span>
              <ExternalLink class="w-4 h-4" />
            </a>
            <span v-else class="text-gray-500 text-sm">Demo Not Available</span>

            <NuxtLink v-if="projectId" :to="`/project/${toSlug(title)}`" class="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50">
              <span class="text-sm font-medium">Details</span>
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
            <span v-else class="text-gray-500 text-sm">Details Not Available</span>
          </div>
        </div>
        <div class="absolute inset-0 border border-white/0 group-hover:border-purple-500/50 rounded-xl transition-colors duration-300 -z-50"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ExternalLink, ArrowRight } from 'lucide-vue-next'
import { toSlug } from '~/utils/slug'

defineProps({
  img: String,
  title: String,
  description: String,
  link: String,
  projectId: [String, Number],
})
</script>
