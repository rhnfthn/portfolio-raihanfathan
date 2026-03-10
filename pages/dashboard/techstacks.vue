<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4 flex-wrap">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50" />
          <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <Boxes class="w-4 h-4 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-white">Tech Stacks</h1>
          <p class="text-gray-500 text-xs">{{ loading ? 'Loading...' : `${stacks.length} tech stacks` }}</p>
        </div>
      </div>
      <button @click="showAdd = true" class="relative group shrink-0">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur group-hover:opacity-80 transition duration-300" />
        <div class="relative flex items-center gap-2 px-4 py-2.5 bg-[#030014] rounded-xl border border-white/10">
          <Plus class="w-4 h-4 text-indigo-400" />
          <span class="text-sm text-gray-200">Add Tech</span>
        </div>
      </button>
    </div>

    <!-- Add Modal -->
    <DashboardModal v-if="showAdd" title="Add Tech Stack" @close="showAdd = false">
      <form @submit.prevent="handleAdd" class="p-5 sm:p-6 space-y-4">
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Technology Name</label>
          <input v-model="addForm.language" required placeholder="e.g. TypeScript"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Icon</label>
          <div class="flex items-center gap-4">
            <img v-if="iconPreview" :src="iconPreview" class="w-12 h-12 rounded-lg object-contain border border-white/10 bg-black/20 p-1" />
            <div v-else class="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <ImageIcon class="w-5 h-5 text-gray-600" />
            </div>
            <label class="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm cursor-pointer hover:bg-indigo-500/30 transition-all border border-indigo-500/30">
              Upload Icon
              <input type="file" accept="image/*,.svg" class="hidden" @change="handleIconChange" />
            </label>
          </div>
          <p class="text-xs text-gray-500">Or use existing path from public folder (e.g. /html.svg)</p>
          <input v-model="addForm.icon" placeholder="/icon.svg or leave empty to upload"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Order Index</label>
          <input v-model.number="addForm.order_index" type="number" min="0"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="flex justify-end gap-2 pt-1">
          <button type="button" @click="showAdd = false" class="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm">Cancel</button>
          <button type="submit" :disabled="saving" class="relative group/s">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/s:opacity-100 transition duration-300" />
            <div class="relative flex items-center gap-2 px-5 py-2 bg-[#030014] rounded-xl border border-white/10">
              <span class="text-sm text-gray-200">{{ saving ? 'Saving...' : 'Add' }}</span>
            </div>
          </button>
        </div>
      </form>
    </DashboardModal>

    <!-- Edit Modal -->
    <DashboardModal v-if="editItem" title="Edit Tech Stack" @close="editItem = null">
      <form @submit.prevent="handleEdit" class="p-5 sm:p-6 space-y-4">
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Technology Name</label>
          <input v-model="editForm.language" required
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Icon</label>
          <div class="flex items-center gap-4">
            <img v-if="editIconPreview" :src="editIconPreview" class="w-12 h-12 rounded-lg object-contain border border-white/10 bg-black/20 p-1" />
            <label class="px-4 py-2 rounded-xl bg-indigo-500/20 text-indigo-400 text-sm cursor-pointer hover:bg-indigo-500/30 transition-all border border-indigo-500/30">
              Change Icon
              <input type="file" accept="image/*,.svg" class="hidden" @change="handleEditIconChange" />
            </label>
          </div>
          <input v-model="editForm.icon" placeholder="/icon.svg"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="space-y-1.5">
          <label class="text-xs text-indigo-300/70 uppercase tracking-wider font-medium">Order Index</label>
          <input v-model.number="editForm.order_index" type="number" min="0"
            class="w-full bg-[#0d0d22] border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 text-sm outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="flex justify-end gap-2 pt-1">
          <button type="button" @click="editItem = null" class="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm">Cancel</button>
          <button type="submit" :disabled="saving" class="relative group/s">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-60 blur group-hover/s:opacity-100 transition duration-300" />
            <div class="relative flex items-center gap-2 px-5 py-2 bg-[#030014] rounded-xl border border-white/10">
              <span class="text-sm text-gray-200">{{ saving ? 'Saving...' : 'Update' }}</span>
            </div>
          </button>
        </div>
      </form>
    </DashboardModal>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-7 h-7 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
    </div>

    <!-- Grid -->
    <DashboardCard v-else-if="stacks.length === 0">
      <div class="p-16 text-center">
        <Boxes class="w-10 h-10 text-gray-700 mx-auto mb-3" />
        <p class="text-gray-500 text-sm">No tech stacks yet.</p>
      </div>
    </DashboardCard>
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
      <div v-for="stack in stacks" :key="stack.id" class="relative group">
        <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
        <div class="relative bg-white/5 border border-white/[0.12] rounded-2xl p-4 flex flex-col items-center gap-3 text-center">
          <img :src="stack.icon" :alt="stack.language" class="w-12 h-12 object-contain" />
          <p class="text-sm text-gray-300 font-medium">{{ stack.language }}</p>
          <p class="text-xs text-gray-600">Order: {{ stack.order_index }}</p>
          <div class="flex gap-1.5 mt-1">
            <button @click="startEdit(stack)" class="p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-indigo-400 hover:border-indigo-500/25 transition-all">
              <Pencil class="w-3 h-3" />
            </button>
            <button @click="handleDelete(stack.id)" class="p-1.5 rounded-lg border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/25 transition-all">
              <Trash2 class="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Boxes, Plus, Trash2, Pencil, ImageIcon } from 'lucide-vue-next'
