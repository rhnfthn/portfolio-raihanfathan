<template>
  <div class="min-h-screen bg-[#030014] flex items-center justify-center px-4">
    <div class="text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-white mb-4 animate-bounce">404</h1>
        <div class="w-24 h-1 bg-indigo-500 mx-auto rounded-full"></div>
      </div>
      <div class="mb-8">
        <h2 class="text-3xl font-semibold text-gray-300 mb-4">Oops! Halaman Tidak Ditemukan</h2>
        <p class="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
          Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau tidak pernah ada.
        </p>
      </div>
      <div class="mb-8">
        <div class="w-32 h-32 mx-auto bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
          <div class="text-6xl">🔍</div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button @click="$router.back()"
          class="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-md hover:shadow-lg">
          <ArrowLeft :size="20" /> Kembali
        </button>
        <NuxtLink to="/"
          class="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg">
          <Home :size="20" /> Ke Beranda
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Home, ArrowLeft } from 'lucide-vue-next'
definePageMeta({ layout: false })
</script>
