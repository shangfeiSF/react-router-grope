import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './App'
import Index from './Index'
import About from './About'
import Users from './Users'
import UsersIndex from './UsersIndex'
import User from './User'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="/about" component={About}/>
    <Route path="/users" component={Users}>
      <IndexRoute component={UsersIndex}/>
      <Route path=":id" component={User}/>
    </Route>
  </Route>
)