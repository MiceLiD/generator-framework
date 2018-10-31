const path = require('path')

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
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      }
    }
  },
  devServer: {
    hot: true
  },
  module: {
      rules: [
        {
            test: /\.(js)$/,
            loader: 'babel-loader',
            exclude: [
              path.join(__dirname, '../node_modules')
            ]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          include: [
            path.join(__dirname, '../client/'), 
            path.join(__dirname, '../node_modules/')]
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader']
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