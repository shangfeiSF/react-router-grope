import React from 'react'
import {render} from 'react-dom'

import App from './modules/App'
import About from './modules/About'
import Repos from './modules/Repos'

import {Router, Route, hashHistory} from 'react-router'
var content = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/repos" component={Repos}/>
      <Route path="/about" component={About}/>
    </Route>
  </Router>
)
var root = document.getElementById('app')

render(content, root)

