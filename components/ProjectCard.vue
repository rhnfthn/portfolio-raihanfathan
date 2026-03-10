<template>
  <DashboardCard>
    <div class="p-4 flex flex-col h-full">
      <div v-if="project.Img" class="w-full aspect-[16/8] rounded-xl mb-4 border border-white/[0.08] overflow-hidden bg-white/5">
        <div v-if="!imgLoaded" class="w-full h-full animate-pulse bg-white/5" />
        <img :src="project.Img" :alt="project.Title" @load="imgLoaded = true"
          :class="['w-full h-full object-cover transition-opacity duration-300', imgLoaded ? 'opacity-100' : 'opacity-0 absolute']" />
      </div>
      <h3 class="font-semibold text-white text-sm mb-1">{{ project.Title }}</h3>
      <p v-if="project.Description" class="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">{{ project.Description }}</p>
      <div v-if="project.TechStack?.length" class="flex flex-wrap gap-1.5 mb-3">
        <span v-for="t in project.TechStack" :key="t" class="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs">{{ t }}</span>
      </div>
      <div class="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-white/[0.08]">
        <div class="flex gap-2">
          <a v-if="project.Link" :href="project.Link" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors">
            <ExternalLink class="w-3.5 h-3.5" />
          </a>
          <a v-if="project.Github" :href="project.Github" target="_blank" rel="noopener noreferrer" class="p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-colors">
            <Github class="w-3.5 h-3.5" />
          </a>
        </div>
        <div class="flex gap-2">
          <button @click="$emit('edit', project)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-500/25 text-indigo-400 hover:bg-indigo-500/10 text-xs transition-colors">
            <Pencil class="w-3 h-3" /> Edit
          </button>
          <button @click="$emit('delete', project.id)" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 text-xs transition-colors">
            <Trash2 class="w-3 h-3" /> Delete
          </button>
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup>
import { ExternalLink, Github, Pencil, Trash2 } from 'lucide-vue-next'
defineProps({ project: { type: Object, required: true } })
defineEmits(['edit', 'delete'])
const imgLoaded = ref(false)
</script>
