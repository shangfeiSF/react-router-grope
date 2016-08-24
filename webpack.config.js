var fs = require('fs')
var path = require('path')

var webpack = require('webpack')

var mainDir = path.join(__dirname, 'main')

var makeEntry = function () {
  var entry = {}
  fs.readdirSync(mainDir)
    // TODO: delete at final
    .filter(function (dir) {
      return dir == 'active-links' || dir == 'animations' || dir == 'auth-flow' || dir == 'auth-flow-async-with-query-params' || dir === 'auth-with-shared-root'
    })
    .reduce(function (entry, dir) {
      var isDirectory = fs.statSync(path.join(mainDir, dir)).isDirectory()

      isDirectory && (entry[dir] = path.join(mainDir, dir, 'src', 'index.js'));

      return entry
    }, entry)

  return entry
}

module.exports = {
  devtool: 'inline-source-map',

  entry: makeEntry(),

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname, 'node_modules', 'react-router', 'lib')
    }
  },

  context: __dirname,

  node: {
    __dirname: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
}
