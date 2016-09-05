import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from '../modules/App'
import Index from '../modules/public/Index'
import Contact from '../modules/public/Contact'
import NotFound from '../modules/public/NotFound'
import NewContact from '../modules/public/NewContact'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index}/>
    <Route path="contact/new" component={NewContact}/>
    <Route path="contact/:id" component={Contact}/>
    <Route path="*" component={NotFound}/>
  </Route>
)