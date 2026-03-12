<template>
  <div class="px-[5%] sm:px-[5%] lg:px-[10%]" id="Contact">
    <div class="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
      <h2 data-aos="fade-down" data-aos-duration="1000"
        class="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        Hubungi Saya
      </h2>
      <p data-aos="fade-up" data-aos-duration="1100" class="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
        Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
      </p>
    </div>

    <div class="h-auto py-10 flex items-center justify-center 2xl:pr-[3.1%] lg:pr-[3.8%] md:px-0">
      <div class="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] 2xl:grid-cols-[460px_minmax(0,1fr)] gap-10">
        <!-- Contact Form -->
        <div class="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-8 sm:p-8 transform transition-all duration-500 hover:shadow-[#6366f1]/10">
          <div class="flex justify-between items-start mb-8">
            <div>
              <h2 class="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Hubungi</h2>
              <p class="text-gray-400">Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.</p>
            </div>
            <Share2 class="w-10 h-10 text-[#6366f1] opacity-50" />
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div data-aos="fade-up" data-aos-delay="100" class="relative group">
              <User class="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
              <input type="text" v-model="formData.name" placeholder="Nama Anda" :disabled="isSubmitting" required
                class="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50" />
            </div>
            <div data-aos="fade-up" data-aos-delay="200" class="relative group">
              <Mail class="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
              <input type="email" v-model="formData.email" placeholder="Email Anda" :disabled="isSubmitting" required
                class="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 disabled:opacity-50" />
            </div>
            <div data-aos="fade-up" data-aos-delay="300" class="relative group">
              <MessageSquare class="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors" />
              <textarea v-model="formData.message" placeholder="Pesan Anda" :disabled="isSubmitting" required
                class="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30 h-[9.9rem] disabled:opacity-50" />
            </div>
            <button data-aos="fade-up" data-aos-delay="400" type="submit" :disabled="isSubmitting"
              class="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#6366f1]/20 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              <Send class="w-5 h-5" />
              {{ isSubmitting ? 'Mengirim...' : 'Kirim Pesan' }}
            </button>
          </form>

          <div class="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
            <SocialLinks />
          </div>
        </div>

        <!-- Comments -->
        <div class="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-500 hover:shadow-[#6366f1]/10">
          <CommentSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Share2, User, Mail, MessageSquare, Send } from 'lucide-vue-next'
import Swal from 'sweetalert2'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'

const formData = reactive({ name: '', email: '', message: '' })
const isSubmitting = ref(false)

onMounted(() => {
  AOS.init({ once: false })
})

const handleSubmit = async () => {
  isSubmitting.value = true

  Swal.fire({
    title: 'Mengirim Pesan...',
    html: 'Harap tunggu selagi kami mengirim pesan Anda',
    allowOutsideClick: false,
    didOpen: () => { Swal.showLoading() }
  })

  try {
    const formSubmitUrl = 'https://formsubmit.co/ekizulfarrachman@gmail.com'
    const submitData = new FormData()
    submitData.append('name', formData.name)
    submitData.append('email', formData.email)
    submitData.append('message', formData.message)
    submitData.append('_subject', 'Pesan Baru dari Website Portfolio')
    submitData.append('_captcha', 'false')
    submitData.append('_template', 'table')

    await axios.post(formSubmitUrl, submitData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    Swal.fire({
      title: 'Berhasil!', text: 'Pesan Anda telah berhasil terkirim!', icon: 'success',
      confirmButtonColor: '#6366f1', timer: 2000, timerProgressBar: true
    })
    Object.assign(formData, { name: '', email: '', message: '' })
  } catch (error) {
    if (error.request && error.request.status === 0) {
      Swal.fire({
        title: 'Berhasil!', text: 'Pesan Anda telah berhasil terkirim!', icon: 'success',
        confirmButtonColor: '#6366f1', timer: 2000, timerProgressBar: true
      })
      Object.assign(formData, { name: '', email: '', message: '' })
    } else {
      Swal.fire({
        title: 'Gagal!', text: 'Terjadi kesalahan. Silakan coba lagi nanti.', icon: 'error',
        confirmButtonColor: '#6366f1'
      })
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
