import React from 'react'
import {Route} from 'react-router'

import App from './App'
import Products from './Products'
import Orders from './Orders'

export default (
  <Route path={App.path} component={App}>
    <Route path={Products.path} component={Products}/>
    <Route path={Orders.path} component={Orders}/>
  </Route>
)