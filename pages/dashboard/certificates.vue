<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
        <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
          <Award class="w-4 h-4 text-indigo-400" />
        </div>
      </div>
      <div>
        <h1 class="text-xl sm:text-2xl font-bold text-white">Certificates</h1>
        <p class="text-gray-500 text-xs">{{ loading ? 'Loading...' : `${certs.length} certificates total` }}</p>
      </div>
    </div>

    <!-- Upload Card -->
    <DashboardCard>
      <div class="p-5 sm:p-6 space-y-4">
        <h2 class="text-sm font-semibold text-white flex items-center gap-2">
          <Plus class="w-4 h-4 text-indigo-400" /> Upload Certificate
        </h2>
        <label
          @dragover.prevent="dragOver = true"
          @dragleave="dragOver = false"
          @drop.prevent="e => { dragOver = false; handleFile(e.dataTransfer.files[0]) }"
          :class="['flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300',
            dragOver ? 'border-indigo-400/60 bg-indigo-500/10' : 'border-white/[0.12] bg-white/[0.04] hover:border-indigo-500/35 hover:bg-white/[0.07]']"
        >
          <img v-if="preview" :src="preview" alt="preview" class="max-h-40 object-contain rounded-lg p-2" />
          <div v-else class="text-center space-y-2 p-6">
            <div class="w-11 h-11 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto">
              <ImageIcon class="w-5 h-5 text-indigo-400" />
            </div>
            <p class="text-sm text-gray-300">Drag & drop or click to upload</p>
            <p class="text-xs text-gray-600">PNG, JPG, WEBP supported</p>
          </div>
          <input type="file" accept="image/*" class="hidden" @change="e => handleFile(e.target.files[0])" />
        </label>
        <div v-if="file" class="flex items-center justify-between gap-3 flex-wrap">
          <p class="text-xs text-gray-400 truncate flex-1">{{ file.name }}</p>
          <div class="flex gap-2 shrink-0">
            <button @click="file = null; preview = null" class="px-3 py-1.5 rounded-xl border border-white/10 text-gray-500 hover:text-white text-xs transition-colors">Clear</button>
            <button @click="uploadImage" :disabled="uploading" class="relative group/u">
              <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/u:opacity-100 transition duration-300" />
              <div class="relative flex items-center gap-2 px-4 py-1.5 bg-[#030014] rounded-xl border border-white/10">
                <div v-if="uploading" class="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <Upload v-else class="w-3.5 h-3.5 text-indigo-400" />
                <span class="text-xs text-gray-200">{{ uploading ? 'Uploading...' : 'Upload' }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardCard>

    <!-- Grid -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      <div v-for="i in 8" :key="i" class="relative">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10" />
        <div class="relative bg-white/5 border border-white/[0.12] rounded-2xl overflow-hidden">
          <div class="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
        </div>
      </div>
    </div>
    <DashboardCard v-else-if="certs.length === 0">
      <div class="p-16 text-center">
        <Award class="w-10 h-10 text-gray-700 mx-auto mb-3" />
        <p class="text-gray-500 text-sm">No certificates yet.</p>
      </div>
    </DashboardCard>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      <div v-for="cert in certs" :key="cert.id" class="relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
        <div class="relative bg-white/5 border border-white/[0.12] rounded-2xl overflow-hidden">
          <img :src="cert.Img" alt="Certificate" class="w-full aspect-[16/11.5] object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <button @click="deleteCert(cert.id)"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs w-full justify-center hover:bg-red-500/30 transition-colors">
              <Trash2 class="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Award, Upload, Trash2, ImageIcon, Plus } from 'lucide-vue-next'

const { supabase } = useSupabase()
const certs = ref([])
const file = ref(null)
const preview = ref(null)
const uploading = ref(false)
const dragOver = ref(false)
const loading = ref(true)

const fetchCerts = async () => {
  loading.value = true
  const { data } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
  certs.value = data || []
  loading.value = false
}

onMounted(() => { fetchCerts() })

const handleFile = (f) => {
  if (!f) return
  file.value = f
  preview.value = URL.createObjectURL(f)
}

const uploadImage = async () => {
  if (!file.value) return
  uploading.value = true
  const fileName = `cert-${Date.now()}-${file.value.name}`
  await supabase.storage.from('certificate-images').upload(fileName, file.value)
  const { data } = supabase.storage.from('certificate-images').getPublicUrl(fileName)
  await supabase.from('certificates').insert({ Img: data.publicUrl })
  file.value = null
  preview.value = null
  uploading.value = false
  fetchCerts()
}

const deleteCert = async (id) => {
  if (!confirm('Delete this certificate?')) return
  await supabase.from('certificates').delete().eq('id', id)
  fetchCerts()
}
</script>
