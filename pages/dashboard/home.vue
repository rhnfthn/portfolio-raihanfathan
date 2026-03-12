<template>
  <div class="space-y-2">
    <!-- Header -->
    <div class="flex items-center gap-3 mt-0">
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

        <!-- Song Title -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Song Title</label>
          <input v-model="form.song_title" placeholder="e.g. Midnight City"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Song Audio -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Song Audio</label>
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex-1 min-w-0 rounded-xl border border-white/10 bg-[#0d0d22] px-4 py-3 text-sm text-gray-400">
              {{ audioDisplay }}
            </div>
            <div class="flex items-center gap-2">
              <label class="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm cursor-pointer hover:bg-indigo-500/30 transition-all border border-indigo-500/30 text-center">
                Change Audio
                <input type="file" accept="audio/*" class="hidden" @change="handleAudioChange" />
              </label>
              <button type="button" @click="clearAudioSelection"
                class="px-4 py-2 rounded-xl bg-red-500/10 text-red-300 text-sm hover:bg-red-500/20 transition-all border border-red-500/20">
                Clear
              </button>
            </div>
          </div>
          <input v-model="form.song_url" placeholder="or paste audio URL manually"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
          <div class="relative mt-1">
            <div v-if="audioPreview || form.song_url">
              <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#6366f1]/30 to-[#a855f7]/30 blur opacity-60" />
              <div class="relative flex items-center gap-3 rounded-2xl border border-white/10 bg-[#07071a] px-4 py-2">
                <button type="button" @click="togglePreviewTrack"
                  class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                  :aria-label="isPreviewPlaying ? 'Pause preview song' : 'Play preview song'">
                  <Pause v-if="isPreviewPlaying" class="h-5 w-5" />
                  <Play v-else class="ml-0.5 h-5 w-5" />
                </button>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-indigo-300/70">
                    <Music4 class="h-3.5 w-3.5" />
                    Song Preview
                  </div>
                  <p class="truncate text-sm text-white">{{ form.song_title || 'Selected audio' }}</p>
                </div>
                <audio ref="dashboardAudioEl" :src="audioPreview || form.song_url" preload="metadata" @play="isPreviewPlaying = true" @pause="isPreviewPlaying = false" @ended="isPreviewPlaying = false" />
              </div>
            </div>
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
import { Home, Save, Trash2, Plus, ImageIcon, Play, Pause, Music4 } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()
const loading = ref(true)
const saving = ref(false)
const heroFile = ref(null)
const audioFile = ref(null)
const audioFileName = ref('')
const heroPreview = ref(null)
const audioPreview = ref('')
const techBadgesStr = ref('')
const audioDisplay = computed(() => audioFileName.value || form.song_url || 'No audio selected')
const dashboardAudioEl = ref(null)
const isPreviewPlaying = ref(false)
let heroObjectUrl = ''
let audioObjectUrl = ''

const form = reactive({
  title_line1: 'Frontend',
  title_line2: 'Developer',
  status_badge: 'Ready to Innovate',
  description: '',
  typing_words: ['Network & Telecom Student', 'Tech Enthusiast'],
  tech_badges: [],
  hero_image: '/Animation1.gif',
  song_title: '',
  song_url: '',
})

const fetchContent = async () => {
  loading.value = true
  const { data } = await supabase.from('site_content').select('data').eq('id', 'home').single()
  if (data?.data) {
    Object.assign(form, data.data)
    if (!form.typing_words) form.typing_words = []
    if (!form.tech_badges) form.tech_badges = []
    if (!form.song_title) form.song_title = ''
    if (!form.song_url) form.song_url = ''
  }
  techBadgesStr.value = (form.tech_badges || []).join(', ')
  heroPreview.value = form.hero_image
  audioPreview.value = form.song_url || ''
  audioFileName.value = form.song_url || ''
  loading.value = false
}

onMounted(fetchContent)

const handleHeroChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  if (heroObjectUrl) URL.revokeObjectURL(heroObjectUrl)
  heroFile.value = f
  heroObjectUrl = URL.createObjectURL(f)
  heroPreview.value = heroObjectUrl
}

const handleAudioChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  audioFile.value = f
  audioFileName.value = f.name
  if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl)
  audioObjectUrl = URL.createObjectURL(f)
  audioPreview.value = audioObjectUrl
}

const clearAudioSelection = () => {
  if (dashboardAudioEl.value) {
    dashboardAudioEl.value.pause()
    dashboardAudioEl.value.currentTime = 0
  }
  isPreviewPlaying.value = false
  if (audioObjectUrl) {
    URL.revokeObjectURL(audioObjectUrl)
    audioObjectUrl = ''
  }
  audioFile.value = null
  audioFileName.value = ''
  audioPreview.value = ''
  form.song_url = ''
}

const togglePreviewTrack = async () => {
  if (!dashboardAudioEl.value || !audioPreview.value) return
  if (isPreviewPlaying.value) {
    dashboardAudioEl.value.pause()
    return
  }
  try {
    await dashboardAudioEl.value.play()
  } catch {
    isPreviewPlaying.value = false
  }
}

watch(() => form.song_url, (value) => {
  if (!audioFile.value) audioFileName.value = value || ''
  if (!audioFile.value) audioPreview.value = value || ''
})

watch(audioPreview, () => {
  if (!dashboardAudioEl.value) return
  dashboardAudioEl.value.pause()
  dashboardAudioEl.value.currentTime = 0
  isPreviewPlaying.value = false
})

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
    if (audioFile.value) {
      const fileName = `home-audio-${Date.now()}.${audioFile.value.name.split('.').pop()}`
      await supabase.storage.from('site-images').upload(fileName, audioFile.value)
      const { data: urlData } = supabase.storage.from('site-images').getPublicUrl(fileName)
      form.song_url = urlData.publicUrl
      audioPreview.value = form.song_url
      audioFile.value = null
      audioFileName.value = form.song_url
      if (audioObjectUrl) {
        URL.revokeObjectURL(audioObjectUrl)
        audioObjectUrl = ''
      }
    }
    form.tech_badges = techBadgesStr.value.split(',').map(s => s.trim()).filter(Boolean)
    form.typing_words = form.typing_words.filter(w => w.trim())
    form.song_title = form.song_title.trim()
    form.song_url = form.song_url.trim()

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

onBeforeUnmount(() => {
  if (dashboardAudioEl.value) {
    dashboardAudioEl.value.pause()
    dashboardAudioEl.value.currentTime = 0
  }
  if (heroObjectUrl) URL.revokeObjectURL(heroObjectUrl)
  if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl)
})
</script>
