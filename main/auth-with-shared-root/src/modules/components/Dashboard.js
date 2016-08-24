import React from 'react'

import auth from '../utils/auth'

export default React.createClass({
  render() {
    return (
      <div className="content">
        <h2>Dashboard</h2>
        <p>Your token is {auth.getToken()}</p>
        {this.props.children}
      </div>
    )
  }
})