// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Enable SSG for GitHub Pages
  ssr: false,
  
  app: {
    // Set base URL for GitHub Pages (update with your repo name)
    baseURL: process.env.NODE_ENV === 'production' ? '/salary/' : '/',
    buildAssetsDir: '/assets/',
    head: {
      script: [
        { src: 'https://cdn.tailwindcss.com' }
      ]
    }
  }
})
