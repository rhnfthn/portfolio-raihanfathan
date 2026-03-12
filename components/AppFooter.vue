<template>
  <footer>
    <center>
      <hr class="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
      <span class="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
        &copy; {{ currentYear }}
        <a href="https://rhndev.vercel.app" class="hover:underline">Rhn Fthn&trade;</a>. All Rights Reserved.
      </span>
    </center>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
