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
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-gtag', 'nuxt-build-cache', 'nuxt-lazy-hydrate'],
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/htq7tpa.css',
        },
      ],
    },
  },
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      failOnError: false,
      routes: ['/']
    }
  },
})
