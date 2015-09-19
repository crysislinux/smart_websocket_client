'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'src'),
  nodePath = path.join(__dirname, 'node_modules');

module.exports = {
  target: 'web',
  cache: true,
  entry: {
    app: path.join(srcPath, 'app.react.js'),
    common: ['react', 'react-router', 'alt']
  },
  resolve: {
    // in case of something in srcPath named same as modules in node_modules, search nodePath first, then srcPath.
    root: [nodePath, srcPath],
    extensions: ['', '.js', '.css']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    pathinfo: true
  },

  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'},
      {test: /\.css$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'},
      {test: /\.png$/, exclude: /node_modules/, loader: 'file?name=./assets/image/[hash].[ext]'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new webpack.NoErrorsPlugin()
  ],

  debug: true,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true
  }
};
