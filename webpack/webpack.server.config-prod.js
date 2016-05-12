var fs = require('fs');
var path = require('path');

/*
 Webpack Production configuration file for server
 */

module.exports = {

  context: path.join(__dirname, "..", "src"),

  entry:'./server/server.js',

  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, '..', 'node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  }

};
