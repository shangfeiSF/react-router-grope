import React, {Component} from 'react'

class Notice extends Component {
  render() {
    let {courseId, noticeId} = this.props.params
    let {title, content} = COURSES[courseId].notices[noticeId]

    return (
      <div>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    )
  }
}

module.exports = Notice