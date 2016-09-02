import React, {Component} from 'react'
import {Link} from 'react-router'

class SideBar extends Component {
  render() {
    let {notices} = COURSES[this.props.params.courseId]

    return (
      <div>
        <h3>Notices Sidebar</h3>
        <ul>
          {
            notices.map(notice => (
              <li key={notice.id}>
                <Link to={`/course/${this.props.params.courseId}/notices/${notice.id}`}>
                  {notice.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

module.exports = SideBar