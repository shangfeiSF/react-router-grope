import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    var activeStyle = {color: 'red'}
    var activeClassName = 'current'

    return (
      <div>
        <h2>Repos Page</h2>
        <ul role="nav">
          <li><NavLink to="/">Back to Home Page</NavLink></li>
          <li><NavLink to="/repos/facebook/React" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>React</NavLink> </li>
          <li><NavLink to="/repos/reactjs/React-router" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>React Router</NavLink> </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})