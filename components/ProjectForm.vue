<template>
  <form @submit.prevent="onSubmit" class="p-5 sm:p-6 space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="sm:col-span-2 space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Project Title</label>
        <input v-model="form.Title" placeholder="e.g. My Portfolio Website" required
          class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
      </div>

      <div class="sm:col-span-2 space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Description</label>
        <textarea v-model="form.Description" placeholder="Describe the project..." rows="3"
          class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none" />
      </div>

      <div class="space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Tech Stack (comma separated)</label>
        <input v-model="form.TechStack" placeholder="e.g. React, Tailwind, Supabase"
          class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
      </div>

      <div class="space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Key Features (comma separated)</label>
        <input v-model="form.Features" placeholder="e.g. Auth, Dark mode, REST API"
          class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
      </div>

      <div class="space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Live URL</label>
        <input v-model="form.Link" placeholder="https://yourproject.com"
          class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
      </div>

      <div class="space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">GitHub URL</label>
        <input v-model="form.Github" placeholder="https://github.com/username/repo"
          class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
      </div>

      <div class="sm:col-span-2 space-y-1.5">
        <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Project Image</label>
        <label class="flex items-center gap-4 w-full bg-[#0d0d22] border border-dashed border-white/15 rounded-xl px-4 py-4 cursor-pointer hover:border-indigo-500/40 hover:bg-white/[0.04] transition-all">
          <img v-if="preview" :src="preview" class="h-16 w-24 object-cover rounded-lg border border-white/10" alt="preview" />
          <div v-else class="w-24 h-16 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
            <ImageIcon class="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p class="text-sm text-gray-300">{{ preview ? 'Change image' : 'Click to upload image' }}</p>
            <p class="text-xs text-gray-600 mt-0.5">PNG, JPG, WEBP supported</p>
          </div>
          <input type="file" accept="image/*" class="hidden" @change="handleFileChange" />
        </label>
      </div>
    </div>

    <div class="flex justify-end gap-2 pt-1">
      <button type="button" @click="$emit('cancel')" class="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">Cancel</button>
      <button type="submit" :disabled="uploading" class="relative group/s">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/s:opacity-100 transition duration-300" />
        <div class="relative flex items-center gap-2 px-5 py-2 bg-[#030014] rounded-xl border border-white/10">
          <div v-if="uploading" class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <Upload v-else class="w-4 h-4 text-indigo-400" />
          <span class="text-sm text-gray-200">{{ uploading ? 'Saving...' : submitLabel }}</span>
        </div>
      </button>
    </div>
  </form>
</template>

<script setup>
import { Upload, ImageIcon } from 'lucide-vue-next'

const props = defineProps({
  initial: { type: Object, default: null },
  uploading: { type: Boolean, default: false },
  submitLabel: { type: String, default: 'Save Project' }
})
const emit = defineEmits(['submit', 'cancel'])

const form = reactive({
  Title: props.initial?.Title || '',
  Description: props.initial?.Description || '',
  TechStack: Array.isArray(props.initial?.TechStack) ? props.initial.TechStack.join(', ') : props.initial?.TechStack || '',
  Features: Array.isArray(props.initial?.Features) ? props.initial.Features.join(', ') : props.initial?.Features || '',
  Link: props.initial?.Link || '',
  Github: props.initial?.Github || '',
})

const file = ref(null)
const preview = ref(props.initial?.Img || null)

const handleFileChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  file.value = f
  preview.value = URL.createObjectURL(f)
}

const onSubmit = () => {
  emit('submit', { form: { ...form }, file: file.value })
}
</script>
