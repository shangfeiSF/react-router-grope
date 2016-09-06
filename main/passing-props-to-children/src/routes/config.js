import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import Courses from '../modules/public/Courses'

export default (
  <Route path="/" component={App}>
    <Route path="courses/:name" component={Courses} />
  </Route>
)