import React from 'react'

import auth from './auth'

export default React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
      <div className="content">
        <p>logged out!</p>
      </div>
    )
  }
})