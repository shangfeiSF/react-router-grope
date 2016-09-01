import React from 'react'

import auth from '../../utils/auth'

export default React.createClass({
  render() {
    return (
      <div className="content">
        <h2>Protected Home Page</h2>
        <p className="protected">This page will be shown only logged in.</p>
        <p>Your token is {auth.getToken()}</p>
        {this.props.children}
      </div>
    )
  }
})