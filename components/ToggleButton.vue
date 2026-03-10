<template>
  <button
    @click="$emit('click')"
    class="px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm group relative overflow-hidden"
  >
    <span class="relative z-10 flex items-center gap-2">
      {{ isShowingMore ? 'See Less' : 'See More' }}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        :class="['transition-transform duration-300', isShowingMore ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5']">
        <polyline :points="isShowingMore ? '18 15 12 9 6 15' : '6 9 12 15 18 9'" />
      </svg>
    </span>
    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
</template>

<script setup>
defineProps({
  isShowingMore: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>
