<template>
  <div class="fixed inset-0 bg-[#030014]" v-if="isLoading">
    <!-- Background Effect -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 blur-3xl animate-pulse" />
      <div class="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-float" />
    </div>

    <div class="relative min-h-screen flex items-center justify-center px-4">
      <div class="w-full max-w-4xl mx-auto">
        <!-- Icons -->
        <div class="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12">
          <div v-for="(Icon, index) in icons" :key="index" data-aos="fade-down" :data-aos-delay="index * 200">
            <div class="relative group hover:scale-110 transition-transform duration-300">
              <div class="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
              <div class="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
                <component :is="Icon" class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        <!-- Welcome Text -->
        <div class="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold space-y-2 sm:space-y-4">
            <div class="mb-2 sm:mb-4">
              <span v-for="(word, i) in ['Welcome', 'To', 'My']" :key="word" data-aos="fade-right" :data-aos-delay="200 + i * 200"
                class="inline-block px-2 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                {{ word }}&nbsp;
              </span>
            </div>
            <div>
              <span v-for="(word, i) in ['Portfolio', 'Website']" :key="word" data-aos="fade-up" :data-aos-delay="800 + i * 200"
                class="inline-block px-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {{ word }}&nbsp;
              </span>
            </div>
          </h1>
        </div>

        <!-- Website Link -->
        <div class="text-center" data-aos="fade-up" data-aos-delay="1200">
          <a href="https://rhndev.vercel.app" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300">
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
            <div class="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
              <Globe class="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {{ typedText }}<span class="animate-pulse">|</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Code2, User, Github, Globe } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

const emit = defineEmits(['complete'])

const icons = [Code2, User, Github]
const isLoading = ref(true)
const typedText = ref('')

onMounted(() => {
  AOS.init({ duration: 1000, once: false, mirror: false })

  // Typewriter effect
  const fullText = 'rhndev.vercel.app'
  let index = 0
  const typeInterval = setInterval(() => {
    if (index <= fullText.length) {
      typedText.value = fullText.slice(0, index)
      index++
    } else {
      clearInterval(typeInterval)
    }
  }, 260)

  const timer = setTimeout(() => {
    isLoading.value = false
    setTimeout(() => emit('complete'), 1000)
  }, 3400)

  onBeforeUnmount(() => {
    clearTimeout(timer)
    clearInterval(typeInterval)
  })
})
</script>
