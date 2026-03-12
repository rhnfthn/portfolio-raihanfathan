// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss"],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Raihan Fathan — Fullstack Web Developer",
      meta: [
        {
          name: "description",
          content: "Website resmi Raihan Fathan, Fullstack Web Developer.",
        },
        { name: "robots", content: "index, follow" },
        {
          property: "og:title",
          content: "Raihan Fathan — Fullstack Web Developer",
        },
        {
          property: "og:description",
          content:
            "Website resmi dan portofolio Raihan Fathan, Fullstack Web Developer.",
        },
        { property: "og:url", content: "https://rhndev.vercel.app" },
        { property: "og:type", content: "website" },
      ],
      link: [{ rel: "canonical", href: "https://rhndev.vercel.app" }],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Raihan Fathan",
            jobTitle: "Fullstack Web Developer",
            url: "https://rhndev.vercel.app",
            sameAs: [
              "https://github.com/rhnfthn",
              "https://www.linkedin.com/in/raihanfathan",
              "https://www.instagram.com/rhn_fthn",
            ],
          }),
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      supabaseUrl:
        process.env.NUXT_PUBLIC_SUPABASE_URL ||
        (process.env.NODE_ENV === "production" ? "" : "http://localhost:54321"),
      supabaseAnonKey:
        process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY ||
        (process.env.NODE_ENV === "production" ? "" : "public-anon-key"),
    },
  },

  routeRules: {
    "/dashboard/**": { ssr: false },
    "/login": { ssr: false },
  },

  vite: {
    plugins: [
      {
        name: "nuxt-app-manifest-fallback",
        enforce: "post",
        resolveId(id) {
          if (id === "#app-manifest") return "\0nuxt-app-manifest-fallback";
        },
        load(id) {
          if (id === "\0nuxt-app-manifest-fallback") {
            return "export default {}\n";
          }
        },
      },
    ],
  },
});
