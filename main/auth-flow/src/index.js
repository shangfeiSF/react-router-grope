import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'

import withExampleBasename from '../../withExampleBasename'

import routes from './modules/routes'

var content = <Router routes={routes} history={withExampleBasename(browserHistory, __dirname.split('\\')[1])}/>
var root = document.getElementById('example')

render(content, root)
