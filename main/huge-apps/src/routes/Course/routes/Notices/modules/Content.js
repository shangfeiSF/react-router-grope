import React, {Component} from 'react'

class ShowContext extends Component {
  render() {
    return (
      <div>
        <h3>Notice Content</h3>
        {this.props.children || <p>Choose a notice to show context from the sidebar.</p>}
      </div>
    )
  }
}

module.exports = ShowContext