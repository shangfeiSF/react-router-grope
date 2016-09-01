import React from 'react'
import {Link} from 'react-router'

import auth from '../utils/auth'

export default React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  update(loggedIn) {
    this.setState({
      loggedIn
    })
  },

  componentWillMount() {
    auth.update = this.update
  },

  render() {
    var {loggedIn} = this.state
    var entry = loggedIn ?
      <Link to="/public/logout">Log out</Link> :
      <Link to="/public/login">Sign in</Link>

    return (
      <div>
        <ul>
          <li>{entry}</li>
          <li><Link to="/">Home(public / protected)</Link></li>
          <li><Link to="/protected/about">About(protected)(nested)</Link></li>
          <li><Link to="/public/about">About(public)</Link></li>
          <li><Link to="/protected/user/react">User: react(protected)(not nested)</Link></li>
        </ul>
        { this.props.children }
      </div>
    )
  }
})