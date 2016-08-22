import React from 'react'
import {Link} from 'react-router'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    var activeStyle = {color: 'red'}
    var activeClassName = 'current'

    return (
      <div>
        <h1>React Router Lessons</h1>
        <ul role="nav">
          <li><Link to="/about" activeClassName={activeClassName} activeStyle={activeStyle}>About</Link></li>
          <li><Link to="/repos" activeClassName={activeClassName} activeStyle={activeStyle}>Repos</Link></li>
          <li><NavLink to="/about" activeClassName={activeClassName}>About</NavLink></li>
          <li><NavLink to="/repos" activeClassName={activeClassName}>Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
