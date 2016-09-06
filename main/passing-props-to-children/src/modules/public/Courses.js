import React from 'react'

export default React.createClass({
  removeCourse() {
    this.props.removeCourse(this.props.params.name)
  },

  render() {
    return (
      <div className="course">
        <h1>{this.props.params.name}</h1>
        <button onClick={this.removeCourse}>Remove</button>
      </div>
    )
  }
})