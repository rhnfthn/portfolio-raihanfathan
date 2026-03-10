<template>
  <nav :class="[
    'fixed w-full top-0 z-50 transition-all duration-500',
    isOpen ? 'bg-[#030014]' : scrolled ? 'bg-[#030014]/50 backdrop-blur-xl' : 'bg-transparent'
  ]">
    <div class="mx-auto px-[5%] sm:px-[5%] lg:px-[10%]">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <a href="#Home" @click.prevent="scrollToSection('#Home')"
            class="text-xl font-bold bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent">
            Ekizr
          </a>
        </div>

        <div class="hidden md:block">
          <div class="ml-8 flex items-center space-x-8">
            <a v-for="item in navItems" :key="item.label" :href="item.href"
              @click.prevent="scrollToSection(item.href)" class="group relative px-1 py-2 text-sm font-medium">
              <span :class="[
                'relative z-10 transition-colors duration-300',
                activeSection === item.href.substring(1)
                  ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold'
                  : 'text-[#e2d3fd] group-hover:text-white'
              ]">{{ item.label }}</span>
              <span :class="[
                'absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] transform origin-left transition-transform duration-300',
                activeSection === item.href.substring(1) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              ]" />
            </a>
          </div>
        </div>

        <div class="md:hidden">
          <button @click="isOpen = !isOpen" :class="[
            'relative p-2 text-[#e2d3fd] hover:text-white transition-transform duration-300 ease-in-out transform',
            isOpen ? 'rotate-90 scale-125' : 'rotate-0 scale-100'
          ]">
            <component :is="isOpen ? XIcon : MenuIcon" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <div :class="[
      'md:hidden transition-all duration-300 ease-in-out',
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
    ]">
      <div class="px-4 py-6 space-y-4">
        <a v-for="(item, index) in navItems" :key="item.label" :href="item.href"
          @click.prevent="scrollToSection(item.href)" :class="[
            'block px-4 py-3 text-lg font-medium transition-all duration-300 ease',
            activeSection === item.href.substring(1)
              ? 'bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-semibold'
              : 'text-[#e2d3fd] hover:text-white'
          ]" :style="{
            transitionDelay: `${index * 100}ms`,
            transform: isOpen ? 'translateX(0)' : 'translateX(50px)',
            opacity: isOpen ? 1 : 0,
          }">
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Menu as MenuIcon, X as XIcon } from 'lucide-vue-next'

const isOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('Home')

const navItems = [
  { href: '#Home', label: 'Home' },
  { href: '#About', label: 'About' },
  { href: '#Portofolio', label: 'Portofolio' },
  { href: '#Contact', label: 'Contact' },
]

const scrollToSection = (href) => {
  const section = document.querySelector(href)
  if (section) {
    window.scrollTo({ top: section.offsetTop - 100, behavior: 'smooth' })
  }
  isOpen.value = false
}

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 20
    const sections = navItems.map(item => {
      const section = document.querySelector(item.href)
      if (section) {
        return { id: item.href.replace('#', ''), offset: section.offsetTop - 550, height: section.offsetHeight }
      }
      return null
    }).filter(Boolean)

    const currentPosition = window.scrollY
    const active = sections.find(s => currentPosition >= s.offset && currentPosition < s.offset + s.height)
    if (active) activeSection.value = active.id
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
  onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
})

watch(isOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : 'unset'
})
</script>
