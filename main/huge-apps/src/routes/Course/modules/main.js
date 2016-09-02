import React, {Component} from 'react'

import Hub from './Hub'
import Nav from './Nav'

const styles = {
  float: 'left',
  width: 200,
  padding: 20,
  borderRight: '1px solid #aaa',
  marginRight: 20
}

class Course extends Component {
  render() {
    let {sidebar, content, children, params} = this.props
    let course = COURSES[params.courseId]

    let mainArea

    if (sidebar && content) {
      mainArea = (
        <div>
          <div className="Sidebar" style={styles}>
            {sidebar}
          </div>
          <div className="Content" style={{ padding: 20 }}>
            {content}
          </div>
        </div>
      )
    }
    else if (children) {
      mainArea = children
    } else {
      mainArea = <Hub />
    }

    return (
      <div>
        <h2>{course.name}</h2>
        <Nav course={course}/>
        {mainArea}
      </div>
    )
  }
}

module.exports = Course