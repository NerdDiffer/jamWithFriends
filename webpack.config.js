const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const SRC_DIR = path.join(__dirname, 'client', 'src');
const DIST_DIR = path.join(__dirname, 'client', 'public');

// const css = require(path.join(SRC_DIR, 'styles', 'index.less'));

const config = {
  devtool: 'inline-sourcemap',
  resolve: {
    root: __dirname,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  entry: [
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
        test: /\.less$/,
        include: SRC_DIR,
        loader: ExtractTextPlugin.extract(
          //'style!css!less'
          'css?sourceMap!' +
          'less?sourceMap'
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};

module.exports = config;
