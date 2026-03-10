// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Eki Zulfar Rachman — Frontend Web Developer',
      meta: [
        { name: 'description', content: 'Website resmi Eki Zulfar Rachman, Front-End Web Developer.' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Eki Zulfar Rachman — Frontend Web Developer' },
        { property: 'og:description', content: 'Website resmi dan portofolio Eki Zulfar Rachman, Front-End Web Developer.' },
        { property: 'og:url', content: 'https://ekizr.com' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'canonical', href: 'https://ekizr.com' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Eki Zulfar Rachman',
            jobTitle: 'Frontend Developer',
            url: 'https://ekizr.com',
            sameAs: [
              'https://github.com/EkiZR',
              'https://www.linkedin.com/in/ekizr/',
              'https://www.instagram.com/ekizr_/',
            ],
          }),
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-key',
    },
  },

  routeRules: {
    '/dashboard/**': { ssr: false },
    '/login': { ssr: false },
  },
})
