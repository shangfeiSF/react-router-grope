import React from 'react'
import {Link, withRouter} from 'react-router'

export default withRouter(
  React.createClass({
    getInitialState() {
      return {
        courses: [
          {
            id: 0,
            name: 'Art'
          },
          {
            id: 1,
            name: 'Math'
          },
          {
            id: 2,
            name: 'Science'
          }
        ]
      }
    },

    addCourse() {
      let len = this.state.courses.length
      let name = prompt('course name?')

      this.setState({
        courses: this.state.courses.concat({
          od: len,
          name: name
        })
      })
    },

    removeCourse(name) {
      this.setState({
        courses: this.state.courses.filter(function (course) {
          return course.name != name
        })
      })

      this.props.router.push('/')
    },

    render() {
      let courseLinks = this.state.courses.map(function (course, index) {
        return (
          <li key={index}>
            <Link to={`/courses/${course.name}`}>{course.name}</Link>
          </li>
        )
      })

      return (
        <div className="App">
          <button onClick={this.addCourse}>Add New Course</button>

          <ul className="Master">
            {courseLinks}
          </ul>

          <div className="Detail">
            {
              this.props.children && React.cloneElement(this.props.children, {
                removeCourse: this.removeCourse
              })
            }
          </div>
        </div>
      )
    }
  })
)