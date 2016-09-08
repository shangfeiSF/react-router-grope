import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Home Page</h2>
        <ul role="nav">
          <li>http://localhost:8080/#/about</li>
          <li>http://localhost:8080/#/repos</li>
        </ul>
      </div>
    )
  }
})