import React from 'react'
import {Link} from 'react-router'

import store from '../utils/store'

export default React.createClass({
  _update() {
    this.setState({
      contacts: store.getAll()
    })
  },

  getInitialState() {
    return {
      contacts: store.getAll()
    }
  },

  componentWillMount() {
    store.init()
  },

  componentDidMount() {
    store.addListener(this._update)
  },

  componentWillUnmount() {
    store.removeListener(this._update)
  },
  
  render() {
    const contacts = this.state.contacts.map(function (contact) {
      return (
        <li key={contact.id}>
          <Link to={`/contact/${contact.id}`}>
            {contact.first}
          </Link>
        </li>
      )
    })

    return (
      <div className="App">
        <div className="ContactList">
          <Link to="/contact/new">New Contact</Link>
          <ul>
            {contacts}
          </ul>
        </div>
        <div className="Content">
          {this.props.children}
        </div>
      </div>
    )
  }
})