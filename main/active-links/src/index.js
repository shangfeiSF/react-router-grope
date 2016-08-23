import React from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import withExampleBasename from '../../withExampleBasename'
import './assets/index.css'

import App from './modules/App'
import Index from './modules/Index'
import About from './modules/About'
import Users from './modules/Users'
import UsersIndex from './modules/UsersIndex'
import User from './modules/User'

var content =
  <Router history={withExampleBasename(browserHistory, __dirname.split('\\')[1])}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/about" component={About}/>
      <Route path="/users" component={Users}>
        <IndexRoute component={UsersIndex}/>
        <Route path=":id" component={User}/>
      </Route>
    </Route>
  </Router>
var root = document.getElementById('example')

render(content, root)