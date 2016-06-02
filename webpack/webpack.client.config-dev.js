var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin'); //Currently used to copy static assets such as css and images. At a later stage CSS should be optimised durring build
const path = require('path');
const autoprefixer = require('autoprefixer');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');

/*
  Webpack Development configuration file for client
 */

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/static/sass/')
];

module.exports = {
  entry: {
    app: ['./src/client/index.js']
  },
  output: {
    path: path.join(__dirname, '..', 'build', 'client'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // A SourceMap is emitted.
  devtool: "source-map",

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src','client', 'static','html_templates','index.tpl.html'),
      path: path.join(__dirname, '..', 'build', 'client'),
      inject: 'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      // { from: 'src/static/css', to: 'css'},
      { from: path.join(__dirname, '..', 'src','client', 'static','img'), to: path.join(__dirname, '..', 'build', 'client','img')}
    ]),
    new ExtractTextPlugin('css/index.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.sass','.scss'],
    root: [path.join(__dirname, './src')]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/client/static/sass")]
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0' },
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
      {test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: 'url'}
    ]
  }
};
