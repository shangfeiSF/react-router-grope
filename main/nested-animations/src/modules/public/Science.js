import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Link} from 'react-router'

const Science = ({children, location: {pathname}}) => (
  <div className="Image">
    <h1>Science Page</h1>

    <ul>
      <li><Link to="/science/home">Home</Link></li>
      <li><Link to="/science/about">About</Link></li>
    </ul>

    <ReactCSSTransitionGroup
      component="div"
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {
        React.cloneElement(children || <div/>, {key: pathname})
      }
    </ReactCSSTransitionGroup>
  </div>
)

export default Science