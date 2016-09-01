import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import About from '../modules/About'
import Dashboard from '../modules/Dashboard'
import Login from '../modules/Login'
import Logout from '../modules/Logout'

import auth from '../utils/auth'

// onEnter(nextState, replace, callback?)
// https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
function handlerOnEnter(nextState, replace, next) {
  if (!auth.loggedIn()) {
    // replace(location, deprecatedPathname, deprecatedQuery) {……}
    replace({
      pathname: '/login',
      state: {
        _next: nextState.location.pathname
      }
    })
  }
  next && next()
}

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login}/>
    <Route path="logout" component={Logout}/>
    <Route path="about" component={About}/>
    <Route path="dashboard" component={Dashboard} onEnter={handlerOnEnter}/>
  </Route>
)