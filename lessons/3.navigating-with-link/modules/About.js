import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>About</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
    )
  }
})