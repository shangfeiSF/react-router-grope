import React, {Component} from 'react'

class Lesson extends Component {
  render() {
    let {courseId, lessonId} = this.props.params
    let {title, content} = COURSES[courseId].lessons[lessonId]

    return (
      <div>
        <h4>{title}</h4>
        <p>{content}</p>
      </div>
    )
  }
}

module.exports = Lesson