var fs = require('fs')
var path = require('path')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

var webpack = require('webpack')
var webpackConfig = require('./webpack.normal')
var webpackDevMiddleware = require('webpack-dev-middleware')

var server = express()

server.use(express.static('./'))
server.use(express.static(path.join(__dirname, '__build__')))

server.use(webpackDevMiddleware(webpack(webpackConfig), {
  noInfo: false,
  quiet: false,
  publicPath: '/__build__/',
  headers: {
    "X-Custom-Header": "yes"
  },
  stats: {
    colors: true
  }
}))

var mainDir = path.join(__dirname, 'main')

fs.readdirAsync(mainDir)
  .filter(function (file) {
    return fs.statAsync(path.join(mainDir, file))
      .then(function (stat) {
        return stat.isDirectory()
      })
  })
  .then(function (files) {
    files.forEach(function (file) {
      server.use(expressUrlrewrite('/main/' + file + '/*', '/main/' + file + '/index.html'))
    })
  })

server.listen(8080, function () {
  console.log('Dev-Server is listening on http://localhost:8080...')
})