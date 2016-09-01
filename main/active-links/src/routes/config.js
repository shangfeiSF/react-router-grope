import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../modules/App'
import Index from '../modules/Index'
import About from '../modules/About'
import Users from '../modules/Users'
import UsersIndex from '../modules/UsersIndex'
import User from '../modules/User'

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