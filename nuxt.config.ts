import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  vite: {
    ssr: {
      noExternal: ['@directus/sdk', 'date-fns'] 
    }
  },
  modules: ['nuxt-gtag', 'nuxt-build-cache', 'nuxt-lazy-hydrate'],
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
})
