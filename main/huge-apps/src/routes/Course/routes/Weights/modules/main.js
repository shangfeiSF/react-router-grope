import React, {Component} from 'react'

class Weights extends Component {
  render() {
    let {lessons} = COURSES[this.props.params.courseId]

    return (
      <div>
        <h3>Weights</h3>
        {
          lessons.map((lesson, index) => (
            <div key={lesson.id}>
              <h4>{lesson.title}</h4>
              <table>
                <tbody>
                <tr>
                  <td>{lesson.weight}</td>
                  <td>|</td>
                  <td>{lesson.content}</td>
                </tr>
                </tbody>
              </table>
            </div>
          ))
        }
      </div>
    )
  }
}

module.exports = Weights