import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <p>You can link from anywhere really deep too</p>
        <p>Params stick around: {this.props.params.one} {this.props.params.two}</p>
        <p>
          <Link to={{
            pathname: '/pictures/0',
            state: { modal: true, returnTo: this.props.location.pathname }
          }}>
            Link to picture with Modal
          </Link>
          <br/>
          <Link to="/pictures/0">
            Without modal
          </Link>
        </p>
      </div>
    )
  }
})