import React, {Component} from 'react'

class ShowContext extends Component {
  render() {
    return (
      <div>
        <h3>Lesson Content</h3>
        {this.props.children || <p>Choose a lesson to show context from the sidebar.</p>}
      </div>
    )
  }
}

module.exports = ShowContext
