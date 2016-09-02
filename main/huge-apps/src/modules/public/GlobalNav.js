import React, {Component} from 'react'
import {Link} from 'react-router'

import styles from '../../utils/globalNavStyle'

class GlobalNav extends Component {
  /*
   * The Component API is similar to React.createClass with the exception of getInitialState.
   * Instead of providing a separate getInitialState method, you set up your own state property in the constructor.
   * Just like the return value of getInitialState, the value you assign to this.state will be used as the initial state for your component.
   * */
  constructor(props, context) {
    /*
     * Another difference is that propTypes and defaultProps are defined as properties on the constructor instead of in the class body.
     * */
    super(props, context)
    this.logOut = this.logOut.bind(this)
  }

  logOut() {
    alert('log out')
  }

  render() {
    const {user} = this.props

    const link = styles.link
    const wrapper = styles.wrapper
    const activeLink = styles.activeLink

    return (
      <div style={wrapper}>

        <div style={{ float: 'left' }}>
          <Link to="/" style={link}>Home</Link>
          <Link to="/calendar" style={link} activeStyle={activeLink}>Calendar</Link>
          <Link to="/grades" style={link} activeStyle={activeLink}>Grades</Link>
          <Link to="/messages" style={link} activeStyle={activeLink}>Messages</Link>
        </div>

        <div style={{ float: 'right' }}>
          <Link style={link} to="/profile">{user.name}</Link>
          <button onClick={this.logOut}>logout</button>
        </div>

      </div>
    )
  }
}

GlobalNav.defaultProps = {
  user: {
    id: 1,
    name: 'shangfei.SF'
  }
}

export default GlobalNav