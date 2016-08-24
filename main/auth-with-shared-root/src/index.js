import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'

import withExampleBasename from '../../withExampleBasename'

import './assets/index.css'

import plainRoutes from './modules/plainRoutes'

var content = <Router routes={plainRoutes} history={withExampleBasename(browserHistory, __dirname.split('\\')[1])}/>
var root = document.getElementById('example')

render(content, root)