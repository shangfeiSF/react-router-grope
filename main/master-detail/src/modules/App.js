import React from 'react'
import {Link} from 'react-router'

import ContactStore from '../assets/ContactStore'

export default React.createClass({
  getInitialState() {
    return {
      contacts: ContactStore.getAll()
    }
  },

  componentWillMount() {
    ContactStore.init()
  },

  componentDidMount() {
    ContactStore.addListener(this.updateContacts)
  },

  componentWillUnmount() {
    ContactStore.removeListener(this.updateContacts)
  },

  updateContacts() {
    this.setState({
      contacts: ContactStore.getAll()
    })
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