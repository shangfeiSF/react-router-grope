import React, {Component} from 'react'

class Weights extends Component {
  render() {
    let {lessons} = COURSES[this.props.params.courseId]

    return (
      <div>
        <h3>Weights</h3>
        <ul>
          {lessons.map(lesson => (
            <li key={lesson.id}>
              <div>{lesson.title}</div>
              <div>{lesson.content}</div>
              <div>{lesson.weight}</div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

module.exports = Weights