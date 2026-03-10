<template>
  <div class="w-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 py-8 backdrop-blur-xl">
    <h3 class="text-xl font-semibold text-white mb-6 flex items-center gap-2" data-aos="fade-down">
      <span class="inline-block w-8 h-1 bg-indigo-500 rounded-full"></span>
      Connect With Me
    </h3>

    <div class="flex flex-col gap-4">
      <!-- LinkedIn - Primary Row -->
      <SocialLinkItem v-if="linkedIn" :link="linkedIn" data-aos="fade-up" data-aos-delay="100" />

      <!-- Instagram & YouTube -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SocialLinkItem v-for="(link, index) in [instagram, youtube]" :key="link.name" :link="link" data-aos="fade-up" :data-aos-delay="200 + index * 100" />
      </div>

      <!-- GitHub & TikTok -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SocialLinkItem v-for="(link, index) in [github, tiktok]" :key="link.name" :link="link" data-aos="fade-up" :data-aos-delay="400 + index * 100" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'

const socialLinks = [
  { name: 'LinkedIn', displayName: "Let's Connect", subText: 'on LinkedIn', url: 'https://www.linkedin.com/in/ekizr/', color: '#0A66C2', gradient: 'from-[#0A66C2] to-[#0077B5]', isPrimary: true, iconName: 'linkedin' },
  { name: 'Instagram', displayName: 'Instagram', subText: '@ekizr_', url: 'https://www.instagram.com/ekizr_/?hl=id', color: '#E4405F', gradient: 'from-[#833AB4] via-[#E4405F] to-[#FCAF45]', iconName: 'instagram' },
  { name: 'YouTube', displayName: 'Youtube', subText: '@eki zulfar', url: 'https://www.youtube.com/@eki_zulfar', color: '#FF0000', gradient: 'from-[#FF0000] to-[#CC0000]', iconName: 'youtube' },
  { name: 'GitHub', displayName: 'Github', subText: '@EkiZR', url: 'https://github.com/EkiZR', color: '#ffffff', gradient: 'from-[#333] to-[#24292e]', iconName: 'github' },
  { name: 'TikTok', displayName: 'Tiktok', subText: '@eki_zulfar', url: 'https://tiktok.com/@eki_zulfar', color: '#000000', gradient: 'from-[#000000] via-[#25F4EE] to-[#FE2C55]', iconName: 'tiktok' },
]

const linkedIn = socialLinks.find(l => l.isPrimary)
const others = socialLinks.filter(l => !l.isPrimary)
const [instagram, youtube, github, tiktok] = others

onMounted(() => {
  AOS.init({ offset: 10 })
})
</script>
