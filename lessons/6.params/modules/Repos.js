// modules/Repo.js
import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>{this.props.params.repoName}</h2>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
        </ul>
      </div>
    )
  }
})