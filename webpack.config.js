'use strict';

var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path'),
  srcPath = path.join(__dirname, 'src'),
  nodeModulesPath = path.join(__dirname, 'node_modules');

var deps = [
  'react/dist/react.min.js',
  'alt/dist/alt.min.js'
];

var config = {
  target: 'web',
  cache: true,
  entry: {
    app: path.join(srcPath, 'app.react.js'),
    common: ['react', 'react-router', 'alt']
  },
  resolve: {
    // in case of something in srcPath named same as modules in node_modules, search nodePath first, then srcPath.
    root: [nodeModulesPath, srcPath],
    extensions: ['', '.js', '.css'],
    alias: {}
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
      {test: /node_modules.*\.css/, loader: 'style!css'},
      {test: /\.png$/, loader: 'file?name=./assets/image/[hash].[ext]'},
      {test: /assets\/chrome/, loader: 'file?name=[name].[ext]'}
    ],
    noParse: []
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

deps.forEach(function (dep) {
  var depPath = path.resolve(nodeModulesPath, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
