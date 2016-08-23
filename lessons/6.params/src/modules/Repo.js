import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName} Page</h2>
        <ul role="nav">
          <li><NavLink to="/repos">Back to Repos Page</NavLink></li>
        </ul>
      </div>
    )
  }
})