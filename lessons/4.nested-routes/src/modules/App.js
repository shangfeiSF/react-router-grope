import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <ul role="nav">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
