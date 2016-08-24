import React from 'react'
import {Link, withRouter} from 'react-router'

export default withRouter(
  React.createClass({
    getInitialState() {
      return {
        value: ''
      }
    },

    handlerOnSubmit(event) {
      event.preventDefault()

      this.props.router.push({
        pathname: '/page',
        query: {
          qsparam: this.state.value
        }
      })
    },

    handlerOnChange(event) {
      this.setState({
        value: event.target.value
      })
    },

    render() {
      return (
        <form onSubmit={this.handlerOnSubmit}>
          <p>Token is
            <em>pancakes</em>
          </p>

          <input type="text" value={this.state.value} onChange={this.handlerOnChange}/>
          <button type="submit">Submit the thing</button>

          <p><Link to="/page?qsparam=pancakes">Or authenticate via URL</Link></p>
          <p><Link to="/page?qsparam=bacon">Or try failing to authenticate via URL</Link></p>
        </form>
      )
    }
  })
)