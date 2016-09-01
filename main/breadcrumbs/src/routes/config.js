import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import Products from '../modules/public/Products'
import Orders from '../modules/public/Orders'

export default (
  <Route path={App.path} component={App}>
    <Route path={Products.path} component={Products}/>
    <Route path={Orders.path} component={Orders}/>
  </Route>
)