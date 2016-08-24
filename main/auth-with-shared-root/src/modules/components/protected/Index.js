import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="content">
        <h2>Index Page</h2>
        <p className="protected">This page will be shown only logged in.</p>
      </div>
    )
  }
})