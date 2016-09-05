import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Link} from 'react-router'

const About = ({children, location: {pathname}}) => (
  <div className="Image">
    <h1>About Page</h1>
    
    <ul>
      <li><Link to="/about/courses">Courses</Link></li>
      <li><Link to="/about/users">Users</Link></li>
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

export default About