const path = require('path')
const polyfill = require('babel-polyfill')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index: path.join(__dirname, '../client/main.js')
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, '../client'),
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // which includes all code from node_modules in the whole application
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: [
              path.join(__dirname, '../node_modules')
            ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: path.join(__dirname, '../client/')
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "vue-html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        },
        {
            test: /\.(png|jpe?g|gif|svg|woff2?|ttf|otf|ico)(\?.*)?$/,
            use: 'url-loader'
        }, 
        {
            test: /\.ico$/,
            loader: 'file-loader?name=[name].[ext]'
        }
    ]
  }
}