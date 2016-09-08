import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Repos Page</h2>
        <ul role="nav">
          <li><NavLink to="/">Back to Home Page</NavLink></li>
        </ul>
      </div>
    )
  }
})