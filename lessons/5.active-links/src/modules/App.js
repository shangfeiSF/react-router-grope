import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    var activeStyle = {color: 'red'}
    var activeClassName = 'current'

    return (
      <div>
        <h2>Home Page</h2>
        <ul role="nav">
          <li><NavLink to="/about" activeClassName={activeClassName} activeStyle={activeStyle}>About</NavLink></li>
          <li><NavLink to="/repos" activeClassName={activeClassName} activeStyle={activeStyle}>Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

