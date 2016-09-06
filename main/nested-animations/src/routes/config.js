import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import Math from '../modules/public/Math'
import Science from '../modules/public/Science'
import HomeTab from '../modules/public/HomeTab'
import AboutTab from '../modules/public/AboutTab'

export default (
  <Route path="/" component={App}>
    <Route path="math" component={Math}>
      <Route path="home" component={HomeTab}/>
      <Route path="about" component={AboutTab}/>
    </Route>
    <Route path="science" component={Science}>
      <Route path="home" component={HomeTab}/>
      <Route path="about" component={AboutTab}/>
    </Route>
  </Route>
)