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
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s | AI for Impact',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'AI for Impact highlights student-built AI projects, co-ops, and partners advancing the public interest with the Burnes Center for Social Change at Northeastern University.',
        },
        // Open Graph
        { property: 'og:site_name', content: 'AI for Impact' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'AI for Impact' },
        {
          property: 'og:description',
          content:
            'AI for Impact highlights student-built AI projects, co-ops, and partners advancing the public interest with the Burnes Center for Social Change at Northeastern University.',
        },
        { property: 'og:image', content: '/images/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'AI for Impact' },
        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'AI for Impact' },
        {
          name: 'twitter:description',
          content:
            'AI for Impact highlights student-built AI projects, co-ops, and partners advancing the public interest with the Burnes Center for Social Change at Northeastern University.',
        },
        { name: 'twitter:image', content: '/images/og-image.png' },
        { name: 'twitter:image:alt', content: 'AI for Impact' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/htq7tpa.css',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
