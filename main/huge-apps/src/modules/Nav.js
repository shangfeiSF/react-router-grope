import React, {Component} from 'react'
import {Link, IndexLink} from 'react-router'

const dark = 'hsl(200, 20%, 20%)'
const light = '#fff'

const styles = {
  wrapper: {
    color: light,
    padding: '8px 20px 3px',

    background: dark,
    overflow: 'hidden'
  },

  link: {
    color: light,
    padding: '15px',

    fontWeight: 200
  },

  activeLink: {
    color: dark,
    padding: '15px',

    fontWeight: 200,
    background: light
  }
}

class Nav extends Component {
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
          <IndexLink to="/" style={link} activeStyle={activeLink}>Home</IndexLink>
          <Link to="/grades" style={link} activeStyle={activeLink}>Grades</Link>
          <Link to="/notices" style={link} activeStyle={activeLink}>Notices</Link>
          <Link to="/about" style={link} activeStyle={activeLink}>About</Link>
        </div>

        <div style={{ float: 'right' }}>
          <Link style={link} to="/profile">{user.name}</Link>
          <span onClick={this.logOut}>logout</span>
        </div>

      </div>
    )
  }
}

Nav.defaultProps = {
  user: {
    id: 1,
    name: 'shangfei.SF'
  }
}

export default Nav