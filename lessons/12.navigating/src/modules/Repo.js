import React from 'react'

import NavLink from './NavLink'

export default React.createClass({
  render() {
    var {userName, repoName} = this.props.params

    return (
      <div>
        <h2>{userName} / {repoName} Page</h2>
        <ul role="nav">
          <li><NavLink to="/repos">Back to Repos Page</NavLink></li>
        </ul>
      </div>
    )
  }
})