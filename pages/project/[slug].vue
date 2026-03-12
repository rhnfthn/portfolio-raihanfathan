<template>
  <div>
    <Head>
      <title>{{ project?.Title ? `${project.Title} — Eki Zulfar Rachman` : 'Loading...' }}</title>
      <meta v-if="project" name="description" :content="project.Description ? project.Description.slice(0, 155) : `Project ${project.Title} oleh Eki Zulfar Rachman`" />
      <meta name="robots" content="index, follow" />
      <link v-if="project" rel="canonical" :href="`https://rhndev.vercel.app/project/${toSlug(project.Title)}`" />
      <meta v-if="project" property="og:title" :content="`${project.Title} — Eki Zulfar Rachman`" />
      <meta v-if="project" property="og:description" :content="project.Description?.slice(0, 155)" />
      <meta v-if="project" property="og:url" :content="`https://rhndev.vercel.app/project/${toSlug(project.Title)}`" />
      <meta property="og:type" content="website" />
      <meta v-if="project?.Img" property="og:image" :content="project.Img" />
    </Head>

    <!-- Loading -->
    <div v-if="!project" class="min-h-screen bg-[#030014] flex items-center justify-center">
      <div class="text-center space-y-6 animate-fadeIn">
        <div class="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
        <h2 class="text-xl md:text-3xl font-bold text-white">Loading Project...</h2>
      </div>
    </div>

    <!-- Project Detail -->
    <div v-else class="min-h-screen bg-[#030014] px-[2%] sm:px-0 relative overflow-hidden">
      <!-- Background blobs -->
      <div class="fixed inset-0">
        <div class="absolute -inset-[10px] opacity-20">
          <div class="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div class="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div class="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div class="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div class="relative">
        <div class="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
          <!-- Breadcrumb -->
          <div class="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button @click="$router.back()"
              class="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base">
              <ArrowLeft class="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div class="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Projects</span>
              <ChevronRight class="w-3 h-3 md:w-4 md:h-4" />
              <span class="text-white/90 truncate">{{ project.Title }}</span>
            </div>
          </div>

          <div class="grid lg:grid-cols-2 gap-8 md:gap-16">
            <!-- Left Column -->
            <div class="space-y-6 md:space-y-10 animate-slideInLeft">
              <div class="space-y-4 md:space-y-6">
                <h1 class="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">{{ project.Title }}</h1>
                <div class="relative h-1 w-16 md:w-24">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm" />
                </div>
              </div>

              <div class="prose prose-invert max-w-none">
                <p class="text-base md:text-lg text-gray-300/90 leading-relaxed">{{ project.Description }}</p>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a0a1a] rounded-xl overflow-hidden relative">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />
                <div class="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
                  <div class="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
                    <Code2 class="text-blue-300 w-4 h-4 md:w-6 md:h-6" :stroke-width="1.5" />
                  </div>
                  <div class="flex-grow">
                    <div class="text-lg md:text-xl font-semibold text-blue-200">{{ project.TechStack?.length || 0 }}</div>
                    <div class="text-[10px] md:text-xs text-gray-400">Total Teknologi</div>
                  </div>
                </div>
                <div class="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-purple-500/20 transition-all duration-300 hover:scale-105 hover:border-purple-500/50 hover:shadow-lg">
                  <div class="bg-purple-500/20 p-1.5 md:p-2 rounded-full">
                    <Layers class="text-purple-300 w-4 h-4 md:w-6 md:h-6" :stroke-width="1.5" />
                  </div>
                  <div class="flex-grow">
                    <div class="text-lg md:text-xl font-semibold text-purple-200">{{ project.Features?.length || 0 }}</div>
                    <div class="text-[10px] md:text-xs text-gray-400">Fitur Utama</div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-3 md:gap-4">
                <a :href="project.Link" target="_blank" rel="noopener noreferrer"
                  class="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 hover:from-blue-600/20 hover:to-purple-600/20 text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base">
                  <div class="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-blue-600/10 to-purple-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <ExternalLink class="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span class="relative font-medium">Live Demo</span>
                </a>
                <a :href="project.Github" target="_blank" rel="noopener noreferrer" @click.prevent="handleGithubClick"
                  class="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base">
                  <div class="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                  <Github class="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                  <span class="relative font-medium">Github</span>
                </a>
              </div>

              <!-- Tech Stack -->
              <div class="space-y-4 md:space-y-6">
                <h3 class="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                  <Code2 class="w-4 h-4 md:w-5 md:h-5 text-blue-400" /> Technologies Used
                </h3>
                <div v-if="project.TechStack?.length" class="flex flex-wrap gap-2 md:gap-3">
                  <TechBadge v-for="(tech, index) in project.TechStack" :key="index" :tech="tech" />
                </div>
                <p v-else class="text-sm md:text-base text-gray-400 opacity-50">No technologies added.</p>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6 md:space-y-10 animate-slideInRight">
              <div class="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <div class="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img :src="project.Img" :alt="project.Title" class="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105" />
                <div class="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
              </div>

              <div class="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                <h3 class="text-xl font-semibold text-white/90 flex items-center gap-3">
                  <Star class="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" /> Key Features
                </h3>
                <ul v-if="project.Features?.length" class="list-none space-y-2">
                  <li v-for="(feature, index) in project.Features" :key="index"
                    class="group/item flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
                    <div class="relative mt-2">
                      <div class="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover/item:opacity-100 opacity-0 transition-opacity duration-300" />
                      <div class="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 group-hover/item:scale-125 transition-transform duration-300" />
                    </div>
                    <span class="text-sm md:text-base text-gray-300 group-hover/item:text-white transition-colors">{{ feature }}</span>
                  </li>
                </ul>
                <p v-else class="text-gray-400 opacity-50">No features added.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, ExternalLink, Github, Code2, Star, ChevronRight, Layers, Globe, Layout, Cpu, Code, Package } from 'lucide-vue-next'
