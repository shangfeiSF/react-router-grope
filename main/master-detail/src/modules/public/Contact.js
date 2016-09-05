import React from 'react'
import {withRouter} from 'react-router'

import ContactStore from '../../assets/ContactStore'

export default withRouter(
  React.createClass({
    _getContact(props) {
      const {id} = props ? props.params : this.props.params

      return {
        contact: ContactStore.get(id)
      }
    },

    getInitialState() {
      return this._getContact()
    },

    componentDidMount() {
      ContactStore.addListener(this.updateContact)
    },

    componentWillUnmount() {
      ContactStore.removeListener(this.updateContact)
    },

    componentWillReceiveProps(nextProps) {
      this.setState(this._getContact(nextProps))
    },

    updateContact() {
      this.setState(this._getContact())
    },

    handlerOnClick() {
      const {id} = this.props.params
      ContactStore.remove(id)
      this.props.router.push('/')
    },

    render() {
      const contact = this.state.contact || {}
      const name = contact.first + ' ' + contact.last
      const avatar = contact.avatar || 'http://placecage.com/50/50'

      return (
        <div className="Contact">
          <img height="50" src={avatar} key={avatar}/>
          <h3>{name}</h3>
          <button onClick={this.handlerOnClick}>Delete</button>
        </div>
      )
    }
  })
)