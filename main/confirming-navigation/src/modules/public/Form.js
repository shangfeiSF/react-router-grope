import React from 'react'
import {withRouter} from 'react-router'

export default withRouter(
  React.createClass({
    getInitialState() {
      return {
        textValue: 'ohai'
      }
    },

    // Form组件挂在前绑定一个setRouteLeaveHook监听
    // https://github.com/reactjs/react-router/blob/master/docs/API.md#setrouteleavehookroute-hook
    componentWillMount() {
      this.props.router.setRouteLeaveHook(this.props.route, this._routerWillLeave)
    },

    _routerWillLeave() {
      if (this.state.textValue)
        return 'You have unsaved information, are you sure you want to leave this page?'
    },

    handlerOnChange(event) {
      this.setState({
        textValue: event.target.value
      })
    },

    handlerOnSubmit(event) {
      event.preventDefault()

      this.setState(
        {
          textValue: ''
        },
        () => {
          this.props.router.push('/')
        }
      )
    },

    render() {
      return (
        <div>
          <form onSubmit={this.handlerOnSubmit}>
            <p>Click the dashboard link with text in the input.</p>
            <input type="text" ref="userInput" value={this.state.textValue} onChange={this.handlerOnChange}/>
            <button type="submit">Go</button>
          </form>
        </div>
      )
    }
  })
)