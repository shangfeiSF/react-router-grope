import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Link} from 'react-router'

const Math = ({children, location: {pathname}}) => (
  <div className="Image">
    <h1>Math Page</h1>

    <ul>
      <li><Link to="/math/home">Home</Link></li>
      <li><Link to="/math/about">About</Link></li>
    </ul>

    <ReactCSSTransitionGroup
      component="div"
      transitionName="example"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {
        React.cloneElement(children || <div/>, {
          key: pathname
        })
      }
    </ReactCSSTransitionGroup>
  </div>
)

export default Math