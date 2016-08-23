import React from 'react'
import {render} from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router'

import withExampleBasename from '../withExampleBasename'
import './app.css'

const App = ({children, location}) => (
  <div>
    <ul>
      <li><Link to="/page1">Page 1</Link></li>
      <li><Link to="/page2">Page 2</Link></li>
    </ul>

    <ReactCSSTransitionGroup
      component="div"
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {
        React.cloneElement(children, {
          key: location.pathname
        })
      }
    </ReactCSSTransitionGroup>
  </div>
)

const Index = () => (
  <div className="indexPage">
    <h1>Index</h1>
    <p>Animations Index Page</p>
  </div>
)

const Page1 = () => (
  <div className="contentPage">
    <h1>Page 1</h1>
    <p>Hello Page 1</p>
  </div>
)

const Page2 = () => (
  <div className="contentPage">
    <h1>Page 2</h1>
    <p>I am Page 2</p>
  </div>
)

var content =
  <Router history={withExampleBasename(browserHistory, __dirname)}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="page1" component={Page1}/>
      <Route path="page2" component={Page2}/>
    </Route>
  </Router>
var root = document.getElementById('example')

render(content, root)