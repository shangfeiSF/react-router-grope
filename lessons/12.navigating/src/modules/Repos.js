import React from 'react'
import {browserHistory} from 'react-router'

import NavLink from './NavLink'

export default React.createClass({
  handlerOnSubmit(event) {
    event.preventDefault()

    const userName = event.target.elements[0].value
    const repo = event.target.elements[1].value

    const path = `/repos/${userName}/${repo}`

    browserHistory.push(path)
  },

  render() {
    var activeStyle = {color: 'red'}
    var activeClassName = 'current'

    return (
      <div>
        <h2>Repos Page</h2>
        <ul role="nav">
          <li><NavLink to="/">Back to Home Page</NavLink></li>
          <li><NavLink to="/repos/facebook/React" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>React</NavLink> </li>
          <li><NavLink to="/repos/reactjs/React-router" activeClassName={activeClassName} activeStyle={activeStyle} onlyActiveOnIndex={true}>React Router</NavLink> </li>
        </ul>
        <form onSubmit={this.handlerOnSubmit}>
          <input type="text" placeholder="userName"/>
          <br />
          <input type="text" placeholder="repo"/>
          <br />
          <button type="submit">Go</button>
        </form>
        {this.props.children}
      </div>
    )
  }
})