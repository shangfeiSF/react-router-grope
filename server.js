var fs = require('fs')
var path = require('path')

// 使用 express 启动本地服务
var express = require('express')
// express-urlrewrite 是一个 express 中间件实现无重定向改写链接（https://github.com/joehewitt/express-rewrite）
var rewrite = require('express-urlrewrite')

// 使用 webpack 和 babel 来编译 ES6
var webpack = require('webpack')
var WebpackConfig = require('./webpack.config')
// webpackDevMiddleware 作为 webpack 的中间件实时编译到内存中，并以本地服务的方式提供访问（https://github.com/webpack/webpack-dev-middleware）
var webpackDevMiddleware = require('webpack-dev-middleware')

var app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  noInfo: true, // 只输出警告和错误
  quiet: false, // 没有任何输出
  headers: {"X-Custom-Header": "yes"},
  publicPath: '/__build__/',
  stats: {colors: true}
}))

app.use(express.static(__dirname))

fs.readdirSync(__dirname).forEach(function (file) {
  var isDirectory = fs.statSync(path.join(__dirname, file)).isDirectory()
  isDirectory && app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
})

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})
