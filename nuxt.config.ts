export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  pinia: {
    autoImports: ['defineStore']
  },

  compatibilityDate: '2024-12-05'
})