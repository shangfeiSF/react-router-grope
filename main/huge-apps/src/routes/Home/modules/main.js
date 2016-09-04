import React, {Component} from 'react'
import {Link} from 'react-router'

class Home extends Component {
  render() {
    const courses = COURSES

    return (
      <div>
        <h2>Home Page(Courses List)</h2>
        <h3>(Home page is just the list of courses)</h3>
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

module.exports = Home