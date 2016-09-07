import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import User from '../modules/public/User'
import PageNotFound from '../modules/public/PageNotFound'

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path="user/:userName" component={User}/>
    </Route>
    <Route path="*" component={PageNotFound}/>
  </Route>
)