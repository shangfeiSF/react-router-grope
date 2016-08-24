import React from 'react'
import {Route} from 'react-router'

import App from './App'
import About from './About'
import Dashboard from './Dashboard'
import Login from './Login'
import Logout from './Logout'

import auth from './auth'

// onEnter(nextState, replace, callback?)
// https://github.com/reactjs/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
function handlerOnEnter(nextState, replace, callback) {
  if (!auth.loggedIn()) {
    // replace(location, deprecatedPathname, deprecatedQuery) {……}
    replace({
      pathname: '/login',
      state: {
        _next: nextState.location.pathname
      }
    })
  }
  callback && callback()
}

export default (
  <Route path="/" component={App}>
    <Route path="login" component={Login}/>
    <Route path="logout" component={Logout}/>
    <Route path="about" component={About}/>
    <Route path="dashboard" component={Dashboard} onEnter={handlerOnEnter}/>
  </Route>
)