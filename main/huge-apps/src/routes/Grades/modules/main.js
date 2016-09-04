import React from 'react'

class Grades extends React.Component {
  render() {
    let index = 0
    let courses = COURSES

    return (
      <div>
        <h2>Grades Page</h2>
        <ul>
          {
            courses.map((course) => (
              <li key={index++}>{course.name}-{course.grade}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

module.exports = Grades