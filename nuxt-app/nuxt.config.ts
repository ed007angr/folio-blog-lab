// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Folio',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { name: 'description', content: 'Редакционный блог Folio. Главная страница собирается на сервере, страницы статей — статически.' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600&display=swap',
        },
      ],
    },
  },
  routeRules: {
    '/': { ssr: true, prerender: false },
    '/posts/**': { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      failOnError: true,
      routes: [
        '/posts/morning-pages',
        '/posts/when-you-dont-want-to-write',
        '/posts/editing-aloud',
      ],
    },
  },
})
