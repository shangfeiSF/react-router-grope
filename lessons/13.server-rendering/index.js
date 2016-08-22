import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'

import routes from './modules/routes'

var content = <Router routes={routes} history={browserHistory}/>
var root = document.getElementById('app')

render(content, root)

