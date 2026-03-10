<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-start sm:items-center justify-between gap-4 flex-wrap">
      <div class="flex items-center gap-3">
        <div class="relative">
          <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-50 pointer-events-none" />
          <div class="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <MessageSquare class="w-4 h-4 text-indigo-400" />
          </div>
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-white">Comments</h1>
          <p class="text-gray-500 text-xs">{{ comments.length }} total · {{ pinnedCount }} pinned</p>
        </div>
      </div>

      <!-- Filter tabs -->
      <div class="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
        <button
          v-for="tab in filterTabs"
          :key="tab.value"
          @click="filter = tab.value"
          :class="['flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm transition-all duration-200',
            filter === tab.value
              ? 'bg-gradient-to-r from-indigo-500/25 to-purple-500/20 border border-indigo-500/35 text-white font-medium'
              : 'text-gray-500 hover:text-gray-300']"
        >
          {{ tab.label }}
          <span :class="['px-1.5 py-0.5 rounded-full text-xs', filter === tab.value ? 'bg-indigo-500/25 text-indigo-300' : 'bg-white/[0.08] text-gray-500']">
            {{ tab.value === 'all' ? comments.length : pinnedCount }}
          </span>
        </button>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-3 gap-3">
      <DashboardCard v-for="stat in stats" :key="stat.label">
        <div class="p-3 sm:p-4">
          <p class="text-gray-500 text-xs mb-1">{{ stat.label }}</p>
          <p :class="['text-xl sm:text-2xl font-bold', stat.color]">{{ stat.value }}</p>
        </div>
      </DashboardCard>
    </div>

    <!-- Search bar -->
    <div class="relative">
      <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      <input v-model="search" type="text" placeholder="Search by name or message..."
        class="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-gray-200 placeholder-gray-600 text-sm outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all" />
      <button v-if="search" @click="search = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
        <X class="w-4 h-4" />
      </button>
    </div>

    <p v-if="search" class="text-xs text-gray-500 -mt-3">{{ filtered.length }} result{{ filtered.length !== 1 ? 's' : '' }} for "{{ search }}"</p>

    <!-- Comments List -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="w-7 h-7 border-2 border-white/10 border-t-indigo-500 rounded-full animate-spin" />
    </div>
    <DashboardCard v-else-if="paginated.length === 0">
      <div class="p-14 text-center">
        <MessageSquare class="w-10 h-10 text-gray-700 mx-auto mb-3" />
        <p class="text-gray-500 text-sm">
          {{ search ? 'No comments match your search.' : filter === 'pinned' ? 'No pinned comments.' : 'No comments yet.' }}
        </p>
      </div>
    </DashboardCard>
    <div v-else class="space-y-2.5">
      <div v-for="comment in paginated" :key="comment.id" class="relative group">
        <div v-if="comment.is_pinned" class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-15 pointer-events-none" />
        <div :class="['relative bg-white/5 backdrop-blur-xl border rounded-2xl px-4 py-4 sm:px-5 transition-all duration-200',
          comment.is_pinned ? 'border-indigo-500/30' : 'border-white/10 hover:border-white/[0.18]']">
          <div class="flex items-start gap-3 sm:gap-4">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
              <img :src="comment.profile_image || '/default-avatar.jpg'" alt="Avatar" class="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <span class="text-sm font-semibold text-white" v-html="highlightMatch(comment.user_name || 'Anonymous', search)" />
                <span v-if="comment.is_pinned" class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs">
                  <Pin class="w-2.5 h-2.5" /> Pinned
                </span>
                <span class="flex items-center gap-1 text-gray-600 text-xs ml-auto shrink-0">
                  <Calendar class="w-3 h-3" />
                  {{ formatDate(comment.created_at) }}
                </span>
              </div>
              <p class="text-gray-300 text-sm leading-relaxed" v-html="highlightMatch(comment.content || '', search)" />
            </div>
            <div class="flex items-center gap-1.5 shrink-0">
              <button @click="pin(comment.id, !comment.is_pinned)" :title="comment.is_pinned ? 'Unpin' : 'Pin'"
                :class="['p-2 rounded-lg border transition-all duration-200',
                  comment.is_pinned ? 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20' : 'border-white/10 text-gray-500 hover:text-indigo-400 hover:border-indigo-500/25']">
                <PinOff v-if="comment.is_pinned" class="w-3.5 h-3.5" />
                <Pin v-else class="w-3.5 h-3.5" />
              </button>
              <button @click="remove(comment.id)" class="p-2 rounded-lg border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/5 transition-all duration-200">
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-between gap-3 pt-2">
      <p class="text-xs text-gray-500">Showing {{ (page - 1) * PAGE_SIZE + 1 }}–{{ Math.min(page * PAGE_SIZE, filtered.length) }} of {{ filtered.length }}</p>
      <div class="flex items-center gap-1">
        <button @click="page = Math.max(1, page - 1)" :disabled="page === 1"
          class="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft class="w-4 h-4" />
        </button>
        <template v-for="(p, i) in pageNumbers" :key="i">
          <span v-if="p === '...'" class="px-2 text-gray-600 text-xs">…</span>
          <button v-else @click="page = p"
            :class="['min-w-[32px] h-8 px-2 rounded-lg text-xs border transition-all duration-200',
              page === p ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 font-medium' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20']">
            {{ p }}
          </button>
        </template>
        <button @click="page = Math.min(totalPages, page + 1)" :disabled="page === totalPages"
          class="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageSquare, Pin, Trash2, PinOff, Calendar, Search, X, ChevronLeft, ChevronRight } from 'lucide-vue-next'

