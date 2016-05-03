var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin'); //Currently used to copy static assets such as css and images. At a later stage CSS should be optimised durring build
const path = require('path')
const autoprefixer = require('autoprefixer')

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/static/sass/')
]

module.exports = {
  entry: './src/index.js',

  output: {
    path: 'build/client',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
          template: 'src/static/html_templates/index.tpl.html',
          path: 'build/client',
          inject: 'body',
          filename: 'index.html'
        }),
    new CopyWebpackPlugin([
      // { from: 'src/static/css', to: 'build/client/css'},
      { from: 'src/static/img', to: 'img'},
    ]),
    new ExtractTextPlugin('css/style.css', {
    allChunks: true
    }),
  ] : [
    new HtmlWebpackPlugin({
          template: 'src/static/html_templates/index.tpl.html',
          path: 'build/client',
          inject: 'body',
          filename: 'index.html'
        }),
    new CopyWebpackPlugin([
      // { from: 'src/static/css', to: 'css'},
      { from: 'src/static/img', to: 'img'},
    ]),
    new ExtractTextPlugin('css/index.css', {
    allChunks: true
    }),
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
  includePaths: [path.resolve(__dirname, "./src/static/sass")]
},
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
      { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')) },
      { test: /\.gif$/, loader: "file-loader" },
      {test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: 'url'}
    ]
  }
}
