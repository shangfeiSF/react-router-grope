import React from 'react'
import {Link} from 'react-router'

const style = {
  position: 'fixed',
  top: '20%',
  right: '20%',
  bottom: '20%',
  left: '20%',
  padding: 20,
  boxShadow: '0px 0px 150px 130px rgba(0, 0, 0, 0.5)',
  background: '#fff',
  overflow: 'auto'
}

export default React.createClass({
  render() {
    return (
      <div style={style}>
        <p>
          <Link to={this.props.returnTo}>Back</Link>
        </p>
        {this.props.children}
      </div>
    )
  }
})