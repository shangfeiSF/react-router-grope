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
          <li><NavLink to="/" activeClassName={activeClassName} activeStyle={activeStyle}>Home</NavLink></li>
          <li><NavLink to="/about" activeClassName={activeClassName} activeStyle={activeStyle}>About</NavLink></li>
          <li><NavLink to="/repos" activeClassName={activeClassName} activeStyle={activeStyle}>Repos</NavLink></li>
        </ul>
        <h2>Compare</h2>
        <ul>
          <li><IndexLink to="/" activeClassName={activeClassName} activeStyle={activeStyle}>Home（IndexLink）</IndexLink></li>
          <li><NavLink to="/" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>Home（onlyActiveOnIndex）</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

