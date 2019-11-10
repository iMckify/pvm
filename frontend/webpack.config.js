const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/app/index.js'],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utils: path.resolve(__dirname, 'src/utils')
    }
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: './index.html',
      template: './src/template.html'
    })
  ]
};
