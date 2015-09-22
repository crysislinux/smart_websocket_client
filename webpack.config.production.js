'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'src'),
  nodeModulesPath = path.join(__dirname, 'node_modules');


var definePlugin = new webpack.DefinePlugin({
  __DEV__: process.env.PRODUCTION ? false : true
});

var config = {
  target: 'web',
  entry: {
    app: path.join(srcPath, 'app.react.js'),
    common: ['react', 'react-router', 'alt', 'brace', 'react-ace', 'lodash', 'object-assign']
  },
  resolve: {
    root: [nodeModulesPath, srcPath],
    extensions: ['', '.js', '.css']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'},
      {test: /\.css$/, exclude: /node_modules/, loader: 'style!css?modules&importLoaders=1&localIdentName=[hash:base64:5]'},
      {test: /node_modules.*\.css/, loader: 'style!css'},
      {test: /\.png$/, loader: 'file?name=./assets/image/[hash].[ext]'},
      {test: /assets\/chrome/, loader: 'file?name=[name].[ext]'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin()
  ],

  debug: false
};

config.plugins.push(definePlugin);


module.exports = config;
