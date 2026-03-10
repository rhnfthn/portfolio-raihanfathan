<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
        <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
          <UserCircle class="w-4 h-4 text-indigo-400" />
        </div>
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-white">About Content</h1>
        <p class="text-gray-500 text-xs">Manage your About section</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-7 h-7 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
    </div>

    <!-- Form -->
    <DashboardCard v-else>
      <form @submit.prevent="handleSave" class="p-5 sm:p-6 space-y-5">
        <!-- Name -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Full Name</label>
          <input v-model="form.name" required
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Subtitle -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Subtitle Text</label>
          <input v-model="form.subtitle" placeholder="e.g. Hello, I'm"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Description -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Description</label>
          <textarea v-model="form.description" rows="4"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" />
        </div>

        <!-- Quote -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Quote</label>
          <input v-model="form.quote"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- CV URL -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">CV/Resume URL</label>
          <input v-model="form.cv_url" placeholder="https://drive.google.com/..."
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Experience Start Date -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Experience Start Date</label>
          <input v-model="form.experience_start" type="date"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>

        <!-- Profile Photo -->
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Profile Photo</label>
          <div class="flex items-center gap-4">
            <img v-if="photoPreview" :src="photoPreview" class="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/30" />
            <div v-else class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ImageIcon class="w-6 h-6 text-gray-600" />
            </div>
            <label class="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm cursor-pointer hover:bg-indigo-500/30 transition-all border border-indigo-500/30">
              Change Photo
              <input type="file" accept="image/*" class="hidden" @change="handlePhotoChange" />
            </label>
          </div>
        </div>

        <!-- Social Links -->
        <div class="space-y-3">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Social Links</label>
          <div v-for="(link, idx) in form.social_links" :key="idx" class="flex gap-2 items-center">
            <select v-model="link.type"
              class="bg-[#0d0d22] border border-white/10 rounded-xl px-3 py-2.5 text-gray-200 text-sm outline-none focus:border-indigo-500/60 w-36">
              <option value="github">GitHub</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
            <input v-model="link.url" placeholder="https://..."
              class="flex-1 bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
            <button type="button" @click="form.social_links.splice(idx, 1)" class="p-2 text-gray-500 hover:text-red-400 transition-colors">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
          <button type="button" @click="form.social_links.push({ type: 'github', url: '' })"
            class="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            <Plus class="w-3 h-3" /> Add Social Link
          </button>
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
import { UserCircle, Save, Trash2, Plus, ImageIcon } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()
const loading = ref(true)
const saving = ref(false)
const photoFile = ref(null)
const photoPreview = ref(null)

const form = reactive({
  name: '',
  subtitle: "Hello, I'm",
  description: '',
  quote: '',
  cv_url: '',
  experience_start: '2021-11-06',
  photo_url: '/Photo.jpg',
  social_links: []
})

const fetchContent = async () => {
  loading.value = true
  const { data } = await supabase.from('site_content').select('data').eq('id', 'about').single()
  if (data?.data) {
    Object.assign(form, data.data)
    if (!form.social_links) form.social_links = []
  }
  photoPreview.value = form.photo_url
  loading.value = false
}

onMounted(fetchContent)

const handlePhotoChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  photoFile.value = f
  photoPreview.value = URL.createObjectURL(f)
}

const uploadPhoto = async (file) => {
  const fileName = `about-photo-${Date.now()}.${file.name.split('.').pop()}`
  const { error } = await supabase.storage.from('site-images').upload(fileName, file)
  if (error) throw error
  const { data } = supabase.storage.from('site-images').getPublicUrl(fileName)
  return data.publicUrl
}

const handleSave = async () => {
  saving.value = true
  try {
    if (photoFile.value) {
      form.photo_url = await uploadPhoto(photoFile.value)
      photoFile.value = null
    }
    const { error } = await supabase.from('site_content').upsert({
      id: 'about',
      data: { ...form },
      updated_at: new Date().toISOString()
    })
    if (error) throw error
    Swal.fire({ icon: 'success', title: 'Saved!', text: 'About content updated.', timer: 1500, showConfirmButton: false, background: '#030014', color: '#fff' })
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message, background: '#030014', color: '#fff' })
  } finally {
    saving.value = false
  }
}
</script>
