<template>
  <div :class="['relative group', $attrs.class]">
    <div class="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div class="relative bg-white/5 backdrop-blur-xl border border-white/[0.12] rounded-2xl h-full">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
</script>
