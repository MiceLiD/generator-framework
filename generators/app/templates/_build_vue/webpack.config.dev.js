const path = require('path')
const config = require('../config/index')
const ManifestPlugin = require('webpack-manifest-plugin')
const baseConfig = require('./webpack.config.base.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const { OpenChromePlugin } = require('./webpack.plugins')

module.exports = {
  ...baseConfig,
  mode: 'development',
  output: {
    path: path.join(__dirname, '../public/dist'),
    filename: '[name].js',
    // 指定静态资源服务路径，包括懒加载时的异步请求路径
    publicPath: `${config.localAddr}:${config.devPort}/`
  },
  devServer: {
    port: config.devPort,
    hot: true,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET'
    }
  },
  devtool: 'eval-source-map',
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/public/dist/'
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new OpenChromePlugin({
      extenal_ip_addr: config.localAddr,
      port: config.nodePort,
      app_prefix: config.appPrefix
    })
  ]
}