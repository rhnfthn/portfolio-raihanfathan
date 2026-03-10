<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
        <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
          <Home class="w-4 h-4 text-indigo-400" />
        </div>
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-white">Home / Hero Content</h1>
        <p class="text-gray-500 text-xs">Manage your landing page hero section</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-7 h-7 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
    </div>

    <!-- Form -->
    <DashboardCard v-else>
      <form @submit.prevent="handleSave" class="p-5 sm:p-6 space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Title Line 1 -->
          <div class="space-y-1.5">
            <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Title Line 1</label>
            <input v-model="form.title_line1" required placeholder="e.g. Frontend"
              class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
          </div>

          <!-- Title Line 2 -->
          <div class="space-y-1.5">
            <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Title Line 2</label>
            <input v-model="form.title_line2" required placeholder="e.g. Developer"
              class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
          </div>
        </div>

        <!-- Status Badge -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Status Badge Text</label>
          <input v-model="form.status_badge" placeholder="e.g. Ready to Innovate"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Description -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Description</label>
          <textarea v-model="form.description" rows="3"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" />
        </div>

        <!-- Typing Words -->
        <div class="space-y-3">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Typing Animation Words</label>
          <div v-for="(word, idx) in form.typing_words" :key="idx" class="flex gap-2 items-center">
            <input v-model="form.typing_words[idx]" placeholder="e.g. Tech Enthusiast"
              class="flex-1 bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
            <button type="button" @click="form.typing_words.splice(idx, 1)" class="p-2 text-gray-500 hover:text-red-400 transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <button type="button" @click="form.typing_words.push('')"
            class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            <Plus class="w-3 h-3" /> Add Word
          </button>
        </div>

        <!-- Tech Badges -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Tech Badges (comma separated)</label>
          <input v-model="techBadgesStr" placeholder="e.g. React, Javascript, Node.js, Tailwind"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Hero Image -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Hero Image / GIF</label>
          <div class="flex items-center gap-4">
            <img v-if="heroPreview" :src="heroPreview" class="w-24 h-24 rounded-lg object-contain border border-white/10 bg-black/20" />
            <div v-else class="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <ImageIcon class="w-6 h-6 text-gray-600" />
            </div>
            <label class="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm cursor-pointer hover:bg-indigo-500/30 transition-all border border-indigo-500/30">
              Change Image
              <input type="file" accept="image/*,.gif" class="hidden" @change="handleHeroChange" />
            </label>
          </div>
        </div>

        <!-- Save -->
        <div class="flex justify-end pt-2">
          <button type="submit" :disabled="saving" class="relative group/s">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/s:opacity-100 transition duration-300" />
            <div class="relative flex items-center gap-2 px-5 py-2.5 bg-[#030014] rounded-xl border border-white/10">
              <div v-if="saving" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <Save v-else class="w-4 h-4 text-indigo-400" />
              <span class="text-sm text-gray-200">{{ saving ? 'Saving...' : 'Save Changes' }}</span>
            </div>
          </button>
        </div>
      </form>
    </DashboardCard>
  </div>
</template>

<script setup>
import { Home, Save, Trash2, Plus, ImageIcon } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()
const loading = ref(true)
const saving = ref(false)
const heroFile = ref(null)
const heroPreview = ref(null)
const techBadgesStr = ref('')

const form = reactive({
  title_line1: 'Frontend',
  title_line2: 'Developer',
  status_badge: 'Ready to Innovate',
  description: '',
  typing_words: ['Network & Telecom Student', 'Tech Enthusiast'],
  tech_badges: [],
  hero_image: '/Animation1.gif',
})

const fetchContent = async () => {
  loading.value = true
  const { data } = await supabase.from('site_content').select('data').eq('id', 'home').single()
  if (data?.data) {
    Object.assign(form, data.data)
    if (!form.typing_words) form.typing_words = []
    if (!form.tech_badges) form.tech_badges = []
  }
  techBadgesStr.value = (form.tech_badges || []).join(', ')
  heroPreview.value = form.hero_image
  loading.value = false
}

onMounted(fetchContent)

const handleHeroChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  heroFile.value = f
  heroPreview.value = URL.createObjectURL(f)
}

const handleSave = async () => {
  saving.value = true
  try {
    if (heroFile.value) {
      const fileName = `hero-${Date.now()}.${heroFile.value.name.split('.').pop()}`
      await supabase.storage.from('site-images').upload(fileName, heroFile.value)
      const { data: urlData } = supabase.storage.from('site-images').getPublicUrl(fileName)
      form.hero_image = urlData.publicUrl
      heroFile.value = null
    }
    form.tech_badges = techBadgesStr.value.split(',').map(s => s.trim()).filter(Boolean)
    form.typing_words = form.typing_words.filter(w => w.trim())

    const { error } = await supabase.from('site_content').upsert({
      id: 'home',
      data: { ...form },
      updated_at: new Date().toISOString()
    })
    if (error) throw error
    Swal.fire({ icon: 'success', title: 'Saved!', text: 'Home content updated.', timer: 1500, showConfirmButton: false, background: '#030014', color: '#fff' })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message, background: '#030014', color: '#fff' })
  } finally {
    saving.value = false
  }
}
</script>
