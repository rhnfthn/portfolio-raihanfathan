<template>
  <div class="w-full bg-gradient-to-b from-white/10 to-white/5 rounded-2xl backdrop-blur-xl shadow-xl" data-aos="fade-up" data-aos-duration="1000">
    <div class="p-6 border-b border-white/10" data-aos="fade-down" data-aos-duration="800">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-xl bg-indigo-500/20">
          <MessageCircle class="w-6 h-6 text-indigo-400" />
        </div>
        <h3 class="text-xl font-semibold text-white">
          Comments <span class="text-indigo-400">({{ totalComments }})</span>
        </h3>
      </div>
    </div>
    <div class="p-6 space-y-6">
      <div v-if="error" class="flex items-center gap-2 p-4 text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
        <AlertCircle class="w-5 h-5 flex-shrink-0" />
        <p class="text-sm">{{ error }}</p>
      </div>

      <!-- Comment Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-2" data-aos="fade-up" data-aos-duration="1000">
          <label class="block text-sm font-medium text-white">Name <span class="text-red-400">*</span></label>
          <input v-model="userName" type="text" maxlength="15" placeholder="Enter your name" required
            class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
        </div>
        <div class="space-y-2" data-aos="fade-up" data-aos-duration="1200">
          <label class="block text-sm font-medium text-white">Message <span class="text-red-400">*</span></label>
          <textarea v-model="newComment" maxlength="200" placeholder="Write your message here..." required
            class="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none min-h-[120px]" />
        </div>
        <div class="space-y-2" data-aos="fade-up" data-aos-duration="1400">
          <label class="block text-sm font-medium text-white">Profile Photo <span class="text-gray-400">(optional)</span></label>
          <div class="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
            <div v-if="imagePreview" class="flex items-center gap-4">
              <img :src="imagePreview" alt="Profile preview" class="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/50" />
              <button type="button" @click="clearImage" class="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                <X class="w-4 h-4" /><span>Remove Photo</span>
              </button>
            </div>
            <div v-else class="w-full">
              <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleImageChange" />
              <button type="button" @click="fileInputRef?.click()" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all border border-dashed border-indigo-500/50 hover:border-indigo-500 group">
                <ImagePlus class="w-5 h-5 group-hover:scale-110 transition-transform" /><span>Choose Profile Photo</span>
              </button>
              <p class="text-center text-gray-400 text-sm mt-2">Max file size: 5MB</p>
            </div>
          </div>
        </div>
        <button type="submit" :disabled="isSubmitting" data-aos="fade-up" data-aos-duration="1000"
          class="relative w-full h-12 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
          <div class="absolute inset-0 bg-white/20 translate-y-12 group-hover:translate-y-0 transition-transform duration-300" />
          <div class="relative flex items-center justify-center gap-2">
            <template v-if="isSubmitting"><Loader2 class="w-4 h-4 animate-spin" /><span>Posting...</span></template>
            <template v-else><Send class="w-4 h-4" /><span>Post Comment</span></template>
          </div>
        </button>
      </form>

      <!-- Comments List -->
      <div class="space-y-4 h-[328px] overflow-y-auto overflow-x-hidden custom-scrollbar pt-1 pr-1" data-aos="fade-up" data-aos-delay="200">
        <!-- Pinned -->
        <div v-if="pinnedComment" data-aos="fade-down" data-aos-duration="800">
          <CommentItem :comment="pinnedComment" :is-pinned="true" />
        </div>
        <div v-if="comments.length === 0 && !pinnedComment" class="text-center py-8">
          <UserCircle2 class="w-12 h-12 text-indigo-400 mx-auto mb-3 opacity-50" />
          <p class="text-gray-400">No comments yet. Start the conversation!</p>
        </div>
        <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" :is-pinned="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageCircle, AlertCircle, Send, Loader2, ImagePlus, X, UserCircle2 } from 'lucide-vue-next'
import AOS from 'aos'
import 'aos/dist/aos.css'

const { supabase } = useSupabase()

const comments = ref([])
const pinnedComment = ref(null)
const isSubmitting = ref(false)
const error = ref('')
const userName = ref('')
const newComment = ref('')
const imagePreview = ref(null)
const imageFile = ref(null)
const fileInputRef = ref(null)

const totalComments = computed(() => comments.value.length + (pinnedComment.value ? 1 : 0))

const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) { alert('File size must be less than 5MB.'); return }
  if (!file.type.startsWith('image/')) { alert('Please select a valid image file.'); return }
  imageFile.value = file
  const reader = new FileReader()
  reader.onloadend = () => { imagePreview.value = reader.result }
  reader.readAsDataURL(file)
}

const clearImage = () => {
  imagePreview.value = null
  imageFile.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
}

const uploadImage = async (file) => {
  if (!file) return null
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `profile-images/${fileName}`
  const { error: uploadError } = await supabase.storage.from('profile-images').upload(filePath, file)
  if (uploadError) throw uploadError
  const { data } = supabase.storage.from('profile-images').getPublicUrl(filePath)
  return data.publicUrl
}

const handleSubmit = async () => {
  if (!newComment.value.trim() || !userName.value.trim()) return
  error.value = ''
  isSubmitting.value = true
  try {
    const profileImageUrl = await uploadImage(imageFile.value)
    const { error: insertError } = await supabase.from('portfolio_comments').insert([{
      content: newComment.value,
      user_name: userName.value,
      profile_image: profileImageUrl,
      is_pinned: false,
      created_at: new Date().toISOString(),
    }])
    if (insertError) throw insertError
    newComment.value = ''
    userName.value = ''
    clearImage()
  } catch (err) {
    error.value = 'Failed to post comment. Please try again.'
    console.error('Error adding comment:', err)
  } finally {
    isSubmitting.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const now = new Date()
  const diffMinutes = Math.floor((now - date) / (1000 * 60))
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  if (diffMinutes < 1) return 'Just now'
  if (diffMinutes < 60) return `${diffMinutes}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date)
}

provide('formatDate', formatDate)

const fetchPinnedComment = async () => {
  const { data, error: err } = await supabase.from('portfolio_comments').select('*').eq('is_pinned', true).single()
  if (err && err.code !== 'PGRST116') console.error('Error fetching pinned comment:', err)
  if (data) pinnedComment.value = data
}

const fetchComments = async () => {
  const { data, error: err } = await supabase.from('portfolio_comments').select('*').eq('is_pinned', false).order('created_at', { ascending: false })
  if (err) { console.error('Error fetching comments:', err); return }
  comments.value = data || []
}

onMounted(() => {
  AOS.init({ once: false, duration: 1000 })
  fetchPinnedComment()
  fetchComments()

  const subscription = supabase
    .channel('portfolio_comments')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_comments', filter: 'is_pinned=eq.false' }, () => fetchComments())
    .subscribe()

  onBeforeUnmount(() => subscription.unsubscribe())
})
</script>
