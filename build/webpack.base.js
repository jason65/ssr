const path = require('path')
require('babel-polyfill')

// const createVueLoaderOptions = require('./vue-loader.config')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
const isDev = process.env.NODE_ENV === 'development'
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const config = {
  target: 'web',
  entry: ['babel-polyfill', path.join(__dirname, '../client/main.js')],
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../client-build'),
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      vue: 'vue/dist/vue.js',
      '@static': resolve('static'),
      '@src': resolve('client')
    }
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}

module.exports = config
