var fs = require('fs');
var path = require('path');

module.exports = {

  context: path.join(__dirname, "..", "src"),

  entry:'./server.js',

  output: {
    path: path.join(__dirname, '..', 'build'),
    filename: 'server.bundle.js'
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, '../node_modules')).concat([
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
      {
        /*
         * TC39 categorises proposals for babel in 4 stages
         * Read more http://babeljs.io/docs/usage/experimental/
         */
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        // Reason why we put this here instead of babelrc
        // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
        query: {
          "presets": ["es2015", "react", "stage-0"],
          "plugins": ["transform-decorators-legacy"]
        },
        include: path.join(__dirname, '..', 'src'),
        exclude: path.join(__dirname, '..', 'node_modules')
      },
      { test: /\.html$/, loader: 'html-loader' }

    ]
  }

};
