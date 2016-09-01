import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../modules/App'
import Index from '../modules/public/Index'
import About from '../modules/public/About'
import Users from '../modules/public/Users'
import UsersIndex from '../modules/public/UsersIndex'
import User from '../modules/public/User'

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