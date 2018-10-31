const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, '../client/main.jsx')
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
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, '../client'),
    }
  },
  devServer: {
    hot: true
  },
  module: {
      rules: [
        {
            test: /\.(jsx|js)$/,
            loader: 'babel-loader',
            exclude: [
              path.join(__dirname, '../node_modules')
            ]
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