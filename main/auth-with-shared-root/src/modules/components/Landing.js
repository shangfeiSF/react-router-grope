import React from 'react'

export default  React.createClass({
  render() {
    return (
      <div className="content">
        <h2>Landing Page</h2>
        <p>This page is only shown to unauthenticated users.</p>
        <p>Partial / Lazy loading. Open the network tab while you navigate. Notice that only the required components are downloaded as you navigate around.</p>
      </div>
    )
  }
})