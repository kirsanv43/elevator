var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

var SvgStore = require('webpack-svgstore-plugin');

module.exports = {
  devtool: 'eval',
  context: __dirname,
  entry: [
    './src/index.js',
    'file?name=../index.html!slm!./assets/index.slim',
  ],
  output: {
    path: __dirname + '/builds',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap!postcss!sass?sourceMap',
        include: __dirname + '/assets/scss',
      },
      {
        test: /\.js$/,
        include: __dirname + '/src',
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-decorators-legacy'],
        },
      },
      {
        test: /\.font\.ya?ml$/,
        include: __dirname + '/assets/fonts',
        loader: ExtractTextPlugin.extract('style', 'css!csso!fontgen?embed!json!yaml'),
      },
      {
        test: /\.png$/,
        include: __dirname + '/assets/images',
        loader: 'file',
      },
      {
        test: /\.svg$/,
        include: __dirname + '/assets/images',
        loaders: [
          'svg-sprite?' + JSON.stringify({
            name: '[name]',
            prefixize: true,
          }),
          'svgo-loader?' + JSON.stringify({
            plugins: [
              { removeTitle: true },
              { convertColors: { shorthex: false } },
              { convertPathData: false },
            ],
          }),
        ],
      },
    ],
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, './src/redux/actions'),
      const: path.resolve(__dirname, './src/redux/const'),
    },
  },
  sassLoader: {
    includePaths: [
      path.join(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets'),
    ],
  },
  postcss() {
    return [autoprefixer({
      browsers: ['last 3 versions'],
    })];
  },
  csso: {
    restructure: true,
    comments: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      React: 'react',
      PropTypes: 'prop-types',
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: [''] },
    }),
  ],
  devServer: {
    hot: true,
  },
};
