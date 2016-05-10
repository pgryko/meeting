var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin'); //Currently used to copy static assets such as css and images. At a later stage CSS should be optimised durring build
const path = require('path');
const autoprefixer = require('autoprefixer');
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/static/sass/')
];

module.exports = {
  entry: {
    app: ['./src/index.js', hotMiddlewareScript]
  },
  output: {
    path: path.join(__dirname, '..', 'build', 'client'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'src', 'static','html_templates','index.tpl.html'),
      path: path.join(__dirname, '..', 'build', 'client'),
      inject: 'body',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      // { from: 'src/static/css', to: 'css'},
      { from: path.join(__dirname, '..', 'src', 'static','img'), to: path.join(__dirname, '..', 'build', 'client','img')}
    ]),
    new ExtractTextPlugin('css/index.css', {
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
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
      {test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, exclude: /node_modules/, loader: 'url'}
    ]
  }
};
