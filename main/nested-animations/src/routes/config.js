import React from 'react'
import {Route} from 'react-router'

import App from '../modules/App'
import Home from '../modules/public/Home'
import About from '../modules/public/About'
import CoursesTab from '../modules/public/CoursesTab'
import UsersTab from '../modules/public/UsersTab'

export default (
  <Route path="/" component={App}>
    <Route path="home" component={Home}>
      <Route path="courses" component={CoursesTab}/>
      <Route path="users" component={UsersTab}/>
    </Route>
    <Route path="about" component={About}>
      <Route path="courses" component={CoursesTab}/>
      <Route path="users" component={UsersTab}/>
    </Route>
  </Route>
)