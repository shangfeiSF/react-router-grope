import React from 'react'
import {Route} from 'react-router'

import App from './App'
import About from './About'
import Dashboard from './Dashboard'
import Login from './Login'
import Logout from './Logout'

import auth from './auth'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: {nextPathname: nextState.location.pathname}
    })
  }
}

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login}/>
    <Route path="logout" component={Logout}/>
    <Route path="about" component={About}/>
    <Route path="dashboard" component={Dashboard} onEnter={requireAuth}/>
  </Route>
)