const PAGE_SIZE = 10
const { supabase } = useSupabase()

const comments = ref([])
const loading = ref(true)
const filter = ref('all')
const search = ref('')
const page = ref(1)

const filterTabs = [
  { value: 'all', label: 'All' },
  { value: 'pinned', label: 'Pinned' },
]

const fetchComments = async () => {
  loading.value = true
  const { data } = await supabase
    .from('portfolio_comments').select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })
  comments.value = data || []
  loading.value = false
}

onMounted(() => { fetchComments() })

watch([filter, search], () => { page.value = 1 })

const pinnedCount = computed(() => comments.value.filter(c => c.is_pinned).length)

const stats = computed(() => [
  { label: 'Total', value: comments.value.length, color: 'text-indigo-400' },
  { label: 'Pinned', value: pinnedCount.value, color: 'text-purple-400' },
  { label: 'Unpinned', value: comments.value.length - pinnedCount.value, color: 'text-blue-400' },
])

const filtered = computed(() => {
  let result = filter.value === 'pinned' ? comments.value.filter(c => c.is_pinned) : comments.value
  const q = search.value.trim().toLowerCase()
  if (q) {
    result = result.filter(c =>
      (c.user_name || '').toLowerCase().includes(q) ||
      (c.content || '').toLowerCase().includes(q)
    )
  }
  return result
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))
const paginated = computed(() => filtered.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))

const pageNumbers = computed(() => {
  const pages = Array.from({ length: totalPages.value }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages.value || Math.abs(p - page.value) <= 1)
  return pages.reduce((acc, p, i, arr) => {
    if (i > 0 && arr[i - 1] !== p - 1) acc.push('...')
    acc.push(p)
    return acc
  }, [])
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const pin = async (id, value) => {
  await supabase.from('portfolio_comments').update({ is_pinned: value }).eq('id', id)
  fetchComments()
}

const remove = async (id) => {
  if (!confirm('Delete this comment?')) return
  await supabase.from('portfolio_comments').delete().eq('id', id)
  fetchComments()
}

const highlightMatch = (text, query) => {
  if (!query.trim()) return text
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.replace(regex, '<mark class="bg-indigo-500/30 text-indigo-200 rounded px-0.5">$1</mark>')
}
</script>
