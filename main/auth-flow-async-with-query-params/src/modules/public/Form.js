import React from 'react'
import {Link, withRouter} from 'react-router'

export default withRouter(
  React.createClass({
    getInitialState() {
      return {
        token: '12345'
      }
    },

    handlerOnChange(event) {
      this.setState({
        token: event.target.value
      })
    },

    handlerOnSubmit(event) {
      event.preventDefault()

      this.props.router.push({
        pathname: '/page',
        query: {
          token: this.state.token
        }
      })
    },

    render() {
      return (
        <form onSubmit={this.handlerOnSubmit}>
          <div className="content">
            Token is 12345
          </div>

          <div className="content">
            <label>Your token:</label>
            <input type="text" value={this.state.value} onChange={this.handlerOnChange}/>
          </div>

          <div className="content">
            <button type="submit">Submit your token</button>
          </div>

          <div className="content">
            <ul>
              <li><Link to="/page?token=12345">Link to /page?token=12345</Link></li>
              <li><Link to="/page?token=foo">Link to /page?token=foo</Link></li>
            </ul>
          </div>
        </form>
      )
    }
  })
)