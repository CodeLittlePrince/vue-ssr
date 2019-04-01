const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueLoaderPluginInstance = new VueLoaderPlugin()
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const publicPath = process.env.CDN || '/dist/'

const filenameString = isProd ? '[name].[contenthash:8]' : '[name]'
const extractCSS =
  new MiniCssExtractPlugin(
    {
      filename: `static/css/${filenameString}.css`,
      chunkFilename: `static/css/${filenameString}.css`
    }
  )

// 减少路径书写
function resolve(dir) {
  return path.join(__dirname, '../' + dir)
}

// 指定以__base64为后缀的svg转为base64
const svgBase64Reg = /__base64\.(svg)(\?.*)?$/

// __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
// __filename: 总是返回被执行的 js 的绝对路径
// process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
let config = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('dist'),
    publicPath,
    filename: `static/js/${filenameString}.js`,
    chunkFilename: `static/js/${filenameString}.js`,
    globalObject: 'this'
  },
  resolve: {
    // 扩展名，比如import 'app.vue'，扩展后只需要写成import 'app'就可以了
    extensions: ['.js', '.vue', '.scss', '.css'],
    // 取路径别名，方便在业务代码中import
    alias: {
      src: resolve('src/client/'),
      common: resolve('src/client/common/'),
      ajax: resolve('src/client/common/js/ajax/'),
      utils: resolve('src/client/common/js/utils/'),
      views: resolve('src/client/views/'),
      components: resolve('src/client/components/'),
      componentsBase: resolve('src/client/componentsBase/'),
      directives: resolve('src/client/directives/'),
      filters: resolve('src/client/filters/'),
      mixins: resolve('src/client/mixins/'),
      plugins: resolve('src/client/plugins/'),
      config: resolve('config')
    }
  },
  // loaders处理
  module: {
    noParse: /^(vue|vue-router|vuex)$/,
    rules: [
      {
        test: /\.(svg)(\?.*)?$/,
        include: svgBase64Reg,
        loader: 'url-loader',
        options: {
          limit: 99999,
          name: isProd
            ? 'static/font/[name].[hash:8].[ext]'
            : 'static/font/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: svgBase64Reg,
        loader: 'file-loader',
        options: {
          name: isProd
            ? 'static/img/[name].[hash:8].[ext]'
            : 'static/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: isProd
            ? 'static/font/[name].[hash:8].[ext]'
            : 'static/font/[name].[ext]'
        }
      },
      // https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: !isProd ? 'vue-style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        include: [resolve('src')],
        loader: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: isProd
    ? [
      new VueLoaderPlugin(),
      extractCSS
    ]
    : [
      new VueLoaderPlugin(),
      new FriendlyErrorsPlugin(),
      // 提示信息
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.ProgressPlugin()
    ]
}
if (!isProd) {
  // sourcemap
  config.devtool = 'eval-source-map'
}

module.exports = {
  config,
  resolve,
  extractCSS,
  VueLoaderPluginInstance
}