var fs = require('fs')
var path = require('path')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

var expressUrlrewrite = require('express-urlrewrite')

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var mainDir = path.join(__dirname, 'main')

var makeEntry = function () {
  var entry = {}
  fs.readdirSync(mainDir)
    // TODO: delete at final
    .filter(function (dir) {
      return dir == 'active-links' ||
        dir == 'animations' ||
        dir == 'auth-flow' ||
        dir == 'auth-flow-async-with-query-params' ||
        dir === 'auth-with-shared-root' ||
        dir === 'breadcrumbs'
    })
    .reduce(function (entry, dir) {
      var isDirectory = fs.statSync(path.join(mainDir, dir)).isDirectory()

      isDirectory && (entry[dir] = [
        'webpack-dev-server/client?http://localhost:8080/',
        'webpack/hot/dev-server',
        path.join(mainDir, dir, 'src', 'index.js')
      ]);

      return entry
    }, entry)

  return entry
}

var compiler = webpack({
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
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-1']
        },
        loader: "babel-loader"
      }
    ]
  },

  resolve: {
    alias: {
      'react-router': path.join(__dirname, 'node_modules', 'react-router', 'lib')
    },
    extensions: ['', '.js', '.json']
  },

  context: __dirname,

  node: {
    __dirname: true
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})

var server = new WebpackDevServer(compiler, {
  inline: true,

  hot: true,

  historyApiFallback: {
    index: '/'
  },

  setup: function (app) {
    var dirs = fs.readdirSync(mainDir)

    dirs = dirs.filter(function (file) {
      var stat = fs.statSync(path.join(mainDir, file))
      return stat.isDirectory()
    })

    dirs.forEach(function (dir) {
      app.use(expressUrlrewrite('/main/' + dir + '/*', '/main/' + dir + '/index.html'))
    })
  },

  noInfo: false,

  quiet: false,

  publicPath: '/__build__/',

  headers: {
    "X-Custom-Header": "yes"
  },

  stats: {
    colors: true
  }
})

server.listen(8080, 'localhost', function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})