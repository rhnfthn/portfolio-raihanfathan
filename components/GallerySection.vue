<template>
  <div class="h-auto pb-[10%] text-white overflow-x-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-4 sm:mt-0 bg-[#030014]" id="Gallery">
    <!-- Header -->
    <div class="text-center lg:mb-8 mb-2 px-[5%]">
      <div class="inline-block relative group">
        <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" data-aos="zoom-in-up" data-aos-duration="600">Gallery</h2>
      </div>
      <p class="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2" data-aos="zoom-in-up" data-aos-duration="800">
        <ImageIcon class="w-5 h-5 text-purple-400" />
        Showcase of my creative work
        <ImageIcon class="w-5 h-5 text-purple-400" />
      </p>
    </div>

    <!-- Gallery Grid -->
    <div class="w-full mx-auto pt-6 sm:pt-8 relative">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div v-for="(image, index) in galleryImages" :key="index" :data-aos="animations[index]" data-aos-duration="1000" class="group relative overflow-hidden rounded-2xl">
          <!-- Image Container -->
          <div class="relative w-full aspect-square bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 overflow-hidden rounded-2xl border border-white/10 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/20">
            <!-- Gradient Overlay Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#6366f1]/30 via-transparent to-[#a855f7]/30 group-hover:opacity-0 transition-opacity duration-300 z-10" />

            <!-- Image -->
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            <!-- Hover Overlay -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center z-20">
              <div class="text-center space-y-3">
                <h3 class="text-xl sm:text-2xl font-bold text-white">{{ image.title }}</h3>
                <p class="text-sm sm:text-base text-gray-300 max-w-xs">{{ image.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ImageIcon } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

const galleryImages = ref([
  {
    src: new URL('../assets/gallery/slamet1.jpg', import.meta.url).href,
    alt: 'Gallery Photo 1',
    title: 'Take A Selfie',
    description: 'taking a selfie at the top of Mt. Slamet'
  },
  {
    src: new URL('../assets/gallery/slamet3.jpg', import.meta.url).href,
    alt: 'Gallery Photo 2',
    title: 'Slamet Gate',
    description: 'Mt. Slamet climbing gate 3428 MASL'
  },
  {
    src: new URL('../assets/gallery/slamet2.jpg', import.meta.url).href,
    alt: 'Gallery Photo 3',
    title: 'Mt. Slamet Summit',
    description: 'I am at the highest point of Java Island'
  }
])

const animations = ['fade-up-right', 'fade-up', 'fade-up-left']

onMounted(() => {
  AOS.init({ once: false })
})
</script>
