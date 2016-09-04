import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'

import './assets/courses'

import '../../global.css'
import './assets/index.css'

import configBasename from '../../configBasename'

var routes = {
  childRoutes: [{
    path: '/',

    component: require('./modules/main'),

    indexRoute: require('./routes/Home'),

    childRoutes: [
      require('./routes/Course'),
      require('./routes/Grades'),
      require('./routes/Notices'),
      require('./routes/About'),
      require('./routes/Profile')
    ]
  }]
}
var content = <Router routes={routes} history={configBasename(browserHistory, __dirname)}/>
var root = document.getElementById('example')

render(content, root)
