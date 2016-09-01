import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import Dashboard from '../modules/public/Dashboard'
import Form from '../modules/public/Form'

export default (
  <Route path="/" component={App}>
    <Route path="dashboard" component={Dashboard}/>
    <Route path="form" component={Form}/>
  </Route>
)