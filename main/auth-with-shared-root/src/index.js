import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'

import configBasename from '../../configBasename'

import '../../global.css'
import './assets/index.css'

import plainRoutes from './modules/plainRoutes'

var content = <Router routes={plainRoutes} history={configBasename(browserHistory, __dirname)}/>
var root = document.getElementById('example')

render(content, root)