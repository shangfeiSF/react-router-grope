var path = require('path')
var express = require('express')
var compression = require('compression')

var app = express()

app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(8080, function () {
  console.log('Production Express server running at localhost:8080')
})