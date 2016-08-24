import React from 'react'
import {withRouter} from 'react-router'

import auth from '../utils/auth'

export default withRouter(
  // 使用withRouter包装后的组件内部可以直接访问this.props.router
  // https://github.com/reactjs/react-router/blob/master/docs/API.md#withroutercomponent-options
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

        // location是react-router继承history后提供的属性
        // 当通过Link进入到Login组件
        // 或者通过其它组件在onEnter时replace到Login组件（在replace时通过state传递自定义参数_next）
        if (location.state && location.state._next) {
          // this.prop.router 具备的属性和方法
          // https://github.com/reactjs/react-router/blob/master/docs/API.md#contextrouter
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