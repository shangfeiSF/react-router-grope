import React, {Component} from 'react'
import {Link} from 'react-router'

class HomeIndex extends Component {
  render() {
    const courses = COURSES

    return (
      <div>
        <h2>Courses List</h2>{' '}
        <ul>
          {
            courses.map(course => (
              <li key={course.id}>
                <Link to={`/course/${course.id}`}>{course.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

module.exports = HomeIndex