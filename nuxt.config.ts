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
      title: 'Công cụ tính lương Gross - Net 2025-2026 | Chuẩn Nghị quyết mới nhất',
      htmlAttrs: {
        lang: 'vi'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Công cụ tính lương Gross sang Net và ngược lại chuẩn 2025-2026. Áp dụng Nghị quyết 110/2025 với mức giảm trừ gia cảnh 15.5 triệu. Tính thuế TNCN chính xác, so sánh quy định mới.' 
        },
        { 
          name: 'keywords', 
          content: 'tính lương gross net, tính thuế TNCN, giảm trừ gia cảnh 2026, lương net, lương gross, thuế thu nhập cá nhân, nghị quyết 110/2025, tính lương online' 
        },
        { name: 'author', content: 'Tax Calculator' },
        { name: 'robots', content: 'index, follow' },
        
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Công cụ tính lương Gross - Net 2025-2026' },
        { 
          property: 'og:description', 
          content: 'Tính lương Gross sang Net và ngược lại. Áp dụng mức giảm trừ gia cảnh mới nhất 15.5 triệu từ 01/01/2026. So sánh chênh lệch quy định 2025 vs 2026.' 
        },
        { property: 'og:locale', content: 'vi_VN' },
        
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Công cụ tính lương Gross - Net 2025-2026' },
        { 
          name: 'twitter:description', 
          content: 'Tính lương Gross sang Net chính xác. Áp dụng Nghị quyết 110/2025 với giảm trừ gia cảnh 15.5 triệu/tháng.' 
        },
        
        // Additional SEO
        { name: 'theme-color', content: '#16a34a' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://azoom-phan-hong-nam.github.io/salary/' }
      ],
      script: [
        { src: 'https://cdn.tailwindcss.com' }
      ]
    }
  }
})
