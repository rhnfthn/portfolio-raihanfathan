<template>
  <div class="fixed inset-0 -z-10">
    <div class="absolute inset-0">
      <div ref="blob0" class="absolute top-0 -left-4 md:w-96 md:h-96 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"></div>
      <div ref="blob1" class="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20 hidden sm:block"></div>
      <div ref="blob2" class="absolute -bottom-8 left-[-40%] md:left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 md:opacity-20"></div>
      <div ref="blob3" class="absolute -bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 md:opacity-10 hidden sm:block"></div>
    </div>
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]"></div>
  </div>
</template>

<script setup>
const blob0 = ref(null)
const blob1 = ref(null)
const blob2 = ref(null)
const blob3 = ref(null)

const initialPositions = [
  { x: -4, y: 0 },
  { x: -4, y: 0 },
  { x: 20, y: -8 },
  { x: 20, y: -8 },
]

onMounted(() => {
  const blobs = [blob0.value, blob1.value, blob2.value, blob3.value]
  let currentScroll = 0

  const handleScroll = () => {
    const newScroll = window.pageYOffset
    currentScroll = newScroll

    blobs.forEach((blob, index) => {
      if (!blob) return
      const initialPos = initialPositions[index]
      const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340
      const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40
      const x = initialPos.x + xOffset
      const y = initialPos.y + yOffset
      blob.style.transform = `translate(${x}px, ${y}px)`
      blob.style.transition = 'transform 1.4s ease-out'
    })
  }

  window.addEventListener('scroll', handleScroll)
  onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))
})
</script>
