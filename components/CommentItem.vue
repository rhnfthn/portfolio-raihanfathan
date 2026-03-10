<template>
  <div :class="[
    'px-4 pt-4 pb-2 rounded-xl border transition-all group hover:shadow-lg hover:-translate-y-0.5',
    isPinned
      ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30 hover:from-indigo-500/15 hover:to-purple-500/15'
      : 'bg-white/5 border-white/10 hover:bg-white/10'
  ]">
    <div v-if="isPinned" class="flex items-center gap-2 mb-3 text-indigo-400">
      <Pin class="w-4 h-4" />
      <span class="text-xs font-medium uppercase tracking-wide">Pinned Comment</span>
    </div>
    <div class="flex items-start gap-3">
      <img v-if="comment.profile_image" :src="comment.profile_image" :alt="`${comment.user_name}'s profile`"
        :class="['w-10 h-10 rounded-full object-cover border-2 flex-shrink-0', isPinned ? 'border-indigo-500/50' : 'border-indigo-500/30']"
        loading="lazy" />
      <div v-else :class="['p-2 rounded-full text-indigo-400 group-hover:bg-indigo-500/30 transition-colors', isPinned ? 'bg-indigo-500/30' : 'bg-indigo-500/20']">
        <UserCircle2 class="w-5 h-5" />
      </div>
      <div class="flex-grow min-w-0">
        <div class="flex items-center justify-between gap-4 mb-2">
          <div class="flex items-center gap-2">
            <h4 :class="['font-medium truncate', isPinned ? 'text-indigo-200' : 'text-white']">{{ comment.user_name }}</h4>
            <span v-if="isPinned" class="px-2 py-0.5 text-xs bg-indigo-500/20 text-indigo-300 rounded-full">Admin</span>
          </div>
          <span class="text-xs text-gray-400 whitespace-nowrap">{{ formatDate(comment.created_at) }}</span>
        </div>
        <p class="text-gray-300 text-sm break-words leading-relaxed relative bottom-2">{{ comment.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pin, UserCircle2 } from 'lucide-vue-next'

defineProps({
  comment: { type: Object, required: true },
  isPinned: { type: Boolean, default: false },
})

const formatDate = inject('formatDate', () => '')
</script>
