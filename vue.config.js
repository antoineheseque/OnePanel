const webpack = require('webpack');
const configureAPI = require('./src/server/api')

module.exports = {
  devServer: {
    before: configureAPI
  },
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 10
      })
    ]
  },
  pwa: {
    name: 'OnePanel',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    },
    themeColor: '#344675',
    msTileColor: '#344675',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#344675'
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
