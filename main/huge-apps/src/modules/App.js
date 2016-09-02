/*
 * Component API as follow:
 * https://facebook.github.io/react/docs/top-level-api.html
 * https://facebook.github.io/react/docs/reusable-components.html#es6-classes
 * https://facebook.github.io/react/docs/component-api.html
 * */

/*
 * The Component API is similar to React.createClass with the exception of getInitialState.
 * Instead of providing a separate getInitialState method, you set up your own state property in the constructor.
 * Just like the return value of getInitialState, the value you assign to this.state will be used as the initial state for your component.
 * */

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