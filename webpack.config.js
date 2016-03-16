var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
  ] : [
    new HtmlWebpackPlugin({
          template: 'src/static/html_templates/index.tpl.html',
          path: 'build/client',
          inject: 'body',
          filename: 'index.html'
        }),
  ],

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader" }
    ]
  }
}
