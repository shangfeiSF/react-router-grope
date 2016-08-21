import React from 'react'
import {render} from 'react-dom'

import App from './modules/App'

var content = <App/>
var root = document.getElementById('app')

render(content, root)