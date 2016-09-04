import React, {Component} from 'react'

class Notices extends Component {
  render() {
    let courses = COURSES

    return (
      <div>
        <h2>Notices Page</h2>
        {
          courses.map((course, index) => (
            <div key={'course' + index}>
              <h3 key={'h3' + index}>{course.name}</h3>
              <ul key={'ul' + index}>
                {
                  course.notices.map((notice, i) => (
                    <li key={'li' + index + '-' + i}>{notice.id}-{notice.title}</li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    )
  }
}

module.exports = Notices