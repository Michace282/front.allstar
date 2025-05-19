const isDev = process.env.NODE_ENV !== 'production'

export default {
  telemetry: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    pageTransition: {
      mode: 'in-out',
    },
    title: process.env.NAME,
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'theme-color',
        content: '#0d253e',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'normalize.css/normalize.css',
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/flicking.css',
    '@/assets/css/flicking-inline.css',
    '@/assets/css/pagination.css',
    '@/assets/scss/style.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/vue-agile',
    '@/plugins/vue-the-mask',
    '@/plugins/i18n',
    '@/plugins/settings',
    '@/plugins/helper',
    {
      src: './plugins/fancy.js',
      mode: 'client',
    },
    {
      src: './plugins/gtm.js',
      mode: 'client',
    },
    {
      src: '@/plugins/pdf',
      mode: 'client',
    },
    {
      src: '@/plugins/map',
      mode: 'client',
    },
    { src: '~/plugins/youtube', ssr:false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-storm',
    //'nuxt-build-optimisations',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/axios',
    '@nuxtjs/gtm',
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyBN_zTIVdfxvRr0xdTSx8k1lKge7stdKzg',
      },
    ],
  ],

  loading: {
    color: '#ee7004',
    height: '5px',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      /^element-ui/,
    ],
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-class-properties',
          {loose: true},
        ],
        [
          '@babel/plugin-proposal-private-methods',
          {loose: true},
        ],
        [
          '@babel/plugin-proposal-private-property-in-object',
          {loose: true},
        ],
      ],
    },

    filenames: {
      app: ({isDev}) => isDev ? '[name].js' : 'js/[contenthash].js',
      chunk: ({isDev}) => isDev ? '[name].js' : 'js/[contenthash].js',
      css: ({isDev}) => isDev ? '[name].css' : 'css/[contenthash].css',
      img: ({isDev}) => isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({isDev}) => isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({isDev}) => isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]',
    },

   /* ...(!isDev && {
      html: {
        minify: {
          collapseBooleanAttributes: 0,
          decodeEntities: 0,
          minifyCSS: 0,
          minifyJS: 0,
          processConditionalComments: 0,
          removeEmptyAttributes: 0,
          removeRedundantAttributes: 0,
          trimCustomFragments: 0,
          useShortDoctype: 0,
        },
      },
    }),*/

    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },

    /*optimization: {
      minimize: !isDev,
    },*/
  },

  env: {
    BASE: process.env.BASE_URL,
    API: process.env.API_URL,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
  },

  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },

  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'ru',
        name: 'Rus',
        file: 'ru.js',
        domain: 'allstar.com.ua',
      },
      {
        code: 'en',
        name: 'Eng',
        file: 'en.js',
        domain: 'allstarkievrealty.com',
      },
      {
        code: 'uk',
        name: 'Uk',
        file: 'uk.js',
        domain: 'allstarkyivrealty.com',
      },
    ],
    differentDomains: true,
    lazy: true,
    langDir: 'lang/',
    silentTranslationWarn: true,
  },

  router: {
    extendRoutes(routes, resolve)
    {
      routes.push({
        name: 'catalog',
        path: '/:realty_type-:deal_type-kiev',
        component: resolve(__dirname, 'pages/katalog/index.vue'),
      })
      routes.push({
        name: 'filters-empty',
        path: '/:realty_type-:deal_type-kiev/filters',
        component: resolve(__dirname, 'pages/katalog/index.vue'),
        meta: [{
          hid: 'robots',
          name: 'robots',
          content: 'noindex,follow',
        }],
      })
      routes.push({
        name: 'filters-slug',
        path: '/:realty_type-:deal_type-kiev/:slug',
        component: resolve(__dirname, 'pages/katalog/slug.vue'),
      })
      routes.push({
        name: 'search-slug',
        path: '/search-:deal_type/:slug',
        component: resolve(__dirname, 'pages/katalog/search.vue'),
      })
    },
  },

  // Оптимизация

  render: {
    resourceHints: false,
    etag: false,
    static: {
      etag: false,
    },
  },

  ...(!isDev && {
    modern: 'client',
  }),

  // ...(!isDev && {
  //     extractCSS: {
  //         ignoreOrder: true
  //     }
  // }),
}
