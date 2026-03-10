<template>
  <div>
    <!-- Thumbnail -->
    <div class="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl group" @click="open = true">
      <div class="relative">
        <img :src="imgSertif" alt="Certificate" class="w-full h-auto block object-cover aspect-[16/11.5] transition-all duration-300 contrast-[1.10] brightness-[0.9] saturate-[1.1] group-hover:contrast-[1.05] group-hover:brightness-100 group-hover:saturate-[1.1]" />
      </div>
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center bg-black/30">
        <div class="text-center text-white">
          <Maximize2 class="w-10 h-10 mb-1 mx-auto drop-shadow" />
          <p class="font-semibold text-shadow">View Certificate</p>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm" @click.self="open = false">
        <div class="relative max-w-[90vw] max-h-[90vh]">
          <button @click="open = false" class="absolute right-4 top-4 z-10 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all">
            <X class="w-6 h-6" />
          </button>
          <img :src="imgSertif" alt="Certificate Full View" class="block max-w-full max-h-[90vh] mx-auto object-contain" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { Maximize2, X } from 'lucide-vue-next'

defineProps({ imgSertif: String })
const open = ref(false)
</script>
