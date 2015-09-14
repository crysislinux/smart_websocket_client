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
    app: path.join(srcPath, 'app.jsx'),
    common: ['react', 'react-router', 'alt']
  },
  resolve: {
    root: [nodePath],
    extensions: ['', '.jsx', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js',
    pathinfo: true
  },

  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'}
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
