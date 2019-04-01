const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.config.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const ANALYZE = process.env.ANALYZE === 'active'
const ONLINE = process.env.ONLINE === 'active'
const isProd = process.env.NODE_ENV === 'production'
const TerserPlugin = require('terser-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')

// 将第三方依赖（node_modules）的库打包，从而充分利用浏览器缓存
const pkg = require('../package.json')
const vendors = Object.keys(pkg.dependencies)
const vendorsExpr = new RegExp(vendors.join('|'))

const config = merge(webpackConfigBase.config, {
  // 入口
  entry: {
    app: webpackConfigBase.resolve('src/client/entry-client.js')
  },
  plugins: [
    new VueSSRClientPlugin(),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"client"',
        ONLINE: ONLINE ? 'true' : 'false' // 一般来说，上线之后埋点会用线上正式的key
      }
    })
  ]
})

if (isProd) {
  // 压缩
  config.optimization = {
    // 分割文件
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {                 // 这里开始设置缓存的 chunks
        vendor: {                    // key 为entry中定义的 入口名称
          chunks: 'initial',
          test: vendorsExpr,         // 正则规则验证，如果符合就提取 chunk
          name: 'vendor',            // 要缓存的 分隔出来的 chunk 名称
          enforce: true,
          reuseExistingChunk: true   // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    },
    // 压缩js
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  }

  // SW
  config.plugins.push(
    // auto generate service worker
    new SWPrecachePlugin({
      cacheId: 'vue-sw',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/pageA',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/pageB',
          handler: 'networkFirst'
        }
      ]
    })
  )
}

// analyze的话，进行文件可视化分析
if (ANALYZE) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(
    new BundleAnalyzerPlugin()
  )
}

module.exports = config