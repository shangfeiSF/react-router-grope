import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

import routes from './src/modules/routes'

var path = require('path')
var express = require('express')
var compression = require('compression')

var app = express()

app.use(compression())

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res) => {
  match({routes: routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    }
    else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    }
    else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    }
    else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>13.server-rendering</title>
        <link rel="stylesheet" href="/index.css">
    </head>
    <body>
    <h1>13.server-rendering</h1>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
    </body>
    </html>
   `
}

app.listen(8080, function () {
  console.log('Production Express server running at localhost:8080')
})