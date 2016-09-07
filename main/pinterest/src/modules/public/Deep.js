import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    let to = {
      pathname: '/pictures/0',
      state: {
        modal: true,
        returnTo: this.props.location.pathname
      }
    }

    return (
      <div>
        <h3>You can link from anywhere really deep like here route you are</h3>
        <p>
          This route params is <strong>{this.props.params.one}</strong> and <strong>{this.props.params.two}</strong>
        </p>
        <h3>These two links can all show picture which id is 0</h3>
        <ul>
          <li>
            <Link to={to}>With Modal</Link>
          </li>
          <li>
            <Link to="/pictures/0">Without modal</Link>
          </li>
        </ul>
      </div>
    )
  }
})