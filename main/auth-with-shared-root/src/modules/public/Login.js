import React from 'react'
import {withRouter} from 'react-router'

import auth from '../../utils/auth'

export default withRouter(
  React.createClass({
    getInitialState() {
      return {
        error: false
      }
    },

    handlerOnSubmit(event) {
      event.preventDefault()

      const email = this.refs.email.value
      const password = this.refs.password.value

      auth.login(email, password, (loggedIn) => {
        if (!loggedIn) {
          return this.setState({
            error: true
          })
        }

        const {location} = this.props

        if (location.state && location.state._next) {
          this.props.router.replace(location.state._next)
        }
        else {
          this.props.router.replace('/')
        }
      })
    },

    render() {
      return (
        <div className="content">
          <div className="form">
            <form onSubmit={this.handlerOnSubmit}>
              <label>
                <input ref="email" placeholder="email" defaultValue="xiaoshao@126.com"/>
              </label>
              <br />

              <label>
                <input ref="password" placeholder="password" defaultValue="123"/>
              </label>
              <br />

              <button type="submit">login</button>
            </form>
          </div>
          {this.state.error && (<p className="error">Bad login information</p>)}
        </div>
      )
    }
  })
)