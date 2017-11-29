module.exports = {
  // mode: 'spa', // Remove to enable SSR mode
  css: [
    '~/node_modules/normalize.css/normalize.css',
    '~/styles/grid.scss',
    '~/styles/style.scss'
  ],
  loading: {
    color: '#24bbff',
    height: '5px'
  },
  router: {
    middleware: 'route'
  },
  plugins: [
    '~/plugins/icons.js'
  ],
  head: {
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}