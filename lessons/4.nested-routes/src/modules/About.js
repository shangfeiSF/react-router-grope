import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>About Page</h2>
        <ul role="nav">
          <li><Link to="/">Back to Home Page</Link></li>
        </ul>
      </div>
    )
  }
})