import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="content">
        <h2>User Page</h2>
        <p className="protected">This page will be shown only logged in.</p>
        <p>User: {this.props.params.id}</p>
      </div>
    )
  }
})