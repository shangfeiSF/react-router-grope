import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/dashboard" activeClassName="active">Dashboard</Link></li>
          <li><Link to="/form" activeClassName="active">Form</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})