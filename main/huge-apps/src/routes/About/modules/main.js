import React, {Component} from 'react'

class About extends Component {
  render() {
    const text = {
      title: 'About how a Scalable App works',
      contents: [
        'Open the network tab as you navigate.',
        'Notice that only the amount of your app that is required is actually downloaded as you navigatearound.',
        'Even the route configuration objects are loaded on the fly.',
        'This way, a new route added deep in your app will not affect theinitial bundle of your application.'
      ]
    }
    let index = 0

    return (
      <div>
        <h2>About Page</h2>
        <h3>{text.title}</h3>
        <ul>
          {
            text.contents.map(tip => (
              <li key={index++}>{tip}</li>
            ))
          }
        </ul>
      </div>
    )
  }
}

module.exports = About