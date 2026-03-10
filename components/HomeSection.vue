<template>
  <div class="min-h-screen bg-[#030014] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%]" id="Home">
    <div :class="['relative z-10 transition-all duration-1000', isLoaded ? 'opacity-100' : 'opacity-0']">
      <div class="container mx-auto min-h-screen">
        <div class="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
          <!-- Left Column -->
          <div class="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0" data-aos="fade-right" data-aos-delay="200">
            <div class="space-y-4 sm:space-y-6">
              <!-- Status Badge -->
              <div class="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
                <div class="relative group">
                  <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div class="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                    <span class="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
                      <Sparkles class="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
                      {{ home.status_badge }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Main Title -->
              <div class="space-y-2" data-aos="fade-up" data-aos-delay="600">
                <h1 class="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                  <span class="relative inline-block">
                    <span class="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                    <span class="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">{{ home.title_line1 }}</span>
                  </span>
                  <br />
                  <span class="relative inline-block mt-2">
                    <span class="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                    <span class="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">{{ home.title_line2 }}</span>
                  </span>
                </h1>
              </div>

              <!-- Typing Effect -->
              <div class="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                <span class="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">{{ text }}</span>
                <span class="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
              </div>

              <!-- Description -->
              <p class="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light" data-aos="fade-up" data-aos-delay="1000">
                {{ home.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="1200">
                <div v-for="tech in home.tech_badges" :key="tech" class="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                  {{ tech }}
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="1400">
                <a href="#Portofolio">
                  <button class="group relative w-[160px]">
                    <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
                    <div class="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                      <div class="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
                      <span class="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
                        <span class="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">Projects</span>
                        <ExternalLink class="w-4 h-4 text-gray-200 group-hover:rotate-45 transform transition-all duration-300 z-10" />
                      </span>
                    </div>
                  </button>
                </a>
                <a href="#Contact">
                  <button class="group relative w-[160px]">
                    <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
                    <div class="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                      <div class="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
                      <span class="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
                        <span class="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">Contact</span>
                        <MailIcon class="w-4 h-4 text-gray-200 group-hover:translate-x-1 transform transition-all duration-300 z-10" />
                      </span>
                    </div>
                  </button>
                </a>
              </div>

              <!-- Social Links -->
              <div class="hidden sm:flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="1600">
                <a v-for="social in socialLinks" :key="social.label" :href="social.link" target="_blank" rel="noopener noreferrer" :aria-label="social.label">
                  <button class="group relative p-3" :aria-label="social.label">
                    <div class="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
                    <div class="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
                      <component :is="social.icon" class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div class="w-full py-0 md:py-[10%] sm:py-0 lg:w-1/2 h-[260px] sm:h-[400px] lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-5 sm:mt-0"
            @mouseenter="isHovering = true" @mouseleave="isHovering = false" data-aos="fade-left" data-aos-delay="600">
            <div class="relative w-full opacity-90">
              <div :class="['absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out', isHovering ? 'opacity-50 scale-105' : 'opacity-20 scale-100']"></div>
              <div :class="['relative lg:left-12 z-10 w-full opacity-90 transform transition-transform duration-500', isHovering ? 'scale-105' : 'scale-100']">
                <img :src="home.hero_image" alt="Developer Animation" :class="['w-full h-full object-contain transition-all duration-500', isHovering ? 'scale-[95%] sm:scale-[90%] md:scale-[90%] lg:scale-[90%] rotate-2' : 'scale-[90%] sm:scale-[80%] md:scale-[80%] lg:scale-[80%]']" />
              </div>
              <div :class="['absolute inset-0 pointer-events-none transition-all duration-700', isHovering ? 'opacity-50' : 'opacity-20']">
                <div :class="['absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700', isHovering ? 'scale-110' : 'scale-100']"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Github, Linkedin, Mail as MailIcon, ExternalLink, Instagram, Sparkles } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

const TYPING_SPEED = 100
const ERASING_SPEED = 50
const PAUSE_DURATION = 2000

const { supabase } = useSupabase()

const home = reactive({
  title_line1: 'Frontend',
  title_line2: 'Developer',
  status_badge: 'Ready to Innovate',
  typing_words: ['Network & Telecom Student', 'Tech Enthusiast'],
  description: 'Menciptakan Website Yang Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.',
  tech_badges: ['React', 'Javascript', 'Node.js', 'Tailwind'],
  hero_image: '/Animation1.gif',
})

const socialLinks = [
  { icon: Github, link: 'https://github.com/EkiZR', label: 'GitHub Profile' },
  { icon: Linkedin, link: 'https://www.linkedin.com/in/ekizr/', label: 'LinkedIn Profile' },
  { icon: Instagram, link: 'https://www.instagram.com/ekizr_/?hl=id', label: 'Instagram Profile' },
]

const text = ref('')
const isLoaded = ref(false)
const isHovering = ref(false)
const isTyping = ref(true)
const wordIndex = ref(0)
const charIndex = ref(0)

const handleTyping = () => {
  const words = home.typing_words
  if (!words.length) return
  if (isTyping.value) {
    if (charIndex.value < words[wordIndex.value].length) {
      text.value += words[wordIndex.value][charIndex.value]
      charIndex.value++
    } else {
      setTimeout(() => { isTyping.value = false }, PAUSE_DURATION)
    }
  } else {
    if (charIndex.value > 0) {
      text.value = text.value.slice(0, -1)
      charIndex.value--
    } else {
      wordIndex.value = (wordIndex.value + 1) % words.length
      isTyping.value = true
    }
  }
}

let typingTimer = null
const startTyping = () => {
  typingTimer = setTimeout(() => {
    handleTyping()
    startTyping()
  }, isTyping.value ? TYPING_SPEED : ERASING_SPEED)
}

onMounted(async () => {
  AOS.init({ once: true, offset: 10 })
  isLoaded.value = true

  // Fetch CMS content
  const { data: content } = await supabase.from('site_content').select('data').eq('id', 'home').single()
  if (content?.data) Object.assign(home, content.data)

  // Fetch social links from about content
  const { data: aboutContent } = await supabase.from('site_content').select('data').eq('id', 'about').single()
  if (aboutContent?.data?.social_links) {
    const iconMap = { github: Github, linkedin: Linkedin, instagram: Instagram }
    const labelMap = { github: 'GitHub Profile', linkedin: 'LinkedIn Profile', instagram: 'Instagram Profile' }
    socialLinks.length = 0
    aboutContent.data.social_links.forEach(link => {
      socialLinks.push({ icon: iconMap[link.type] || Github, link: link.url, label: labelMap[link.type] || link.type })
    })
  }

  startTyping()
})

onBeforeUnmount(() => {
  if (typingTimer) clearTimeout(typingTimer)
})
</script>