import Swal from 'sweetalert2'

const { supabase } = useSupabase()
const stacks = ref([])
const loading = ref(true)
const saving = ref(false)
const showAdd = ref(false)
const editItem = ref(null)

const addForm = reactive({ language: '', icon: '', order_index: 0 })
const iconFile = ref(null)
const iconPreview = ref(null)

const editForm = reactive({ language: '', icon: '', order_index: 0 })
const editIconFile = ref(null)
const editIconPreview = ref(null)

const fetchStacks = async () => {
  loading.value = true
  const { data } = await supabase.from('tech_stacks').select('*').order('order_index', { ascending: true })
  stacks.value = data || []
  loading.value = false
}

onMounted(fetchStacks)

const uploadIcon = async (file) => {
  const fileName = `tech-${Date.now()}.${file.name.split('.').pop()}`
  await supabase.storage.from('site-images').upload(fileName, file)
  const { data } = supabase.storage.from('site-images').getPublicUrl(fileName)
  return data.publicUrl
}

const handleIconChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  iconFile.value = f
  iconPreview.value = URL.createObjectURL(f)
}

const handleEditIconChange = (e) => {
  const f = e.target.files[0]
  if (!f) return
  editIconFile.value = f
  editIconPreview.value = URL.createObjectURL(f)
}

const handleAdd = async () => {
  saving.value = true
  try {
    let iconUrl = addForm.icon
    if (iconFile.value) {
      iconUrl = await uploadIcon(iconFile.value)
    }
    const { error } = await supabase.from('tech_stacks').insert({
      language: addForm.language,
      icon: iconUrl,
      order_index: addForm.order_index
    })
    if (error) throw error
    showAdd.value = false
    Object.assign(addForm, { language: '', icon: '', order_index: 0 })
    iconFile.value = null
    iconPreview.value = null
    fetchStacks()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message, background: '#030014', color: '#fff' })
  } finally {
    saving.value = false
  }
}

const startEdit = (stack) => {
  editItem.value = stack
  Object.assign(editForm, { language: stack.language, icon: stack.icon, order_index: stack.order_index })
  editIconPreview.value = stack.icon
  editIconFile.value = null
}

const handleEdit = async () => {
  saving.value = true
  try {
    let iconUrl = editForm.icon
    if (editIconFile.value) {
      iconUrl = await uploadIcon(editIconFile.value)
    }
    const { error } = await supabase.from('tech_stacks').update({
      language: editForm.language,
      icon: iconUrl,
      order_index: editForm.order_index
    }).eq('id', editItem.value.id)
    if (error) throw error
    editItem.value = null
    editIconFile.value = null
    editIconPreview.value = null
    fetchStacks()
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message, background: '#030014', color: '#fff' })
  } finally {
    saving.value = false
  }
}

const handleDelete = async (id) => {
  if (!confirm('Delete this tech stack?')) return
  await supabase.from('tech_stacks').delete().eq('id', id)
  fetchStacks()
}
</script>