import Swal from 'sweetalert2'
import { toSlug } from '~/utils/slug'

definePageMeta({ layout: false })

const route = useRoute()
const { supabase } = useSupabase()
const project = ref(null)

const normalizeProject = (item = {}) => ({
  ...item,
  Title: item.Title ?? item.title ?? '',
  Description: item.Description ?? item.description ?? '',
  Img: item.Img ?? item.img ?? '',
  Link: item.Link ?? item.link ?? '',
  Github: item.Github ?? item.github ?? '',
  TechStack: item.TechStack ?? item.tech_stack ?? [],
  Features: item.Features ?? item.features ?? [],
})

const TECH_ICONS = {
  React: Globe, Tailwind: Layout, Express: Cpu, Python: Code, Javascript: Code, HTML: Code, CSS: Code, default: Package,
}

const TechBadge = defineComponent({
  props: { tech: String },
  setup(props) {
    const Icon = TECH_ICONS[props.tech] || TECH_ICONS['default']
    return () => h('div', { class: 'group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default' }, [
      h('div', { class: 'absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500' }),
      h('div', { class: 'relative flex items-center gap-1.5 md:gap-2' }, [
        h(Icon, { class: 'w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors' }),
        h('span', { class: 'text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors' }, props.tech),
      ])
    ])
  }
})

onMounted(async () => {
  window.scrollTo(0, 0)

  // Try Supabase first
  const { data: allProjects } = await supabase.from('projects').select('*')
  let selectedProject = null
  if (allProjects) {
    selectedProject = allProjects.map(normalizeProject).find((p) => toSlug(p.Title) === route.params.slug)
  }

  // Fallback to localStorage
  if (!selectedProject) {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    selectedProject = storedProjects.map(normalizeProject).find((p) => toSlug(p.Title) === route.params.slug)
  }

  if (selectedProject) {
    project.value = normalizeProject({
      ...selectedProject,
      Github: selectedProject.Github || selectedProject.github || 'https://github.com/rhnfthn',
    })
  }
})

const handleGithubClick = () => {
  if (project.value.Github === 'Private') {
    Swal.fire({
      icon: 'info', title: 'Source Code Private',
      text: 'Maaf, source code untuk proyek ini bersifat privat.',
      confirmButtonText: 'Mengerti', confirmButtonColor: '#3085d6',
      background: '#030014', color: '#ffffff',
    })
    return
  }
  window.open(project.value.Github, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
.animate-blob { animation: blob 10s infinite; }
.animation-delay-2000 { animation-delay: 2s; }
.animation-delay-4000 { animation-delay: 4s; }
.animate-fadeIn { animation: fadeIn 0.7s ease-out; }
.animate-slideInLeft { animation: slideInLeft 0.7s ease-out; }
.animate-slideInRight { animation: slideInRight 0.7s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
@keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
</style>
