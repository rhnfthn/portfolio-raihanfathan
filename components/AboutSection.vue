<template>
  <div class="h-auto pb-[10%] text-white overflow-x-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-4 sm:mt-0" id="About" itemscope itemtype="https://schema.org/Person">
    <!-- Header -->
    <div class="text-center lg:mb-8 mb-2 px-[5%]">
      <div class="inline-block relative group">
        <h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" data-aos="zoom-in-up" data-aos-duration="600">About Me</h2>
      </div>
      <p class="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2" data-aos="zoom-in-up" data-aos-duration="800">
        <Sparkles class="w-5 h-5 text-purple-400" />
        Transforming ideas into digital experiences
        <Sparkles class="w-5 h-5 text-purple-400" />
      </p>
    </div>

    <div class="w-full mx-auto pt-6 sm:pt-8 relative">
      <div class="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div class="space-y-6 text-center lg:text-left">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold" data-aos="fade-right" data-aos-duration="1000">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">{{ about.subtitle }}</span>
            <span class="block mt-2 text-gray-200" data-aos="fade-right" data-aos-duration="1300" itemprop="name">{{ about.name }}</span>
          </h2>
          <p class="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0" data-aos="fade-right" data-aos-duration="1500">
            {{ about.description }}
          </p>

          <!-- Quote -->
          <div class="relative bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#a855f7]/5 border border-[#6366f1]/30 rounded-2xl p-4 my-6 backdrop-blur-md shadow-2xl overflow-hidden" data-aos="fade-up" data-aos-duration="1700">
            <div class="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-xl"></div>
            <div class="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#a855f7]/20 to-[#6366f1]/20 rounded-full blur-lg"></div>
            <div class="absolute top-3 left-4 text-[#6366f1] opacity-30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
            </div>
            <blockquote class="text-gray-300 text-center lg:text-left italic font-medium text-sm relative z-10 pl-6">
              "{{ about.quote }}"
            </blockquote>
          </div>

          <!-- Buttons -->
          <div class="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
            <a href="/cv/resume.pdf" target="_blank" rel="noopener noreferrer" class="w-full lg:w-auto">
              <button data-aos="fade-up" data-aos-duration="800" class="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl">
                <FileText class="w-4 h-4 sm:w-5 sm:h-5" /> Download CV
              </button>
            </a>
            <a href="#Portofolio" class="w-full lg:w-auto">
              <button data-aos="fade-up" data-aos-duration="1000" class="w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10">
                <Code class="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
              </button>
            </a>
          </div>
        </div>

        <!-- Profile Image -->
        <div class="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
          <div class="relative group" data-aos="fade-up" data-aos-duration="1000">
            <div class="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
              <div class="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
              <div class="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
              <div class="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
            </div>
            <div class="relative">
              <div class="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
                <div class="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
                <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
                <div class="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
                <img :src="about.photo_url" alt="Profile" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <a href="#Portofolio">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
          <div v-for="stat in statsData" :key="stat.label" :data-aos="stat.animation" data-aos-duration="1300" class="relative group">
            <div class="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
              <div :class="`absolute -z-10 inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`"></div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
                  <component :is="stat.icon" class="w-8 h-8 text-white" />
                </div>
                <span class="text-4xl font-bold text-white" data-aos="fade-up-left" data-aos-duration="1500" data-aos-anchor-placement="top-bottom">{{ stat.value }}</span>
              </div>
              <div>
                <p class="text-sm uppercase tracking-wider text-gray-300 mb-2" data-aos="fade-up" data-aos-duration="800" data-aos-anchor-placement="top-bottom">{{ stat.label }}</p>
                <div class="flex items-center justify-between">
                  <p class="text-xs text-gray-400" data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-bottom">{{ stat.description }}</p>
                  <ArrowUpRight class="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'
import raihanPhoto from '~/assets/gallery/raihan.png'

const { supabase } = useSupabase()

const totalProjects = ref(0)
const totalCertificates = ref(0)

const about = reactive({
  name: 'Raihan Fathan',
  subtitle: "Hello, I'm",
  description: 'Saya adalah mahasiswa Teknik Informatika yang berfokus pada pengembangan Web Development. Saya berfokus pada penciptaan pengalaman digital yang menarik dan selalu berupaya memberikan solusi terbaik dalam setiap proyek yang saya kerjakan.',
  quote: 'Leveraging AI as a professional tool, not a replacement.',
  photo_url: raihanPhoto,
  cv_url: 'https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo',
  experience_start: '2021-11-06',
})

const YearExperience = computed(() => {
  const startDate = new Date(about.experience_start)
  const today = new Date()
  return today.getFullYear() - startDate.getFullYear() - (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0)
})

onMounted(async () => {
  AOS.init({ once: false })

  // Fetch CMS content
  const { data: content } = await supabase.from('site_content').select('data').eq('id', 'about').single()
  if (content?.data) Object.assign(about, content.data)

  // Fetch counts
  const [projectsRes, certsRes] = await Promise.all([
    supabase.from('projects').select('id', { count: 'exact', head: true }),
    supabase.from('certificates').select('id', { count: 'exact', head: true }),
  ])
  totalProjects.value = projectsRes.count || 0
  totalCertificates.value = certsRes.count || 0
})

const statsData = computed(() => [
  { icon: Code, color: 'from-[#6366f1] to-[#a855f7]', value: totalProjects.value, label: 'Total Projects', description: 'Innovative web solutions crafted', animation: 'fade-right' },
  { icon: Award, color: 'from-[#a855f7] to-[#6366f1]', value: totalCertificates.value, label: 'Certificates', description: 'Professional skills validated', animation: 'fade-up' },
  { icon: Globe, color: 'from-[#6366f1] to-[#a855f7]', value: YearExperience.value, label: 'Years of Experience', description: 'Continuous learning journey', animation: 'fade-left' },
])
</script>
