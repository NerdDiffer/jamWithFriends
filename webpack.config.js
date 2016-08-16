const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'client', 'public');

const config = {
  devtool: 'inline-sourcemap',
  resolve: {
    root: __dirname,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    path.join(SRC_DIR, 'styles', 'index.less'),
    path.join(SRC_DIR, 'index.jsx'),
    path.join(SRC_DIR, 'peer.js')
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'babel'
      },
      {
        test: /\.(css|less)$/,
        include: path.join(SRC_DIR, 'styles'),
        loader: 'style!css!less',
        // loader: ExtractTextPlugin.extract('css?sourceMap!' + 'less?sourceMap')
      }
    ]
  },
  // plugins: [
  //   new ExtractTextPlugin(path.join(DIST_DIR, 'bundle.css'))
  // ]
};

module.exports = config;
