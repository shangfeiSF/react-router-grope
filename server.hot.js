var fs = require('fs')
var path = require('path')

var expressUrlrewrite = require('express-urlrewrite')

var webpack = require('webpack')
var webpackConfig = require('./webpack.hot')
var WebpackDevServer = require('webpack-dev-server')

var compiler = webpack(webpackConfig)

var server = new WebpackDevServer(compiler, {
  inline: true,

  hot: true,

  historyApiFallback: {
    index: '/'
  },

  setup: function (app) {
    var mainDir = path.join(__dirname, 'main')

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
  console.log('Hot Replace Dev-Server is listening on http://localhost:8080...')
})