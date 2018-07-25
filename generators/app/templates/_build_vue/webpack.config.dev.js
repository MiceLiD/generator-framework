const path = require('path')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const baseConfig = require('./webpack.config.base.js')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  ...baseConfig,
  mode: 'development',
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: '[name].js',
  },
  devServer: {
    port: config.devPort
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: "index.css"
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/static/dist/'
    }),
    new VueLoaderPlugin()
  ]
}