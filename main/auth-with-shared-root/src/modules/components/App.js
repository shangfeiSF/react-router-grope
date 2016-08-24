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
    // 将自定义的update方法挂在到auth.update上
    // 目的是在登陆状态改变时可以触发App的render方法
    auth.update = this.update
  },

  render() {
    var {loggedIn} = this.state

    var entry = loggedIn ? <Link to="/logout">Log out</Link> : <Link to="/login">Sign in</Link>
    var tip = <p className="tip">You are {!loggedIn && 'not'} logged in.</p>

    return (
      <div>
        <ul>
          <li>{entry}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/page2">Page Two</Link></li>
          <li><Link to="/user/foo">User: Foo</Link></li>
        </ul>
        { this.props.children || tip }
      </div>
    )
  }
})