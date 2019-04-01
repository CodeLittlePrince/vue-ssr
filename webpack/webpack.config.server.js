const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.config.base.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const ONLINE = process.env.ONLINE === 'active'

let config = merge(webpackConfigBase.config, {
  target: 'node',
  entry: webpackConfigBase.resolve('./src/client/entry-server.js'),
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  externals: /\.(css|scss)$/,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"',
        ONLINE: ONLINE ? 'true' : 'false'
      }
    }),
    new VueSSRServerPlugin()
  ]
})

// ssr中，server需要除去css相关（externals不知道为什么不生效）
config.module.rules.map(item => {
  if (item.test.toString() === /\.(css|scss)$/.toString()) {
    item.use = 'null-loader'
  }
})

module.exports = config