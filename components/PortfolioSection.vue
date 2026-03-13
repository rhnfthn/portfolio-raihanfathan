<template>
  <div class="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
    <!-- Header -->
    <div class="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
      <h2 class="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        Portfolio Showcase
      </h2>
      <p class="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
        Explore my journey through projects, certifications, and technical expertise.
        Each section represents a milestone in my continuous learning path.
      </p>
    </div>

    <!-- Tabs -->
    <div class="w-full">
      <div class="border border-white/10 rounded-[20px] relative overflow-hidden bg-gradient-to-b from-purple-500/[0.03] to-blue-500/[0.03] backdrop-blur-[10px] md:px-4">
        <div class="flex gap-2 p-2 min-h-[70px] items-center">
          <button
            v-for="(tab, idx) in tabs"
            :key="tab.label"
            @click="activeTab = idx"
            :class="[
              'flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-xl text-sm md:text-base font-semibold transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]',
              activeTab === idx
                ? 'text-white bg-gradient-to-br from-purple-500/20 to-blue-500/20 shadow-[0_4px_15px_-3px_rgba(139,92,246,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-purple-500/10 hover:-translate-y-0.5'
            ]"
          >
            <component :is="tab.icon" :class="['w-5 h-5 transition-all duration-300', activeTab === idx ? 'text-purple-400' : '']" />
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Tab Panels -->
      <div class="mt-4">
        <!-- Projects -->
        <div v-show="activeTab === 0" class="p-1 sm:p-3">
          <div class="container mx-auto flex justify-center items-center overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              <div
                v-for="(project, index) in displayedProjects"
                :key="project.id || index"
                :data-aos="index % 3 === 0 ? 'fade-up-right' : index % 3 === 1 ? 'fade-up' : 'fade-up-left'"
                :data-aos-duration="index % 3 === 0 ? '1000' : index % 3 === 1 ? '1200' : '1000'"
              >
                <CardProject
                  :img="project.Img"
                  :title="project.Title"
                  :description="project.Description"
                  :link="project.Link"
                  :projectId="project.id"
                />
              </div>
            </div>
          </div>
          <div v-if="projects.length > initialItems" class="mt-6 w-full flex justify-start">
            <ToggleButton :is-showing-more="showAllProjects" @click="showAllProjects = !showAllProjects" />
          </div>
        </div>

        <!-- Certificates -->
        <div v-show="activeTab === 1" class="p-1 sm:p-3">
          <div class="container mx-auto flex justify-center items-center overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
              <div
                v-for="(certificate, index) in displayedCertificates"
                :key="certificate.id || index"
                :data-aos="index % 3 === 0 ? 'fade-up-right' : index % 3 === 1 ? 'fade-up' : 'fade-up-left'"
                :data-aos-duration="index % 3 === 0 ? '1000' : index % 3 === 1 ? '1200' : '1000'"
              >
                <CertificateCard :img-sertif="certificate.Img" />
              </div>
            </div>
          </div>
          <div v-if="certificates.length > initialItems" class="mt-6 w-full flex justify-start">
            <ToggleButton :is-showing-more="showAllCertificates" @click="showAllCertificates = !showAllCertificates" />
          </div>
        </div>

        <!-- Tech Stack -->
        <div v-show="activeTab === 2" class="p-1 sm:p-3">
          <div class="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
              <div
                v-for="(stack, index) in techStacks"
                :key="index"
                :data-aos="index % 3 === 0 ? 'fade-up-right' : index % 3 === 1 ? 'fade-up' : 'fade-up-left'"
                :data-aos-duration="index % 3 === 0 ? '1000' : index % 3 === 1 ? '1200' : '1000'"
              >
                <TechStackIcon :icon="stack.icon" :language="stack.language" />
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery -->
        <div v-show="activeTab === 3" class="p-1 sm:p-3">
          <div class="container mx-auto flex justify-center items-center overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="(image, index) in galleryImages"
                :key="index"
                :data-aos="index % 3 === 0 ? 'fade-up-right' : index % 3 === 1 ? 'fade-up' : 'fade-up-left'"
                :data-aos-duration="index % 3 === 0 ? '1000' : index % 3 === 1 ? '1200' : '1000'"
                class="group relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-purple-500/[0.03] to-blue-500/[0.03] backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
              >
                <div class="aspect-[4/3] overflow-hidden">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                    {{ image.title }}
                  </h3>
                  <p class="text-slate-400 text-sm mt-1">{{ image.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Code, Award, Boxes, Images } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

const { supabase } = useSupabase()

const tabs = [
  { label: 'Projects', icon: Code },
  { label: 'Certificates', icon: Award },
  { label: 'Tech Stack', icon: Boxes },
  { label: 'Gallery', icon: Images },
]

const galleryImages = [
  {
    src: '/Photo.jpg',
    alt: 'Gallery Image 1',
    title: 'Creative Design',
    description: 'Innovative and engaging digital experiences'
  },
  {
    src: '/Meta.png',
    alt: 'Gallery Image 2',
    title: 'Modern Approach',
    description: 'Building scalable web solutions'
  },
  {
    src: '/Animation1.gif',
    alt: 'Gallery Image 3',
    title: 'Dynamic Content',
    description: 'Bringing ideas to life with animation'
  }
]

const techStacks = ref([
  { icon: '/html.svg', language: 'HTML' },
  { icon: '/css.svg', language: 'CSS' },
  { icon: '/javascript.svg', language: 'JavaScript' },
  { icon: '/tailwind.svg', language: 'Tailwind CSS' },
  { icon: '/reactjs.svg', language: 'ReactJS' },
  { icon: '/vite.svg', language: 'Vite' },
  { icon: '/nodejs.svg', language: 'Node JS' },
  { icon: '/bootstrap.svg', language: 'Bootstrap' },
  { icon: '/firebase.svg', language: 'Firebase' },
  { icon: '/MUI.svg', language: 'Material UI' },
  { icon: '/vercel.svg', language: 'Vercel' },
  { icon: '/SweetAlert.svg', language: 'SweetAlert2' },
])

const activeTab = ref(0)
const projects = ref([])
const certificates = ref([])
const showAllProjects = ref(false)
const showAllCertificates = ref(false)

const normalizeProject = (project = {}) => ({
  ...project,
  Title: project.Title ?? project.title ?? '',
  Description: project.Description ?? project.description ?? '',
  Img: project.Img ?? project.img ?? '',
  Link: project.Link ?? project.link ?? '',
  Github: project.Github ?? project.github ?? '',
  TechStack: project.TechStack ?? project.tech_stack ?? [],
  Features: project.Features ?? project.features ?? [],
})

const normalizeCertificate = (certificate = {}) => ({
  ...certificate,
  Img: certificate.Img ?? certificate.img ?? '',
})

const isMobile = ref(false)
const initialItems = computed(() => isMobile.value ? 4 : 6)

const displayedProjects = computed(() =>
  showAllProjects.value ? projects.value : projects.value.slice(0, initialItems.value)
)
const displayedCertificates = computed(() =>
  showAllCertificates.value ? certificates.value : certificates.value.slice(0, initialItems.value)
)

const fetchData = async () => {
  const [projectsRes, certificatesRes, techRes] = await Promise.all([
    supabase.from('projects').select('*').order('id', { ascending: false }),
    supabase.from('certificates').select('*').order('id', { ascending: false }),
    supabase.from('tech_stacks').select('*').order('order_index', { ascending: true }),
  ])

  if (!projectsRes.error) {
    projects.value = (projectsRes.data || []).map(normalizeProject)
    localStorage.setItem('projects', JSON.stringify(projects.value))
  }
  if (!certificatesRes.error) {
    certificates.value = (certificatesRes.data || []).map(normalizeCertificate)
    localStorage.setItem('certificates', JSON.stringify(certificates.value))
  }
  if (!techRes.error && techRes.data?.length) {
    techStacks.value = techRes.data
  }
}

onMounted(() => {
  AOS.init({ once: false })
  isMobile.value = window.innerWidth < 768

  // Load cached first
  const cachedProjects = localStorage.getItem('projects')
  const cachedCertificates = localStorage.getItem('certificates')
  if (cachedProjects) projects.value = JSON.parse(cachedProjects)
  if (cachedCertificates) certificates.value = JSON.parse(cachedCertificates)

  fetchData()
})
</script>
