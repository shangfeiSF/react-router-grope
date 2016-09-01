import React from 'react'
import {Route, Redirect} from 'react-router'

import App from '../modules/App'
import User from '../modules/public/User'
import Task from '../modules/public/Task'

export default (
  <Route path="/" component={App}>
    <Route path="user/:userID" component={User}>
      <Route path="tasks/:taskID" component={Task}/>
      <Redirect from="todos/:taskID" to="tasks/:taskID"/>
    </Route>
  </Route>
)