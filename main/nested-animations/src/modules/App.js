import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Link} from 'react-router'

const App = ({children, location: {pathname}}) => {
  const key = pathname.split('/')[1] || 'root'

  return (

    <div>
      <h1>Root</h1>

      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      <ReactCSSTransitionGroup
        component="div"
        transitionName="swap"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {
          React.cloneElement(children || <div />, {key})
        }
      </ReactCSSTransitionGroup>
    </div>
  )
}

export default App