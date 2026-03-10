<template>
  <div>
    <Transition name="fade" mode="out-in">
      <WelcomeScreen v-if="showWelcome" @complete="showWelcome = false" />
    </Transition>

    <template v-if="!showWelcome">
      <AppNavbar />
      <HomeSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
      <AppFooter />
    </template>
  </div>
</template>

<script setup>
const showWelcome = ref(true)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
}
.fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
  filter: blur(10px);
}
</style>
