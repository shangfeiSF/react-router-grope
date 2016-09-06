import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../modules/App'
import Deep from '../modules/public/Deep'
import Index from '../modules/public/Index'
import Picture from '../modules/public/Picture'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="/pictures/:id" component={Picture}/>
    <Route path="/some/:one/deep/:two/route" component={Deep}/>
  </Route>
)