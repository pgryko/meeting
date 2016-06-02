var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin'); //Currently used to copy static assets such as css and images. At a later stage CSS should be optimised durring build
const path = require('path');
const autoprefixer = require('autoprefixer');
var InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');


const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/client/static/sass/')
];

/*
 Webpack Production configuration file for client
 */

module.exports = {
  entry: './src/client/index.js',

  // A SourceMap is emitted.
  devtool: "source-map",

  output: {
    path: path.join(__dirname, '..', 'build', 'client'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
          template: 'src/client/static/html_templates/index.tpl.html',
          path: 'build/client',
          inject: 'body',
          filename: 'index.html'
        }),
    new CopyWebpackPlugin([
      // { from: 'src/static/css', to: 'build/client/css'},
      { from: 'src/client/static/img', to: 'img'}
    ]),
    new ExtractTextPlugin('css/index.css', {
    allChunks: true
    }),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: false
    }),
    new InlineEnviromentVariablesPlugin({ NODE_ENV: 'production' })
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
