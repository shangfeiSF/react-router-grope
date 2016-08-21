var fs = require('fs')
var path = require('path')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

// 使用 express 启动本地服务
// express-urlrewrite 是一个 express 中间件实现无重定向改写链接（https://github.com/joehewitt/express-rewrite）
var express = require('express')
var expressUrlrewrite = require('express-urlrewrite')

// 使用 webpack 和 babel 来编译 ES6
// webpackDevMiddleware 作为 webpack 的中间件实时编译到内存中，并以本地服务的方式提供访问（https://github.com/webpack/webpack-dev-middleware）
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')

var webpackConfig = require('./webpack.config')
var webpackDevMiddlewareConfig = require('./webpackDevMiddleware.config')

var server = express()

var mainDir = path.join(__dirname, 'main')

server.use(express.static(mainDir))
server.use(express.static(path.join(__dirname, 'local')))
server.use(express.static(path.join(__dirname, '__build__')))

server.use(webpackDevMiddleware(webpack(webpackConfig), webpackDevMiddlewareConfig))

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
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})