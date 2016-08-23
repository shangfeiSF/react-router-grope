import React from 'react'
import {IndexLink} from 'react-router'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    var activeStyle = {color: 'red'}
    var activeClassName = 'current'

    return (
      <div>
        <h2>Home Page</h2>
        <ul role="nav">
          <li><NavLink to="/" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/about" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>About</NavLink></li>
          <li><NavLink to="/repos" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

