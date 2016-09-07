import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import User from '../modules/public/User'

export default (
  <Route path="/" component={App}>
    <Route path="user/:userName" component={User}/>
  </Route>
)