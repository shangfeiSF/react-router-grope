import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../modules/App'
import Index from '../modules/Index'
import Page1 from '../modules/Page1'
import Page2 from '../modules/Page2'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="page1" component={Page1}/>
    <Route path="page2" component={Page2}/>
  </Route>
)