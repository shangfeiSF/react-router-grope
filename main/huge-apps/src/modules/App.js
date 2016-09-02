import React, {Component} from 'react'
import Dashboard from './public/Dashboard'
import GlobalNav from './public/GlobalNav'

class App extends Component {
  render() {
    return (
      <div>
        <GlobalNav />
        <div style={{ padding: 20 }}>
          {this.props.children || <Dashboard courses={COURSES}/>}
        </div>
      </div>
    )
  }
}

module.exports = App