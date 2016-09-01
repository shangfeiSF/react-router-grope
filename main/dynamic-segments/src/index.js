import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'

import '../../global.css'
import './assets/index.css'

import routes from './routes/config'
import configBasename from '../../configBasename'

var content = <Router routes={routes} history={configBasename(browserHistory, __dirname)}/>
var root = document.getElementById('example')

render(content, root)
