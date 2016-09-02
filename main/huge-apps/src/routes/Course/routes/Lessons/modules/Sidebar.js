import React, {Component} from 'react'
import {Link} from 'react-router'

class Sidebar extends Component {
  render() {
    let {lessons} = COURSES[this.props.params.courseId]

    return (
      <div>
        <h3>Lessons Sidebar</h3>
        <ul>
          {
            lessons.map(lesson => (
              <li key={lesson.id}>
                <Link to={`/course/${this.props.params.courseId}/lessons/${lesson.id}`}>
                  {lesson.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

module.exports = Sidebar
