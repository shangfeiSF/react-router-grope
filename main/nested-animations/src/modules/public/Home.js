import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {Link} from 'react-router'

const Home = ({children, location: {pathname}}) => (
  <div className="Image">
    <h1>Home Page</h1>
    
    <ul>
      <li><Link to="/home/courses">Courses</Link></li>
      <li><Link to="/home/users">Users</Link></li>
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

export default Home