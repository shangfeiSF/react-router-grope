import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="content">
        <h2>User: {this.props.params.id}</h2>
      </div>
    )
  }
})