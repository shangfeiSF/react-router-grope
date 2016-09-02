import React, {Component} from 'react'

class Calendar extends Component {
  render() {
    const events = [{
      id: 0,
      title: 'hello world'
    }, {
      id: 1,
      title: 'react router'
    }]

    return (
      <div>
        <h2>Calendar</h2>
        <ul>
          {
            events.map(event => (
              <li key={event.id}>{event.title}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

module.exports = Calendar